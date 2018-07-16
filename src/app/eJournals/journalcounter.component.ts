import {Component, OnInit} from '@angular/core';
import {JournalCounter} from '../model/JournalCounter';
import {Params, ActivatedRoute} from "@angular/router";
import {DataService} from "../services/data.service";
import {Option} from "../model/Option";
import {Dataset} from "../model/Dataset";
import {EbookCounter} from "../model/EbookCounter";
import {DatabaseCounter} from "../model/DatabaseCounter";
import {Message} from "primeng/primeng";
import {TranslateService} from "../translate";
import {SelectItem} from "primeng/api";

@Component({
  selector: 'journalcounter',
  templateUrl: 'journalcounter.component.html',
  providers: []
})

export class JournalcounterComponent implements OnInit {

  public journalcounters: Map<string, JournalCounter[]>;

  public ebookcounters: Map<string, EbookCounter[]>;

  public databasecounters: Map<string, DatabaseCounter[]>;

  private descriptions: Map<string, string>;

  private plotData: Map<string, number[][]>;

  public options: Option;

  public statsOptions;

  chart: Object;

  public yearStats: Map<number, number>;

  public identifiersString: string;

  private typeOfIdentifier: string;

  public stackValue: string;

  public stackOptions: SelectItem[];

  private stackPossibilities = ['stacked', 'percentage'];

  private identifiers: string[];

  public messages: Message[];

  public yearStatsLabel: number[];

  public yearStatsValues: number[];

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
  private translateService: TranslateService) {
  }

  ngOnInit(): void {
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
      if ( params['identifiers'] !== undefined ) {
        this.identifiersString = params['identifiers'].trim();
      }
      console.log('read identifiers ' + this.identifiersString + ' from request.');
      if (this.identifiersString !== '') {
        this.getCounters();
      }
    });
  }

  getCounters() {
    this.messages = [];
    this.yearStats = new Map();
    this.yearStatsValues = [];
    this.yearStatsLabel = [];
    this.plotData = new Map<string, number[][]>();
    this.descriptions = new Map<string, string>();
    const error = {
      severity: 'error',
      summary: 'Fehler: ',
      detail: this.translateService.instant('message.error.noDataFound')
    };
    if (this.identifiersString != null) {
      this.identifiers = this.identifiersString.split(" ");
      for (let identifier of this.identifiers) {
        identifier = identifier.trim();
        this.typeOfCounter(identifier);
        if (this.typeOfIdentifier === 'journal') {
          this.journalcounters = new Map<string, JournalCounter[]>();
          this.dataService.getAllJournalcounterForIssn(identifier).subscribe(
            data => {

              if (data.length === 0) {
                this.messages = [];
                this.messages.push(error)
              } else {
                this.journalcounters[identifier] = data;
                this.convertJournalcounterIntoPlotData(identifier, this.journalcounters[identifier]);
              }
            }
          );
        } else if (this.typeOfIdentifier === 'ebook') {
          this.ebookcounters = new Map<string, EbookCounter[]>();
          this.dataService.getAllEbookcounterForIsbn(identifier).subscribe(
            data => {
              if (data.length === 0) {
                this.messages = [];
                this.messages.push(error)
              } else {
                this.ebookcounters[identifier] = data;
                this.convertEbookCounterIntoPlotData(identifier, this.ebookcounters[identifier]);
              }
            }
          );
        } else if (this.typeOfIdentifier === 'database') {
          this.databasecounters = new Map<string, DatabaseCounter[]>();
          this.dataService.getAllDatabasecounterForPlatform(identifier).subscribe(
            data => {
              if (data.length === 0) {
                this.messages = [];
                this.messages.push(error)
              } else {
                this.databasecounters[identifier] = data;
                this.convertDatabasecounterIntoPlotData(identifier, this.databasecounters[identifier]);
              }
            }
          );
        }
      }
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

  convertJournalcounterIntoPlotData(description, journalcounters: JournalCounter[]) {
    let list: number[][] = [];
    for (let journalcounter of journalcounters) {
      const year = journalcounter.year;
      const date = new Date(year, journalcounter.month);
      if (this.yearStats.has(year)) {
        let count = this.yearStats.get(year);
        count += journalcounter.totalRequests;
        this.yearStats.set(year, count);
      } else {
        this.yearStats.set(year, journalcounter.totalRequests);
      }
      const values = [date.valueOf(), journalcounter.totalRequests];
      list.push(values);
    }
    list = list.sort((n1, n2) => n1[0] - n2[0]);
    this.plotData.set(description, list);
    this.descriptions.set(description, journalcounters[0].fullName);
    this.updatePlotData();
  }

  convertDatabasecounterIntoPlotData(description, databasecounters: DatabaseCounter[]) {
    let list: number[][] = [];
    for (let databasecounter of databasecounters) {
      const date = new Date(databasecounter.year, databasecounter.month);
      const values = [date.valueOf(), databasecounter.recordViews];
      list.push(values);
    }
    list = list.sort((n1, n2) => n1[0] - n2[0]);
    this.plotData.set(description, list);
    this.descriptions.set(description, databasecounters[0].title);
    this.updatePlotData();
  }

  convertEbookCounterIntoPlotData(description, ebookcounters: EbookCounter[]) {
    let list: number[][] = [];
    for (let ebookcounter of ebookcounters) {
      const year = ebookcounter.year;
      const date = new Date(ebookcounter.year, ebookcounter.month);
      const values = [date.valueOf(), ebookcounter.totalRequests];
      if (this.yearStats.has(year)) {
        let count = this.yearStats.get(year);
        count += ebookcounter.totalRequests;
        this.yearStats.set(year, count);
      } else {
        this.yearStats.set(year, ebookcounter.totalRequests);
      }
      list.push(values);
    }
    list = list.sort((n1, n2) => n1[0] - n2[0]);
    this.plotData.set(description, list);
    this.descriptions.set(description, ebookcounters[0].title);
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
    } else if(this.stackValue === 'percentage') {
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
    this.statsOptions.series.push(new Dataset(this.translateService.instant('usage.per.year'),values));
  }
}
