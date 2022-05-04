declare var System;
import { Component ,OnInit ,Output,Input ,EventEmitter, SimpleChange, OnChanges
    , ViewEncapsulation, forwardRef,ChangeDetectorRef, ViewChild
,Injectable} from '@angular/core';
import { AppComponent } from '../app.component';
import { i18nManager,ImgPathList} from '../TSImportManager';
import { DeviceService } from '../DeviceService';

//var this.MouseBoxSelectionFn=new MouseBoxSelection();AppComponent,
var scaleConfig = {
    scaleMultipleConfig: [0.25, 0.5, 1, 2, 4],
    scaleMultiple: 0.2,
}
@Component({
    selector: 'PlugDevicePage',
    templateUrl : './PlugDevicePage.html',
    styleUrls: ['./PlugDevicePage.css','../css/Share.css'],
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
    DeviceService;
    private onChangeCallback: (_: any) => void;
    private onTouchedCallback: () => void;
    constructor(private changeDetectorRef: ChangeDetectorRef,){
        //this.MouseMoveObjectFn.addMoveObject('KeyBoardUI2')
        console.log('%c PlugDevicePageComponentInitial','background: red; color: white');
        this.DeviceService=DeviceService.getInstance();

    }
    ngAfterViewInit(){

        
    }
    ngOnInit(){  
    }

    ngOnChanges(){
        //this.Reinit();
    } 

}