import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './application/Strike6/app.component';
// import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';
// app routes
import { HttpClientModule } from '@angular/common/http';
import { DeviceService } from './application/Strike6/DeviceService';

import { routes } from './application/Strike6/app.routes';
import { HttpModule ,Http} from '@angular/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { sync_AppModePageModule } from './application/Strike6/sync_AppModePage/sync_AppModePage.module'
import { PlugDevicePageComponent } from './application/Strike6/PlugDeviceFolder/PlugDevicePage';
//let routerModule = RouterModule.forRoot(routes, {useHash: true});
let routerModule = RouterModule.forRoot(routes);

@NgModule({
    declarations: [ 
        AppComponent,
        PlugDevicePageComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        sync_AppModePageModule,
        routerModule,
        HttpModule,
    ],
    entryComponents:[
        // AppSettingsComponent,
        // KeyboardKeySettingComponent,
        // DisplaySettingComponent,
        // SettingDialogComponent
    ],
    bootstrap: [
        AppComponent,
    ],
    providers: [
        DeviceService,
        // {
        //     provide: APP_BASE_HREF,
        //     useValue: '<%= APP_BASE %>'
        // }
    ]
                    
})

export class AppModule { }