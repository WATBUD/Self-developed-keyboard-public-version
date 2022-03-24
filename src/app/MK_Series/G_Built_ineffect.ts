// 隨波逐流(默認)-----WAVE_1
// 彩虹輪盤-------------Rainbow
// 百花爭艷-------------MIX_3
// 繁星點點-------------MIX_2
// 踏雪無痕-------------無對應
// 川流不息-------------無對應
// 光譜循環-------------Acid_Mode
// 呼吸模式-------------Breating
// 常亮模式-------------Normally
// 漣漪擴散-------------Ripple_Graff
// 如影隨形-------------Without_Trace
// 一觸即發-------------Fast_Run_Without_Trace
// 正旋光波-------------Heartbeat_Sensor
// 雨中漫步-------------Digital_Times


import { Injectable } from '@angular/core';
@Injectable()
export class ModeParameter {
    color_quantity:number=1;
    translate="";
    PointEffectName;
    Multicolor=false;
    currentColorsIndex=0;
    brightness=100;
    colors= ["#ff0000","#ff8000","#80ff00","#00ff00","#00ffff","#0000ff","#8000ff","#ff00ff","#ff0080","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"];
    speed=1;
    iconpath:any=["./image/ColorSet/Off/Cycle.png","./image/ColorSet/On/Cycle.png"];
    ParameterNumberList=[
        {   
            visible:true,
            translate: 'SPEED', 
            maxValue:3,
            minValue:1,
            setValue:1,
            field:'speed',
            
        },
    ] 
    ParameterBoolList=[
        {   
            visible:false,
            translate: 'SEPARATE',
            setValue:false,
            field:'separate',
        },
    ] 
    constructor (...theArgs:any){
        this.translate=theArgs.translate;
    }
}
export class Wave extends ModeParameter{

    constructor (){
        super();
        this.translate='Wave';
        this.PointEffectName='WaveSync';
        this.colors= ["#ff0000","#ff8000","#80ff00","#00ff00","#00ffff","#0000ff","#8000ff","#ff00ff","#ff0080","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"];
    }

};
class Neon_stream extends ModeParameter{
    constructor (){
        super();   
        this.translate='Neon_stream';
        this.PointEffectName='Neon_stream';
        this.colors= ["#ff0000","#ff8000"];
        
    }
};

class Starlight extends ModeParameter{
    constructor (){
        super();
        
        this.translate='Starlight';
        this.PointEffectName='Starlight';
        this.colors= ["#ff0000"];
    }
};
class Encounter extends ModeParameter{
    constructor (){
        super();
        
        this.translate='Encounter';
        this.PointEffectName='Kamehemeha';
        this.colors= ["#ff0000","#ff8000"];


    }
};
class Rain extends ModeParameter{
    constructor (){
        super();
        
        this.translate='Rain';
        this.PointEffectName='Rain';
        this.colors= ["#ff0000"];

    }
};
class Cycle extends ModeParameter{
    constructor (){
        super();
        
        this.translate='Cycle';
        this.PointEffectName='AcidMode';
        this.colors=[];
    }
};
class Pulse extends ModeParameter{
    constructor (){
        super();
        
        this.translate='Pulse';
        this.PointEffectName='FastRunWithoutTrace';
        this.colors= ["#ff0000","#ff8000"];
    }
};
class Cross extends ModeParameter{
    constructor (){
        super();     
        this.translate='Cross';
        this.PointEffectName='Cross';
        this.colors= ["#ff0000","#ff8000"];
    }
};
class Trigger extends ModeParameter{
    constructor (){
        super();
        
        this.translate='Trigger';
        this.PointEffectName='PassWithoutTrace';
        this.colors= ["#ff0000","#ff8000"];
    }
};
class Ripple extends ModeParameter{
    constructor (){
        super();
        this.translate='Ripple';
        this.PointEffectName='RippleGraff';
        this.colors= ["#ff0000","#ff8000"];
    }
};
class Blossom extends ModeParameter{
    constructor (){
        super();
        
        this.translate='Blossom';
        this.PointEffectName='Blossom';
        this.colors= ["#ff0000","#ff8000"];
    }
};
class Game_Mode extends ModeParameter{
    constructor (){
        super();
        this.translate='Game_Mode';
        this.PointEffectName='Game_Mode';
        this.colors= ["#ff0000"];
        var findlist=['speed'];
        for (let index = 0; index < findlist.length; index++) {
            const element = findlist[index];
            var target = this.ParameterNumberList.find((x) => x.field == element)
            target.visible=false;
            // switch (element) {
            //     case 'speed':
            //         target.setValue=8;
            //             break;
            //     case 'number':
            //           target.setValue = 5;
            //           break;   
            // }
        }
    }
    
};
class Lighting extends ModeParameter{
    constructor (){
        super();
        
        this.translate='Lighting';
        this.PointEffectName='Static';
        this.colors= ["#ff0000"];
        var findlist=['speed'];
        for (let index = 0; index < findlist.length; index++) {
            const element = findlist[index];
            var target = this.ParameterNumberList.find((x) => x.field == element)
            target.visible=false;
            // switch (element) {
            //     case 'speed':
            //         target.setValue=8;
            //             break;
            //     case 'number':
            //           target.setValue = 5;
            //           break;   
            // }
        }
    }
    
};

