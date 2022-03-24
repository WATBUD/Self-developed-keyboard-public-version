declare var System;
var SupportData = System._nodeRequire('./backend/others/SupportData');
export class MacroManager {
    radioOptions = 0;
    SupportData_KeyMapping = new Array()
    SupportData_MouseMapping = new Array()
    nowEditName="";
    tempMacroContent=new MacroScriptContent();
    currentMacroClass: any = 0;
    onEditCSName="";
    macroClassItem: any = [
        //new MacroClass("i18nName"),
    ]
    constructor() {
        this.SupportData_KeyMapping = SupportData.KeyMapping;
        this.SupportData_MouseMapping = SupportData.MouseMapping;
        // console.log('SupportData_KeyMapping',  this.SupportData_KeyMapping);
        // console.log('SupportData_MouseMapping',  this.SupportData_MouseMapping);
        this.RSEventArr[0] = (event) => {
            console.log('keydown_event', event)
            this.recordSimulationPressdown(event)
        }

        this.RSEventArr[1] = (event) => {
            console.log('keyup_event', event)
            this.recordSimulationPressUp(event)
        }
        this.RSEventArr[2] = (event) => {
            //console.log('mousedown_event',event);
            if (event.which == 2) {
                event.preventDefault()
            }
            if (event.target.id != 'IconRecord') {
                this.recordSimulationPressdown(event)
            }
        }
        this.RSEventArr[3] = (event) => {
            //console.log('mouseup_event',event);
            if(event.target.id!="IconRecord"){
            this.recordSimulationPressUp(event)
            }
        }
    }
    onRecord:any=false;
    RSEventArr: any = [];
    startTime = new Date().getTime();
    allRecordKeys={
    }
    recordSimulationPressdown(event) {
        if (this.onRecord != true) {
            return
        }
        //console.log('recordSimulationPressdown', event.type);
        var recordValue = '0'
        if (event.type == 'keydown') {
            recordValue = this.SupportData_KeyMapping.find((x) => x.keyCode == event.keyCode).keyCode
        } else if (event.type == 'mousedown') {
            recordValue = this.SupportData_MouseMapping.find((x) => x.keyCode == event.button).keyCode // 0 為 左鍵點擊,1 為 中鍵點擊,2 為 右鍵點擊,
        }
        console.log('recordSimulationPressdown', recordValue, event.type)
        //console.log("是否存在",this.getTarget(recordValue));
        if (this.checkTargetExist(recordValue)) {
            if(this.allRecordKeys[recordValue].isDown==false){
                this.allRecordKeys[recordValue].isDown=true;
                this.addMacroRadioOptions(recordValue,1);
            }
        } 
        else {
            this.addMacroRadioOptions(recordValue,1);
            console.log('addKeysEnter', this.allRecordKeys)
            this.allRecordKeys[recordValue] = {
             isDown: true,
            }    
        }
    }

    recordSimulationPressUp(event) {
        if (this.onRecord != true) {
            return
        }
        var recordValue = '0'
        if (event.type == 'keyup') {
            recordValue = this.SupportData_KeyMapping.find((x) => x.keyCode == event.keyCode).keyCode
        } else if (event.type == 'mouseup') {
            recordValue = this.SupportData_MouseMapping.find((x) => x.keyCode == event.button).keyCode // 0 為 左鍵點擊,1 為 中鍵點擊,2 為 右鍵點擊,
        }
        console.log('recordSimulationPressUp', recordValue, event.type)
        this.allRecordKeys[recordValue].isDown=false
        this.addMacroRadioOptions(recordValue,0);

    }

