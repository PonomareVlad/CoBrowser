<?php
$RESPONSE=[];
if(isset($_GET['data'])){
    $DATA=json_decode($_GET['data']);
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