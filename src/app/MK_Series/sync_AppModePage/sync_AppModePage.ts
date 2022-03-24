declare var System;
import { Component ,OnInit ,Output,Input ,EventEmitter, SimpleChange, OnChanges
    , ViewEncapsulation, forwardRef,ChangeDetectorRef, ViewChild
,Injectable} from '@angular/core';
import { AppComponent } from '../app.component';
import { protocolService } from '../../services/service/protocol.service';
import { MouseMoveObjectManager } from './MouseMoveObject';
import { MouseBoxSelection } from './MouseBoxSelection';
import { CurrentColor,MacroScriptContent,MacroManager,Wave,APModeModule,KeyBoardManager,KeyBoardStyle,LedChainFramesManager,
    AssociateManager,EffectCenter,KeyShortcut,AlertDevice,EventManager,i18nManager,FirewareManager,ImgPathList  
    ,count_boolean,CreateFakeArray,SharesFunction,ProgressBar,M_Light_CS,getMatchedCSS,DeviceService
} from '../TSImportManager';
let funcVar = System._nodeRequire('./backend/others/FunctionVariable');
let remote = System._nodeRequire('electron').remote;
//var this.MouseBoxSelectionFn=new MouseBoxSelection();AppComponent,
var scaleConfig = {
    scaleMultipleConfig: [0.25, 0.5, 1, 2, 4],
    scaleMultiple: 0.5,
}
@Component({
    selector: 'sync_AppModePage',
    templateUrl : './components/sync_AppModePage/sync_AppModePage.html',
    styleUrls: ['./components/sync_AppModePage/sync_AppModePage.css','./assets/css/Share.css'],
    providers: [
        
        // {
        //     provide: NG_VALUE_ACCESSOR,
        //     useExisting: forwardRef(() => sync_AppModePageComponent),
        //     multi: true,
        // },
    ],
})
@Injectable()
export class sync_AppModePageComponent implements OnInit{
    //mainapp:any;
    // @Input()
    //this.MouseBoxSelectionFn=new MouseBoxSelection();
    M_Light_APMode=new APModeModule(61);
    MouseBoxSelectionFn=new MouseBoxSelection();
    MouseMoveObjectFn=new MouseMoveObjectManager();
    LedColor=new CurrentColor("LedColor");
    switchEffectUI:boolean=false;
    KeyBoardStyle=new KeyBoardStyle();
    ImgPath=ImgPathList.getInstance();
    i18nManager=i18nManager.getInstance();
    Shares_F=SharesFunction.getInstance();
    DeviceService=DeviceService.getInstance();
    DeviceData=[];
    // public selectdata:any;
    AppsettingData:any;
    private onChangeCallback: (_: any) => void;
    private onTouchedCallback: () => void;
    //private zz: AlertDevice
    constructor(private mainapp: AppComponent,private changeDetectorRef: ChangeDetectorRef,
        private protocol: protocolService){
        //this.MouseMoveObjectFn.addMoveObject('KeyBoardUI2');                                                                                                                                                                                                                                                                                                 
        
        
        // this.MouseBoxSelectionFn.compareObjectArr.push({
        //     'name': '61M',
        //     'allBlockStatus': Array(61).fill(false),
        //     'allBlockColor': Array(61).fill('black'),
        // });
        // this.MouseBoxSelectionFn.compareObjectArr.push({
        //     'name': '61MupWhite',
        //     'allBlockStatus': Array(61).fill(false),
        //     'allBlockColor': Array(61).fill('black'),
        // });
        
        this.DeviceData=this.DeviceService.pluginDeviceData;
        console.log('%c SyncDeviceData','background: black; color: white',this);
        
        for (let index = 0; index < this.DeviceData.length; index++) {
            const element = this.DeviceData[index];
            this.MouseBoxSelectionFn.compareObjectArr.push({
                'name': element.devicename,
                'allBlockStatus': Array(this.KeyBoardStyle.getAssignTarget(element.devicename).keyMapping.length).fill(false),
                'allBlockColor': Array(this.KeyBoardStyle.getAssignTarget(element.devicename).keyMapping.length).fill('black'),
            });
            this.MouseMoveObjectFn.addMoveObject(element.devicename);
        }
    }
    ngAfterViewInit(){

        console.log("sync_AppModePageComponent_ngAfterViewInit");
        var arr_T =this.MouseBoxSelectionFn.compareObjectArr;
        for (let index = 0; index < arr_T.length; index++) {
            const element = arr_T[index];
            this.KeyBoardStyle.getAssignKBCssStyles(element.name);
        }
        this.addScaleEvent('ScrollContentArea');
        console.log('this.mainapp.CurrentPageName_1',this.mainapp.CurrentPageName);
        this.calculatorScroll();
        this.addColor_PickerEvent();

    }


