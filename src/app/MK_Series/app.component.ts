declare var System;
import { Component ,OnInit, Input, Output, EventEmitter,ElementRef,ChangeDetectorRef, ViewChild} from '@angular/core';
import {protocolService} from '../services/service/protocol.service';
import {TranslateService} from 'ng2-translate';
import {EmitService,ElectronEventService } from '../services/libs/electron/index';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import {ControlValueAccessor,FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Subscription } from "rxjs/Subscription";//Lag Edited
const {ipcRenderer} = System._nodeRequire('electron');
let iro = System._nodeRequire('./js/iro.js');
let evtVar = System._nodeRequire('./backend/others/EventVariable');
let funcVar = System._nodeRequire('./backend/others/FunctionVariable');
let env = System._nodeRequire('./backend/others/env');
let remote = System._nodeRequire('electron').remote;
let { dialog } = remote;
//let InterfaceJS = System._nodeRequire('./backend/protocol/Interface');
//let LouisTestDB = window['System']._nodeRequire('./backend/dbapi/LouisTestDB');
let tool = System._nodeRequire('./backend/others/tool')
import { CurrentColor,MacroScriptContent,MacroManager,Wave,APModeModule,KeyBoardManager,KeyBoardStyle,LedChainFramesManager,
    AssociateManager,EffectCenter,KeyShortcut,AlertDevice,EventManager,i18nManager,FirewareManager,ImgPathList,ColorOutput  
    ,count_boolean,CreateFakeArray,SharesFunction,ProgressBar,M_Light_CS,
} from './TSImportManager';
import { M_Built_ineffect } from './M_Built_ineffect';
import { G_Built_ineffect } from './G_Built_ineffect';

import { DeviceService } from '../services/device/DeviceService';
import { AppSettingService } from '../services/device/AppSettingService';
let electron_Instance = window['System']._nodeRequire('electron').remote; 
let _nodeRequire_fs = window['System']._nodeRequire('fs'); 

@Component({
    selector: 'app-selector',
    templateUrl : './app.component.html',
    // template: '<h1>我的第一个 Angular 应用</h1>',
    styleUrls: ['./app.component.css',
    './css/Circle_Bar_Style.css',
    './css/KeyBoardStyle.css',
    './css/Share.css',
    './css/61M.css'],
    providers: [protocolService]
})
export class AppComponent implements OnInit{

    // @ViewChild(sync_AppModePageComponent) child_sync:sync_AppModePageComponent;
    system={
        isMac:true,
    }
    //{  isMouseover: 0, translate: 'SelectDevice' },
    setPageData=[
        {  isMouseover: 0, translate: 'KEYBOARDSETTINGS',enable:true },
        {  isMouseover: 0, translate: 'LIGHTINGSETTING',enable:true},
        // {  isMouseover: 0, translate: 'Sync Device',enable:false },
        {  isMouseover: 0, translate: 'Built-ineffects',enable:true },
        // {  isMouseover: 0, translate: 'Custom Effect',enable:false },
        {  isMouseover: 0, translate: 'MACROSETTINGS',enable:true },
        {  isMouseover: 0, translate: 'RELATEDPROGRAM',enable:true },
    ]
    setPageDataSelected={ isMouseover: 0, translate: 'KEYBOARDSETTINGS',enable:true};
    Built_ineffect=new M_Built_ineffect();
    showSetPageData=false;
    RGBMode;
    KeyBoardManager = new KeyBoardManager(1);
    M_Light_APMode=new APModeModule(1);
    LCFM=new LedChainFramesManager(1);
    M_Light_BuiltIn=new M_Light_CS(1)
    MacroManager=new MacroManager();
    KeyBoardStyle=new KeyBoardStyle();
    DeviceService=new DeviceService();
    LedColor=new CurrentColor("LedColor");
    customLedColor=new CurrentColor("customLedColor");
    Built_inColor=new CurrentColor("Built_inColor");
    AppSettingService=new AppSettingService();
    AssociateManager=new AssociateManager();
    EffectCenter=new EffectCenter();
    KeyShortcut=new KeyShortcut();
    AlertDevice=new AlertDevice();
    EM=new EventManager();
    FWManager=new FirewareManager();
    ImgPath=ImgPathList.getInstance();
    i18nManager=i18nManager.getInstance();
    SharesFunction=SharesFunction.getInstance();
    //-----------------Class專用---------------------
    KBSPBUI: any = [false, false, false, false,false, false, false, false];
    switchEffectUI:boolean=false;
    conslogtestText="";
    subscription: Subscription;//Lag Edited
    dialogAppSettings: MdDialogRef<any>;
    ShowPrompt:any=false;
    pageIconSet: any = [true, true, true, true];
    recordCustomLedindex: any =0;
    on_AdvancedFive: Boolean=false;
    ShowAdvancedList: Boolean =false;
    alertMessageBool: Boolean=false;
    onSystemSetting: Boolean=false;
    CurrentPageName="SelectDevice";
    KeyBoardSetPageBtn:any=1;
    onEqipBtn: Boolean =false;
    onAppImportExport: Boolean =false;
    P_S_OSetting: Boolean =false;
    onLoading: Boolean =false;
    hasMultipleDevice: Boolean =false;
    macroContentInEdit: Boolean =false;
    BatteryStep: any =[0,0,0,0];
    myColor: any ={ 
        hex: 10774118,
        hexString: "#ffffff",
        rgb: {
            red:100,
            green:100,
            blue:100,
        },
        hsl: {
            hue:100,
            saturation:100,
            lightness:100,
        },


    }
    TColor : any={ 
        hex: 10774118,
        hexString: "#0000FF",
        rgb: {
            red:100,
            green:100,
            blue:100,
        },
        hsl: {
            hue:100,
            saturation:100,
            lightness:100,
        },


    }
    TTTrgb= {
        red:255,
        green:255,
        blue:255,
    }
    dbService = electron_Instance.getGlobal('AppProtocol').deviceService.nedbObj

    modeNameTable:any=['Static','Cycle','Breathing','Rainbow'];
    static instance;
    static getInstance() {
        if (this.instance) {
            console.log('%c get_AppComponent_Instance','background: black; color: white',this);
            return this.instance;
        } 
        else{
            console.log('%c get_AppComponent_Instance_err','background: red; color: white');
        }
    }

    constructor(private protocol: protocolService,
        private translate: TranslateService, 
        private emitService: EmitService, 
        private dialog: MdDialog, 
        private router: Router,
        private elementRef:ElementRef,
        private changeDetectorRef: ChangeDetectorRef){
        //開啟App時通知Electron 將系統icon load起來
        let langObj = [];langObj.push('Open MK Series');langObj.push('Quit MK Series'); 
        ipcRenderer.send("Open", langObj);      
        ///////////////////////////////////////////
        ElectronEventService.on('icpEvent').subscribe((icpData:any) => {
            var icpObj = JSON.parse(icpData.detail);
            //console.log("icpObj_data",icpObj);

            //----------------SendSyncLED--------------------
            if (icpObj.Func === evtVar.EventTypes.SendSyncLED) 
            {
                //console.log("SendSyncLED",icpObj.Param.Data,this.M_Light_APMode.BSModule_L.EventCanBoxSelect);
                if (this.CurrentPageName == "LIGHTINGSETTING"&&this.M_Light_APMode.BSModule_L.EventCanBoxSelect==false) {
                    for (let index = 0; index < this.M_Light_APMode.AllBlockColor.length; index++) {
                        this.M_Light_APMode.AllBlockColor[index].color = icpObj.Param.Data[index];
                    }
                }
            }
            //----------------SendCustomLED--------------------
            else if (icpObj.Func === evtVar.EventTypes.SendCustomLED) 
            {   
                if (this.CurrentPageName == "Custom Effect" && this.LCFM.performingCustomLED) {
                    //console.log("SendCustomLED",icpObj.Param.Data);
                    for (let index = 0; index < this.LCFM.AllBlockColor.length; index++) {
                        this.LCFM.AllBlockColor[index].color = icpObj.Param.Data[index];
                    }
                }
            }
            //----------------SwitchProfile--------------------
            else if (icpObj.Func === evtVar.EventTypes.SwitchProfile) {
                let Profile = icpObj.Param.Profile;

                if (Profile != undefined) {
                    if (this.DeviceService.currentDevice['SN']==icpObj.Param.SN) {
                        console.log('currentChooseKeyBoard Profile:', Profile);
                        this.KeyBoardManager.currentChooseKeyBoard = Profile;                                                
                    }
                }
            }
            //----------------SwitchDevice--------------------
            else if (icpObj.Func === evtVar.EventTypes.RefreshDevice) 
            {
                console.log('icpObj.Param:',icpObj.Param);
                this.DeviceService.getDevice().then(() => {
    
                }); 
            }
            else if (icpObj.Func === 'SendEP2KeyNum') {
                console.log('SendEP2KeyNum',icpObj);
                this.setPassiveEffects(icpObj.Param.Key);
            }
            //----------------SendBatteryStats--------------------
            else if (icpObj.Func === evtVar.EventTypes.SendBatteryStats) 
            {
                console.log('BatteryStats:',icpObj.Param);
                var target=icpObj.Param; 
                //this.BatteryStep=icpObj.Param; 
                switch (target.SN) {
                    case '0x1EA70x9005':
                        this.BatteryStep[0]=target.Battery;
                        break;                                              
                }
            }
            //----------------SendNotification--------------------
            else if (icpObj.Func === evtVar.EventTypes.SendFWVersion) 
            {
                var DeviceFWdataArr=JSON.parse(JSON.stringify(icpObj.Param));  
                console.log('SendFWVersion:',DeviceFWdataArr);
                this.FWManager.InputFwServerData(DeviceFWdataArr);
                this.changeDetectorRef.detectChanges();
            }
            //----------------SendFWUPDATE Stats--------------------
            else if (icpObj.Func === evtVar.EventTypes.SendFWUPDATE) {
                var strFWUPDATEStats = icpObj.Param.Text;
                var strFWUPDATEProcess = icpObj.Param.Process;
                var elem = document.getElementById("myBar");
                //var width = 10;
                //var id = setInterval(frame, 10);
                    if (strFWUPDATEProcess >= 100) {
                        this.FWManager.FWUpdating=false;
                        //clearInterval(strFWUPDATEProcess);
                    } else {
                        //strFWUPDATEProcess++;
                        //elem.style.width = strFWUPDATEProcess + '%';
                        this.ProgressBarT.setRoundProgress_js(strFWUPDATEProcess);
                        //document.getElementById("label").innerHTML = strFWUPDATEProcess * 1 + '%';
                    }
                
                console.log('FWUPDATEStats:', strFWUPDATEStats);

            }
            
            
        });
        AppComponent.instance=this;
        //console.log('zzzzzzzwerfsdvswerwevd',window['zzzzzzzwerfsdvswerwevd']);
        console.log('this.dbService', this.dbService);
        let DataContent = {
            Type: funcVar.FuncType.System,
            Func: funcVar.FuncName.InitializeUIDone,//correspond electron.js in line 256 name register event 
            Param: ""
        }
        this.protocol.RunSetFunction(DataContent).then((data) => {//=>to AppProtocol=>electron.js
        });

    }

