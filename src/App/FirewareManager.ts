

import { Injectable } from '@angular/core';
@Injectable()
export class FirewareManager {
    chooseDeviceIndex=0;
    FwServerData=[];
    // FwServerData=[{
    //     "Device": 5,
    //     "OldVersion": 1.41,
    //     "NewVersion": 1.41,
    //     "SN": "0x1EA70x9005",
    //     "devicename": "SoftWare",
    //     "Text": "You Already Have Latest Version",
    //     "FWUpdate": true,
    //     "ReadReleasenote": [
    //       "Fixed bugs:<br> 1. Added Report rate function, the first byte of 08 02.<br> 2. Modified the value of LED_Status, changed 3 segments to 1, 2, 3。",
    //       "已修正问题：<br>1. 新增 FN2 FN2功能。"
    //     ]
    // }];
    onFireWareUI: Boolean =false;
    nowVersion:String="";
    version:String="";
    FWUpdating: Boolean =false;
    updateContent:any=["連接失敗","連接失敗","連接失敗"];


    getTarget(){
       if(this.FwServerData.length>0)
       return this.FwServerData[this.chooseDeviceIndex];
    }
    getAssign(i){
      
        
    }
    checkHasUpdate(){
        return this.FwServerData.some(x => x.FWUpdate==true); //false
    }
    checkHasDeviceName(){
        if(this.FwServerData.length>0){
            this.onFireWareUI=true;
        }
    }
    InputFwServerData(inputData){
      this.chooseDeviceIndex=0;
      this.FwServerData=[];
      for (let index = 0; index < inputData.length; index++) {
          const element = inputData[index];
          this.FwServerData.push(element);
      }
      if(this.checkHasUpdate()){
        this.onFireWareUI=true;
      }
      
      //var temp_data = this.KeyBoardStyle.getTarget();
      console.log('%c InputFwServerData', 'color:rgb(0,0,255,1)', this.FwServerData);
    }


}
