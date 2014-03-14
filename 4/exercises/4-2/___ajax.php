<?php
// die not ajax
if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || ($_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest')){   die();  }

$data = array(
    'data1' => array(
        array(1, 6, 7, 10),
        array(6, 5, 3, 4),
        array(13, 9, 3, 8),
        array(13, 9, 3, 8)
    ),
    'data2' => array(
        array(2, 7, 8),
        array(7, 6, 4),
        array(14, 10, 4)
    ),
    'data3' => array(
        array(5, 8, 9, 12, 15),
        array(10, 7, 5, 6, 15),
        array(17, 11, 5, 10, 15),
        array(15, 11, 5, 10, 15)
    ),
    'dataA' => array(
        array('Heavy Industry', 12),
        array('Retail', 9),
        array('Light Industry', 14),
        array('Out of home', 16),
        array('Commuting', 7),
        array('Orientation', 9)
    ),
    'none' => array(null)
);

if ($_GET['d']) {
    $d = $_GET['d'];
    if (array_key_exists($d, $data)) {
        echo json_encode($data[$d]);
    }
}