    checkTargetExist(FindkeyCode) {
        if (this.allRecordKeys[FindkeyCode] != undefined) {
            return true
        } else {
            return false
        }
    }
    importMacroClass(MacroObj) {

        for (let MClass2 = 0; MClass2 <MacroObj.macroClassItem.length; MClass2++) 
        {
            console.log('MacroObj:',MacroObj.macroClassItem,MClass2);
            var targetClass=  MacroObj.macroClassItem[MClass2];  
            this.createMacroClass(targetClass.className);                                    
            for (let Mindex = 0; Mindex <targetClass.MacroFiletItem.length; Mindex++) {
                //console.log('MacroFiletItem:', MacroObj[MClass2].MacroFiletItem[Mindex]);                            
                this.macroClassItem[MClass2].ReadFileCreateData(targetClass.MacroFiletItem[Mindex]);
            }           
        }



        // console.log("ImportMacroData", InputData);
        // var arr = Object.keys(this);
        // for (let index = 0; index < arr.length; index++) {
        //     //const element = InputData[index];
        //     for (let index = 0; index < arr.length; index++) {
        //         this[arr[index]] = InputData[arr[index]];
        //     }
        // }
    }
    /**
       * 0:Down
       * 1:Time
       * 2:Up
       * //keydownStatus:0 up, 1 down
    */
    addMacroRadioOptions(keyCode,keydownStatus){
        if(this.tempMacroContent.Data.length>=80){
            this.onRecord=false;
            return;
        }
        switch (this.radioOptions) {
            case 0:
                var diffTime = new Date().getTime() - this.startTime;
                this.startTime = new Date().getTime();
                this.tempMacroContent.createRow(diffTime, keydownStatus, keyCode);
                break;
            case 1:
                this.tempMacroContent.createRow(5, keydownStatus, keyCode);
                break;
            case 2:
                var customMs=document.getElementById("customMs") as HTMLInputElement;
                this.tempMacroContent.createRow(parseInt(customMs.value), keydownStatus, keyCode);

                break;
        }
    }

    addMacroEvent(){

        document.addEventListener('keydown',this.RSEventArr[0]);       
        document.addEventListener('keyup',this.RSEventArr[1]);  
        document.addEventListener('mousedown',this.RSEventArr[2]);  
        document.addEventListener('mouseup', this.RSEventArr[3]);  


    }

    removeMacroEvent(){

        document.removeEventListener('keydown', this.RSEventArr[0]);
        document.removeEventListener('keyup', this.RSEventArr[1]);
        document.removeEventListener('mousedown', this.RSEventArr[2]);
        document.removeEventListener('mouseup', this.RSEventArr[3]);
    }







    hasClass(){
            if (this.macroClassItem.length > 0) {
                return true;
            }
            else {
                return false;
            }
        
    }
    getAllMacroFileData() {
        var Tdata: any = [];
            for (let index = 0; index < this.macroClassItem.length; index++) {
                var reformattedArray = this.macroClassItem[index].MacroFiletItem.map(function (obj) {
                    console.log("getAllMacroFileData", obj);
                    // var rObj = {
                    //     IndexCode:obj.IndexCode,
                    //     name:obj.name,
                    // }
                    // return rObj;
                    Tdata.push({
                        IndexCode: obj.IndexCode,
                        name: obj.name,


                    });
                });
                console.log("getAllMacroFileData_reformattedArray", reformattedArray);
            }
            console.log("getAllMacroFileData_Tdata", Tdata);
        
        return Tdata;
    }
    get_deep_copy_target() {


        return $.extend(true, {}, this.getClass());
    }
    getClass() {
        // console.log("this.currentMacroClass",this.currentMacroClass,this.macroClassItem.length);
        return this.macroClassItem[this.currentMacroClass];
    }
    createClassMacroFile(name = "宏類別") {
        if(this.getClass().MacroFiletItem.length>50){
            return;
        }
        console.log("createClassMacroFile_log",name);
        var pass = true;
        var Num = 0;
        var Tname=name;
        while (pass) {
            if(Num>0){
              Tname =name + Num;
            }
            if (this.checkNameIsRepeat(Tname)) {
                Num += 1;
            }
            else {
                pass = false;
            }
        }
        this.getClass().MacroFiletItem.push(new MacroScriptContent(Tname));
        this.updeteEditName();
        this.tempMacroContent=this.getClass().getTarget();
    }
    createMacroClass(name = "宏類別") {
        if(this.macroClassItem.length>19){
            return;
        }
        console.log("createMacroClass_log=",name);
        this.macroClassItem.push(new MacroClass(this.createNotRepeatClassName(name)));

    }

    deleteMacroClass() {

        //if (this.macroClassItem.length - 1 > 0) {
            const Dindex = this.currentMacroClass;
            if (this.currentMacroClass - 1 >= 0) {
                this.currentMacroClass -= 1;
            }
            this.macroClassItem.splice(Dindex, 1);
        //}
    }

