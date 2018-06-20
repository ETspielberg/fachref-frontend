import {JournalcounterComponent} from "./journalcounter.component";
import {UsersettingsService} from "../services/usersettings.service";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {NgModule} from "@angular/core";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {
  ButtonModule, InputSwitchModule, MessagesModule, SelectButtonModule, TabMenuModule,
  ToggleButtonModule, DropdownModule
} from "primeng/primeng";
import {ChartModule} from "angular2-highcharts";
import * as highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting.src';
import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';
import {FormsModule} from "@angular/forms";
import {eJournalsRouting} from "./ejournals.routing";
import {CommonModule} from "@angular/common";
import {DataService} from "../services/data.service";
import {TranslateModule} from "../translate/translate.module";
import {TableModule} from "primeng/table";
import {EbsModelSelectionComponent} from "./ebs.model.selection.component";
import {EbsDataService} from "../services/ebs.data.service";
import {EbsModelService} from "../services/ebs.model.service";
import {CardModule} from "primeng/card";
import {SliderModule} from "primeng/slider";


export function highchartsFactory() {
  const hc = require('highcharts');
  const dd = require('highcharts/modules/drilldown');
  dd(hc);

  return hc;
}

HighchartsExporting(highcharts);

@NgModule({
  imports: [HttpModule,
    CommonModule,
    RouterModule,
    DropdownModule,
    FormsModule,
    MessagesModule,
    DataTableModule,
    ToggleButtonModule,
    CardModule,
    SliderModule,
    InputSwitchModule,
    TableModule,
    TabMenuModule,
    SelectButtonModule,
    TranslateModule,
    ButtonModule,
    ChartModule,
    eJournalsRouting],
  declarations: [JournalcounterComponent, EbsModelSelectionComponent],
  exports: [JournalcounterComponent, EbsModelSelectionComponent],
  providers: [UsersettingsService, DataService, EbsDataService, EbsModelService, {
    provide: HighchartsStatic,
    useFactory: highchartsFactory
  }]
})

export class EJournalsModule {
}