    ngOnInit(){
    
    }

    ngOnChanges(){
        //this.Reinit();
    }

    
    RGBEyeClose(index){
        this.M_Light_APMode.recordModeArr[index].check=!this.M_Light_APMode.recordModeArr[index].check;
        //this.setAppModeToServer('RGBEyeClose');
    }
    public qSelect(data):void {
        //this.onChangeCallback();
        //this.onTouchedCallback();
    }
    OpenLeftDropDownListUI(Event: MouseEvent, index) {
        if (Event.button == 0) {
            if (this.M_Light_APMode.currentModeIndex == index) {
                var LightModeList = document.getElementById("LightModeList") as HTMLDivElement;
                this.switchEffectUI=true;
                LightModeList.style.left = Event.clientX - 10 + "px";
                LightModeList.style.top = Event.clientY - 10 + "px";
            }
        }

    }

    LEDModeSelect(event, index) {
        console.log("LEDModeSelect: ", event, index);
        this.M_Light_APMode.currentModeIndex = index;
        //this.M_Light_APMode.switchEffectMode = this.M_Light_APMode.recordModeArr[index];

        if (this.M_Light_APMode.getTarget().name == "Fire") {
            this.LedColor.currentRecordIndex = 0;
        }
        this.M_Light_APMode.updateframe_selection_range();
        //this.setAppModeToServer('LEDModeSelect');
    }
    switchEffectMode(i){
        this.M_Light_APMode.switchEffectMode(i);
        //this.changeDetectorRef.detectChanges();
        //this.RGBMode=  this.M_Light_APMode.recordModeArr[this.M_Light_APMode.currentModeIndex];
        this.M_Light_APMode.updateframe_selection_range();
        //this.setAppModeToServer('switchEffectMode');
        this.switchEffectUI=false;
        //this.EffectCenter.selectEffectCenter=false;

    }
    switchMouseEvent(text){
        if(text=='MME'){
            //console.log('Enter_SMM',this.MouseMoveObjectFn.MouseMoveObjectArr[0].fnEanble);

        this.MouseMoveObjectFn.setAllMoveObjectfnEanble(!this.MouseMoveObjectFn.MouseMoveObjectArr[0].fnEanble);
        this.MouseBoxSelectionFn.fnEanble=false;    
        }
        if(text=='MBS'){
            //console.log('Enter_MSB',this.this.MouseBoxSelectionFn.fnEanble);

        this.MouseBoxSelectionFn.fnEanble=!this.MouseBoxSelectionFn.fnEanble; 
        this.MouseMoveObjectFn.setAllMoveObjectfnEanble(false);
        }
        this.MouseMoveObjectFn.setAllMoveObject(); 

        this.MouseBoxSelectionFn.switchMouseEvent('ScrollArea');


        this.MouseMoveObjectFn.switchShowBtn(document.getElementById('SwitchMouseMove'))
        this.MouseBoxSelectionFn.switchShowBtn(document.getElementById('SwitchMouseBoxSelection'))
        //document.getElementById('SwitchMouseMove').value = this.MouseMoveObjectFn.MouseMoveObjectArr[0].fnEanble;

    }
    LedColorhueChange(){
        this.LedColor.HSL_RGB_HexSet();
        this.LedColor.setGradientBGcolor();
        //this.showCustomTestDataWindows(this.LedColor);
    }
    colorPickerFnArrP1:any=[];
    addColor_PickerEvent() {

        var parentDiv = document.getElementById('LedColorPickingArea');
        this.colorPickerFnArrP1[0]=(oEvent:MouseEvent) => {

            this.LedColor.mousedown(oEvent);
            this.updateColorBlock();  //by colorPicker 
            this.colorPickerFnArrP1[1]=(oEvent:MouseEvent) => {
                this.LedColor.mousemove(oEvent);      
                this.updateColorBlock(); //by colorPicker          
               //this.showCustomTestDataWindows(this.LedColor);
            };

            document.addEventListener("mousemove", this.colorPickerFnArrP1[1]);
            document.addEventListener("mouseup", ()=>{
                document.removeEventListener("mousemove", this.colorPickerFnArrP1[1]);
            });
        };
        parentDiv.addEventListener("mousedown", this.colorPickerFnArrP1[0]);
  
       

    }
    updateColorBlock(){
        this.LedColor.HSL_RGB_HexSet();
        this.LedColor.setGradientBGcolor(); 
        this.M_Light_APMode.getTarget().colors[this.LedColor.currentRecordIndex]=this.LedColor.Hex;
        //var target=LedColor;
        //switch (this.CurrentPageName) {
        //case "LIGHTINGSETTING":
        //this.setAppModeToServer('byP1');//by updateColorBlock
        // break;
        //}
    }
    removeAllSyncEvent(){
        this.MouseBoxSelectionFn.fnEanble=false;    
        this.MouseMoveObjectFn.setAllMoveObjectfnEanble(false);
        this.MouseMoveObjectFn.setAllMoveObject(); 
        this.MouseBoxSelectionFn.switchMouseEvent('ScrollArea');
        console.log('this.mainapp.CurrentPageName_1',this.mainapp.CurrentPageName);

        //var list = document.getElementsByTagName("sync_AppModePage")[0];

        
        this.mainapp.setPageIndex('KEYBOARDSETTINGS');
        console.log('this.mainapp.CurrentPageName_2',this.mainapp.CurrentPageName);
        //this.mainapp.setDetectChangesRefresh(); 
        //this.changeDetectorRef.detectChanges(); 

    }

 
    addScaleEvent(targetName) {
        document.addEventListener('keydown', (e) => {
            if (e.code == "NumpadAdd") {
                scaleConfig.scaleMultiple += 0.1;
                document.getElementById(targetName).style.transform = "scale(" + scaleConfig.scaleMultiple + ")"
                this.calculatorScroll();

            }
            if (e.code == "NumpadSubtract") {
                scaleConfig.scaleMultiple -= 0.1;

                document.getElementById(targetName).style.transform = "scale(" + scaleConfig.scaleMultiple + ")"
                this.calculatorScroll();
            }
        }) 

    }
    calculatorScroll() {

        var ScrollArea = document.getElementById("ScrollArea");
        ScrollArea.scrollTop = (getMatchedCSS("ScrollContentArea", "height") *  scaleConfig.scaleMultiple - getMatchedCSS("ScrollArea", "height")) / 2;
        ScrollArea.scrollLeft = (getMatchedCSS("ScrollContentArea", "width") *  scaleConfig.scaleMultiple - getMatchedCSS("ScrollArea", "width")) / 2;;
        this.MouseMoveObjectFn.setScaleConfig(scaleConfig);
        this.MouseBoxSelectionFn.setScaleConfig(scaleConfig);

    }
    //ScaleEventFn.addScaleEvent('ScrollContentArea');
 
    showChild_SyncData(){
        console.log('Enter_MSB',this.MouseBoxSelectionFn.fnEanble);

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

    setSyncColorDataToServer(from="未設置") {
        console.log("setAppModeToServer_"+from);

        //---------------SyncLEDData------------
        // this.changeDetectorRef.detectChanges();
        let apmodesetting = {
            EffectLibrary: this.M_Light_APMode.recordModeArr
            
        }
        let obj3 = {
            Type: 'SyncColorData',
            Func: 'setSyncColorDataToServer',
            Param: apmodesetting
        }
        this.protocol.RunSetFunction(obj3).then((data) => {
        })
    }
    // public writeValue(obj: any): void {
    //     // throw new Error("Method not implemented.");
    //     var lcsekected;
    //     var x = document.getElementsByClassName("sync_AppModePage");
      
    // }
    // public registerOnChange(fn: any): void {
    //     // throw new Error("Method not implemented.");
    //     this.onChangeCallback = fn;
    // }
    // public registerOnTouched(fn: any): void {
    //     // throw new Error("Method not implemented.");
    //     this.onTouchedCallback = fn;
    // }
}