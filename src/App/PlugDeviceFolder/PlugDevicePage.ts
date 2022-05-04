declare var System;
import { Component ,OnInit ,Output,Input ,EventEmitter, SimpleChange, OnChanges
    , ViewEncapsulation, forwardRef,ChangeDetectorRef, ViewChild
,Injectable} from '@angular/core';
import { AppComponent } from '../app.component';
import { protocolService } from '../../services/service/protocol.service';
import { ColorModule,MacroManager,Wave,KeyBoardManager,KeyBoardStyle,LedChainFramesManager,
    AssociateManager,EffectCenter,KeyShortcut,AlertDevice,EventManager,i18nManager,FirewareManager,ImgPathList,ColorOutput  
    ,count_boolean,CreateFakeArray,SharesFunction,ProgressBar,getMatchedCSS,DeviceService,
} from '../TSImportManager';
let funcVar = System._nodeRequire('./backend/others/FunctionVariable');
let remote = System._nodeRequire('electron').remote;
//var this.MouseBoxSelectionFn=new MouseBoxSelection();AppComponent,
var scaleConfig = {
    scaleMultipleConfig: [0.25, 0.5, 1, 2, 4],
    scaleMultiple: 0.2,
}
@Component({
    selector: 'PlugDevicePage',
    templateUrl : './components/PlugDeviceFolder/PlugDevicePage.html',
    styleUrls: ['./components/PlugDeviceFolder/PlugDevicePage.css','./assets/css/Share.css'],
    providers: [],
})
@Injectable()
export class PlugDevicePageComponent implements OnInit{
      
    //mainapp:any;
    // @Input()
    //private mainapp: AppComponent,
    mainApp= AppComponent.getInstance();
    i18nManager=i18nManager.getInstance();
    ImgPath=ImgPathList.getInstance();
    DeviceService=DeviceService.getInstance();
    private onChangeCallback: (_: any) => void;
    private onTouchedCallback: () => void;
    constructor(private changeDetectorRef: ChangeDetectorRef,
        private protocol: protocolService){
        //this.MouseMoveObjectFn.addMoveObject('KeyBoardUI2')
        console.log('%c PlugDevicePageComponentInitial','background: red; color: white');

    }
    ngAfterViewInit(){

        
    }
    ngOnInit(){  
    }

    ngOnChanges(){
        //this.Reinit();
    } 

}