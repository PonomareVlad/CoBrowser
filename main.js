var DATA={};
var WAIT=false;
DATA['Xmouse']=0;
DATA['Ymouse']=0;
DATA['Click']=false;
DATA['TIME']=new Date().getTime();

window.onload=function(){
    window.onmousemove=onMove;
    document.body.onclick=onClick;
    setInterval(send,1000);
}

function onMove(e){
    e=e||window.event;
    if(DATA['Click']==false) {
        DATA['Xmouse'] = e.clientX;
        DATA['Ymouse'] = e.clientY;
    }
    //console.log('X:'+DATA['Xmouse']+' | Y:'+DATA['Ymouse']);
}

function onClick(e){
    DATA['Click']=true;
}

function send(){
    DATA['TIME']=new Date().getTime();
    if(!WAIT) {
        WAIT=true;
        query = JSON.stringify(DATA);
        DATA['Click']=false;
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    WAIT=false;
                    response = JSON.parse(xmlhttp.responseText);
                    if (!response['ok']) {
                        console.log('Server error');
                    }
                }
            }
        }
        xmlhttp.open('GET', 'http://scms.esy.es/cobrowse.php?data=' + query, true);
        xmlhttp.send();
    }
}
