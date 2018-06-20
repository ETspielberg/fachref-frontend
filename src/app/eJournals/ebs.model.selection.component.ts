import {Component, OnInit} from "@angular/core";
import {TranslateService} from "../translate";
import {EbsModelService} from "../services/ebs.model.service";
import {EbsDataService} from "../services/ebs.data.service";
import {EbsModel} from "../model/EbsModel";
import {EbsData} from "../model/EbsData";
import {SelectItem} from "primeng/api";
import {Message} from "primeng/primeng";

@Component({
  selector: 'journalcounter',
  templateUrl: 'ebs.model.selection.component.html',
  providers: []
})

export class EbsModelSelectionComponent implements OnInit {

  ebsModels: EbsModel[];

  activeEbsModel: EbsModel;

  ebsDatas: EbsData[];

  selectedEbsData: EbsData[];

  unselectedEbsData: EbsData[];

  ebsDataCollected = false;

  ebsModelsCollected = false;

  yearFilter: number;

  usageFilter: number;

  priceFilter: number;

  totalPrice = 0.0;

  cols: any[];

  messages: Message[];

  subjectAreas: SelectItem[];

  timeout: any;

  tableFields = ['title', 'subjectArea', 'year', 'totalUsage', 'price', 'pricePerUsage', 'selected', 'showUsage'];

  minimumYear = new Date().getFullYear();

  maximumPrice = 0;

  maximumYear = new Date().getFullYear();

  maximumPricePerUsage = 0;

  maximumUsage = 0;

  activeColor: string;

  constructor(private ebsModelService: EbsModelService,
              private ebsDataService: EbsDataService,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.activeColor = "black";
    this.cols = [];
    this.tableFields.forEach(entry => this.cols.push({
      field: entry,
      header: this.translateService.instant('table.field.' + entry)
    }));
    this.ebsModelService.getAll().subscribe(
      data => {
        this.ebsModels = data;
        if (this.ebsModels.length > 0) {
          this.ebsModelsCollected = true;
          this.activeEbsModel = this.ebsModels[0];
        }
      }
    )
  }

  loadEbsData() {
    this.messages = [];
    this.messages.push(
      {
        severity: 'success',
        summary: 'Daten geladen: ',
        detail: this.translateService.instant('Die Daten zu dem EBS-Modell ' + this.activeEbsModel.id + ' des Verlags ' + this.activeEbsModel.publisher + ' im Zeitraum ' + this.activeEbsModel.startOfEbs + ' bis ' + this.activeEbsModel.endOfEbs + ' wurden erfolgreich geladen')
      }
    );
    this.selectedEbsData = [];
    this.unselectedEbsData = [];
    this.ebsDataService.getForEbsModel(this.activeEbsModel.id).subscribe(
      data => {
        this.ebsDatas = data;
        this.prepareFilters();
        this.calculateTotalPrice();
        this.ebsDataCollected = true;
      }
    )
  }

  prepareFilters() {
    let subjectAreasSet = new Set<string>();
    this.subjectAreas = [];
    this.subjectAreas.push({
      label: 'Kein Filter',
      value: ''
    });
    for (const ebsdata of this.ebsDatas) {
      if (!subjectAreasSet.has(ebsdata.subjectArea)) {
        subjectAreasSet.add(ebsdata.subjectArea);
        this.subjectAreas.push({
          label: ebsdata.subjectArea,
          value: ebsdata.subjectArea
        });
        if (ebsdata.year < this.minimumYear) {
          this.minimumYear = ebsdata.year;
        }
        if (ebsdata.totalUsage > this.maximumUsage) {
          this.maximumUsage = ebsdata.totalUsage;
        }
        if (ebsdata.pricePerUsage > this.maximumPricePerUsage) {
          this.maximumPricePerUsage = ebsdata.pricePerUsage;
        }
        if (ebsdata.price > this.maximumPrice) {
          this.maximumPrice = ebsdata.price;
        }
      }
    }
    this.yearFilter =  this.minimumYear;
  }

  updateEbsData(ebsData: EbsData) {
    this.ebsDataService.updateSelectionEbsData(ebsData).subscribe();
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = 0.0;
    for (let ebsData of this.ebsDatas) {
      if (ebsData.selected) {
        this.totalPrice = this.totalPrice + ebsData.price;
      }
    }
    if (this.totalPrice < this.activeEbsModel.priceLimit) {
      this.activeColor = "green";
    } else if (this.totalPrice <= this.activeEbsModel.priceLimit * 1.05) {
      this.activeColor = "orange";
    } else {
      this.activeColor = "red";
    }
  }

  goToUsage(ebsData: EbsData) {
    const url = '/fachref/ejournals?identifiers=' + ebsData.isbn;
    window.open(url, '_blank');
  }

  onYearChange(event, dt) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      dt.filter(event.value, 'year', 'gt');
    }, 250);
  }

  onUsageChange(event, dt) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      dt.filter(event.value, 'totalUsage', 'lt');
    }, 250);
  }

  onPriceChange(event, dt) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      dt.filter(event.value, 'price', 'lt');
    }, 250);
  }
}
