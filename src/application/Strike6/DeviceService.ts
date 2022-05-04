import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { AppSettingService } from './AppSettingService';
let globalDB;
let electron_Instance; 
let Setting
try {
    globalDB = window['System']._nodeRequire('./backend/dbapi/AppDB.js');
    Setting = window['System']._nodeRequire('./backend/others/Setting');
    electron_Instance = window['System']._nodeRequire('electron').remote; 
}
catch (error) {
    //console.log('%c _nodeRequire_err','background: red; color: white',error);
}
@Injectable()
export class DeviceService{
    pluginNoDeviceData =[];
    NoDeviceindex=0;
    pluginDeviceData=[];
    AppSettingService= AppSettingService.getInstance();
    dbServiceBackEnd;
    dbService;
    // this.dbService.zzzz="zzzzzzzzzzzzzzzzz";
    // private http:Http;
    nowDeviceName="";
    currentDevice = {
        "DeviceId": 0,
        "ModelType":2,
        "SN": '0x1EA70x9018',
        "StateID": -1,
        "deviceData": {},
        "devicename": "MODEL O WIRELESS",
        "pid": ["0x2011", "0x2022"],
        "profile": [{}, {}, {}],
        "version_Wired": "",
        "version": "",
        "version_Wireless": "",
        "vid": ["0x258A", "0x258A"],
    }
    FWManager=new FirewareManager();
    static instance=undefined;
    constructor(private http: HttpClient
    ) {
        DeviceService.instance=this;
        try {
            this.dbServiceBackEnd = electron_Instance.getGlobal('AppProtocol').deviceService.nedbObj;
            this.dbService= globalDB.getInstance();
        }
        catch (error) {
            console.log('%c _nodeRequire_err','background: red; color: white',error);
        }
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
    getCurrentDevice(){
        var target = this.pluginDeviceData;
        //console.log('DeviceService.getCurrentDevice',target);
        try { 
            for (let index = 0; index < target.length; index++) {
                //const element = target[index];&& 
                if (target[index].devicename == this.nowDeviceName) {
                    return target[index];
                }
            }
            return this.currentDevice;
        } catch (error) {
            console.log('%c getCurrentDevice.Error', 'color:rgb(255,75,255,1)', error);
        }
       
    }
    checkDeviceExists(CheckName) {
        var target = this.pluginDeviceData;
        console.log(' DeviceService.checkDeviceExists',target);

        for (let index = 0; index < target.length; index++) {
            if (target[index].devicename == CheckName) {
                this.nowDeviceName=CheckName;
                return true;
            }
        }
    }
    getDevice() {
        return new Promise((resolve,reject) => {
            let oldPluginDeviceData = JSON.parse(JSON.stringify((this.pluginDeviceData)));
            let AllDeviceData = [];
            var data=this.dbServiceBackEnd.AllDBtempData.getPluginDevice;
                console.log('dbservice_getPluginDevice()',data);
                for(let i of data.Mouse){
                    AllDeviceData.push(i);
                }
                for(let i of data.Keyboard){
                    AllDeviceData.push(i);
                }
                for(let i of data.Headset){
                    AllDeviceData.push(i);  
                }
                let count = 1;
                var tempindex=0;
                this.dbService.getAllDevice().then((data) => {
                    var newPluginData = AllDeviceData;
                    var getAllDeviceData=data;
                    //var getAllDeviceData=JSON.parse(JSON.stringify(this.dbService.AllDBtempData.getDevice));
                    console.log(' this.dbservice.getAllDevice().then',getAllDeviceData)
                    this.pluginNoDeviceData =[[true,true,true],[true,true,true]];
                    for(let i = 0; i < newPluginData.length; i++) {
                        let index = getAllDeviceData.findIndex(x => x.SN == newPluginData[i].SN)
                        let oldDataCheck = oldPluginDeviceData.findIndex(x => x.SN == newPluginData[i].SN)
                        if(index != -1 && oldDataCheck == -1)//舊裝置存在 舊Plugin不存在
                            newPluginData[i].deviceData = getAllDeviceData[index];
                        else if(oldDataCheck != -1){// 舊Plugin存在
                            oldPluginDeviceData[oldDataCheck].version=newPluginData[i].version;
                            newPluginData[i] = oldPluginDeviceData[oldDataCheck];
                        }
                        if(count % 3 == 0) {
                            count=1;
                            tempindex+=1;
                        }
                        this.pluginNoDeviceData[tempindex][count]=false;
                        count++;
                    }
                    this.pluginDeviceData = newPluginData;
                    console.log('%c newPluginData','background: red; color: white', newPluginData);

                    console.log('%c pluginDeviceData','background: red; color: white', this.pluginDeviceData);

                    // console.log('%c pluginNoDeviceData','background: red; color: white', this.pluginNoDeviceData);
                    resolve();
                })
        });
    }


    /**
     * Click check for update buttom
     */
    CheckforUpdates() {
        if(this.FWManager.update_UI_Status==true){
            return;
        }
        this.FWManager.FwServerData = [];
        this.FWManager.chooseDeviceIndex=0;
        this.getAssignURL_json(Setting.getUpdateUrl()).subscribe((data) => {
            console.log('getAssignURL_json_subscribe', data,this.pluginDeviceData);
            //this.FWManager.FwServerData[0].newVersion=data.AppSetting.version;
            for (let index = 0; index < this.pluginDeviceData.length; index++) {
                const deviceTarget = this.pluginDeviceData[index];
                data.Mouse.forEach(element => {
                    if (element.SN == deviceTarget.SN) {
                        if(this.FWManager.versionCompare(element.version_Wired,deviceTarget.version_Wired,2)==1){
                            element.name=deviceTarget.devicename;
                            element.battery=deviceTarget.deviceData.battery;
                            this.FWManager.FwServerData.push(element);
                            return;
                        }
                        if(this.FWManager.versionCompare(element.version_Wireless,deviceTarget.version_Wireless,2)==1){
                            element.name=deviceTarget.devicename;
                            element.battery=deviceTarget.deviceData.battery;
                            this.FWManager.FwServerData.push(element);
                            return;
                        }                   
                    }       
                });
                data.Keyboard.forEach(element => {
                    if (element.SN == deviceTarget.SN) {
                        if(this.FWManager.versionCompare(element.version_Wired,deviceTarget.version_Wired,2)==1){
                            element.name=deviceTarget.devicename;
                            this.FWManager.FwServerData.push(element);
                            return;
                        }
                    }                         
                });
            }
            
            if(this.FWManager.versionCompare(data.AppSetting.version,this.AppSettingService.getAppSetting().version,2)==1){

                this.FWManager.FwServerData.push(data.AppSetting);
             }       
            if(this.FWManager.FwServerData.length>0){
                console.log('getAssignURL_json_FwServerData',this.FWManager.FwServerData);
                //this.getAppService.hasUpdateTip=true;
                this.FWManager.setUpdateUIStatus("CHECK_DOWNLOAD");
            }
            else{
                this.FWManager.setUpdateUIStatus("");
            }
        },(error) => {
        console.error('getAssignURL_json_subscribe資料錯誤');
        })
    }


    getAssignURL_json(URL) :Observable<any>{
        console.log('getAssignURL_json_URL',URL);
		return this.http.get(URL)
        .timeout(3000)
        .map((res: Response) => {
            console.log('getAssignURL_json_map',res);
            let resJson = res.json();
            return resJson;
        })
        .catch((error: Response) => {
            console.log('getAssignURL_json_error',error);
            return Observable.throw(error.json());
        });     
	} 

    /**
     * Click Retry Firmware Update
     */
    CheckForceUpgrade() {
        this.FWManager.forceUpgradeData=[];
        this.FWManager.forceUpgradeIndex=0;
        this.getAssignURL_json(Setting.getUpdateUrl()).subscribe((data) => {
            console.log('CheckForceUpgrade', data,this.pluginDeviceData);
            //this.FWManager.FwServerData[0].newVersion=data.AppSetting.version;
            for (let index = 0; index < this.pluginDeviceData.length; index++) {
                const deviceTarget = this.pluginDeviceData[index];
                data.Mouse.forEach(element => {             
                    if (element.SN == deviceTarget.SN) {
                        element.name=deviceTarget.devicename;
                        element.battery=deviceTarget.deviceData.battery;
                        this.FWManager.forceUpgradeData.push(element);                 
                    }       
                });
                data.Keyboard.forEach(element => {
                    if (element.SN == deviceTarget.SN) {
                        element.name=deviceTarget.devicename;
                        element.battery=deviceTarget.deviceData.battery;
                        this.FWManager.forceUpgradeData.push(element);  
                    }                         
                });
            }
            if(this.FWManager.forceUpgradeData.length>0){
                console.log('forceUpgradeData',this.FWManager.forceUpgradeData);
                this.FWManager.setUpdateUIStatus("Check_ForceUpgrade");
            }
            else{
                this.FWManager.setUpdateUIStatus("");
            }
        },(error) => {
        console.error('getAssignURL_json_subscribe資料錯誤');
        })
    }

    private msTimeout: number=3000; 

    

}

export class FirewareManager {
    chooseDeviceIndex=0;
    FwServerData=[];
    forceUpgradeData=[];
    forceUpgradeIndex=0;
    UIStatus="";
    update_UI_Status=false;
    /*
    * getNowTargetData
    */
    getTarget(){
       if(this.FwServerData.length>0)
       return this.FwServerData[this.chooseDeviceIndex];
    }

