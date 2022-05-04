import { Component, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { MouseHandlerOutput } from '../../shared/mouse-handler/mouse-handler-output';
import { Vector } from '../../vector';
import { IMAGE } from './box-hue-image';

@Component({
    selector: 'app-hue',
    templateUrl: './components/layout/support/ngcolor/box-color-picker/box-hue/box-hue.component.html',
    styles: [
        `
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }

        .hue {
            cursor: pointer;
            position:absolute;
            width: 10%;
            height: 100%;
            border: none;
            margin: 0 0 0;
            background-size: 100% 100%;
            background-image: url(${IMAGE});
            left: 110%;
            top: 0%;
        }
    `,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BoxHueComponent),
            multi: true,
        },
    ],
})
export class BoxHueComponent implements ControlValueAccessor {
    public cursorPosition: Vector;
    private onTouchedCallback: () => void;
    private onChangeCallback: (_: number) => void;

    constructor(private el: ElementRef) {
        this.cursorPosition = {
            x: 0,
            y: 0,
        };
        this.onTouchedCallback = () => {};
        this.onChangeCallback = () => {};
    }

    public writeValue(hue: any): void {
        this.cursorPosition = {
            // x: hue * this.el.nativeElement.offsetWidth,
            // y: 0,
            x: 0,
            y: hue * this.el.nativeElement.offsetHeight,
        };
    }

    public registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    public setHue(mouseEvent: MouseHandlerOutput): void {
        this.cursorPosition = {
            x: 0,
            y: mouseEvent.realWorld.y,
        };

        const hue = 1-(mouseEvent.v / mouseEvent.rg);
        this.onChangeCallback(hue);
        this.onTouchedCallback();
    }
}