    createNotRepeatClassName(name) {
        var pass = true;
        var Num = 0;
        var Tname = name;
        while (pass) {
            if (Num > 0) {
                Tname = name + Num;
            }
            if (this.checkClassNameIsRepeat(Tname)) {
                Num += 1;
            }
            else {
                pass = false;
            }
        }
        return Tname;
    }


    createNotRepeatName(name) {
        var pass = true;
        var Num = 0;
        var Tname = name;
        while (pass) {
            if (Num > 0) {
                Tname = name + Num;
            }
            if (this.checkNameIsRepeat(Tname)) {
                Num += 1;
            }
            else {
                pass = false;
            }
        }
        return Tname;
    }


    checkClassNameIsRepeat(targetName) {
        for (let index = 0; index < this.macroClassItem.length; index++) {
            const element = this.macroClassItem[index];
            if (element.className == targetName) {
                return true;
            }

        }
        return false;
    }

    checkNameIsRepeat(targetName) {
        for (let index = 0; index < this.macroClassItem.length; index++) {
            const element = this.macroClassItem[index];
            for (let index2 = 0; index2 < element.MacroFiletItem.length; index2++) {
                if (targetName == element.MacroFiletItem[index2].name) {
                    return true;
                }
            }
        }
        return false;
    }





    cloneClassMacro() {
        if(this.getClass().MacroFiletItem.length>50){
            return;
        }
        if (this.macroClassItem.length>0) {
            if (this.getClass().hasFile()) {
                let clone = $.extend(true, {}, this.getClass().getTarget());
                var Tname = clone.name;
                var pass = true;
                var Num = 0;
                while (pass) {
                    if (this.checkNameIsRepeat(Tname + Num)) {
                        Num += 1;
                        //console.log("createMacroTname=");
                    }
                    else {
                        pass = false;
                        Tname = Tname + Num;
                    }
                }
                clone.name = Tname;
                this.getClass().MacroFiletItem.push(clone);
            }
        }
    }


    updeteEditClassName(NewName){
        var targetName = this.getClass().className;
        if (targetName != NewName) {
            var changeName = this.createNotRepeatClassName(NewName);
            console.log("MacroFileNameChange=" + changeName, targetName);
            this.getClass().className = changeName;
            this.onEditCSName=this.getClass().className;
        }  

    }
    setOnEditCSName(){
        this.onEditCSName=this.getClass().className;
    }




    updeteEditName(){

        if(this.getClass().hasFile())
        this.nowEditName=this.getClass().getTarget().name;

    }
    setDefault() {


    }
}
export class MacroClass {
    MacroFiletItem: any = [
    ]
    currentChooseMacro = 0;
    className: any = "未命名";
    constructor(InputclassName = "未命名") {

        this.className = InputclassName;
    }
    intital(frequency) {

        this.currentChooseMacro = 0;
    }

    ImportFileCreateData(InputData) {

        console.log("ImportFileCreateData", InputData);
        InputData = JSON.parse(JSON.stringify(InputData));
        var TData = new MacroScriptContent("沒有");
        var arr = Object.keys(TData);
        for (let index = 0; index < arr.length; index++) {
            TData[arr[index]] = InputData[arr[index]];
        }
        TData.IndexCode = new Date().getTime();
        this.MacroFiletItem.push(TData);
        console.log("ImportFileCreateData_PushData", TData, typeof InputData);

    }
    
