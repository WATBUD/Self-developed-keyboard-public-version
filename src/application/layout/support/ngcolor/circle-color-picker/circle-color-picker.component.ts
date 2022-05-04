// tslint:disable:component-selector
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ColorOutput } from '../color-output';
import { ColorUtilityService } from '../shared/color-utility/color-utility.service';
import { Hsl } from '../shared/color-utility/hsl';
import { SaturationLightness } from '../shared/hsl/saturation-lightness';

@Component({
    selector: 'ng-color-circle',
    styleUrls: ['./components/layout/support/ngcolor/circle-color-picker/circle-color-picker.component.css'],
    templateUrl: './components/layout/support/ngcolor/circle-color-picker/circle-color-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CircleColorPickerComponent),
            multi: true,
        },
    ],
})
export class CircleColorPickerComponent implements ControlValueAccessor, OnInit {
    @Input() public startHex: string;
    @Input() public hue: number;
    @Input() public saturationLightness: SaturationLightness;
    public onTouchedCallback: () => void;
    public onChangeCallback: (_: ColorOutput) => void;

    constructor(private colorUtility: ColorUtilityService) {
        console.log("CCP_constructor");

        this.saturationLightness = {
            saturation: 0,
            lightness: 0,
        };
        this.hue = 0;
        this.onTouchedCallback = () => {};
        this.onChangeCallback = () => {};
    }

    public ngOnInit(): void {
        console.log("CCP_ngOnInit");

        const hsl = this.colorUtility.calculateHslFromHex(this.startHex || 'ff0000');
        this.setHsl(hsl);
        this.calculateColor();
    }

    public calculateColor(): void {
        console.log("CCP.calculateColor");
        const colorOutput = this.colorUtility.createColorOutput(
            this.hue * 360,
            this.saturationLightness.saturation * 100,
            this.saturationLightness.lightness * 100,
        );
        this.onChangeCallback(colorOutput);
        this.onTouchedCallback();
    }

    public writeValue(obj): void {
        console.log("CCP.writeValue",obj);

        if (!obj) {
            console.log("CCP.writeValue_return",obj);

            return;
        }
        if (obj.hexString) {
            const hexValue = obj.hexString || obj.hex.toString();

            console.log("CCP.writeValue_hexValue",obj);

            const hsl = this.colorUtility.calculateHslFromHex(hexValue);
            this.setHsl(hsl);
        } else if (obj.rgb) {
            console.log("CCP.writeValue_obj.rgb",obj);

            const hsl = this.colorUtility.calculateHslFromRgb(obj.rgb);
            this.setHsl(hsl);
        }
    }
    public registerOnChange(fn: (_: ColorOutput) => void): void {
        console.log("CCP.registerOnChange",fn);

        this.onChangeCallback = fn;
    }
    public registerOnTouched(fn: () => void): void {
        console.log("CCP.registerOnTouched",fn);

        this.onTouchedCallback = fn;
    }

    private setHsl(hsl: Hsl): void {
        console.log("CCP.setHsl");

        this.hue = hsl.hue;
        this.saturationLightness = {
            saturation: hsl.saturation,
            lightness: hsl.lightness,
        };
    }
}
