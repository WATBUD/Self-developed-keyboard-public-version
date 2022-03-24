import { Injectable } from '@angular/core'
@Injectable()
export class KeyBoardStyle {
    nowTargetIndex = 0
    nowTargetKey='MK22';
    //BGImage:'url(./image/Share/KB1KeyerEffects.png)',
    keyBoardList = {
        'MK63': {
            ItemCss: [
                "",
                "margin-left: 6%;",
                "margin-left: 11.9%;",
                "margin-left: 17.9%;",
                "margin-left: 23.8%;",
                "margin-left: 29.6%;",
                "margin-left: 35.5%;",
                "margin-left: 41.4%;",
                "margin-left: 47.3%;",
                "margin-left: 53.2%;",
                "margin-left: 59.1%;",
                "margin-left: 65.2%;",
                "margin-left: 70.9%;",
                "margin-left: 76.9%;width: 11.5%;",
                "margin-left: 88.7%;",
                "margin-top: 8.7%; margin-left: 11.6%;",
                "margin-top: 8.7%; margin-left: 18.2%;",
                "margin-top: 8.7%; margin-left: 24.4%;",
                "margin-top: 8.7%; margin-left: 31%;",
                "margin-top: 8.7%; margin-left: 37.3%;",
                "margin-top: 8.7%; margin-left: 43.7%;",
                "margin-top: 8.7%; margin-left: 50.1%;",
                "margin-top: 8.7%; margin-left: 56.6%;",
                "margin-top: 8.7%; margin-left: 63%;",
                "margin-top: 8.7%; margin-left: 69.5%;",
                "margin-top: 8.7%; margin-left: 75.8%;",
                "margin-top: 8.7%; margin-left: 82.4%;",
                "width: 5.6vw; margin-top: 8.7%; margin-left: 88.8%;",
                "width: 11.3%; margin-top: 15.7%; margin-left: 2%;",
                "margin-top: 15.7%; margin-left: 13.1%;",
                "margin-top: 15.7%; margin-left: 19.6%;",
                "margin-top: 15.7%; margin-left: 26.1%;",
                "margin-top: 15.7%; margin-left: 32.5%;",
                "margin-top: 15.7%; margin-left: 38.9%;",
                "margin-top: 15.7%; margin-left: 45.1%;",
                "margin-top: 15.7%; margin-left: 51.5%;",
                "margin-top: 15.7%; margin-left: 58.1%;",
                "margin-top: 15.7%; margin-left: 64.5%;",
                "margin-top: 15.7%; margin-left: 71.1%;",
                "margin-top: 15.7%; margin-left: 77.6%;",
                "width: 14.6%; margin-top: 15.7%; margin-left: 84.1%;",
                "width: 14.6%; margin-top: 22.6%; margin-left: 2%;",
                "margin-top: 22.6%; margin-left: 16.5%;",
                "margin-top: 22.6%; margin-left: 22.9%;",
                "margin-top: 22.6%; margin-left: 29.3%;",
                "margin-top: 22.6%; margin-left: 35.6%;",
                "margin-top: 22.6%; margin-left: 42%;",
                "margin-top: 22.6%; margin-left: 48.4%;",
                "margin-top: 22.6%; margin-left: 54.9%;",
                "margin-top: 22.6%; margin-left: 61.3%;",
                "margin-top: 22.6%; margin-left: 67.8%;",
                "margin-top: 22.6%; margin-left: 74.3%;",
                "width: 18%; margin-top: 22.6%; margin-left: 80.9%;",
                "width: 8.3%; margin-top: 29.8%; margin-left: 2%;",
                "width: 7.7%; margin-top: 29.8%; margin-left: 10.3%;",
                "width: 8%; margin-top: 29.8%; margin-left: 18.2%;",
                "width: 41%; margin-top: 30%; margin-left: 25.5%;",
                "width: 7.8%; margin-top: 29.8%; margin-left: 66.6%;",
                "width: 7.8%; margin-top: 29.8%; margin-left: 74.7%;",
                "width: 8.2%; margin-top: 29.8%; margin-left: 82.6%;",
                "width: 7.8%; margin-top: 29.8%; margin-left: 90.8%;",
                "width: 7.8%; margin-top: 29.8%; margin-left: 90.8%;",
                "width: 7.8%; margin-top: 29.8%; margin-left: 90.8%;",
            ],
            keyMapping: ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace", "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter", "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "ShiftRight", "ArrowUp", "Slash", "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "Custom_Fnkey", "ArrowLeft", "ArrowDown", "ArrowRight"],
            cssText: 'position: absolute;height: 100%;width: 100%;pointer-events: none;',
            BGImage: "url(./image/Share/MK63.png)",
            BGImageKeyerEffects: "url(./image/Share/KB1White.png)",
            qigong_Step1_Range: [0, 9, 24, 37, 49, 61],
            qigong_Step2_Range: [20, 21, 31, 49, 50, 35],
            centerBlockPoint: 36,
            breakGradation: [[0, 14], [15, 29], [30, 44], [45, 58], [59, 72], [73, 81]],
            imageMaxWidth: 765,
            imageMaxHeight: 308,
            SelectDeviceBG:"url(./image/Share/MK63SelectDeviceBG.jpg)",
        },
        'MK22': {
            ItemCss: [
                "width: 47px;margin-left: 1px;margin-top: 3px;",
               " margin-left: 51px; margin-top: 3px; width: 47px;",
               "margin-left: 102px;margin-top: 3px;wid: 47px;width: 47px;",
               " margin-left: 153px; margin-top: 3px; width: 47px;",
               " margin-left: 203px; margin-top: 3px; width: 48px;",
               "margin-left: 254px;margin-top: 3px;width: 47px;",
               "margin-left: 305px;margin-top: 3px;width: 46px;",
               "margin-left: 355px;margin-top: 3px;width: 48px;width: 47px;",
               "margin-left: 406px;margin-top: 3px;width: 47px;",
               "margin-left: 457px;margin-top: 3px;width: 47px;",
               "margin-left: 507px;margin-top: 3px;wid: 47px;width: 47px;",
               " margin-left: 558px; margin-top: 3px; width: 47px;",
               " margin-left: 609px; margin-top: 3px; width: 47px;",
               " margin-left: 660px; margin-top: 3px; width: 95px;",
               " margin-top: 52px; width: 72px; margin-left: 1px;",
               " margin-top: 52px; width: 47px; margin-left: 77px;",
               "margin-top: 52px;width: 47px;margin-left: 128px;",
               " margin-top: 52px; width: 47px; margin-left: 178px;",
               " margin-top: 52px; width: 47px; margin-left: 229px;",
               " margin-top: 52px; width: 47px; margin-left: 279px;",
               " margin-top: 52px; width: 48px; margin-left: 330px;",
               " margin-top: 52px; width: 48px; margin-left: 380px;",
               " margin-top: 52px; width: 48px; margin-left: 431px;",
               " margin-top: 52px; width: 47px; margin-left: 482px;",
               "margin-top: 52px;width: 47px;margin-left: 533px;",
               "margin-top: 52px;width: 47px;margin-left: 583px;",
               " margin-top: 52px; width: 47px; margin-left: 634px;",
               " margin-top: 52px; width: 73px; margin-left: 684px;",
               " margin-top: 103px; width: 85px;margin-left: 2px;",
               " margin-top: 103px; margin-left: 91px;",
               " margin-top: 103px; margin-left: 142px;",
               " margin-top: 103px; margin-left: 193px;",
               " margin-top: 103px; margin-left: 243px;",
               " margin-top: 103px; margin-left: 295px;",
               " margin-top: 103px; margin-left: 345px;",
               " margin-top: 103px; margin-left: 395px;",
               " margin-top: 103px; margin-left: 445px;",
               " margin-top: 103px; margin-left: 495px;",
               " margin-top: 103px; margin-left: 546px;",
               " margin-top: 103px; margin-left: 596px;",
               " margin-top: 103px; width: 111px; margin-left: 646px;",
               " margin-top: 153px; width: 109px; margin-left: 2px;",
               " margin-top: 153px; width: 47px; margin-left: 115px;",
               " margin-top: 153px; width: 47px; margin-left: 166px;",
               " margin-top: 153px; width: 47px; margin-left: 216px;",
               " margin-top: 153px; width: 46px; margin-left: 268px;",
               " margin-top: 153px; width: 47px; margin-left: 318px;",
               " margin-top: 153px; width: 47px; margin-left: 368px;",
               " margin-top: 153px; width: 47px; margin-left: 418px;",
               " margin-top: 153px; width: 47px; margin-left: 469px;",
               " margin-top: 153px; width: 46px; margin-left: 521px;",
               " margin-top: 153px; width: 47px; margin-left: 571px;",
               " margin-top: 153px; width: 134px; margin-left: 623px;",
               "margin-top: 204px;width: 60px;margin-left: 1px;",
               "margin-top: 204px;width: 60px;margin-left: 65px;",
               "margin-top: 204px;width: 60px;margin-left: 128px;",
               " margin-top: 203px; width: 311px; margin-left: 192px;",
               " margin-top: 203px; width: 59px; margin-left: 507px;",
               " margin-top: 203px; width: 60px; margin-left: 570px;",
               " margin-top: 203px; width: 61px; margin-left: 633px;",
               " margin-top: 203px; width: 61px; margin-left: 696px;",
            ],
            keyMapping: ["Escape","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0","Minus","Equal","Backspace","Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Backslash","CapsLock","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Enter","ShiftLeft","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ShiftRight","ControlLeft","MetaLeft","AltLeft","Space","ArrowLeft","ArrowDown","ArrowRight","Custom_Fnkey"],
            cssText: 'position: absolute;height: 100%;width: 100%;pointer-events: none;',
            BGImage: "url(./image/Share/MK22.png)",
            BGImageKeyerEffects: "url(./image/Share/KB1White.png)",
            qigong_Step1_Range: [0, 14, 28,40,52, 60],
            qigong_Step2_Range: [20, 21, 33, 35, 46, 47],
            centerBlockPoint: 34,
            breakGradation: [[0, 14], [15, 28], [29, 41], [42, 52], [53, 60]],
            imageMaxWidth: 765,
            imageMaxHeight: 308,
            SelectDeviceBG:"url(./image/Share/MK22SelectDeviceBG.jpg)",
        },
        'MK68M': {
            ItemCss: [
            "margin-top: 2px;margin-left: 2px;width: 44px;",
            "margin-top: 2px;margin-left: 48px;width: 44px;",
            "margin-top: 2px;margin-left: 96px;width: 44px;",
            "margin-top: 2px;margin-left: 143px;width: 44px;",
            "margin-top: 2px;margin-left: 190px;width: 44px;",
            "margin-top: 2px;margin-left: 237px;width: 44px;",
            "margin-top: 2px;margin-left: 284px;width: 44px;",
            "margin-top: 2px;margin-left: 332px;width: 44px;",
            "margin-top: 2px;margin-left: 380px;width: 44px;",
            "margin-top: 2px;margin-left: 427px;width: 44px;",
            "margin-top: 2px;margin-left: 475px;width: 44px;",
            "margin-top: 3px;margin-left: 523px;width: 44px;",
            "margin-top: 3px;margin-left: 571px;width: 44px;",
            "margin-top: 3px;margin-left: 618px;width: 93px;",
            "margin-top: 3px;margin-left: 712px;width: 44px;",
            "margin-top: 47px;margin-left: 3px;width: 67px;",
            "margin-top: 47px;margin-left: 72px;width: 45px;",
            "margin-top: 47px;margin-left: 118px;width: 45px;",
            "margin-top: 47px;margin-left: 167px;width: 44px;",
            "margin-top: 47px;margin-left: 214px;width: 44px;",
            "margin-top: 47px;margin-left: 262px;width: 44px;",
            "margin-top: 47px;margin-left: 309px;width: 44px;",
            "margin-top: 47px;margin-left: 356px;width: 44px;",
            "margin-top: 47px;margin-left: 405px;width: 44px;",
            "margin-top: 47px;margin-left: 452px;width: 44px;",
            "margin-top: 47px;margin-left: 499px;width: 44px;",
            "margin-top: 47px;margin-left: 546px;width: 44px;",
            "margin-top: 47px;margin-left: 593px;width: 44px;",
            "margin-top: 47px;margin-left: 641px;width: 69px;",
            "margin-top: 47px;margin-left: 711px;width: 46px;",
            "margin-top: 94px;margin-left: 2px;width: 78px;",
            "margin-top: 94px;margin-left: 82px;width: 47px;",
            "margin-top: 94px;margin-left: 131px;width: 47px;",
            "margin-top: 94px;margin-left: 178px;width: 47px;",
            "margin-top: 94px;margin-left: 226px;width: 47px;",
            "margin-top: 94px;margin-left: 273px;width: 47px;",
            "margin-top: 94px;margin-left: 320px;width: 47px;",
            "margin-top: 94px;margin-left: 368px;width: 47px;",
            "margin-top: 94px;margin-left: 416px;width: 47px;",
            "margin-top: 94px;margin-left: 462px;width: 47px;",
            "margin-top: 94px;margin-left: 510px;width: 47px;",
            "margin-top: 94px;margin-left: 557px;width: 47px;",
            "margin-top: 94px;margin-left: 605px;width: 105px;",
            "margin-top: 94px;margin-left: 710px;width: 45px;",
            "margin-top: 143px;margin-left: 1px;width: 105px;",
            "margin-top: 143px;margin-left: 107px;width: 45px;",
            "margin-top: 143px;margin-left: 154px;width: 45px;",
            "margin-top: 143px;margin-left: 202px;width: 45px;",
            "margin-top: 143px;margin-left: 249px;width: 45px;",
            "margin-top: 143px;margin-left: 297px;width: 45px;",
            "margin-top: 143px;margin-left: 345px;width: 45px;",
            "margin-top: 143px;margin-left: 392px;width: 45px;",
            "margin-top: 143px;margin-left: 438px;width: 45px;",
            "margin-top: 143px;margin-left: 486px;width: 45px;",
            "margin-top: 143px;margin-left: 534px;width: 45px;",
            "margin-top: 143px;margin-left: 581px;width: 82px;",
            "margin-top: 143px;margin-left: 664px;width: 47px;",
            "margin-top: 143px;margin-left: 710px;width: 47px;",
            "margin-top: 191px; margin-left: 2px; width: 58px;",
            "margin-top: 191px; margin-left: 59px; width: 58px;",
            "margin-top: 191px; margin-left: 120px; width: 58px;",
            "margin-top: 191px; margin-left: 179px; width: 293px;",
            "margin-top: 191px;margin-left: 475px;width: 47px;",
            "margin-top: 191px;margin-left: 523px;width: 47px;",
            "margin-top: 191px;margin-left: 570px;width: 47px;",
            "margin-top: 191px;margin-left: 617px;width: 47px;",
            "margin-top: 191px;margin-left: 665px;width: 47px;",
            "margin-top: 191px;margin-left: 710px;width: 47px;",

            ],
            keyMapping: ["Escape", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace", "Pause", "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete", "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter", "PageUp", "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ShiftRight", "ArrowUp", "PageDown", "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "Custom_Fnkey", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"],
            cssText: 'position: absolute;height: 100%;width: 100%;pointer-events: none;',
            BGImage: "url(./image/Share/MK68M.png)",
            BGImageKeyerEffects: "url(./image/Share/KB1White.png)",
            qigong_Step1_Range: [0, 15, 30, 43, 57, 67],
            qigong_Step2_Range: [21, 22, 37, 49, 50, 35],
            centerBlockPoint: 36,
            breakGradation: [[0, 14], [15, 29], [30, 44], [45, 58], [59, 72], [73, 81]],
            imageMaxWidth: 765,
            imageMaxHeight: 308,
            SelectDeviceBG:"url(./image/Share/MK68MSelectDeviceBG.jpg)",
        },

    }

    constructor() { }
    getAssignTarget(name) {
        //console.log("keyBoardList",this.keyBoardList,this.nowTargetKey);
        return this.keyBoardList[name]
    }
    getTarget() {
        //console.log("keyBoardList",this.keyBoardList,this.nowTargetKey);
        return this.keyBoardList[this.nowTargetKey]
    }

    getTargetKeyBoradUIcss(id) {
        //console.log("getTargetKeyBoradUIcss",id);
        //document.getElementById(id).style.cssText=this.keyBoardList[this.nowTargetKey].cssText;
        var T1 = document.getElementById(id)
        if ((T1.dataset.UITransparent = 'RGBTransparent')) {
            T1.style.backgroundImage = this.keyBoardList[this.nowTargetKey].BGImageKeyerEffects
        } else {
            T1.style.backgroundImage = this.keyBoardList[this.nowTargetKey].BGImage
        }
        //return this.keyBoardList[this.nowTargetKey].cssText;
    }

    getAssignKBCssStyles(name) {
        if( this.keyBoardList[name]===undefined){
            console.log('%c getAssignKBCssStyles_err','background: blue; color: red',name);
            return ;
        }
        var target = document.getElementById(name)
        var targetArray = target.getElementsByClassName('SyncRGBColorBlockStyle');
        var targetUI:any = target.getElementsByClassName('RGBKeyBoardUITransparent');
        targetUI[0].style.backgroundImage = this.keyBoardList[name].BGImage
        for (const [key, value] of Object.entries(this.getAssignTarget(name).ItemCss)) {
            targetArray[key].style.cssText += value
            //console.log(key, value);
        }
    }
    getTargetDefaultKeyArray() {
        return this.getTarget().keyMapping;
    }
    findKeyMappingIndex(code = "") {
        let targetIndex = this.getTargetDefaultKeyArray().findIndex((x) => x == code)
        if (targetIndex == -1) {
            //console.error('this.nowMacroSelect.m_Identifier', this.nowMacroSelect.m_Identifier);
            alert('findKeyMappingIndex=lost' + code);
            console.log('findKeyMappingIndex', targetIndex);
        }
        else{
            return targetIndex;
        }

    }
    applyStyles(target) {
        //this.getTargetKeyBoradUIcss('RGBKeyBoardUITransparent')
        //console.log("applyStyles", this.getTarget().ItemCss,target);
        this.getTarget().ItemCss.forEach((element, index) => {
            //console.log("applyStyles_element", element);
            if(target[index]){
                target[index].style.cssText += element;
                //console.log("applyStyles_ItemCss", index);
            }
            else{
              console.log("applyStyles_ItemCss.forEach_Err",target[index],index);
            }
        });
        this.getTarget().keyMapping.forEach((element, index) => {
            if(target[index]){
                target[index].setAttribute('keyMapping', element);
                //console.log("applyStyles_keyMapping", index);
            }
            else{
              console.log("applyStyles_keyMapping.forEach_Err","color:red",target[index],index);
            }
            //element.setAttribute('keyMapping', index);

        });
        // for (const [key, value] of Object.entries(this.getTarget().ItemCss)) {
        //     //element.style.width = '100px'
        //     //if(key!=="target" &&key!=="cssText"){
        //     target[key].style.cssText += value
        //     //target[key].style.width = value;
        //     //console.log(key, value);
        //     //}
        // }
    }
}
