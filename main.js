var timeout=100;
var DATA={};
var WAIT=false;
DATA['Xmouse']=0;
DATA['Ymouse']=0;
DATA['Click']=false;
DATA['TIME']=new Date().getTime();

var HREF=location.origin+location.pathname;

window.onload=function(){
    if(location.search.substr(1)=='view'){
        document.body.innerHTML='<img src="pointer.png" id="pointer"/>';
        //setInterval(recept,timeout);
        setTimeout(recept,timeout);
    }else{
        window.onmousemove=onMove;
        document.body.onclick=onClick;
        //setInterval(send,timeout);
        setTimeout(send,timeout);
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
                    if (response['ok']&&response['TIME']) {
                        timeout=correctTimeout(DATA['TIME'],response['TIME']);
                    }else{
                        console.log('Server error');
                    }
                }
            }
        };
        xmlhttp.open('GET', HREF+'/cobrowse.php?data=' + query, true);
        xmlhttp.send();
    }
    setTimeout(send,timeout);
}

function recept() {
    DATA['TIME']=new Date().getTime();
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
                    timeout=correctTimeout(DATA['TIME'],response['TIME']);
                    DATA=response;
                    show();
                }else{
                    console.log('Server error');
                }
            }
        }
    };
    xmlhttp.open('GET', HREF+'/cobrowse.php', true);
    xmlhttp.send();
    setTimeout(recept,timeout);
}

function show(){
    get('pointer').style.position='absolute';
    get('pointer').style.top=DATA['Ymouse']+'px';
    get('pointer').style.left=DATA['Xmouse']+'px';
}

function get(objID) {
    if (document.getElementById) {return document.getElementById(objID);}
    else if (document.all) {return document.all[objID];}
    else if (document.layers) {return document.layers[objID];}
}

function correctTimeout(now,old){
    time=now-old; // XHR Time
    if(time>1000){time=1000;}
    if(time<100){time=100;}
    //////// Sync Timeout ////////
    // Old variant:
    // time=parseInt((time/2)+(timeout/2));
    ////////
    // New variant:
    time=parseInt(time>timeout?(timeout+(time/2)):(timeout-(time/2)));
    //////////////////////////////
    console.log(time);
    return time;
}