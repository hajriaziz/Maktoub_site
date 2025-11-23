<?php
function generate_uuid() {
    // UUID v4 simple sans dépendance
    return sprintf(
        '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}
function isProductInStock($stockJson) {
    $stock = json_decode($stockJson ?? '[]', true);

    if (!is_array($stock)) {
        return false;
    }

    $totalStock = array_sum($stock);
    return $totalStock > 0;
}
?>
