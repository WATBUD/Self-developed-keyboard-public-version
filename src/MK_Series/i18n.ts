//1暫定為真值
import { Injectable } from '@angular/core';
declare var System;
let i18n_File = System._nodeRequire('./i18n/i18n_Localization');
// Simon:
// 英文版本不显示微信微博
// Simon:
// 中文版本不显示FB,IG,推特
//FB IG Mail 论坛 官网 推特 微信 微博
var lostList=[];
@Injectable()
export class i18nManager {
    previousLangindex=0;
    onUsingLangindex=0;
    autoStart=[true,true];//0為狀態假值 1為真值
    recovery=[false,false];//0為狀態假值 1為真值
    //currentLanguagesTxt ='EN' //DE德國
    langList=['EN','CH','CN'];
    constructor(){
        i18nManager.instance=this;
    }

    static instance=undefined;
    static getInstance() {
        if (this.instance) {
            return this.instance;
		} 
		else{
            this.instance = new i18nManager();
            console.log('%c i18nManager_getInstance_err','background: blue; color: red');
            return this.instance;
		}

		
    }

    setOnUsingLangindex(setIndex){
        this.previousLangindex=this.onUsingLangindex;
        this.onUsingLangindex=setIndex;
    }
    setlangList(setLangList){
        if(setLangList){
            this.langList=[];
        }
    }
    geti18nType(){
        var target=this.langList[this.onUsingLangindex]
        if(target){
            //console.log('geti18nType',target);
            return target;
        }
        else{
            console.log('geti18nType_null',this.langList,this.onUsingLangindex);
        }
    }


    getTarget(keyName){
        if(i18n_File.i18n_Localization[keyName]!=undefined){
        var T=i18n_File.i18n_Localization[keyName][this.geti18nType()];
        //console.log('i18n_Localization[keyName]',keyName,this.onUsingLangindex,T,this.langList);
        return T;
        }
        if(lostList.find(e=>e==keyName)){
        }
        else{
            console.log('Lost_i18n_Localization[keyName]',keyName);
        }
        lostList.push(keyName);

        return '';
    }

    update(){
        //this.onUsingLangindex=this.previousLangindex;
        this.autoStart[1]=this.autoStart[0];
        this.recovery[1]=this.recovery[0];
    }
    back(){
        this.onUsingLangindex=this.previousLangindex;
        this.autoStart[0]=this.autoStart[1];
        this.recovery[0]=this.recovery[1];
    }

}


