import {JournalcounterComponent} from "./journalcounter.component";
import {UsersettingsService} from "../services/usersettings.service";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {NgModule} from "@angular/core";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {
  ButtonModule, InputSwitchModule, MessagesModule, SelectButtonModule, TabMenuModule,
  ToggleButtonModule
} from "primeng/primeng";
import {ChartModule} from "angular2-highcharts";
import * as highcharts from 'highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import {FormsModule} from "@angular/forms";
import {eJournalsRouting} from "./ejournals.routing";
import {CommonModule} from "@angular/common";
import {DataService} from "../services/data.service";
import {TranslateModule} from "../translate/translate.module";


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
      MessagesModule,
        DataTableModule,
        ToggleButtonModule,
        InputSwitchModule,
        TabMenuModule,
        SelectButtonModule,
      TranslateModule,
      ButtonModule,
        ChartModule,
        eJournalsRouting],
    declarations: [JournalcounterComponent],
    exports: [JournalcounterComponent],
    providers: [UsersettingsService,DataService,{provide: HighchartsStatic,
  useFactory: highchartsFactory}]
})

export class EJournalsModule {}
