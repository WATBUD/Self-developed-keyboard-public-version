// console.log(selectContainer.dataset.status,selectContainer.dataset.status=="false"?1:0);
// selectContainer.dataset.status="sfsdf";
//var nodes = [], values = [];
// var elementInDom = function (el) {
//   while (el = el.parentNode)
//     if (el === document) {
//       return true;
//     }
//   return false;
// }





export class MouseBoxSelection {
    mouseOn = false;
    startX = 0;
    startY = 0;
    selectContainer;
    fnEanble = false;
    eventArray = [];
    compareObjectArr=[];
    scaleConfig = {
      scaleMultipleConfig: [0.25, 0.5, 1, 2, 4],
      scaleMultiple: 1,
    }
    
    constructor() {
  
    }
  
    clearEventBubble(e) {
      if (e.stopPropagation) e.stopPropagation();//阻止當前事件繼續進行捕捉（capturing）及冒泡（bubbling）階段的傳遞
      else e.cancelBubble = true;//
      if (e.preventDefault) e.preventDefault();
      else e.returnValue = false;
    }
    addMouseEventListener(targetName) {
      this.selectContainer = document.getElementById(targetName);
  
  
      this.eventArray[0] = (e) => {
        console.log("MouseBoxSelection_document.onmousedown", e.buttons, e.which);
  
        this.clearEventBubble(e);
        if (e.buttons !== 1 || e.which !== 1) return;
        //mouseStopId = setTimeout(function () {
        this.mouseOn = true;
        this.startX = e.clientX- this.selectContainer.offsetLeft + this.selectContainer.scrollLeft;
        this.startY = e.clientY- this.selectContainer.offsetTop + this.selectContainer.scrollTop;
        // this.startX = e.clientX;
        // this.startY = e.clientY;
        if (!checkExists("syncSelectDiv")) {
          var selDivnew = document.createElement('div');
          selDivnew.style.cssText = 'position:absolute;width:0;height:0;\
              margin:0;padding:0;border:1px dashed #blue;background-color: blue;z-index:1000;opacity:0.8;display:none;\
              pointer-events:none;';
          selDivnew.id = 'syncSelectDiv';
          //document.appendChild(selDiv);
          //document.body.appendChild(selDivnew);
          this.selectContainer.insertBefore(selDivnew, this.selectContainer.firstChild);

        }
        var selDiv = document.getElementById('syncSelectDiv');
        selDiv.style.left = this.startX + 'px';
        selDiv.style.top = this.startY + 'px';
        console.log("MouseBoxSelection_document.syncSelectDiv");
  
  
      }
      this.eventArray[1] = (e) => {
        //console.log("MouseBoxSelection_document.onmousemove");
  
        if (!this.mouseOn) return;
        this.clearEventBubble(e);
        //var selectContainer = document.getElementById('selectContainer');
        var _x = e.clientX - this.selectContainer.offsetLeft + this.selectContainer.scrollLeft;
        var _y = e.clientY - this.selectContainer.offsetTop + this.selectContainer.scrollTop;
        // var _x = e.clientX;
        // var _y = e.clientY;
        // var _H = selectContainer.clientHeight;
        // var _W = selectContainer.clientWidth;
        // // 向下拖拽
        // if (_y >= _H && selectContainer.scrollTop <= _H) {
        //   selectContainer.scrollTop += _y - _H;
        // }
        // // 向上拖拽
        // if (e.clientY <= selectContainer.offsetTop && selectContainer.scrollTop > 0) {
        //   selectContainer.scrollTop = Math.abs(e.clientY - selectContainer.offsetTop);
        // }
        var selDiv = document.getElementById('syncSelectDiv');
        selDiv.style.display = 'block';
        selDiv.style.left = Math.min(_x, this.startX) + 'px';
        selDiv.style.top = Math.min(_y, this.startY) + 'px';
        selDiv.style.width = Math.abs(_x - this.startX) + 'px';
        selDiv.style.height = Math.abs(_y - this.startY) + 'px';
      };
      this.eventArray[2] = (e) => {
        console.log("MouseBoxSelection_document.onmouseup");
  
        if (!this.mouseOn) return;
        this.clearEventBubble(e);
        var selDiv = document.getElementById('syncSelectDiv');
        //var fileDivs = document.getElementsByClassName('fileDiv');
        var 框選範圍左X = selDiv.offsetLeft;
        var 框選範圍上Y = selDiv.offsetTop;
        var w = selDiv.offsetWidth;
        var h = selDiv.offsetHeight;
        var selectedEls = [];
  
        for (let index = 0; index < this.compareObjectArr.length; index++) {
          var compareObj= document.getElementById(this.compareObjectArr[index].name);
          var fileDivs = document.querySelectorAll<HTMLElement>('.SyncRGBColorBlockStyle');

          //var fileDivs = compareObj.getElementsByClassName("SyncRGBColorBlockStyle") as HTMLCollectionOf<HTMLElement>;
          console.log('fileDivs', fileDivs);
          var compareObjectArrSelectedEls=[];

          
          for (var i = 0; i < fileDivs.length; i++) {
  
            //取得右上
            var 目標物件右X = fileDivs[i].offsetWidth + fileDivs[i].offsetLeft+compareObj.offsetLeft;//檢查物件右邊的X
            var 目標物件下Y = fileDivs[i].offsetHeight + fileDivs[i].offsetTop+compareObj.offsetTop;//檢查物件右面的Y
            //取得左上
            var 目標物件左X = fileDivs[i].offsetLeft+compareObj.offsetLeft;//檢查物件左邊的X 
            var 目標物件上Y = fileDivs[i].offsetTop + compareObj.offsetTop;;//檢查物件左邊的Y
            var 框選範圍右X = 框選範圍左X + w;
            var 框選範圍下Y = 框選範圍上Y + h;
  
  
            目標物件右X= 目標物件右X* this.scaleConfig.scaleMultiple
            目標物件下Y= 目標物件下Y* this.scaleConfig.scaleMultiple
            目標物件左X= 目標物件左X* this.scaleConfig.scaleMultiple
            目標物件上Y= 目標物件上Y* this.scaleConfig.scaleMultiple
            框選範圍右X= 框選範圍右X;
            框選範圍下Y= 框選範圍下Y;
  
            var obj = {
              'selDiv.offsetLeft': 框選範圍左X,
              'selDiv.offsetTop': 框選範圍上Y,
              'selDiv.offsetWidth': w,
              'selDiv.offsetHeight': h,
              '目標物件右X': 目標物件右X,
              '目標物件下Y': 目標物件下Y,
              '目標物件左X': 目標物件左X,
              '目標物件上Y': 目標物件上Y,
              'console.dir(selectContainer)': console.dir(this.selectContainer),
              'fileDivs[i]': fileDivs[i],
            };
             
            //如果檢測物件的寬高+離父物件位移的距離 >框選範圍大於   
            //表示Element佔用的除去magin的部分。例:offsetWidth = width + padding + border
            if (目標物件右X > 框選範圍左X && 目標物件下Y > 框選範圍上Y && 目標物件左X < 框選範圍右X && 目標物件上Y < 框選範圍下Y) {
  
              //selectedEls.push(fileDivs[i]);
              //selectedEls.push(this.compareObjectArr[index].allBlockStatus[i]);
              compareObjectArrSelectedEls.push(i);
              //fileDivs[i].style.width = "500px";
              // if(this.compareObjectArr[index].allBlockStatus[i]==false){

              //   this.compareObjectArr[index].allBlockStatus[i]=true;
              //   this.compareObjectArr[index].allBlockColor[i]='white';

              // }
              // else{
              //   this.compareObjectArr[index].allBlockStatus[i]=false;
              //   this.compareObjectArr[index].allBlockColor[i]='black';
              // }
              // if (fileDivs[i].dataset.status == "false") {
              //   fileDivs[i].style.backgroundColor = "red";
              //   fileDivs[i].dataset.status = "true"
              // }
              // else {
              //   fileDivs[i].dataset.status = "false"
              //   fileDivs[i].style.backgroundColor = "blue";
              // }
              //const isExist = allRecordKeys.some((element) => element.code == target_key);
            //this.checkArrayisAllTrueSync(selectedEls);

            }
          }
          
          //}
          selectedEls.push(compareObjectArrSelectedEls);

          //selDiv.style.display = 'none';
  
        }
        this.setSelectElsFrameRange(selectedEls);
        console.log('selectedEls',selectedEls);
        this.mouseOn = false;
      
        
      };
       
      this.selectContainer.addEventListener("mousedown", this.eventArray[0])
      document.addEventListener("mousemove", this.eventArray[1])
      document.addEventListener("mouseup", this.eventArray[2])
  
    }

