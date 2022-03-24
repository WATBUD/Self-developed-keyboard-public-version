import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './MK_Series/app.component';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';

// app routes
import { routes } from './app.routes';
let routerModule = RouterModule.forRoot(routes);
import { HttpModule ,Http} from '@angular/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { sync_AppModePageModule } from './MK_Series/sync_AppModePage/sync_AppModePage.module'
import { PlugDevicePageComponent } from './MK_Series/PlugDeviceFolder/PlugDevicePage';


routerModule = RouterModule.forRoot(routes, {useHash: true});
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
        {
            provide: APP_BASE_HREF,
            useValue: '<%= APP_BASE %>'
        }
    ]
                    
})

export class AppModule { }