export class G_Built_ineffect {
    ListData = [
        new GloriousMode(),
        new Wave1(),
        new Wave2(),
        new SpiralingWave(),
        new AcidMode(),
        new Neon_streaming(),
        new NormallyOn(),
        new RippleGraff(),
        new PassWithoutTrace(),
        new FastRunWithoutTrace(),
        new Matrix2(),
        new Matrix3(),
        new Rainbow(),
        new HeartbeatSensor(),
        new DigitTimes(),
        new Kamehemeha(),
        new Pingpong(),
        new Surmount(),
        new LEDOFF(),
    ];
    //Built_inSelected=new Wave();
    currentModeIndex=0;
    constructor() {
        //this.Built_ineffectsData.test
        console.log("Built_ineffect","color:red",this.ListData);
    }
    getTarget() {
        //console.log(" this.recordModeArr[this.currentModeIndex];", this.recordModeArr[this.currentModeIndex]);
        return this.ListData[this.currentModeIndex];
    }
    getDefault(){
        return new Wave();
    }
  
    setModeIndex($event,index){
     
        this.currentModeIndex=index;
    }
    setModeForName(obj){
        console.log("%c Built_ineffect_setModeForName","color:red",obj);
        var target = this.ListData.findIndex((x) => x.translate == obj.translate);

        if(target!=-1){
            this.currentModeIndex=target;
            this.ListData[this.currentModeIndex]=obj;
        }
    }

    checkNullThenUpdateValue(){

        // var target=this.getTarget();
        // for (let index = 0; index <target.ParameterNumberList.length; index++) {
        //     var element = target.ParameterNumberList[index]
        //     if(element.setValue===null || element.setValue<element.minValue){
        //         element.setValue=element.minValue;
        //     }
        //     if(element.setValue>element.maxValue){
        //         element.setValue=element.maxValue;
        //     }
        // }
        var target=this.getTarget();
        for (let index = 0; index <target.ParameterNumberList.length; index++) {
            var element = target.ParameterNumberList[index]
            if(target[element.field]===null || target[element.field]<element.minValue){
                target[element.field]=element.minValue;
            }
            if(target[element.field]>element.maxValue){
                target[element.field]=element.maxValue;
            }
        }
    }
    getBuilt_inGraph(i,status){
     return  status?'./image/Built_inGraph/Off/'+this.ListData[i].translate+'.png':'./image/Built_inGraph/On/'+this.ListData[i].translate+'.png'
    }
}
