import {ProtokollComponent} from "./protokoll.component";
import {UserService} from "../services/user.service";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {NgModule} from "@angular/core";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {InputSwitchModule, SelectButtonModule, TabMenuModule, ToggleButtonModule} from "primeng/primeng";
import {ChartModule} from "angular2-highcharts";
import * as highcharts from 'highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import {FormsModule} from "@angular/forms";
import {protokollRouting} from "./protokoll.routing";
import {CommonModule} from "@angular/common";


export function highchartsFactory() {
  const hc = require('highcharts');
  const dd = require('highcharts/modules/drilldown');
  dd(hc);

  return hc;
}

@NgModule({
    imports: [HttpModule,
        CommonModule,
        RouterModule,
        FormsModule,
        DataTableModule,
        ToggleButtonModule,
        InputSwitchModule,
        TabMenuModule,
        SelectButtonModule,
        ChartModule,
        protokollRouting],
    declarations: [ProtokollComponent],
    exports: [ProtokollComponent],
    providers: [UserService,{provide: HighchartsStatic,
      useFactory: highchartsFactory}]
})

export class ProtokollModule {}
