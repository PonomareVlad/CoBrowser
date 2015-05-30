var DATA={};
var WAIT=false;
DATA['Xmouse']=0;
DATA['Ymouse']=0;
DATA['Click']=false;
DATA['TIME']=new Date().getTime();

window.onload=function(){
    if(location.search.substr(1)=='view'){
        document.write('<img src="pointer.png" id="pointer"/>');
        setInterval(recept,1000);
    }else{
        window.onmousemove=onMove;
        document.body.onclick=onClick;
        setInterval(send,1000);
    }
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
        };
        xmlhttp.open('GET', 'http://scms.esy.es/cobrowse/cobrowse.php?data=' + query, true);
        xmlhttp.send();
    }
}

function recept() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                response = JSON.parse(xmlhttp.responseText);
                if (response['TIME']) {
                    DATA=response;
                    show();
                }else{
                    console.log('Server error');
                }
            }
        }
    };
    xmlhttp.open('GET', 'http://scms.esy.es/cobrowse/cobrowse.php', true);
    xmlhttp.send();
}

function show(){
    get('pointer').style.top=DATA['Ymouse'];
    get('pointer').style.left=DATA['Xmouse'];
}

function get(objID) {
    if (document.getElementById) {return document.getElementById(objID);}
    else if (document.all) {return document.all[objID];}
    else if (document.layers) {return document.layers[objID];}
}