    checkArrayisAllTrueSync(selectedEls){
      console.log("checkArrayisAllTrueSync_this.compareObjectArr[0]",this.compareObjectArr[0]);

      for (var i = 0; i < selectedEls.length; i++) {
        let target=selectedEls[i];
        for (var i2 = 0; i2 < target.length; i2++) {
          console.log("this.compareObjectArr[i].allBlockStatus[target[i2]]",this.compareObjectArr[i].allBlockStatus[target[i2]]);

          if(this.compareObjectArr[i].allBlockStatus[target[i2]]==false){
            console.log("checkArrayisAllTrueSync_Return",false,selectedEls);
            return false; 
          }
        }     
      }
      console.log("checkArrayisAllTrueSync_Return",true,selectedEls);
      return true; 
    }
    setSelectElsFrameRange(selectedEls){


      var Block={

      }
    if(this.checkArrayisAllTrueSync(selectedEls)==false){
      for (var i = 0; i < selectedEls.length; i++) {
        let target=selectedEls[i];
        for (var i2 = 0; i2 < target.length; i2++) {
          this.compareObjectArr[i].allBlockStatus[target[i2]]=true;
          this.compareObjectArr[i].allBlockColor[target[i2]]='white';       
        }     
      }
    }
    else{
      for (var i = 0; i < selectedEls.length; i++) {
        let target=selectedEls[i];
        for (var i2 = 0; i2 < target.length; i2++) {
          this.compareObjectArr[i].allBlockStatus[target[i2]]=false;   
          this.compareObjectArr[i].allBlockColor[target[i2]]='black';       
        }     
      }
    }

    }
    