    ReadFileCreateData(InputData) {

        console.log("ImportFileCreateData", InputData);
        InputData = JSON.parse(JSON.stringify(InputData));
        var TData = new MacroScriptContent("沒有");
        var arr = Object.keys(TData);
        for (let index = 0; index < arr.length; index++) {
            TData[arr[index]] = InputData[arr[index]];
        }
        this.MacroFiletItem.push(TData);
        console.log("ImportFileCreateData_PushData", TData, typeof InputData);
    }
    get_deep_copy_target() {
        if (this.hasFile()) {
        console.log("get_deep_copy_target進入");
        return $.extend(true, {}, this.getTarget());
        }
    }
    getTarget() {
        // console.log("this.currentMacroClass",this.currentMacroClass,this.macroClassItem.length);
        return this.MacroFiletItem[this.currentChooseMacro];
    }
    hasFile() {
        if (this.MacroFiletItem.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    createMacro(name = "宏檔案") {
        var pass = true;
        var Tname = name;
        while (pass) {
            if (this.checkNameIsRepeat(Tname)) {
                Tname = Tname + "_";
                console.log("createMacroTname=");

            }
            else {
                pass = false;
            }
        }
        console.log("createMacro創造檔案checkNamePass");
        this.MacroFiletItem.push(new MacroScriptContent(Tname));

    }

    checkNameIsRepeat(targetName) {
        for (let index2 = 0; index2 < this.MacroFiletItem.length; index2++) {
            if (this.MacroFiletItem[index2].name == targetName) {
                return true;
            }
        }
        return false;
    }
    deleteMacro() {
        if (this.hasFile()) {
            if (this.currentChooseMacro > 0) {
                var T = this.currentChooseMacro;
                this.currentChooseMacro -= 1;
                this.MacroFiletItem.splice(T, 1);
            }
            else if (this.currentChooseMacro == 0) {
                this.MacroFiletItem.splice(this.currentChooseMacro, 1);
            }
        }
    }
    
    setDefault() {


    }
}


export class MacroScriptContent {

    currentlySelectiedPosition = 0;
    name: any = "新檔案";
    IndexCode = new Date().getTime();
    Data: any = [
        // {
        //     type:2,
        //     text:"S",
        // }
    ]

    constructor(InputclassName = "未命名") {
        this.name = InputclassName;
    }
    ImportMacroData(InputData) {
        console.log("ImportMacroData", InputData);
        var arr = Object.keys(this);
        for (let index = 0; index < arr.length; index++) {
            //const element = InputData[index];
            for (let index = 0; index < arr.length; index++) {
                this[arr[index]] = InputData[arr[index]];
            }
        }
    }
    SaveMacroData(InputData) {

        const Input = $.extend(true, {}, InputData);
        console.log("SaveMacroData", Input);
        this.Data = Input;
    }

   

   setDataMs(ms){
    if (this.Data[this.currentlySelectiedPosition]) {
        this.Data[this.currentlySelectiedPosition].byDelay=ms;
    }
   }


    getTarget() {
        if (this.Data[this.currentlySelectiedPosition]) {
            return this.Data[this.currentlySelectiedPosition];
        }
    }

    move_up_row() {
        if (this.Data.length == 0) { return }
        if (this.currentlySelectiedPosition > 0) {
            let tempVar = $.extend(true, {}, this.getTarget());
            this.Data[this.currentlySelectiedPosition] = this.Data[this.currentlySelectiedPosition - 1];
            this.Data[this.currentlySelectiedPosition - 1] = tempVar;
            this.currentlySelectiedPosition -= 1;
        }
    }
    move_down_row() {
        if (this.Data.length == 0) { return }
        if (this.currentlySelectiedPosition != this.Data.length - 1) {
            let tempVar = $.extend(true, {}, this.getTarget());
            this.Data[this.currentlySelectiedPosition] = this.Data[this.currentlySelectiedPosition + 1];
            this.Data[this.currentlySelectiedPosition + 1] = tempVar;
            this.currentlySelectiedPosition += 1;
        }
    }
    createInsert(){
        //const T1 = this.Data.splice(this.currentlySelectiedPosition,1)
        
        
        //array1.concat(array2);
        var c1={
            byDelay: 5, 
            bKeyDown: 1,
            byKeyCode: 65,
        }
        var c2={
            byDelay: 5, 
            bKeyDown: 0,
            byKeyCode: 65,
        }
        // this.createRow(5,1,65);
        // this.createRow(5,0,65);
        this.Data.splice(this.currentlySelectiedPosition+1, 0, c1,c2);
     
  
    }

    //MacroIcon 012=Down=>Time=>Up
    createRow(byDelay = 0, type = 0, keyCodeInt = 0) {
        this.Data.push(
            {
                byDelay: byDelay,  //Delay Time
                bKeyDown: type, //0 if up, 1 if down
                byKeyCode: keyCodeInt,//key code
            });
        setTimeout(() => {
            var element = document.getElementById("MacroContentArea");
            let _1vw = Math.round(window.innerWidth / 100);
            let _1vh = Math.round(window.innerHeight / 100);
            if (element) {
                element.scrollBy(0, element.clientHeight);
            }
        }, 50);


    }
    deleteRow() {
        const Dindex = this.currentlySelectiedPosition;
        this.Data.splice(Dindex, 1);

    }
    clear() {
        this.Data = new Array;
    }
    setDefault() {
    }
}

