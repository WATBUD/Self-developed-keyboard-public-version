declare var System;
import { Injectable, EventEmitter } from '@angular/core';
let remote = window['System']._nodeRequire('electron').remote;
let evtVar = window['System']._nodeRequire('./backend/others/EventVariable');
let funcVar = window['System']._nodeRequire('./backend/others/FunctionVariable');
let env = window['System']._nodeRequire('./backend/others/env');

@Injectable()
export class protocolService {
   protocol: any;
   constructor() {
      this.protocol = remote.getGlobal('AppProtocol');
   }

   public RunSetFunction(obj: any) {
      var _this = this;
      return new Promise(function (resolve, reject) {
         var Obj1 = { Type: obj.Type, Func: obj.Func, Param: obj.Param , SN: obj.SN};
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
