import { NgModule } from '@angular/core';
import { sync_AppModePageComponent } from './sync_AppModePage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [sync_AppModePageComponent],
    exports: [sync_AppModePageComponent],
})
export class sync_AppModePageModule {

}