    setScaleConfig(input){
          this.scaleConfig=input;
     }
    removeMouseEvent() {
  
      this.selectContainer.removeEventListener("mousedown", this.eventArray[0]);
      document.removeEventListener("mousemove", this.eventArray[1]);
      document.removeEventListener("mouseup", this.eventArray[2]);
    }
  

     

    switchShowBtn(targetDom) {
      console.log('targetDom',this.fnEanble);
  
      targetDom.value = 'MouseBoxSelection ' + !this.fnEanble;
    }
    switchMouseEvent(targetName) {
      //this.fnEanble = !this.fnEanble;
      switch (this.fnEanble) {
        case true:
          this.addMouseEventListener(targetName);
          break;
        case false:
          if(this.selectContainer!=undefined){
          this.removeMouseEvent();
          }
  
          break;
  
      }
    }
    
  
}
  
  
  
  function txtPrint(obj) {
    var txtShow = document.getElementById('txtShow');
    txtShow.innerText += JSON.stringify(obj).replace(/,/g, ',\n').replace(/{/g, '{\n').replace(/}/g, '\n}');;
  
  }
  
  function checkExists(id) {
    console.log('checkExists', id);
    var element = document.getElementById(id);
    if (typeof (element) != 'undefined' && element != null) {
      return true;
    }
    return false;
  }