    switchsetPageData(item){

        if(item.enable){
            this.setPageIndex(item.translate);
            this.showSetPageData=false;
        }
        //this.setPageDataSelected=item;
    }
    colorChange(result:ColorOutput){
        
        console.log("colorChange", result);
        console.log("myColor", this.myColor);
        //console.log("myColor2", this.myColor);
      

    }
    colorTChange(){   
            
        console.log("colorTChange_myColor", this.myColor);
        //console.log("colorTChange");
        //this.myColor.hexString="#00FF00";
        var TColor2 ={ 
            rgb:this.myColor.rgb
        }
        
        this.myColor=TColor2;
        
    }
    ReturnAdvancedBtnImage(Type = "") {
        if (this.CurrentPageName == "Custom Effect" && !this.onEqipBtn){
            return "url('./image/Share/On/AdvanceEdit.png')"
        }

        switch (Type) {
            case "mouseenter":
                return "url('./image/Share/mouseover/AdvanceEdit.png')"
            case "mousedown":
                    return "url('./image/Share/On/AdvanceEdit.png')"
                // case "mouseup":
  
                break;
            case "mouseleave":
                return "url('./image/Share/Off/AdvanceEdit.png')"
            case "":
                return "url('./image/Share/Off/AdvanceEdit.png')"


        }

    }
    ReturnBackBtnImage(Type = "") {
        //console.log("ReturnBackBtnImage", Type);
        //console.log("ReturnBackBtnImage", Type);
        if (this.i18nManager.recovery[0])
            return this.ImgPath.SystemDefault[1];
        switch (Type) {
            case "mouseenter":
                return this.ImgPath.SystemDefault[2];
                // case "mousedown":
            case "mouseup":
                return this.ImgPath.SystemDefault[0];
            case "mouseleave":
                return this.ImgPath.SystemDefault[0];
            case "":
               return this.ImgPath.SystemDefault[0];
        }

    }

    ReturnEqipBtnImage(Type = "") {
        if (this.onEqipBtn) {
            return "url('./image/Share/On/AddEqip.png')"
        }
        //console.log("ReturnEqipBtnImage", Type);
        switch (Type) {
            case "mouseenter":
                return "url('./image/Share/mouseover/AddEqip.png')"
            case "mousedown":
            case "mouseup":
                this.onEqipBtn = true;
                break;
            case "mouseleave":
                return "url('./image/Share/Off/AddEqip.png')"
            case "":
                return "url('./image/Share/Off/AddEqip.png')"

        }

    }
    customConsolelog(name="",data:any){
        console.log(name,data);
    }
    checkAssignDeviceisSN(PIDVID){
        if(this.DeviceService.currentDevice['SN']==PIDVID){
            return true;
        }
        else{
            return false;
        }
    }
    BuiltInTempData;                     
    enterAssignDevicePage(checkName) {
        this.onLoading=true;

        if(this.DeviceService.checkDeviceExists(checkName)) {
        this.KeyBoardStyle.nowTargetKey =checkName;
        if(this.KeyBoardStyle.getTarget()===undefined){
            console.log('%c KeyBoardStyle.undefined', 'color:rgb(255,75,255,1)', checkName);
            return;
        }
        var T_length = this.KeyBoardStyle.getTarget().keyMapping.length;
        this.KeyBoardManager = new KeyBoardManager(T_length);
        this.RGBMode=new Wave(T_length);
        this.M_Light_APMode=new APModeModule(T_length);
        this.LCFM=new LedChainFramesManager(T_length);
        this.M_Light_BuiltIn=new M_Light_CS(T_length);
        this.M_Light_BuiltIn.lightData= this.Built_ineffect.getDefault();
        this.KeyBoardManager.setAllProfileFieldData('lightData',this.Built_ineffect.getDefault())
        //this.KeyBoardManager.getTarget().lightData=this.Built_ineffect.getDefault();
        var temp_data = this.KeyBoardStyle.getTarget();
        console.log('%c KeyBoardStyle.setAllProfileFieldData', 'color:rgb(255,75,255,1)', this.KeyBoardManager);
        this.M_Light_BuiltIn.qigong_Step1_Range = temp_data.qigong_Step1_Range;
        this.M_Light_BuiltIn.qigong_Step2_Range = temp_data.qigong_Step2_Range;
        this.M_Light_BuiltIn.centerBlockPoint = temp_data.centerBlockPoint;
        this.M_Light_BuiltIn.imageMaxWidth = temp_data.imageMaxWidth;
        this.M_Light_BuiltIn.imageMaxHeight = temp_data.imageMaxHeight;
        this.BoxSelectFnArrP7[0] = (e: MouseEvent) => {
            console.log('%c LCFM_Fn_mousedown','background: black; color: white');

            if (this.LCFM.performingCustomLED) {
                return;
            }
            if (this.LCFM.check_length("F") == false && this.LCFM.check_length("C") == false) {
                return;
            }
            //if (e.clientX > this.SharesFunction.get_Windows_Vw_Vh()[0] * 23 && e.clientY < this.SharesFunction.get_Windows_Vw_Vh()[1] * 63) {
                this.LCFM.BSModule_C.mousedown(e);
        }
        this.BoxSelectFnArrP7[1] = (e: MouseEvent) => {
            console.log('%c LCFM_Fn_mousemove','background: black; color: white');
            this.LCFM.BSModule_C.mousemove(e);
        }
        this.BoxSelectFnArrP7[2] = (e: MouseEvent) => {    
            console.log('%c LCFM_Fn_mouseup','background: black; color: white');

                if(this.LCFM.BSModule_C.mouseup(e)=="Finish"){
                this.LCFM.checkisAllTrueChangeArray();
                } 
                setTimeout(() => {
                    this.setDBDataToServer('CustomData');   
                }, 1000)
        };

        this.APModeBoxSelectFn[0] = (e: MouseEvent) => {
            console.log('%c APModeBoxSelectFn_mousedown','background: black; color: white');
            this.M_Light_APMode.BSModule_L.mousedown(e);

            document.addEventListener("mousemove", this.APModeBoxSelectFn[1]);

        }
        this.APModeBoxSelectFn[1] = (e: MouseEvent) => {
            console.log('%c APModeBoxSelectFn_mousemove','background: black; color: white');
            this.M_Light_APMode.BSModule_L.mousemove(e);
        }
        this.APModeBoxSelectFn[2] = (e: MouseEvent) => {
            console.log('%c APModeBoxSelectFn_mouseup','background: black; color: white');

            if (this.M_Light_APMode.BSModule_L.mouseup(e) == "Finish") {
                this.M_Light_APMode.setModeFrameRange();
                console.log("BoxSelectionArea.mouseup", this.M_Light_APMode.BSModule_L);
                this.setAppModeToServer('setModeFrameRange');
            }
            document.removeEventListener("mousemove", this.APModeBoxSelectFn[1]);

        };
        this.ReadDBDataFromServer();
        
        }
        

            

        


    }
    boxSelectionStart() {
        this.M_Light_APMode.BSModule_L.EventCanBoxSelect = !this.M_Light_APMode.BSModule_L.EventCanBoxSelect;
        this.EffectCenter.selectEffectCenter = false;
        if (this.M_Light_APMode.BSModule_L.EventCanBoxSelect) {
            this.M_Light_APMode.updateframe_selection_range();
        }

    }
    boxEffectStart() {
        this.changeDetectorRef.detectChanges();
        this.EffectCenter.selectEffectCenter=!this.EffectCenter.selectEffectCenter;
        this.M_Light_APMode.BSModule_L.EventCanBoxSelect=false;
    }

