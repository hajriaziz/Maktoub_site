import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import mysql from "mysql2/promise";

export async function POST(request: NextRequest) {
  try {
    const { commandeId } = await request.json();
    console.log("📧 Tentative d'envoi d'email pour commande:", commandeId);

    if (!commandeId) {
      return NextResponse.json(
        { error: "commandeId manquant" },
        { status: 400 }
      );
    }

    // 1. Configuration MySQL
    const pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root", 
      password: process.env.DB_PASSWORD || "",
      database: "maktoub_db",
      connectionLimit: 10,
    });

    // 2. Récupération des données
    const [orderRows]: any = await pool.execute(
      `SELECT o.*, c.first_name, c.last_name, c.email 
       FROM orders o 
       JOIN customers c ON o.customer_id = c.id 
       WHERE o.id = ?`,
      [commandeId]
    );

    if (orderRows.length === 0) {
      await pool.end();
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 });
    }

    const order = orderRows[0];
    console.log("📦 Commande trouvée:", order.order_number, "Email:", order.email);

    // 3. Récupérer les articles
    const [itemRows]: any = await pool.execute(
      `SELECT product_name, size, color, quantity, unit_price 
       FROM order_items WHERE order_id = ?`,
      [commandeId]
    );

    await pool.end();

    // 4. Configuration Email (SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 5. Construction de l'email
    const itemsHtml = itemRows.map((item: any) => `
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">${item.product_name}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${item.size || 'N/A'}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${item.color || 'N/A'}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${item.quantity}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${item.unit_price} €</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${(item.quantity * item.unit_price).toFixed(2)} €</td>
      </tr>
    `).join('');

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@maktoub.com',
      to: order.email, // Email DYNAMIQUE du client
      subject: `Confirmation de commande #${order.order_number} - Maktoub`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #f8f8f8; padding: 20px; text-align: center;">
            <h1>Maktoub</h1>
            <p>Merci pour votre commande !</p>
          </div>
          <div style="padding: 20px;">
            <p>Bonjour <strong>${order.first_name} ${order.last_name}</strong>,</p>
            <p>Votre commande <strong>#${order.order_number}</strong> a bien été reçue.</p>
            
            <h2>Détails de votre commande :</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr>
                  <th style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;">Produit</th>
                  <th style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;">Taille</th>
                  <th style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;">Couleur</th>
                  <th style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;">Quantité</th>
                  <th style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;">Prix unitaire</th>
                  <th style="padding: 10px; border: 1px solid #ddd; background: #f5f5f5;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="5" style="text-align: right; padding: 10px; border: 1px solid #ddd;"><strong>Total :</strong></td>
                  <td style="padding: 10px; border: 1px solid #ddd;"><strong>${order.total_amount} €</strong></td>
                </tr>
              </tfoot>
            </table>
            
            <p><strong>Statut :</strong> ${order.status}</p>
            <p>Nous vous tiendrons informé de l'avancement.</p>
          </div>
          <div style="background: #f8f8f8; padding: 20px; text-align: center; font-size: 12px; color: #666;">
            <p>© 2024 Maktoub. Tous droits réservés.</p>
          </div>
        </div>
      `,
    };

    // 6. Envoi de l'email
    console.log("🔄 Envoi de l'email à:", order.email);
    await transporter.sendMail(mailOptions);
    console.log("✅ Email envoyé avec succès à:", order.email);

    return NextResponse.json({ 
      success: true,
      message: "Email envoyé avec succès",
      orderNumber: order.order_number,
      customerEmail: order.email
    });

  } catch (error: any) {
    console.error("❌ Erreur détaillée:", error);
    return NextResponse.json(
      { 
        error: "Erreur lors de l'envoi de l'email",
        details: error.message 
      },
      { status: 500 }
    );
  }
}