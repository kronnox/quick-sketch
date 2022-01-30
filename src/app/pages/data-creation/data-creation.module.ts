import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DataCreationRoutingModule} from './data-creation-routing.module';
import {DataCreationComponent} from './data-creation.component';
import {NgxDrawingCanvasModule} from "../../ngx-drawing-canvas/ngx-drawing-canvas.module";
import {LayoutModule} from "../../common/layout/layout.module";
import {ButtonsModule} from "../../common/buttons/buttons.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {NgSimpleProgressBarModule} from "ng-simple-progress-bar";


@NgModule({
  declarations: [
    DataCreationComponent
  ],
  imports: [
    CommonModule,
    DataCreationRoutingModule,
    NgxDrawingCanvasModule,
    LayoutModule,
    ButtonsModule,
    NgSimpleProgressBarModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataCreationModule { }
