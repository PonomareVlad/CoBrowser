<?php
header("Access-Control-Allow-Origin: *"); // Разрешаем CORS
function objectToArray($d){
    if (is_object($d)) {
        // Gets the properties of the given object
        // with get_object_vars function
        $d = get_object_vars($d);
    }

    if (is_array($d)) {
        /*
        * Return array converted to object
        * Using __FUNCTION__ (Magic constant)
        * for recursive call
        */
        return array_map(__FUNCTION__, $d);
    } else {
        // Return array
        return $d;
    }
}
$RESPONSE=[];
if(isset($_GET['data'])) {
    $DATA = objectToArray(json_decode($_GET['data']));
    if (isset($DATA['Xmouse'], $DATA['Ymouse'], $DATA['Click'], $DATA['TIME'])) {
        if (file_exists('co.json')) {
            $OLD_DATA = objectToArray(json_decode(file_get_contents('co.json')));
            $RESPONSE['TIME'] = $OLD_DATA['TIME'];
        } else {
            $RESPONSE['TIME'] = 100;
        }
        $co = fopen('co.json', 'w+');
        if (fwrite($co, json_encode($DATA))) {
            $RESPONSE['ok'] = true;
        }
        fclose($co);
    } else {
        $RESPONSE['ok'] = false;
    }
    echo json_encode($RESPONSE);
}else{
    echo file_get_contents('co.json');
}