    /*
    * getforceTarget
    */
    getforceTarget(){
        return this.forceUpgradeData[this.forceUpgradeIndex];
     }

    /*
    * reset Var
    */
    reset(){
        this.chooseDeviceIndex=0;
        this.FwServerData=[];
    }

    /*
    * checkHasUpdate
    */
    checkHasUpdate(){
        for (let index = 0; index < this.FwServerData.length; index++) {
            if(!this.FwServerData[index].tryToUpdate){     
                return "YES"
            } 
        }
        return "NO"
    }

    /**
    *compare version
    * @param version number:A version
    * @param targetVersion number:B version
    * @param exponent number:exponent 
    * return result:
    * 0: is equal to
    * 1: is more than
    * -1: is less than
    */
    versionCompare(version, targetVersion, exponent) {
        var getVersionNumber, length;
        exponent = exponent || 2;
        if (!version || !targetVersion) {
            console.log('Need two versions to compare!',version,targetVersion);
            throw new Error('Need two versions to compare!');
        }
        if (version === targetVersion) {
            return 0;
        }
        length = Math.max(version.split('.').length, targetVersion.split('.').length);
        let self = this;
        getVersionNumber = (function (length, exponent) {
            return function (version) {
                return self.versionToNumber(version, length, exponent);
            };
        })(length, exponent);
        version = getVersionNumber(version);
        targetVersion = getVersionNumber(targetVersion);
        return version > targetVersion ? 1 : (version < targetVersion ? -1 : 0);
    }

    /*
    * format version
    */
    versionToNumber(version, length, exponent) {
        let arr;
        if (arguments.length < 3) {
            return 0;
        }
        arr = version.split('.');
        version = 0;
        arr.forEach(function (value, index, array) {
            version += value * Math.pow(10, length * exponent - 1);
            length--;
        });
        return version;
    }
        /**
     * Type option
     * 1.CHECK_DOWNLOAD
     * 2.Downloading
     * 3.ConfirmInstall
     * 4.Installing
     * 5.FailMessage
     * 6.SuccessMessage
     */
    contentUIStatus="";
    setUpdateUIStatus(TypeOption){
        if(TypeOption==""){
            this.setupdate_UI_Status(false);
        }
        else{
            this.setupdate_UI_Status(true);
        }
        if(this.checkHasUpdate()=="NO"){
            //this.getAppService.hasUpdateTip=false;
        }
        this.contentUIStatus=TypeOption;
        console.log('this.setContentUI',this.contentUIStatus)

    }
    setupdate_UI_Status(value){
        this.update_UI_Status=value;
        console.log('this.update_UI_Status',this.update_UI_Status)
    }
}