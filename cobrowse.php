<?php
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
if(isset($_GET['data'])){
    $DATA=json_decode($_GET['data']);
    $DATA=objectToArray($DATA);
    if(isset($DATA['Xmouse'],$DATA['Ymouse'],$DATA['Click'],$DATA['TIME'])){
        $co=fopen('co.json','w+');
        fwrite($co,json_encode($DATA));
        fclose($co);
        $RESPONSE['ok']=true;
    }else{
        $RESPONSE['ok']=false;
    }
    echo json_encode($RESPONSE);
}else{
    echo file_get_contents('co.json');
}