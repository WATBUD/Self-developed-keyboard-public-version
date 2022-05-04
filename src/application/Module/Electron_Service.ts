declare var System;
let NeDB;
let evtVar;
let funcVar;
let env;
let electron_Instance;
let ipcRenderer;
let electronSelf;
let tool;
let _nodeRequire_fs; 

try {
    _nodeRequire_fs = window['System']._nodeRequire('fs'); 
    tool = System._nodeRequire('./backend/others/tool')
    electron_Instance = window['System']._nodeRequire('electron').remote;
    ipcRenderer = System._nodeRequire('electron').ipcRenderer;
    evtVar = System._nodeRequire('./backend/others/EventVariable').EventTypes;
    funcVar = System._nodeRequire('./backend/others/FunctionVariable');
    env = System._nodeRequire('./backend/others/env');
    NeDB = window['System']._nodeRequire('electron').remote.getGlobal('AppProtocol').deviceService.nedbObj;
}
catch (error) {
    //console.log('%c _nodeRequire_err','background: red; color: white',error);
}
export class Electron_Service {
    protocol: any;
    static instance = undefined;
    constructor() {
        try {
            this.protocol = electron_Instance.getGlobal('AppProtocol');
        }
        catch (error) {
            console.log('%c protocol', 'background: red; color: white', this.protocol);
        }

        Electron_Service.instance = this;
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            console.log('%c GetAppService_err', 'background: red; color: white');
        }
    }

    specifyTheDesiredFunction(fNname = "") {
        console.log('%c specifyTheDesiredFunction', 'background: red; color: white', fNname);
        if (this.protocol != undefined) {
            this[fNname]();
        }
    }

    zoomApplication() {
        var window = electron_Instance.BrowserWindow.getFocusedWindow();
        window.minimize();
    }
    quitApplication() {
        var window = electron_Instance.BrowserWindow.getFocusedWindow();
        window.hide();
    }
    initializeUIDone() {
        let DataContent = {
            Type: this.getFuncVar().FuncType.System,
            Func: this.getFuncVar().FuncName.InitializeUIDone,
            Param: ""
        }
        this.RunSetFunction(DataContent).then((data) => {//=>to AppProtocol=>electron.js
        });
    }
    quitApp() {
        const content = {
            func: "ScreenSize",
            width: 1440,
            height: 900,
        }
        let DataContent = {
            Type: this.getFuncVar().FuncType.System,
            Func: "QuitApp",//correspond electron.js in line 256 name register event 
            Param: ""
        }
        console.log('changeWinSystemTaskBar:', DataContent);

        this.RunSetFunction(DataContent).then((data) => {//=>to AppProtocol=>electron.js

        });
    }
    //FB IG Mail 论坛 官网 推特 微信 微博
    HyperLinkGO(index) {
        console.log("Enter_customHyper_Link", ipcRenderer.cp, ipcRenderer, ipcRenderer.remote);
        switch (index) {
            case 0:
                ipcRenderer.send("customHyper_Link", "https://www.facebook.com/");
                break;
            case 1:
                ipcRenderer.send("customHyper_Link", "https://www.instagram.com/");
                break;
            case 2:
                ipcRenderer.send("customHyper_Link", "mailto:market@email.com");
                break;
            case 3:
                ipcRenderer.send("customHyper_Link", "https://www.google.com");
                break;
            case 4:
                ipcRenderer.send("customHyper_Link", "https://google.com");
                break;
            case 5:
                ipcRenderer.send("customHyper_Link", "https://twitter.com");
                break;
            case 6:
                ipcRenderer.send("customHyper_Link", "https://wx.qq.com/");
                break;
            case 7:
                ipcRenderer.send("customHyper_Link", "https://www.weibo.com/");
                break;

        }
    }
    changeWinSystemTaskBar(InputData) {
        const content = {
            func: "ScreenSize",
            width: 1440,
            height: 900,
        }
        let DataContent = {
            Type: this.getFuncVar().FuncType.System,
            Func: this.getFuncVar().FuncName.ChangeWindowSize,//correspond electron.js in line 256 name register event 
            Param: InputData
        }
        var objlog = {
            "dotype": InputData,
            "obj2": DataContent,
        }
        console.log('changeWinSystemTaskBar:', objlog);

        this.RunSetFunction(DataContent).then((data) => {//=>to AppProtocol=>electron.js

            env.log('Hdpage', 'quit', 'finished');
        });
    }

    get_nodeRequire_fs() {
        return _nodeRequire_fs;
    }


    getTool() {
        return tool;
    }

    getElectronSelf() {
        return electronSelf;
    }

    getElectron_Instance() {
        return electron_Instance;
    }
    get_NeDB() {
        return NeDB;
    }
    getFuncVar() {
        return funcVar;
    }
    getEvtVar() {
        return evtVar;
    }
    getEnv() {
        return env;
    }
    inTheElectronFramework() {
        if (this.protocol != undefined) {
            return true;
        }
        else {
            return false;
        }
    }


    public RunSetFunction(obj: any) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var Obj1 = { Type: obj.Type, Func: obj.Func, Param: obj.Param, SN: obj.SN };
            return _this.protocol.RunFunction(Obj1, (err, data) => {
                //callback(err); 
                resolve(err);
                // console.log('RunSetFunction2',obj);
                // console.log('RunSetFunction2',err);
                // console.log('RunSetFunction2',data);
            });
        });
    }


}