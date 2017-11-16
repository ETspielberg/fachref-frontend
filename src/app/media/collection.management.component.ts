import { Component, OnInit } from '@angular/core';
import {JournalCollection} from "../model/JournalCollection";
import {JournalCollectionService} from "../services/journal.collection.service";

@Component({
    selector: 'journalCollections',
    templateUrl: 'collection.management.component.html'
})

export class CollectionManagementComponent implements OnInit {

    journalCollections : JournalCollection[];

    ngOnInit(): void {
        this.getAllCollections();
    }

    constructor(private journalCollectionService : JournalCollectionService) {
    }

    getAllCollections() {
        this.journalCollectionService.getAll().subscribe(
         res => this.journalCollections = res
        );
    }

    deleteCollection(journalCollection : JournalCollection) {
        this.journalCollectionService.deleteJournalcollection(journalCollection.id);
    }

}
