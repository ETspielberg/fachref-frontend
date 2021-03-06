import {Component, OnInit} from '@angular/core';
import {Eventanalysis} from '../model/Eventanalysis';
import {EventanalysisService} from "../services/eventanalysis.service";
import {IgnoredService} from "../services/ignored.service"
import {Router, Params, ActivatedRoute} from "@angular/router";
import {Ignored} from "../model/Ignored";
import {StockcontrolService} from "../services/stockcontrol.service";
import {Stockcontrol} from "../model/Stockcontrol";
import {Message} from "primeng/primeng";
import {TranslateService} from "../translate";

@Component({
  selector: 'eventanalysis',
  templateUrl: 'eventanalysis.component.html',
  providers: []
})

export class EventanalysisComponent implements OnInit {

  stockcontrol: Stockcontrol;

  public msgs: Message[] = [];

  private eventanalyses: Eventanalysis[];

  sortedEventanalysis: Map<string, Eventanalysis[]>;

  ignored: Ignored;

  display: boolean;

  private identifier: string;

  busy: boolean;

  listOptions: object[];

  selectedList: string;

  tableFields: string[] = ['shelfmark', 'titleId', 'meanRelativeLoan', 'lastStock', 'maxLoansAbs', 'proposedDeletion', 'comment'];

  cols: any[];

  showAllAnalyses: boolean;

  private threshold: number;

  allIgnored: Map<string, Ignored>;


  constructor(private eventanalysisService: EventanalysisService,
              private router: Router,
              private route: ActivatedRoute,
              private ignoredService: IgnoredService,
              private stockcontrolService: StockcontrolService,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.cols = [];
    this.tableFields.forEach(entry => {
      if (entry === 'tableId') {
        this.cols.push({field: entry, header: this.translateService.instant('table.field.'+ entry), display: 'none'});
      } else {
        this.cols.push({field: entry, header: this.translateService.instant('table.field.'+ entry), display: 'table-cell'});
      }
    });
    this.showAllAnalyses = false;
    this.threshold = 1;
    this.eventanalyses = [];
    this.listOptions = [];
    this.allIgnored = new Map<string, Ignored>();
    this.ignored = new Ignored('','','','','','',new Date(),new Date());

    this.translateService.use('de');

    this.busy = true;
    this.sortedEventanalysis = new Map<string, Eventanalysis[]>();
    this.route.params.subscribe((params: Params) => {
      this.identifier = params['identifier'];
      this.stockcontrolService.getStockcontrol(this.identifier).subscribe(
        data => {
          this.stockcontrol = data;
          this.eventanalysisService.getAllForStockcontrolWiththreshold(this.identifier, this.threshold).subscribe(
            data => {
              this.eventanalyses = data.filter(entry => entry.status !== 'OBSOLETE');
              this.sortEventanalyses();
              this.selectedList = 'proposed';
              this.busy = false;
            });
        }
      )
    });
  }

  reloadAnalyses() {
    this.busy = true;
    if (this.showAllAnalyses) {
      this.eventanalysisService.getAllForStockcontrol(this.identifier).subscribe(
        data => {
          this.eventanalyses = data;
          this.sortEventanalyses();
          this.busy = false;
        });
    } else {
      this.eventanalysisService.getAllForStockcontrolWiththreshold(this.identifier, this.threshold).subscribe(
        data => {
          this.eventanalyses = data;
          this.sortEventanalyses();
          this.busy = false;
        });
    }
  }

  sortEventanalyses() {
    this.listOptions = [];
    let allOptions = new Set<string>();
    this.sortedEventanalysis = new Map<string, Eventanalysis[]>();
    for (let eventanalysis of this.eventanalyses) {
      if (eventanalysis.proposedDeletion == 0 && !this.showAllAnalyses) {
        continue;
      }
      let eventanalysesInd: Eventanalysis[] = [];
      let category = eventanalysis.status;
      if (allOptions.has(category)) {
        eventanalysesInd = this.sortedEventanalysis[eventanalysis.status];
      } else {
        allOptions.add(category);
      }
      eventanalysesInd.push(eventanalysis);
      this.sortedEventanalysis[eventanalysis.status] = eventanalysesInd;
    }
    let listOptions = Array.from(allOptions);
    for (let listOption of listOptions) {
      let entry: object = {label: this.translateService.instant(listOption), value: listOption};
      this.listOptions.push(entry);
    }
  }

  showDialog(eventanalysis: Eventanalysis) {
    this.ignoredService.get('eventanalysis' + eventanalysis.titleId).subscribe(
      data => {
        for (let entry of data) {
          if (entry.type === 'eventanalysis') {
            this.ignored = entry;
          }
        }
        this.display = true;
      }
    );
  }

  updateIgnored(ignored: Ignored) {

    this.ignoredService.update(ignored).subscribe(
      data => {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'gesperrt', detail: 'Der Titel wurde mit den erweiterten Einstellungen gesperrt.'});
      },
      error => {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'nicht gesperrt', detail: 'Der Titel konnte nicht gesperrt werden. Ursache: ' + error});
      }
    );
    this.display = false;
    this.sortEventanalyses();
  }

  delete(eventanalysis: Eventanalysis) {
    eventanalysis.status = 'deletion';
    this.saveEventanalysis(eventanalysis);
    this.sortEventanalyses();
  }

  toRepository(eventanalysis: Eventanalysis) {
    eventanalysis.status = 'repository';
    this.saveEventanalysis(eventanalysis);
    this.sortEventanalyses();
  }

  toBlacklist(eventanalysis: Eventanalysis) {
    const date: Date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    eventanalysis.status = 'ignored';
    let ignored = new Ignored(eventanalysis.titleId,
      'eventanalysis' + eventanalysis.titleId,
      eventanalysis.shelfmark,
      'deletion',
      'Vorläufig aus Profil ' + this.stockcontrol.identifier,
      eventanalysis.mab,
      new Date(),
      new Date(year + 2, month, day));
    this.ignoredService.create(ignored).subscribe(
      data => {
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'gesperrt', detail: 'Der Titel wurde gesperrt.'});
      },
      error => {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'nicht gesperrt', detail: 'Der Titel konnte nicht gesperrt werden. Ursache: ' + error});
      }
    );
    this.saveEventanalysis(eventanalysis);
    this.sortEventanalyses();
  }

  toProposal(eventanalysis: Eventanalysis) {
    eventanalysis.status = 'proposed';
    this.saveEventanalysis(eventanalysis);
    this.sortEventanalyses();
  }

  fromBlacklistToProposal(eventanalysis: Eventanalysis) {
    eventanalysis.status = 'proposed';
    this.ignoredService.deleteIgnored('eventanalysis' + eventanalysis.titleId).subscribe();
    this.saveEventanalysis(eventanalysis);
    this.sortEventanalyses();
  }

  saveEventanalysis(eventanalysis: Eventanalysis) {
    this.eventanalysisService.update(eventanalysis).subscribe(
      () => console.log('updated analysis')
    );
  }

  showInfo(text: string) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Titeldaten', detail: text});
  }

  showMab(eventanalysis: Eventanalysis) {
    this.showInfo(eventanalysis.mab)
  }

  goToProtokoll(eventanalysis: Eventanalysis) {
    const url = '/protokoll?shelfmark=' + eventanalysis.shelfmark + '&amp;collections=' + eventanalysis.collection;
    window.open(url, '_blank');
  }
}
