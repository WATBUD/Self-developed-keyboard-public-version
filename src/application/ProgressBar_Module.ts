

import { Injectable } from '@angular/core';
@Injectable()
export class ProgressBar {
    percent_TSVar=0;
    constructor() {
    }
    addProgressBarEvent(){
        document.addEventListener('keydown', (event) => {
            console.log(event);
            if (event.key == "ArrowUp") {
               if(this.percent_TSVar+1>100){
                this.percent_TSVar=0;
               }
               else{
                this.percent_TSVar+=1;
               }
                this.setRoundProgress_js(this.percent_TSVar);
            }
            if (event.key == "ArrowDown") {
                this.percent_TSVar-=1;
                this.setRoundProgress_js(this.percent_TSVar);
            }
        });
    }
    setRoundProgress_js(percent) {
        console.log('setRoundProgress_js',percent);
        setRoundProgress(percent);
        function setRoundProgress(percent) {
            var circleBar = document.getElementsByClassName('circle-bar')[0];
            var color = setTargetBackground('background-color', undefined, circleBar);
            var left_circle = circleBar.getElementsByClassName('circle-bar-left')[0];
            var right_circle = circleBar.getElementsByClassName('circle-bar-right')[0];
            if (percent > 100) {
                percent = 0;
                setTargetTranform('transform', 'rotate(0deg)', right_circle);
                setTargetTranform('transform', 'rotate(0deg)', left_circle);
                setTargetBackground('background-color', '#eee', right_circle);
                setTargetBackground('background-color', '#eee', left_circle);

            }
            circleBar.getElementsByClassName('percent')[0].firstChild.nodeValue = percent + "%";

            if (percent <= 50) {
                var rotate = 'rotate(' + (percent * 3.6) + 'deg)';
                setTargetTranform('transform', rotate, right_circle);
            } else {
                var rotate = 'rotate(' + ((percent - 50) * 3.6) + 'deg)';
                setTargetBackground('background-color', color, right_circle);
                setTargetTranform('transform', 'rotate(0deg)', right_circle);//右側不旋轉
                setTargetTranform('transform', rotate, left_circle);//左側旋轉


            }
        }
        function setTargetBackground(property, value, element) {
            console.log('%c setTargetBackground', 'background: blue; color: red', element.style[property]);

            if (value) {
                //CSS中像background-color这样的属性，‘-’在JavaScript中不兼容，需要设置成驼峰格式
                var index = property.indexOf('-');
                if (index != -1) {
                    var char = property.charAt(index + 1).toUpperCase();
                    property.replace(/(-*){1}/, char);
                }
                element.style[property] = value;

            } else {
                //getPropertyValue()方法参数类似background-color写法，所以不要转驼峰格式
                return window.getComputedStyle(element).getPropertyValue(property);
            }
        }
        function setTargetTranform(property, value, element) {
            console.log('%c setTargetTranform', 'background: blue; color: red', element.style);
            console.log('%c setTargetTranform', 'background: blue; color: red', value);

            if (value) {
                property = capitalize(property.toLowerCase());
                element.style['webkit' + property] = value;
                element.style['Moz' + property] = value;
                element.style['ms' + property] = value;
                element.style['O' + property] = value;
                element.style[property.toLowerCase()] = value;
            } else {
                return window.getComputedStyle(this).getPropertyValue(
                    ('webkit' + property) || ('Moz' + property) || ('ms' + property) || ('O' + property) || property);

            }

        }
        function capitalize(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }

    }
     


}

