import { Component, Input } from '@angular/core';

import { Vector } from '../../vector';

@Component({
    selector: 'app-cursor',
    templateUrl: './components/layout/support/ngcolor/box-color-picker/box-cursor/box-cursor.component.html',
    styleUrls: ['./components/layout/support/ngcolor/box-color-picker/box-cursor/box-cursor.component.css'],
})
export class BoxCursorComponent {
    @Input() public position: Vector;
    @Input() public bothAxis: boolean;
    @Input() public bothAxis2: boolean;
    @Input() public lightness: number;

    constructor() {
        this.bothAxis = false;
        this.bothAxis2 = false;
    }
}