    // public static on(name: string): Observable<any> {
    //     return Observable.fromEvent(window, name);
    // }
    showBuilt_inEffectsLight($event,i){
        this.Built_ineffect.setModeIndex($event,i);
        this.Built_inColor.currentRecordIndex=0;        
        this.refreshM_Light_BuiltIn();
    }
    refreshM_Light_BuiltIn() {
        console.log('%c refreshM_Light_BuiltIn', 'color:rgb(255,75,255,1)', this.Built_ineffect.getTarget());
        //console.log('%c preDefineColor', 'color:rgb(255,75,255,1)',  this.Built_inColor.preDefineColor);
        var target = this.Built_ineffect.getTarget();
        for (let index = 0; index < target.colors.length; index++) {
            target.colors[index] = JSON.parse(JSON.stringify(this.Built_inColor.preDefineColor[index]));
        }
        this.Built_ineffect.checkNullThenUpdateValue();
        var T_CS=this.M_Light_BuiltIn;
        T_CS.lightData.speed = target.speed * 10;
        T_CS.currentBlockIndex = 37;
        var RGBAcolors = [];
        for (let index = 0; index < target.colors.length; index++) {
            var element = target.colors[index];
            //var zz=this.Built_inColor.hexToRgb(element);
            RGBAcolors.push(this.Built_inColor.hexToRgbA(element));
        }
        if (target.PointEffectName == "Game_Mode") {
            this.PerKeyAreaCick('PerKey_WASD');
            return;
        }
        console.log('%c setMultiColorMode', 'color:rgb(255,77,255)', RGBAcolors);
        var inputColor = JSON.parse(JSON.stringify(RGBAcolors));
        if (inputColor == undefined) {
            //this.lightData;
            console.log('%c setMultiColorMode_undefined', 'color:rgb(255,77,255)', RGBAcolors);
            return;
        }
        T_CS.onSetModeRefresh();
        // switch (target.PointEffectName) {
        //     case 'Static':
        //         T_CS.mode_NormallyOn(inputColor);
        //         break;
        //     case 'AcidMode':
        //         T_CS.mode_AcidMode();
        //         break;
        //     case 'Breath':
        //         T_CS.mode_CycleBreath(inputColor, target.Multicolor);
        //         break;
        //     case 'Kamehemeha':
        //         T_CS.mode_Kamehemeha(inputColor, target.Multicolor)
        //         break;
        //     case 'Starlight':
        //         T_CS.mode_Starlight(inputColor);
        //         break;
        //     case 'WaveSync':
        //         T_CS.mode_WaveSync(inputColor, true, 20);
        //         break;
        //     case 'Rain':
        //         T_CS.mode_Rain(inputColor, false);
        //         break;



        //     default:
        //         break;

        // }
        switch (target.PointEffectName) {
            case 'GloriousMode':
                T_CS.mode_ConicRipple(inputColor, true);
                break;
            case 'SpiralingWave':
                T_CS.mode_Spiral(inputColor, target.Multicolor,0);
                break;
            case 'AcidMode':
                T_CS.mode_AcidMode(inputColor);
                break;
            case 'Breathing':
                if(target.Multicolor){
                    T_CS.mode_BreathingMulticolor(inputColor, true);    
                }
                else
                {
                    T_CS.mode_CycleBreath(inputColor,false);
                }
                    break;
                break;
            case 'NormallyOn':
                if(target.Multicolor){
                    T_CS.mode_NormallyOnMulticolor(inputColor);    
                }
                else
                {
                    T_CS.mode_NormallyOn(inputColor);    
                }
                break;
            case 'Matrix2':
                T_CS.mode_Matrix2(inputColor,target.Multicolor);
                break;
            case 'Matrix3':
                T_CS.mode_Matrix3(inputColor,target.Multicolor);
                break;
            case 'Rainbow':
                T_CS.mode_Rainbow();
                break;
            case 'HeartbeatSensor':
                if(target.Multicolor){
                    T_CS.mode_HeartbeatSensor([[255,0,0,1],[0,255,0,1],[0,0,255,1]]);    
                }
                else
                {
                    T_CS.mode_HeartbeatSensor(inputColor);    
                }
                break;
            case 'DigitTimes':
                if(target.Multicolor){
                    T_CS.mode_DigitTimes([[255,0,0,1],[0,255,0,1],[0,0,255,1]]);    
                }
                else
                {
                    T_CS.mode_DigitTimes(inputColor);    
                }
                break;
            case 'Kamehemeha':
                T_CS.mode_Kamehemeha(inputColor,target.Multicolor)
                break;
            case 'Pingpong':
                T_CS.mode_Pingpong(inputColor,target.Multicolor);
                break;
            case 'Surmount':
                T_CS.mode_Surmount(inputColor,target.Multicolor,T_CS.centerBlockPoint);
                break;
            case 'LEDOFF':
                T_CS.mode_LEDOFF();
                break;
            case 'Starlight':
                T_CS.mode_Starlight(inputColor);
                break;    
            case 'Snowing':
                T_CS.mode_Snowing(inputColor,target.Multicolor);
                break;   
            case 'WaveSync':
                T_CS.mode_WaveSync(inputColor, true, 20);
                break;
            case 'Wave1':
                if(target.Multicolor){
                    T_CS.mode_WaveSync(inputColor, true, 80,150);
                }
                else
                {
                    T_CS.mode_WaveSync(inputColor, false, 100,250);
                }
                break;  
            case 'Wave2':
                if(target.Multicolor){
                    T_CS.mode_WaveSync(inputColor, true, 80,150);
                }
                else
                {
                    T_CS.mode_WaveSync(inputColor, false, 300,100);
                }
                break;      
                 
            default:
                break;
        }
        this.setDBDataToServer('Built-ineffects');
    }
    setPassiveEffects(BlockIndex){
        var target=this.Built_ineffect.getTarget();
        if(target.colors.length<1){
            return;
        }
        if(target.currentColorsIndex+1<target.colors.length){
            target.currentColorsIndex+=1;
        }
        else{
            target.currentColorsIndex=0;
        }
        var RGBAcolors=[];
        for (let index = 0; index < target.colors.length; index++) {
            var element = target.colors[index];
            //var zz=this.Built_inColor.hexToRgb(element);
            RGBAcolors.push(this.Built_inColor.hexToRgbA(element));
        }
        var T_color=RGBAcolors[target.currentColorsIndex];
        this.M_Light_BuiltIn.lightData.speed=target.speed*10;
            var inputColor=[JSON.parse(JSON.stringify(T_color))];
            if(inputColor==undefined){
                console.log('%c setPassiveEffects_undefined','color:rgb(255,77,255)', target);
                return;
            }
            var index=this.M_Light_BuiltIn.currentBlockIndex=BlockIndex;
            console.log('%c setPassiveEffects','color:rgb(255,77,255)', index);
            switch (target.PointEffectName) {
                case 'RippleGraff'://彩色擴散
                this.M_Light_BuiltIn.mode_RippleGraff(inputColor,target.Multicolor,index);
                    break;
                case 'PassWithoutTrace'://單點
                this.M_Light_BuiltIn.mode_PassWithoutTrace(inputColor,index);
                    break;
                case 'FastRunWithoutTrace'://一排
                this.M_Light_BuiltIn.mode_FastRunWithoutTrace(inputColor,false,index);
                    break;
                case 'Cross'://十字
                this.M_Light_BuiltIn.mode_Cross(inputColor,false,index);
                    break;
                case 'Blossom'://綻放
                this.M_Light_BuiltIn.mode_Blossom(inputColor,false,index);
                    break;    
                default:
                    break;
            }
        
    }



    PerKeyArea="";
    PerKeyAreaCick(GroupName) {
        clearInterval(this.M_Light_BuiltIn.repeater);
        this.PerKeyArea = GroupName;
        var setArr=[];
        switch (this.PerKeyArea) {
            case 'PerKey_WASD':
                setArr=["KeyW","KeyA","KeyS","KeyD"];
                this.M_Light_BuiltIn.settingPerkeyName='WASD';
                break;
            case 'PerKey_ALL':
                this.M_Light_BuiltIn.settingPerkeyName='ALL';
                break;  
        }
        
        for (let index = 0; index < setArr.length; index++) {
            var index2=this.KeyBoardStyle.findKeyMappingIndex(setArr[index])
            setArr[index]=index2;
        }
        var flag=this.PerKeyArea;
        var clearStatus=false;
        console.log('%c PerKeyAreaCick_setArr','background: blue; color: red',setArr,this.PerKeyArea);
        this.M_Light_BuiltIn.setAllBlockColor([0, 0, 0, 1]);
        var obj={
            groupArray:setArr,
            isAll:flag=="PerKey_ALL",
            assignColor:[],
            clearStatus:clearStatus,
            colorPickerValue: this.Built_inColor.hexToRgbA(this.Built_ineffect.getTarget().colors[0]),
            breathing:false
        }
        this.M_Light_BuiltIn.setGroupArrayColor(obj);
        
    }

    changeWinSystemTaskBar(InputData) {
        const content ={
            func:"ScreenSize",
            width:1440,
            height:900,
        }
        let DataContent = {
            Type: funcVar.FuncType.System,
            Func: funcVar.FuncName.ChangeWindowSize,//correspond electron.js in line 256 name register event 
            Param: InputData
        }
        var objlog={
            "dotype":InputData,
            "obj2":DataContent,
        }
        console.log('changeWinSystemTaskBar:', objlog);

        this.protocol.RunSetFunction(DataContent).then((data) => {//=>to AppProtocol=>electron.js

            env.log('Hdpage', 'quit', 'finished');
        });
    }
    quitApp() {
        const content ={
            func:"ScreenSize",
            width:1440,
            height:900,
        }
        let DataContent = {
            Type: funcVar.FuncType.System,
            Func: "QuitApp",//correspond electron.js in line 256 name register event 
            Param: ""
        }
        console.log('changeWinSystemTaskBar:', DataContent);

        this.protocol.RunSetFunction(DataContent).then((data) => {//=>to AppProtocol=>electron.js

        });
    }
    
    macro_assign_click(index){
        this.MacroManager.getClass().currentChooseMacro=index;
    }
    onRecordClick(){
        if(this.MacroManager.onRecord){
        this.MacroManager.onRecord=false;
        this.setDBDataToServer('MacroManager');
        }
        else
        {
            this.MacroManager.tempMacroContent.clear();
            this.MacroManager.onRecord=true;
            this.MacroManager.startTime =new Date().getTime();
        }
    }

    LedColorhueChange(){
        this.updateColorBlock(); //by hueChange 
    }
    customColorParameterChange(event,type="",index){
        console.log("customColorParameterChange進入", event);
                this.LCFM.getClass().checkColorParameter(1,255);     
                this.setDBDataToServer('CustomData');
    }
    colorPickerFnArrP7:any=[];
    page7_custom_square_color_picker() {

        var parentDiv = document.getElementById('customLedColorPickingArea');
        this.colorPickerFnArrP7[0]=(oEvent:MouseEvent) => {
            // if(this.M_Light_APMode.getTarget().name=="Fire"){
            //     return;
            // }
            this.customLedColor.mousedown(oEvent);
            this.updateColorBlockP7();  //by colorPicker 
            this.colorPickerFnArrP7[1]=(oEvent:MouseEvent) => {
                this.customLedColor.mousemove(oEvent);      
                this.updateColorBlockP7(); //by colorPicker          
               //this.showCustomTestDataWindows(this.LedColor);
            };
            document.addEventListener("mousemove", this.colorPickerFnArrP7[1]);
            document.addEventListener("mouseup", ()=>{
                document.removeEventListener("mousemove", this.colorPickerFnArrP7[1]);
            });
        };
        parentDiv.addEventListener("mousedown", this.colorPickerFnArrP7[0]);
  
       

    }

    updateColorBlockP7(){
        if(this.LCFM.check_length("C")==false){
            return;
         }
        this.LCFM.getClass().setCurrentColor(this.customLedColor.getPreDefineColor());
        this.LCFM.color_Auto_Switch();
        // this.LCFM.update_color_range();
        this.setDBDataToServer('CustomData');
    }

    customColorHueChange(event){
        console.log("customColorHueChange進入", event);
        this.customLedColor.HSL_RGB_HexSet();
        this.customLedColor.setGradientBGcolor();    
        this.updateColorBlockP7(); //by hueChange
        this.setDBDataToServer('CustomData');
    }


    customLedFrameChange(event){       
        this.LCFM.getClass().checkFrameParameter(1,655);    
        this.setDBDataToServer('CustomData');
    }



