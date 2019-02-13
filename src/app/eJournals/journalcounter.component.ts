import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {DataService} from "../services/data.service";
import {Option} from "../model/Option";
import {Dataset} from "../model/Dataset";
import {Message} from "primeng/primeng";
import {TranslateService} from "../translate";
import {SelectItem} from "primeng/api";
import {Counter} from "../model/Counter";

@Component({
  selector: 'journalcounter',
  templateUrl: 'journalcounter.component.html',
  providers: []
})

export class JournalcounterComponent implements OnInit {

  public counters: Map<string, Counter[]>;

  private descriptions: Map<string, string>;

  private plotData: Map<string, number[][]>;

  public options: Option;

  public statsOptions;

  public yearStats: Map<number, number>;

  public identifiersString: string;

  public mode: string;

  private typeOfIdentifier: string;

  public stackValue: string;

  public stackOptions: SelectItem[];

  private stackPossibilities = ['stacked', 'percentage'];

  private identifiers: string[];

  public messages: Message[];

  public yearStatsLabel: number[];

  public yearStatsValues: number[];

  public allCounters: Counter[];

  public cols: any[];

  public collected: boolean;

  public tableFieldsJournals = ['printIssn', 'fullName', 'publisher', 'platform', 'year', 'month', 'totalRequests'];

  public tableFieldsEbooks = ['title', 'doi', 'publisher', 'platform', 'year', 'month', 'totalRequests'];

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.collected = false;
    this.cols = [];
    this.stackOptions = [];
    this.stackValue = 'stacked';
    this.stackPossibilities.forEach(
      entry => {
        this.stackOptions.push({label: this.translateService.instant('stack.option.' + entry), value: entry});
      }
    );
    this.messages = [];
    this.identifiersString = '';
    this.plotData = new Map<string, number[][]>();
    this.descriptions = new Map<string, string>();
    this.route.queryParams.subscribe((params: Params) => {
      if (params['identifiers'] !== undefined) {
        this.identifiersString = params['identifiers'].trim();
      }
      if (params['mode'] !== undefined) {
        this.mode = params['mode'].trim()
      } else {
        this.mode = 'single'
      }
      if (this.identifiersString !== '') {
        this.getCounters();
      }
    });
  }

  getCounters() {
    this.collected = false;
    this.messages = [];
    this.yearStats = new Map();
    this.yearStatsValues = [];
    this.yearStatsLabel = [];
    this.allCounters = [];
    this.plotData = new Map<string, number[][]>();
    this.descriptions = new Map<string, string>();
    this.counters = new Map<string, Counter[]>();
    if (this.mode === 'single') {
      if (this.identifiersString != null) {
        this.identifiers = this.identifiersString.split(" ");
        for (let identifier of this.identifiers) {
          identifier = identifier.trim();
          this.typeOfCounter(identifier);
          this.dataService.getAllCounterForIdentifier(identifier, this.typeOfIdentifier).subscribe(
            data => {
              if (data.length === 0) {
                this.sendNoDataError();
              } else {
                this.addData(data, identifier)
              }
            }
          );
        }
      }
    } else {
      const identifier = this.identifiersString.trim();
      this.dataService.getAllCounterForIdentifier(identifier, this.mode).subscribe(
        data => {
          if (data.length === 0) {
            this.sendNoDataError();
          } else {
            this.addData(data, identifier)
          }
        }
      )
    }
  }

  addData(data: Counter[], identifier: string) {
    this.counters[identifier] = data;
    this.allCounters.push(...data);
    this.convertCounterIntoPlotData(identifier, this.counters[identifier]);
    this.prepareTableFields();
    this.collected = true;
  }

  sendNoDataError() {
    const error = {
      severity: 'error',
      summary: 'Fehler: ',
      detail: this.translateService.instant('message.error.noDataFound')
    };
    this.messages = [];
    this.messages.push(error)
  }

  prepareTableFields() {
    this.cols = [];
    if (this.typeOfIdentifier === 'journal') {
      this.tableFieldsJournals.forEach(entry => this.cols.push({
        field: entry,
        header: this.translateService.instant('table.field.' + entry)
      }));
    } else if (this.typeOfIdentifier === 'ebook') {
      this.tableFieldsEbooks.forEach(entry => this.cols.push({
        field: entry,
        header: this.translateService.instant('table.field.' + entry)
      }));
    }
  }

  typeOfCounter(identifier: string): void {
    let testString = identifier.replace(/-/g, '');
    if (testString.length === 8) {
      this.typeOfIdentifier = 'journal'
    } else if (testString.length === 10 || testString.length === 13) {
      this.typeOfIdentifier = 'ebook';
    } else {
      this.typeOfIdentifier = 'database';
    }
  }

  convertCounterIntoPlotData(description: string, counters: Counter[]) {
    let list: number[][] = [];
    for (let counter of counters) {
      const year = counter.year;
      const date = new Date(year, counter.month);
      if (this.yearStats.has(year)) {
        let count = this.yearStats.get(year);
        count += counter.totalRequests;
        this.yearStats.set(year, count);
      } else {
        this.yearStats.set(year, counter.totalRequests);
      }
      const values = [date.valueOf(), counter.totalRequests];
      list.push(values);
    }
    list = list.sort((n1, n2) => n1[0] - n2[0]);
    this.plotData.set(description, list);
    this.descriptions.set(description, counters[0].title);
    this.updatePlotData();
  }

  updatePlotData() {
    this.statsOptions = new Option({text: this.translateService.instant('usage.per.year')}, [],
      {title: {text: 'Anzahl'}, min: 0, allowDecimals: false},
      {
        type: 'number'
      },
      {defaultSeriesType: 'bar', zoomType: 'xy'},
      ['#AA4643', '#4572A7', '#89A54E', '#80699B',
        '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92']);
    this.statsOptions.exporting = {enabled: true};
    this.statsOptions.tooltip = {xDateFormat: '%Y'};
    this.options = new Option({text: "Anzahl Zugriffe"}, [],
      {title: {text: 'Anzahl'}, min: 0, allowDecimals: false},
      {
        type: 'datetime',
        dateTimeLabelFormats: {month: '%B %Y'}
      },
      {defaultSeriesType: 'column', zoomType: 'xy'},
      ['#AA4643', '#4572A7', '#89A54E', '#80699B',
        '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92']);
    this.options.lang = {
      months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November',
        'Dezember'],
      shortMonths: ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Jun',
        'Jul', 'Aug', 'Sep', 'Okt', 'Nov',
        'Dez']
    };
    this.options.exporting = {enabled: true};
    this.options.tooltip = {xDateFormat: '%B %Y'};
    this.setPlotOptions();
    this.updateChartObject();
  }

  setPlotOptions() {
    if (this.stackValue === 'stacked') {
      this.options.plotOptions = {
        column: {
          stacking: 'normal'
        }
      }
    } else if (this.stackValue === 'percentage') {
      this.options.plotOptions = {
        column: {
          stacking: 'percent'
        }
      }
    }
  }

  updateChartObject() {
    this.plotData.forEach(
      (value: number[][], key: string) => {
        const dataset = new Dataset(this.descriptions.get(key), value);
        this.options.series.push(dataset);
      }
    );
    let values: number[][] = [];
    this.yearStats.forEach(
      (value: number, key: number) => {
        this.yearStatsLabel.push(key);
        this.yearStatsValues.push(value);
        values.push([key, value]);
      });
    this.statsOptions.series.push(new Dataset(this.translateService.instant('usage.per.year'), values));
  }
}
