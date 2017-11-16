import { Component, OnInit } from '@angular/core';
import {Message} from "primeng/primeng";
import {FileService} from "../services/file.service";
import {FileWithLink} from "../model/FileWithLink";
import {HttpClient} from "@angular/common/http";
import * as appGlobals from '../app.globals';

@Component({
    selector: 'admin',
    templateUrl: 'admin.component.html'
})

export class AdminComponent implements OnInit {

    ngOnInit(): void {
        this.getAllFiles();
    }

    files : FileWithLink[];
    msgs: Message[];

    uploadedFiles: any[] = [];

    constructor(private http: HttpClient, private fileService : FileService) {
    }

    getAllFiles() {
        this.fileService.listAllFiles("systematik").subscribe(
            res => this.files = res
        );
    }

    buildNotationIndex() {
        this.http.get(appGlobals.serviceRunnerUrl + "/notationbuilder");
        console.log("building notation index");
    }

    updateNrequests() {
        this.http.get(appGlobals.batchUrl + "/nrequests");
    }

    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
}