    ngOnInit() {
        //this.ReadDBDataFromServer();

        //this.resetAllModelDefault()
    }
    default_LightData(defaultcolor = [255,0,0,0]) {
        var T = {
            speed:50,
            brightness:50,
            colorHex:'#0000',
            colorPickerValue:defaultcolor,
            breathing:false,
            brightness_Enable:false,
            rate_Enable :false,
            color_Enable:false,
            isRainbow:false,
        }
        return T;
    }
    ProgressBarT =new ProgressBar();
    ngAfterViewInit(){
        //this.setPageIndex('SelectDevice');
        //this.setPageIndex('KEYBOARDSETTINGS');
        this.i18nClickExcute();
        this.MacroManager.createMacroClass(this.i18nManager.getTarget('MACROTYPE'));
        this.MacroManager.createClassMacroFile(this.i18nManager.getTarget('MACRO'));
        document.addEventListener('click', (e)=>{
           //console.log('%c document_e.target','color:rgb(255,77,255)',  e.target);
            if (e.target.dataset.identity==undefined) {
                this.showSetPageData = false;
                this.CRUDCheck = false;
            }
        });
        // document.addEventListener('keyup', (event) => {
        //     console.log("KeyShortcut_event.keyCode", event.keyCode);
        //     if (event.keyCode == 107) {//+
        //         this.myColor={    
        //             hex: 10774118,
        //             hexString: "#A46666",
        //             rgb: {
        //                 red:100,
        //                 green:100,
        //                 blue:100,
        //             },
        //             hsl: {
        //                 hue:100,
        //                 saturation:100,
        //                 lightness:100,
        //             },
        
        //         }
        //     }
        //     if (event.keyCode == 109) {//-
        //     }
        //     if (event.keyCode == 84) {//T
    
        //     }
        //     if (event.keyCode == 85) {//U
        //     }
        //     console.log("KeyShortcut_event.keyCode", event.keyCode);
    
        // });
        //this.ProgressBarT.addProgressBarEvent();
        var mainapp= document.getElementById("main-app");
        mainapp.addEventListener("mousedown", (e:MouseEvent)=> {
                    // console.log("mainapp_mousedown=event.targetid=log: ",e); 
                    // console.dir("mainapp_mousedown=event.targetiddir: ",e);
                    // if(e.target["className"]!="KeyAssignUIStyle"&&e.target.id!="KeyAssignPrompt"
                    // &&e.target["className"]!="KeyRightSetStyle"&& e.target["className"]!="InputBtnStyle"){
                    // }          
                     if(e.target.id=="MainFrame"){
                         this.ShowPrompt=false;
                    }
        });
    }
    //FB IG Mail 论坛 官网 推特 微信 微博
    HyperLinkGO(index){
        console.log("Enter_customHyper_Link",ipcRenderer.cp,ipcRenderer,ipcRenderer.remote);
        switch (index) {
            case 0:
                ipcRenderer.send("customHyper_Link","https://www.facebook.com/");
                break;
            case 1:
                ipcRenderer.send("customHyper_Link","https://www.instagram.com/");
                break;
            case 2:
                ipcRenderer.send("customHyper_Link","mailto:market@email.com"); 
                break;
            case 3:
                ipcRenderer.send("customHyper_Link","https://www.google.com");
                break;
            case 4:
                ipcRenderer.send("customHyper_Link","https://google.com");
                break;
            case 5:
                ipcRenderer.send("customHyper_Link","https://twitter.com");
                break; 
            case 6:
                ipcRenderer.send("customHyper_Link","https://wx.qq.com/");
                break;
            case 7:
                ipcRenderer.send("customHyper_Link","https://www.weibo.com/");
                break;

        }
    }
    
    LaunchFWUpdate(){
        this.FWManager.FWUpdating=true;
        console.log('LaunchFWUpdate',this.FWManager.getTarget().SN);
        
        let Obj = {
            Type: funcVar.FuncType.System,
            Func: funcVar.FuncName.LaunchFWUpdate,
            Param: {
                SN:this.FWManager.getTarget().SN,
            },
            
        }
        
        //console.log('FWUpdate Function:',Obj.Func);
        this.protocol.RunSetFunction(Obj).then((data) => {
            
        })
    }
    i18nClickExcute(){ 
        this.i18nManager.update();
        this.onSystemSetting=false;
        if(this.i18nManager.recovery[1]){
            this.i18nManager.recovery[0]=false;
            this.i18nManager.recovery[1]=false;
            this.KeyBoardManager.clearAllKeyboardData(this.i18nManager.getTarget('HARDWARECONFIGURATION'));
        } 
        this.system.isMac=env.isMac;
    }

    i18nSave(){
        this.i18nClickExcute();
        this.dbService.saveAppSetting(this.i18nManager).then((data: any) => {
            console.log('ReadDBDataFromServer_dbService.saveAppSetting()', data);           
        });

    }
    switch_current_script(i){
        
        this.MacroManager.getClass().currentChooseMacro=i;
        console.log("switch_current_script進入", this.MacroManager.getClass());
        this.MacroManager.tempMacroContent= this.MacroManager.getClass().getTarget();
        this.MacroManager.nowEditName=this.MacroManager.tempMacroContent.name;
    }
    
