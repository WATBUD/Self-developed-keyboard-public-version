import { Injectable } from '@angular/core';
let electron_Instance = window['System']._nodeRequire('electron').remote; 
@Injectable()
export class DeviceService{
    pluginNoDeviceData =[];
    NoDeviceindex=0;
    pluginDeviceData=[];
    dbService = electron_Instance.getGlobal('AppProtocol').deviceService.nedbObj
    currentDevice = {
        "DeviceId": 0,
        "ModelType":2,
        "SN": '0x1EA70x9018',
        "StateID": -1,
        "deviceData": {},
        "devicename": "MODEL O WIRELESS",
        "pid": ["0x2011", "0x2022"],
        "profile": [{}, {}, {}],
        "version_Wired": "00.03.01.00",
        "version_Wireless": "00.03.01.00",
        "vid": ["0x258A", "0x258A"],
    }
    static instance=undefined;
    constructor(
    ) {
        DeviceService.instance=this;
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            console.log('%c DeviceService_Instance_err','background: red; color: white');
        }
    }

    getDevicePageindex(){
      //console.log('%c getDevicePageindex','background: red; color: white', this.pluginNoDeviceData[this.NoDeviceindex]);
      if(this.pluginNoDeviceData.length<1){
        return [];
      }
      else{
        return this.pluginNoDeviceData[this.NoDeviceindex];
      }
    }
   

    checkDeviceExists(CheckName) {
        if(this.pluginDeviceData==undefined){
            return false;
        }
        var target = this.pluginDeviceData;
        console.log(' DeviceService.checkDeviceExists',target,this.pluginDeviceData);

        for (let index = 0; index < target.length; index++) {
            //const element = target[index];&& 
            if (target[index].devicename == CheckName) {
                this.currentDevice=target[index];
                console.log(' DeviceService.currentDevice',this.currentDevice);
                return true;
            }
        }
    }


    getDevice() {
        return new Promise((resolve,reject) => {
            let TempData = JSON.parse(JSON.stringify((this.pluginDeviceData)));
            let AllDeviceData = [];
            this.dbService.getPluginDevice().then((data) => {
                //var data=JSON.parse(JSON.stringify(temp_data));
                console.log('dbservice_getPluginDevice()',data);
                for(let i of data[0].Mouse){
                    AllDeviceData.push(i);
                }
                for(let i of data[0].Keyboard){
                    AllDeviceData.push(i);
                }
                for(let i of data[0].Headset){
                    AllDeviceData.push(i);  
                }
                var obj=[];
                var tempNodevice=[];
                let count = 1;
                var tempindex=0;
                this.dbService.getAllDevice().then((data) => {
                    this.pluginDeviceData = JSON.parse(JSON.stringify(AllDeviceData));
                    var data=JSON.parse(JSON.stringify(data));
                    console.log(' this.dbservice.getAllDevice().then',data)
                    this.pluginNoDeviceData =[[true,true,true],[true,true,true]];
                    for(let i = 0; i < this.pluginDeviceData.length; i++) {
                        let index = data.findIndex(x => x.SN == this.pluginDeviceData[i].SN)
                        let TempDataIndex = TempData.findIndex(x => x.SN == this.pluginDeviceData[i].SN)
                        if(index != -1 && TempDataIndex == -1)
                            this.pluginDeviceData[i].deviceData = data[index];
                        else if(TempDataIndex != -1)
                            this.pluginDeviceData[i] = TempData[TempDataIndex]

                        if(count % 3 == 0) {
                            count=1;
                            tempindex+=1;
                            // obj.push(true);
                            // tempNodevice.push(obj);
                            // obj = [];
                        } else {
                            //obj.push(false);
                        }
                        this.pluginNoDeviceData[tempindex][count]=false;
                        count++;
                    }
                    console.log('%c pluginNoDeviceData','background: red; color: white', this.pluginNoDeviceData);
                    // for (let index = 0; index < tempNodevice.length; index++) {
                    //     const element = tempNodevice[index];
                    //     for (let i2 = 0; i2 < element.length; i2++) {
                    //         this.pluginNoDeviceData[index][i2]=true;
                    //     }
                    // }

                    //this.getDeviceForUI();
                    resolve();
                })
            })

        });
    }

}
