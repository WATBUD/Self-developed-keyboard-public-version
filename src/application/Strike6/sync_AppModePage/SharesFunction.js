
class SharesFunction {
    recordClientX = 0;
    recordClientY = 0;
    constructor() {


    }

    logCustom(Message, data) {
        console.log("SharesFunction_log", Message, data);

    }
    get_Windows_Vw_Vh() {

        let _1vw = window.innerWidth / 100;
        //Math.round(window.innerWidth / 100);
        let _1vh = window.innerHeight / 100;
        //Math.round(window.innerHeight / 100);

        var arr = [_1vw, _1vh];
        return arr;
    }
    TipUIMessage(setMessage, targetDOM) {

        var BtnTextTip = document.getElementById("BtnTextTip");
        console.log("TipUIMessage,targetDOM", targetDOM);

        BtnTextTip.children[0].innerHTML = "&nbsp;" + setMessage + "&nbsp;"
        BtnTextTip.style.left =
            //this.recordClientX
            targetDOM.clientX + "px";
        BtnTextTip.style.top =
            //this.recordClientY
            targetDOM.clientY + "px";

        BtnTextTip.style.display = "block"
        targetDOM.srcElement.addEventListener('mouseleave', e => {
            console.log("TipUIMessage,targetDOM_mouseleave", targetDOM);
            BtnTextTip.style.display = "none";
        });
    }
    TipUIHide() {

        var BtnTextTip = document.getElementById("BtnTextTip");
        BtnTextTip.style.display = "none"
        //targetDOM.
    }

    addMousePosition() {
        document.addEventListener('mousemove', e => {
            console.log("addMousePosition", e);

            this.recordClientX = e.clientX;
            this.recordClientY = e.clientY;
        });
    }
}


function count_boolean(inputArr = [], type = false) {
    var count = 0;
    inputArr.forEach(element => {
        if (element == type) {
            count += 1;
        }
    });
    return count;
}


function CreateFakeArray(length = 0) {
    return Array(length).fill(4);
}
// function TTTTTTT() {
//   console.log("TTTTTTT",)
// }

function getMatchedCSS(targetDiv,name){
    //var ax=new SharesFunction();
    //console.log("getMatchedCSS",targetDiv);

    var target=document.getElementById(targetDiv);
    return parseInt(getComputedStyle(target)[name]);
}
function getElementCSS(targetDiv,name){
    //var ax=new SharesFunction();
    //console.log("getMatchedCSS",targetDiv);

    //var target=document.getElementById(targetDiv);
    return parseInt(getComputedStyle(targetDiv)[name]);
}


//檢查目標是否在陣列內
function checkExist(array, findTarget) {
    //console.log("checkExistArr",ary,findTarget);
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element == findTarget) {
            console.log("存在值", element, findTarget);
            return true;
        }
    }
    return false;
}

function checkDocumentIdExist(id) {
    var element = document.getElementById(id);
    if (typeof (element) != 'undefined' && element != null) {
        return true;
    }
    return false;
}
exports.TTSX = SharesFunction;