    prohibit_btn_KB61Prohibit(name){
     this.KeyBoardManager.getTarget().set_prohibit(name);
     this.setDBDataToServer('KeyAssign');
    }
    NullThenUpdateValue(passbyreference,name,min,max){
        var target = passbyreference[name]
        //passbyreference.find((x) => x[name] == name)
        if(target===null || target<min){
            passbyreference[name]=min;
        }
        if(target>max){
            target=max;
        }

    }
    ReadAllDBPass=[]
    ReadDBDataFromServer() {
        var waitingSynchronization=8;
        this.ReadAllDBPass=[];
        this.dbService.getDevice(this.DeviceService.currentDevice['SN']).then((data: any) => {
            console.log('ReadDBDataFromServer_dbService.getDevice()', data);
            if (data.profile.KeyBoardArray!= undefined) {
                data= JSON.parse(JSON.stringify(data))
                var keyBoardManagerObj = data.profile;
                this.KeyBoardManager.radioOptions = data.radioOptions;
                this.KeyBoardManager.radioOptionsFrequency = data.radioOptionsFrequency;
                this.KeyBoardManager.maxKayCapNumber = data.maxKayCapNumber;
                let AllDB_KeyAssignData = keyBoardManagerObj.KeyBoardArray;
                this.KeyBoardManager.currentChooseKeyBoard=data.profileindex;
                console.log('keyBoardManagerObj',data,data.profileindex);
                var KBarr = this.KeyBoardManager.KeyBoardArray;
                for (let Kindex = 0; Kindex < AllDB_KeyAssignData.length; Kindex++) {
                    if (KBarr.length < AllDB_KeyAssignData.length) {
                        KBarr.create_KeyBoard();
                    }
                    KBarr[Kindex].ImportClassData(AllDB_KeyAssignData[Kindex]);
                }
                console.log('this.KeyBoardManager.getTarget()',this.KeyBoardManager.getTarget());
                // this.Built_ineffect.setModeForName(this.KeyBoardManager.getTarget().lightData);
            }
            this.ReadAllDBPass.push('getDevice');
            if(this.ReadAllDBPass.length>=waitingSynchronization){
                this.loadDeviceUI();
            }
        });
        this.dbService.getMacro().then((data: any) => {
            console.log('ReadDBDataFromServer_dbService.getMacro()', data);
            var MacroObj = data[0];
            if (MacroObj != undefined) {
                data= JSON.parse(JSON.stringify(MacroObj))
                for (let MClass = 0; MClass < this.MacroManager.macroClassItem.length; MClass++) {
                    this.MacroManager.deleteMacroClass();
                }
                this.MacroManager.importMacroClass(MacroObj)
            }
            this.ReadAllDBPass.push('getMacro');
            if(this.ReadAllDBPass.length>=waitingSynchronization){
                this.loadDeviceUI();
            }
        });
        //JSON.parse(JSON.stringify(
        this.dbService.getSyncProgram().then((data: any) => {
            console.log('ReadDBDataFromServer_dbService.SyncProgramDB()', data);
            if (data.length > 0) {
                data= JSON.parse(JSON.stringify(data))
                var Sync = data[0];
                //console.log('ReadDBDataFromServer_dbService.SyncProgramDB()', JSON.parse(JSON.stringify(Sync)));
                this.AssociateManager.AssociateArr = Sync.Db_data;
            }
            this.ReadAllDBPass.push('getSyncProgram');
            if(this.ReadAllDBPass.length>=waitingSynchronization){
                this.loadDeviceUI();
            }
        });
        this.dbService.getCustomData().then((data: any) => {
            console.log('ReadDBDataFromServer_dbService.getCustomData()', data);
            data= JSON.parse(JSON.stringify(data))

            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element.devicename == this.DeviceService.currentDevice['devicename']) {
                    var CustomObj = element.Db_data;
                    for (let Cusindex = 0; Cusindex < this.LCFM.LedChainFrames.length; Cusindex++) {
                        this.LCFM.delete_item();
                    }
                    console.log('ReadDBDataFromServer_dbService.getCustomData()_CustomObj', CustomObj);
                    for (let Cusindex = 0; Cusindex < CustomObj.length; Cusindex++) {
                        this.LCFM.ReadClassCreateData(CustomObj[Cusindex]);
                    }
                }
            }
            this.ReadAllDBPass.push('getCustomData');
            if(this.ReadAllDBPass.length>=waitingSynchronization){
                this.loadDeviceUI();
            }
        });

        this.dbService.getSyncEffect().then((data: any) => {
            console.log('ReadDBDataFromServer_dbService.getSyncEffect()', data);
            // if (data.length > 0) {
            //     var syncEffectObj = data[0].Db_data;
            //     data= JSON.parse(JSON.stringify(syncEffectObj))

            //     if (data !== undefined) {
            //         var SyncEffect = JSON.parse(JSON.stringify(syncEffectObj.EffectLibrary));
            //         //console.log('getSyncEffect',SyncEffect);               
            //         this.M_Light_APMode.recordModeArr = SyncEffect;
            //         //console.log('getSyncEffect',this.M_Light_APMode.recordModeArr);                     
            //         this.RGBMode = this.M_Light_APMode.getTarget();
            //     }
            // }
            this.ReadAllDBPass.push('getSyncEffect');
            if(this.ReadAllDBPass.length>=waitingSynchronization){
                this.loadDeviceUI();
            }
        });
        this.dbService.getAPModeEffect().then((data: any) => {
            console.log('ReadDBDataFromServer_dbService.getAPModeEffect()', data);

            if (data.length > 0) {
                var Db_data =JSON.parse(JSON.stringify(data));
                console.log('getAPModeEffect()_Db_data', Db_data);
                var target = Db_data.find((x) => x.devicename == this.DeviceService.currentDevice['devicename'])
                if(target!=undefined){
                    var T_Effect = target.Db_data;
                    this.M_Light_APMode.recordModeArr = T_Effect;
                    this.RGBMode = this.M_Light_APMode.getTarget();
                }
                else{
                    console.log('%c getAPModeEffect(ERROR)','color:red', data);
                }
            }
            this.ReadAllDBPass.push('getAPModeEffect');
            if(this.ReadAllDBPass.length>=waitingSynchronization){
                this.loadDeviceUI();
            }
        });
        
        this.dbService.getAppSetting().then((data: any) => {
            console.log('ReadDBDataFromServer_dbService.getAppSetting()', data);
            if (data[0]!=undefined) {
                var APEXConfigObj = data[0];
                this.i18nManager.autoStart = APEXConfigObj.autoStart;
                this.i18nManager.onUsingLangindex = APEXConfigObj.onUsingLangindex;
                this.i18nManager.recovery = APEXConfigObj.recovery;
                this.i18nClickExcute();
            }
            this.ReadAllDBPass.push('getAppSetting');
            if(this.ReadAllDBPass.length>=waitingSynchronization){
                this.loadDeviceUI();
            }
        });
        this.dbService.getBuilt_ineffectDB().then((data: any) => {
            console.log('ReadDBDataFromServer_dbService.getBuilt_ineffectDB()', data);
            if (data.length > 0) {
                //var Db_data = data[0].Db_data;
                var target = data.find((x) => x.devicename == this.DeviceService.currentDevice['devicename'])
                if(target!=undefined){
                    this.Built_ineffect.ListData=JSON.parse(JSON.stringify(target.Db_data.ListData))
                    this.Built_ineffect.currentModeIndex=JSON.parse(JSON.stringify(target.Db_data.currentModeIndex))
                }
            }
            this.ReadAllDBPass.push('getBuilt_ineffectDB');
            if(this.ReadAllDBPass.length>=waitingSynchronization){
                this.loadDeviceUI();
            }
        });   

        if(_nodeRequire_fs.existsSync(process.env.APPDATA + "\\Development_SupportDB")){
            //GMMKPro_2
            //this.deviceService.dbService.setSupportDevice_defaultProfile_test('GMMK Pro', this.currentDevice.deviceData.profile);
            //var data={"devicename":'GMMK Pro'};

            var data={"devicename":this.DeviceService.currentDevice.devicename};
            console.log('_nodeRequire_fs',_nodeRequire_fs,data);

            //var data={"devicename":'GMMK V2'};
            //var data={"devicename":'GMMK Pro ISO'};
           // var data={"_id":'GMMK Pro ISO'};
            var setdata = {
                "defaultProfile":JSON.parse(JSON.stringify(this.KeyBoardManager.KeyBoardArray)),
            } 
            this.dbService.Node_NeDB.updateCmd('SupportDevice',data,setdata,function(){
            });
            // this.deviceService.dbService.getSupportDevice().then(function(data) {
            //     console.log('this.deviceService.dbService.getSupportDevice',data);
        }
    }
    loadDeviceUI(){
        this.setPageIndex('KEYBOARDSETTINGS');
        //this.setPageIndex('Sync Device');

        //this.setPageIndex('LIGHTINGSETTING');
        this.onLoading=false;
    }
    
    setDBDataToServer(sourceName) 
    {
        var devdata = {
            'SN': this.DeviceService.currentDevice.SN,
            'devicename': this.DeviceService.currentDevice.devicename,
        };
        var toServerData;
        var ToServerFunctionName;
        switch(sourceName)
        {
            // case "KeyAssign":
            //     const SWprofiles =  
            //     {
            //         KeyBoardArray:this.KeyBoardManager.KeyBoardArray,
            //         radioOptions:this.KeyBoardManager.radioOptions,
            //         radioOptionsFrequency:this.KeyBoardManager.radioOptionsFrequency,
            //         maxKayCapNumber:this.KeyBoardManager.maxKayCapNumber,
            //     };
            //     ToServerFunctionName='SetProfileDB';
            //     toServerData= SWprofiles;
            // break;
            case "AssociateProg":
                ToServerFunctionName='InsertSyncProgram';
                toServerData= this.AssociateManager.AssociateArr;
                console.log("this.AssociateManager_Arr:",toServerData);
            break;
            case "MacroManager":
                ToServerFunctionName='InsertMacroDB';
                toServerData= this.MacroManager;
                console.log("this.MacroManager macroClassItem:");
            break;

            case "CustomData":
                ToServerFunctionName='updateCustomDataDB';
                toServerData=  JSON.parse(JSON.stringify(this.LCFM.LedChainFrames))
                var T_data = {
                    'Db_data': toServerData,
                };
                this.dbService.updateCustomData(devdata, T_data).then((data) => {
                    //callback(data);
                });
                return;
            break;
            case "Built-ineffects":
                //JSON.parse(JSON.stringify(this.Built_ineffect)
                toServerData=  JSON.parse(JSON.stringify(this.Built_ineffect))
                var T_data = {
                    'Db_data': toServerData,
                };
                this.dbService.updateBuilt_ineffectDB(devdata, T_data).then((data) => {
                    //callback(data);
                   console.log('%c updateBuilt_ineffectDB','background: black; color: white', data);  
                });
            return;
                                                                    
        }
        var Obj4 = {
            Type: funcVar.FuncType.Device,
            Func: ToServerFunctionName,
            Param: toServerData,
            SN:this.DeviceService.currentDevice['SN']
        }
        console.log("ToServerFunctionName",Obj4);

        this.protocol.RunSetFunction(Obj4).then((data) => {
        });

    }
    setCustomPreviewToServer(sourceName) {     
        //-----------------
        console.log("setCustomPreviewToServer:",this.LCFM.LedChainFrames[this.LCFM.currentChooseIndex]);
        let apmodesetting = {
            iDevice: 0,
            CustomDataObj: this.LCFM.LedChainFrames[this.LCFM.currentChooseIndex]
        }

        let Obj3 = {
            Type: funcVar.FuncType.System,
            Func: funcVar.FuncName.SetLEDPreview,
            Param: apmodesetting
        }
        
        this.protocol.RunSetFunction(Obj3).then((data) => {
        });
        //-----------------
    };

    setPreviewOnOffToServer() {     
        //-----------------
        //console.log("One CustomData:",this.LCFM.LedChainFrames[this.LCFM.currentChooseIndex]);     
        let apmodesetting = {
            iMode: 1,//0:All Timer Off,1:AP Mode 2: Custom
            bStart: 2//0:Off,1,On,2:On But Not Preview
        }
        let Obj3 = {
            Type: funcVar.FuncType.System,
            Func: funcVar.FuncName.SwitchSyncLEDPreview,
            Param: apmodesetting
        }
       
        this.protocol.RunSetFunction(Obj3).then((data) => {
        });
        //-----------------
    };

    


    saveDeviceSettingToKeyBoard(sourceName) 
    {
        console.log("saveDeviceSettingToKeyBoard:",sourceName);
        this.onLoading=true;
        let ObjDB = {
        }
        let FuncName;
        var ToDBName= 'KeyAssign';
        switch(this.CurrentPageName)
        {
            case "KEYBOARDSETTINGS":
                ObjDB["KeyBoardManager"] = this.KeyBoardManager;
                FuncName = funcVar.FuncName.SetKeyMatrix;
                break;
            case "MACROSETTINGS":
                ObjDB["MacroManager"] = this.MacroManager;
                FuncName = funcVar.FuncName.SetKeyMatrix;
                break;
            case "Custom Effect":
                const iProfile =  this.KeyBoardManager.currentChooseKeyBoard;
                ObjDB["Profile"] = iProfile;
                ObjDB["custom"] = iProfile;
                console.log("SWprofiles:",ObjDB);
                FuncName = funcVar.FuncName.SetKeyMatrix;
            break;
            case "RELATEDPROGRAM":
                ObjDB["ObjSyncData"] = this.AssociateManager.AssociateArr;
                FuncName = funcVar.FuncName.SetSyncProgram;
            break; 
            case "Built-ineffects":
                //JSON.parse(JSON.stringify(this.Built_ineffect)
                this.KeyBoardManager.getTarget().lightData=JSON.parse(JSON.stringify(this.Built_ineffect.getTarget()))
                ObjDB["KeyBoardManager"] = this.KeyBoardManager;
                FuncName = funcVar.FuncName.SetLEDEffect;
            break;

        }
        let ObjDevice = {
            Type: funcVar.FuncType.Device,
            Func: FuncName,
            Param: ObjDB,
            SN:this.DeviceService.currentDevice['SN']
        }
        console.log("setDeviceToServer_ObjDevice",ObjDevice );
        this.protocol.RunSetFunction(ObjDevice).then((data) => {
            this.onLoading = false;
            if(this.CurrentPageName=="Built-ineffects"){
                this.setDBDataToServer('KeyAssign');
            }
        });
    }

    setAppModeToServer(from="未設置") {
        //console.log("setAppModeToServer_"+from);
        if(from!="setModeFrameRange"){
            var passbyreference=this.RGBMode.ParameterNumberList;
            for (let index = 0; index < passbyreference.length; index++) {
                const element = passbyreference[index];
                if(passbyreference[index].setValue<passbyreference[index].minValue || passbyreference[index].setValue===null){
                    passbyreference[index].setValue=passbyreference[index].minValue;
                }
                if(passbyreference[index].setValue>passbyreference[index].maxValue){
                    passbyreference[index].setValue=passbyreference[index].maxValue;
                }
            }
        }
        //---------------SyncLEDData------------
        // this.changeDetectorRef.detectChanges();
        let apmodesetting = {
            'EffectLibrary': this.M_Light_APMode.recordModeArr,
            'SN': this.DeviceService.currentDevice.SN,
            'devicename': this.DeviceService.currentDevice.devicename,
        }
        //SetSyncLEDData
        console.log('SetAPModeLEDData:'+from, apmodesetting);
        let obj3 = {
            Type: funcVar.FuncType.System,
            Func: funcVar.FuncName.SetAPModeLEDData,
            Param: apmodesetting
        }
        this.protocol.RunSetFunction(obj3).then((data) => {
        })
    };
    RGBEffectCenterEventArr:any=[];
    RGBC_B_SArr:any=[];
    setPageIndex(pageName=""){
        this.onEqipBtn=false;
        console.log('setPageIndex',pageName);
        this.ShowPrompt=false;
        if (this.CurrentPageName == pageName) return;
        this.CurrentPageName=pageName;
        this.changeDetectorRef.detectChanges();
        switch (pageName) {
            case "SelectDevice": 
                break;
            case "Custom Effect":
                this.pageIconSet = [true, true, true, true];
                // var CRUDDom = document.getElementById("CRUD");
                // CRUDDom.style.height = 2.5*num + "vh";
                this.page7_custom_box_selectionJs();
                this.page7_custom_square_color_picker();
                this.LCFM.refreshRange();
                this.setCustomPreviewToServer("setPageIndex");


                break;
            case "LIGHTINGSETTING":
                this.changeDetectorRef.detectChanges();
                this.pageIconSet = [true, true, true, true];
                this.page1_custom_box_selectionJs();
                this.addColor_PickerEvent();
                this.EffectCenter.App = this;
                this.EffectCenter.addCenterEvent("APModeKBUI");
                this.sendCoordnatesToServer();
                this.RGBMode = this.M_Light_APMode.getTarget();
                this.setAppModeToServer('setPageIndex');
                break;
            case "Built-ineffects":
                this.changeDetectorRef.detectChanges();
                var RGBList2 = this.elementRef.nativeElement.querySelectorAll(".Built_inBlock");
                this.KeyBoardStyle.applyStyles(RGBList2);
                this.M_Light_BuiltIn.setCoordinateData(RGBList2);
                this.addColor_PickerEvent();
                this.pageIconSet = [false, false, false, false];
                break;
            case "KEYBOARDSETTINGS":
                this.pageIconSet = [false, true, true, false];
                var num = count_boolean(this.pageIconSet, true);
                // var CRUDDom = document.getElementById("CRUD");
                // CRUDDom.style.height = 2.5*num + "vh";
                var KeyAssignUIStyleList = this.elementRef.nativeElement.querySelectorAll(".KeyAssignUIStyle");
                //console.log("KeyAssignUIStyleList",KeyAssignUIStyleList);    
                this.KeyBoardStyle.applyStyles(KeyAssignUIStyleList);
                for (let index = 0; index < KeyAssignUIStyleList.length; index++) {
                    let element = KeyAssignUIStyleList[index] as HTMLElement;
                    var T = index.toString();
                    element.setAttribute("data-index", T);
                    element.addEventListener("mousedown", (e: MouseEvent) => {
                        //console.log("KeyAssignUIStyleList__e",e.target);                   
                        this.KeyBoardManager.keyAssignPrompt(event);
                        this.ShowPrompt = true;
                        this.KeyBoardManager.getTarget().recordAssignBtnIndex = index;//紀錄指定到第幾個按扭  
                        //console.log("KeyAssignUIStyleList",this.KeyBoardManager.getTarget().assignedFnKeyboardKeys);    
                    });
                }

                break;
            case "MACROSETTINGS":
                this.pageIconSet = [true, false, false, true];
                var num = count_boolean(this.pageIconSet, true);
                this.MacroManager.addMacroEvent();

                break;
            case "RELATEDPROGRAM":
                this.pageIconSet = [false, false, true, true];
                var num = count_boolean(this.pageIconSet, true);
                break;


            
        }
        if(pageName!="LIGHTINGSETTING"){
            console.log("remove_LIGHTINGSETTING_EventListener",this.APModeBoxSelectFn);
            var htmlelement=this.M_Light_APMode.BSModule_L.selectContainer;
            if(htmlelement){
                htmlelement.removeEventListener("mousedown", this.APModeBoxSelectFn[0]);
            }
            document.removeEventListener('mouseup', this.APModeBoxSelectFn[2]);
            this.EffectCenter.selectEffectCenter=false;
            this.M_Light_APMode.BSModule_L.EventCanBoxSelect=false;
        }    
        if(pageName!="Custom Effect"){
            console.log("removeP7EventListener", this.BoxSelectFnArrP7);
            var htmlelement=this.LCFM.BSModule_C.selectContainer;
            if(htmlelement){
                htmlelement.removeEventListener("mousedown", this.BoxSelectFnArrP7[0]);
            }
            document.removeEventListener('mousemove', this.BoxSelectFnArrP7[1]);
            document.removeEventListener('mouseup', this.BoxSelectFnArrP7[2]);
            this.LCFM.BSModule_C.EventCanBoxSelect=false;
            
        }  
        if(pageName!="MACROSETTINGS"){
            console.log("removeP3EventListener");
            this.MacroManager.removeMacroEvent();
        }
        
    }
    setSelectionStyle(index){
        return this.M_Light_APMode.AllBlockColor[index].border&&this.M_Light_APMode.BSModule_L.EventCanBoxSelect?'1px solid #ff0':'none';
    }
    sendCoordnatesToServer(){
        var coordinates = document.getElementsByClassName('RGBColorBlockStyle') as HTMLCollectionOf<HTMLElement>;    
        console.log('sendCoordnatesToServer長度',coordinates.length,this.M_Light_APMode.ledcoordinates);
        this.M_Light_APMode.ledcoordinates=[];
        for (let index = 0; index < coordinates.length; index++) {
            const element=coordinates[index] as HTMLElement;
            var x1=element.offsetLeft;
            var x2=element.offsetLeft+element.clientWidth;
            var y1=element.offsetTop;
            var y2=element.offsetTop + element.clientHeight;
            this.M_Light_APMode.ledcoordinates.push({
                "x1": element.offsetLeft,
                "x2": element.offsetLeft + element.clientWidth,
                "y1": element.offsetTop,
                "y2": element.offsetTop + element.clientHeight
            });
         
        }
        
            let apmodesetting={
                DeviceBtnAxis:this.M_Light_APMode.ledcoordinates
            }
            let obj={
                Type:funcVar.FuncType.System,
                Func:funcVar.FuncName.SetDeviceBtnAxis,
                Param: apmodesetting
            }
            this.protocol.RunSetFunction(obj).then((data)=>{
                console.log('SetDeviceBtnAxis Finish');
            });


    }
    setSelectionKeyLed(){
        var T=this.LCFM.getIndexClassName(this.recordCustomLedindex);
        if(this.on_AdvancedFive==false){
            this.ShowAdvancedList=false;
            this.KeyBoardManager.getTarget().setRecordLed(T.projectName,T.projectCode);
        }
        else{
            this.ShowAdvancedList=false;
            this.KeyBoardManager.getTarget().set_FiveLed(T.projectName,T.projectCode);
        }
        this.setDBDataToServer('KeyAssign');

    }
    setSelectionKeyData(event){
        console.log("setSelectionKeyData進入",event.target.dataset.index,event);
        if(event.target.dataset.index=="K190"||event.target.dataset.index=="K191" ||event.target.dataset.index=="K189"){
            if(this.KeyBoardManager.getTarget().getNowModeTargetKeyPressStatus()=='InstantPress'){
              return ;
            }
        }
        this.KeyBoardManager.getTarget().set_assign_Text_Value(event.target.dataset.index ,event.target.value ,1,0);
        this.setDBDataToServer('KeyAssign');
    }
    setRBtnFnKeyData(event){
        console.log("setRBtnFnKeyData進入=>",event.target.dataset.index+"____",event);
        if(this.KeyBoardManager.getTarget().getNowModeTargetKeyPressStatus()=='NormalPress'){
        this.KeyBoardManager.getTarget().checkFnSetOnlyData(event.target.dataset.index);//delete 
        this.KeyBoardManager.getTarget().set_assign_Text_Value(event.target.dataset.index ,event.target.id ,1,0);
        this.setDBDataToServer('KeyAssign');
        }
    }
    setSelectionKeyCombination(){
        console.log("setSelectionKeyCombination",this.KeyBoardManager.combination);
        var Text="";
        for (let index = 0; index < this.KeyBoardManager.combination.length; index++) {
            const element = this.KeyBoardManager.combination[index];
            
            if (Text==""&&element.check) {
                //console.log("setSelectionKeyCombination1");
                Text += element.name;
            }
            else if (Text!="" &&element.check) {
                //console.log("setSelectionKeyCombination2");
                Text += "+" + element.name;
            }

        }
        var T=this.KeyBoardManager.combination.map(item => item.check);
        if(Text!=""){
        Text+= "+"+this.KeyBoardManager.combinationkey;
        }
        else{
        Text+= this.KeyBoardManager.combinationkey;
        }
        this.KeyBoardManager.getTarget().set_assign_Text_Value("KCombination",Text,65536,0);
        this.setDBDataToServer('KeyAssign');
    }
    combinationkey(code){
        this.KeyBoardManager.combinationkey=this.EM.getkeyCodeTxt(code);
    }
    RGBEyeClose(index){
        this.M_Light_APMode.recordModeArr[index].check=!this.M_Light_APMode.recordModeArr[index].check;
        this.setAppModeToServer('RGBEyeClose');
    }
    setSelectionKeyMacro(){
        if(!this.MacroManager.getClass().hasFile()){
             return;
        }
        if(this.KeyBoardManager.getTarget().getNowModeTargetKeyPressStatus()!='NormalPress'){
            return;
        }
        console.log("setSelectionKeyMacro");
        var optionNumber;
        switch (this.KeyBoardManager.radioOptions) {
            case 65534:
                optionNumber=this.KeyBoardManager.radioOptionsFrequency;
                break;
            case 65535:        
            optionNumber=65535;
                    break;
            case 65536: 
            optionNumber=65536;
             break;
        }
        const MData=this.MacroManager.getClass().getTarget();
        this.KeyBoardManager.getTarget().set_assign_Text_Value("KMacro",MData.name,optionNumber,MData.IndexCode);
        this.setDBDataToServer('KeyAssign');
    }


    customMouseEventClickLog(event){
            // console.log("(event.target): ",event.target); 
            // console.log("(event.target_id): ",event.target.id); 
            let _1vw = Math.round(window.innerWidth / 100);
            let _1vh= Math.round(window.innerHeight / 100);

    }

    APModeBoxSelectFn:any=[];
    page1_custom_box_selectionJs() {

     
        console.log('%c page1_custom_box_selectionJs','background: black; color: white', this.APModeBoxSelectFn);  
        var RGBCBSList = this.elementRef.nativeElement.querySelectorAll(".RGBColorBlockStyle");
        this.KeyBoardStyle.applyStyles(RGBCBSList);
        this.M_Light_APMode.BSModule_L.setSelectContainer('EventCanBoxSelectRange'); 
        this.M_Light_APMode.BSModule_L.selectContainer.addEventListener("mousedown", this.APModeBoxSelectFn[0]);
        document.addEventListener("mouseup", this.APModeBoxSelectFn[2]);
    }
    BoxSelectFnArrP7:any=[];
    page7_custom_box_selectionJs(){
        this.LCFM.BSModule_C.setSelectContainer('EventCanBoxSelectRange');
        var Custom_RGBList = this.elementRef.nativeElement.querySelectorAll(".CustomRGBBlock");
        this.KeyBoardStyle.applyStyles(Custom_RGBList);
        this.LCFM.BSModule_C.EventCanBoxSelect = true;
        console.log('%c page7_custom_box_selectionJs','background: black; color: white', this.BoxSelectFnArrP7);  

        console.log("page7_custom_box_selectionJs",this.LCFM.BSModule_C.searchTargetName);

        this.LCFM.BSModule_C.selectContainer.addEventListener("mousedown", this.BoxSelectFnArrP7[0]);

        document.addEventListener("mousemove", this.BoxSelectFnArrP7[1]);

        document.addEventListener("mouseup", this.BoxSelectFnArrP7[2]);

    }

    showCustomTestDataWindows(ContentArray){
        var txtShow = document.getElementById('conslogtestText');
        txtShow.innerText = JSON.stringify(ContentArray).replace(/,/g,',\n').replace(/{/g,'{\n').replace(/}/g,'\n}');;


    }

    switchEffectMode(i){
        this.M_Light_APMode.switchEffectMode(i);
        //this.changeDetectorRef.detectChanges();
        this.RGBMode=  this.M_Light_APMode.recordModeArr[this.M_Light_APMode.currentModeIndex];
        this.M_Light_APMode.updateframe_selection_range();
        this.setAppModeToServer('switchEffectMode');
        this.switchEffectUI=false;
        this.EffectCenter.selectEffectCenter=false;

    }

    OpenLeftDropDownListUI(Event: MouseEvent, index) {
        if (Event.button == 0) {
            if (this.M_Light_APMode.currentModeIndex == index) {
                var LightModeList = document.getElementById("LightModeList") as HTMLDivElement;
                //LightModeList.style.display = 'block';
                this.switchEffectUI=true;
                LightModeList.style.left = Event.clientX - 10 + "px";
                LightModeList.style.top = Event.clientY - 10 + "px";
            }
        }
    }


    colorPickerFnArrP1:any=[];
    addColor_PickerEvent() {
        console.log('%c addColor_PickerEvent','background: black; color: white', this.colorPickerFnArrP1);  
        this.colorPickerFnArrP1[1]=(oEvent:MouseEvent) => {
            switch (this.CurrentPageName) {
                case "LIGHTINGSETTING":
                    this.LedColor.mousemove(oEvent);      
                    break;
                case "Built-ineffects":
                    this.Built_inColor.mousemove(oEvent); 
                    break;
            }
            this.updateColorBlock(); //by colorPicker          
        };
        this.colorPickerFnArrP1[0]=(oEvent:MouseEvent) => {    
            switch (this.CurrentPageName) {
                case "LIGHTINGSETTING":
                    this.LedColor.mousedown(oEvent);      
                    break;
                case "Built-ineffects":
                    this.Built_inColor.mousedown(oEvent); 
                    break;
            }
            this.updateColorBlock();  //by colorPicker 
            document.addEventListener("mousemove", this.colorPickerFnArrP1[1]);
        };
        document.addEventListener("mouseup", ()=>{
            document.removeEventListener("mousemove", this.colorPickerFnArrP1[1]);
        });
        var parentDiv;
        switch (this.CurrentPageName) {
            case "LIGHTINGSETTING":
                parentDiv= this.LedColor.getParentDiv();
                break;
            case "Built-ineffects":
                parentDiv= this.Built_inColor.getParentDiv();
                break;
        }
        parentDiv.removeEventListener("mousedown", this.colorPickerFnArrP1[0]);
        parentDiv.addEventListener("mousedown", this.colorPickerFnArrP1[0]);
  
       

    }


    updateColorBlock(){
        //var target=LedColor;
        switch (this.CurrentPageName) {
            case "LIGHTINGSETTING":
                this.LedColor.HSL_RGB_HexSet();
                this.LedColor.setGradientBGcolor(); 
                this.M_Light_APMode.getTarget().colors[this.LedColor.currentRecordIndex]=this.LedColor.Hex;
                this.setAppModeToServer('byP1');//by updateColorBlock
                break;
            case "Built-ineffects":
                this.Built_inColor.HSL_RGB_HexSet();
                this.Built_inColor.setGradientBGcolor(); 
                this.Built_ineffect.getTarget().colors[this.LedColor.currentRecordIndex]=this.LedColor.Hex;
                this.refreshM_Light_BuiltIn();
                break;
        }
        

    }


    sevenColorExclusiveFn(event){
        this.LCFM.getClass().getTarget().color=this.customLedColor.backGroundColorRgbToHex(event.target.style.backgroundColor);
        this.LCFM.color_Auto_Switch();
    }
    LEDModeSelect(event,index){
        console.log("LEDModeSelect: ",event,index);
        this.M_Light_APMode.currentModeIndex=index;
        this.RGBMode=this.M_Light_APMode.recordModeArr[index];
        
        if( this.M_Light_APMode.getTarget().name=="Fire"){
            this.LedColor.currentRecordIndex=0;
        }
        this.M_Light_APMode.updateframe_selection_range();
        this.setAppModeToServer('LEDModeSelect');
    }

    LEDModeEyeStatus(Modeindex) {
        var foucsIndex: any = [2, 3];

        if (this.M_Light_APMode.currentModeIndex == Modeindex) {
            foucsIndex = [0, 1];
        }
        if (this.M_Light_APMode.recordModeArr[Modeindex].check) {
            return this.ImgPath.LedModeCanSee[foucsIndex[1]];

        }
        else{
            return this.ImgPath.LedModeCanSee[foucsIndex[0]];

        }
         
    }

    project_select(event,index){
        console.log("project_select: ",event,index);
        this.KeyBoardManager.currentChooseKeyBoard=index;
        let apmodesetting = {
            Profile: index,
        }
        console.log('ProfileID:', apmodesetting);
        let obj3 = {
            Type: funcVar.FuncType.Device,
            Func: funcVar.FuncName.SetProfile,
            SN: this.DeviceService.currentDevice['SN'],
            Param: apmodesetting
        }
        this.protocol.RunSetFunction(obj3).then((data) => {
        })
    }
    ImportProfile() {
        this.CRUDCheck=!this.CRUDCheck;
        this.onAppImportExport=true;
        var typeName="";
        switch (this.CurrentPageName) {
            case "LIGHTINGSETTING":
                typeName="APMode"
                break
            case "KEYBOARDSETTINGS":
                typeName="KeyAssign"
                break
            case "MACROSETTINGS":
                typeName="Macro"
                break
            case "RELATEDPROGRAM":
                typeName= env.isMac? "app":"exe";
                break
            case "Custom Effect":
                typeName="Advanced"
                    break
            default:
                alert("typeNameu遺失"+this.CurrentPageName)
                return;
                break    
        }
        if (this.CurrentPageName == "RELATEDPROGRAM") {
            dialog.showOpenDialog(null, { defaultPath: '', filters: [{ name: typeName + ' File', extensions: [typeName] }] }, (fns) => {
                console.log('showOpenDialog:', typeName, fns);
                if (fns != undefined) {
                    console.log('讀取路徑fns', fns[0]);
                    //var TestText = "C:\\Users\\Louis\\Desktop\\5555.Macro";                    
                    var index = env.isMac? fns[0].lastIndexOf("/"):fns[0].lastIndexOf("\\");
                    
                    var dot = fns[0].lastIndexOf(".");
                    var exeName = fns[0].substring(index + 1);
                    var ProcessString = fns[0].substring(index + 1, dot);
 
                    console.log("程序關聯原字串" + fns[0]);// Displays 8
                    console.log("\\跟.位置=" + index, dot, "結果=", ProcessString,"exeName=",exeName);// Displays 8
                                        
                    var T=this.AssociateManager.Order("Add");
                        T.associatePath = exeName;
                        T.name = ProcessString;
                    
                          
                    this.setDBDataToServer("AssociateProg");
                    this.onAppImportExport = false;
                    this.changeDetectorRef.detectChanges();
                }
                else {
                    console.log('Dialog_Import_undefined:', typeName, fns);
                    this.onAppImportExport = false;
                    this.changeDetectorRef.detectChanges();;
                }

            });
            return;//打斷
        }

        
        dialog.showOpenDialog(null, 
            { 
            defaultPath: '', 
            filters: [{ name: typeName + ' File', extensions: [typeName] }] 
        }, (fns) => {
            console.log('showOpenDialog:', typeName, fns);
            if (fns != undefined) {
                console.log('讀取路徑fns', fns[0]);
                //var TestText = "C:\\Users\\Louis\\Desktop\\5555.Macro";
                var index = env.isMac? fns[0].lastIndexOf("/"):fns[0].lastIndexOf("\\");
                var dot = fns[0].lastIndexOf(".");
                var exeName = fns[0].substring(index + 1);
                var ProcessString = fns[0].substring(index + 1, dot);
                console.log("anyString=" + index, dot, "結果=", ProcessString);// Displays 8
                console.log("原字串" + fns[0]);// Displays 8
                let obj = {
                    Path: fns[0],
                }

                let obj2 = {
                    Type: funcVar.FuncType.System,
                    Func: funcVar.FuncName.ImportProfile,
                    Param: obj
                }
                this.protocol.RunSetFunction(obj2).then((data) => {
                    console.log('ImportProfile:', data);
                    this.onAppImportExport = false;
                    this.changeDetectorRef.detectChanges();
                    if (data != null) {
                        if(data['filename']!=this.DeviceService.currentDevice.SN+'_Profile'&&this.CurrentPageName!='MACROSETTINGS'){
                            alert("鍵盤資料錯誤  請匯入正確裝置資料")
                            return;
                        }
                        switch (this.CurrentPageName) {
                            case "LIGHTINGSETTING":
                                var temp=data['value']["Keyboard_Export"];
                                if (temp != undefined) {
                                    temp=JSON.parse(JSON.stringify(temp));
                                    this.M_Light_APMode.recordModeArr= JSON.parse(JSON.stringify(temp));
                                    this.M_Light_APMode.currentModeIndex=0;
                                    this.RGBMode=this.M_Light_APMode.getTarget();
                                    this.setAppModeToServer();//by LIGHTINGSETTING
                                }
                                else{
                                    console.log('%c 匯入資料有誤','background: black; color: white',data);
                                }
                                break;
                            case "KEYBOARDSETTINGS":
                                var temp=data['value']["Keyboard_Export"];
                                if (temp != undefined) {
                                    temp=JSON.parse(JSON.stringify(temp));
                                    var nowLCFM =this.LCFM.LedChainFrames;
                                    var MCI = this.MacroManager.getAllMacroFileData();
                                    this.KeyBoardManager.getTarget().ImportClassData(temp);
                                    this.KeyBoardManager.getTarget().clearLostLCFM(nowLCFM);    
                                    this.KeyBoardManager.getTarget().clearLostMacro(MCI);  
                                    this.setDBDataToServer('KeyAssign');
                                }
                                else{
                                    console.log('%c 匯入資料有誤','background: black; color: white',data);
                                }
                                break;
                            case "MACROSETTINGS":
                                var temp=data['value']["Macro_Export"];
                                if (temp != undefined) {
                                    temp=JSON.parse(JSON.stringify(temp));
                                    console.log('data[value][Macro_Export]', temp);
                                    temp.name = this.MacroManager.createNotRepeatName(ProcessString);
                                    this.MacroManager.getClass().ImportFileCreateData(temp);
                                    this.setDBDataToServer('MacroManager');
                                }
                                else{
                                    console.log('%c 匯入資料有誤','background: black; color: white',data);
                                }
                                break;
                            case "Custom Effect":
                                var temp=data['value']["Custom_Export"];
                                if (temp != undefined) {
                                    temp=JSON.parse(JSON.stringify(temp));
                                    temp.projectName = this.LCFM.createNotRepeatClassName(ProcessString);
                                    this.LCFM.ImportClassCreateData(temp);
                                    this.setDBDataToServer('CustomData');
                                }
                                else{
                                    console.log('%c 匯入資料有誤','background: black; color: white',data);
                                }
                                break;
                        }
                    }
                    else {
                        alert("檔案有誤 請重新輸入");
                    }
                });

            }
            else {
                console.log('Dialog_Import_undefined:', typeName, fns);
                this.onAppImportExport = false;
                this.changeDetectorRef.detectChanges();
            }

        })



    }
    ExportProfile() {        
        this.CRUDCheck=!this.CRUDCheck;
        var typeName="";
        var defaultName="";
        this.onAppImportExport=true;
        switch (this.CurrentPageName) {
            case "LIGHTINGSETTING":
                typeName="APMode"
                defaultName=this.M_Light_APMode.getTarget().name;
                break
            case "KEYBOARDSETTINGS":
                typeName="KeyAssign"
                defaultName=this.KeyBoardManager.getTarget().projectName;
                break
            case "MACROSETTINGS":
                typeName="Macro"
                defaultName=this.MacroManager.getClass().getTarget().name;
                break
            case "Custom Effect":
                typeName="Advanced"
                defaultName=this.LCFM.getClass().projectName;
                    break
        }

        dialog.showSaveDialog(null, { 
            defaultPath: defaultName, 
            filters: [{ name: typeName+' File', extensions: [typeName] }] 
        }, (fns) => {
            console.log('showSaveDialog:',name,fns);
            if (fns != undefined) {
                this.onAppImportExport = false;
                this.changeDetectorRef.detectChanges();
                var data ;                           
                switch (this.CurrentPageName) {
                    case "LIGHTINGSETTING":
                        data={
                            "Light_Export":this.M_Light_APMode.recordModeArr,
                        }
                        break;
                    case "KEYBOARDSETTINGS":
                        data={
                            "Keyboard_Export":this.KeyBoardManager.getTarget(),
                        }
                        break;
                    case "MACROSETTINGS":
                        data={  
                            "Macro_Export":this.MacroManager.getClass().getTarget()
                        }
                        break;
                    case "Custom Effect":
                        data={
                             "Custom_Export": this.LCFM.getClass()       
                            }
                        break;

                }
                // let obj = {
                //     Data:data, 
                // }

                // let obj2 = {
                //     Type: funcVar.FuncType.System,
                //     Func: funcVar.FuncName.ExportProfile,
                //     Param: obj
                // }
                // console.log('ExportProfile:', data);
                // this.protocol.RunSetFunction(obj2).then((data) => {   
                // });
                tool.SaveFile(this.DeviceService.currentDevice.SN + '_Profile', data, fns, (err, result) => {
                    if (err) return
                },this.AppSettingService.AppSetingObj.version)
            }
            else{
                console.log('Dialog_Export_undefined::', typeName, fns);
                this.onAppImportExport=false;
                this.changeDetectorRef.detectChanges();
            }
        })
       
    }

    addHtmlDomElement() {
        this.CRUDCheck=!this.CRUDCheck;
        console.log("addHtmlDomElement", this.CurrentPageName);
        switch (this.CurrentPageName) {
            case "LIGHTINGSETTING":
                this.M_Light_APMode.addNewChoose();
                this.setAppModeToServer('addNewChoose');
                break;
            case "KEYBOARDSETTINGS":
                //this.KeyBoardManager.create_KeyBoard();
                break;
            case "MACROSETTINGS":
                this.MacroManager.createMacroClass(this.i18nManager.getTarget('MACROTYPE'));          
                this.setDBDataToServer('MacroManager');   
                break;
            case "RELATEDPROGRAM":
                    this.AssociateManager.Order("Add");
                    break;
            case "Custom Effect":
                    this.LCFM.addItem(this.i18nManager.getTarget('DEFAULT'));
                    this.setDBDataToServer('CustomData');   
                    break;
            default:
                break;
        }


    }
    CRUDCheck=false;
    deleteHtmlDomElement() {
        this.CRUDCheck=!this.CRUDCheck;
        console.log("deleteHtmlDomElement", this.CurrentPageName);
        switch (this.CurrentPageName) {
            case "LIGHTINGSETTING":
                this.M_Light_APMode.deleteChoose();
                this.RGBMode=this.M_Light_APMode.getTarget();
                this.M_Light_APMode.updateframe_selection_range();
                this.setAppModeToServer('deleteHtmlDomElement');
                break;
            case "KEYBOARDSETTINGS":
                break;
            case "MACROSETTINGS":
                var MacroCs=this.MacroManager.getClass();
                for (let index = 0; index < MacroCs.MacroFiletItem.length; index++) {
                    const element = MacroCs.MacroFiletItem[index].name;
                    this.KeyBoardManager.clearRecordMacroData(element);
                }
                this.MacroManager.deleteMacroClass();
                this.setDBDataToServer('MacroManager');   

                break;
            case "RELATEDPROGRAM":
                 this.AssociateManager.Order("Delete");
                 this.setDBDataToServer('AssociateProg');   

                 break;
            case "Custom Effect":
                if(this.LCFM.LedChainFrames.length>1){      
                this.KeyBoardManager.clearAllAssignRecordLed(this.LCFM.getClass().projectName);      
                this.LCFM.delete_item();
                }
                this.setDBDataToServer('CustomData');   
                break;
        }
    }
 
    checkLimit(){
        this.on_AdvancedFive=false;
        if(this.KeyBoardManager.getTarget().countTotalAssign()>=11){
        this.alertMessageBool=true;    
        }
        else{
            this.ShowAdvancedList=true;
        }
        
    }
    switchMacroClass(classIndex){
        this.MacroManager.currentMacroClass=classIndex;
        if(this.MacroManager.getClass().hasFile()){
        this.MacroManager.tempMacroContent= this.MacroManager.getClass().getTarget();
        this.MacroManager.updeteEditName();
        }
        else{
            this.MacroManager.tempMacroContent=new MacroScriptContent();
        }
    }
    MacroFileNameChange(event) {

        //event.target.value=event.target.value.replace(/[^\a-\z\A-\Z^0-9]/g,'');
        //event.target.value=event.target.value.replace( /[^\a-\z\A-\Z^0-9\u4E00-\u9FA5]/g,'');
        console.log("event=" + event.target.value);
        var regex = event.target.value.replace(/[^\a-\z\A-\Z^0-9\u4E00-\u9FA5]/g, '');
        if (this.MacroManager.getClass().getTarget().name != regex) {
            var changeName = this.MacroManager.createNotRepeatName(regex);
            var targetName = this.MacroManager.getClass().getTarget().name;
            console.log("MacroFileNameChange=" + changeName, targetName);
            this.KeyBoardManager.ChangeAllLookingforMacroName(changeName, targetName);
            this.MacroManager.getClass().getTarget().name = changeName;
            this.MacroManager.updeteEditName();

            this.setDBDataToServer('MacroManager');
        }

    }

    MacroEditkeyCodeFn(event){
        console.log("MacroEditkeyCodeFn=" + event.keyCode);
        
    }


    MacroCSNameChange(event) {
        console.log("event=" + event.target.value);
        var regex = event.target.value.replace(/[^\a-\z\A-\Z^0-9\u4E00-\u9FA5]/g, '');
        this.MacroManager.updeteEditClassName(regex);
        this.setDBDataToServer('MacroManager');
    }



    LCFMFileNameChange(event) {
        //console.log("event=" + event.target.value,
        console.log("projectName",this.LCFM.getClass().projectName);
        console.log("event",event);

        var regex = event.target.value.replace(/[^\a-\z\A-\Z^0-9\u4E00-\u9FA5]/g, '');
        var changeName = this.LCFM.createNotRepeatClassName(regex);
        var targetName = this.LCFM.getClass().projectName;
        console.log("MacroFileNameChange=" + changeName, targetName);
        if (targetName != regex) {
            this.LCFM.getClass().projectName = changeName;
            this.KeyBoardManager.ChangeAllLookingforLCFMName(changeName, targetName);
            this.LCFM.updeteEditName();
            this.setDBDataToServer('CustomData');
        }

    }

 








}