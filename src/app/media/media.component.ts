import { Component, OnInit } from '@angular/core';
import {Message} from "primeng/primeng";
import {FileWithLink} from "../model/FileWithLink";
import {FileService} from "../services/file.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'media',
    templateUrl: 'media.component.html'
})

export class MediaComponent implements OnInit {

    constructor(private http: HttpClient, private fileService : FileService) {
    }

    ngOnInit(): void {
        this.getAllFiles();
    }

    msgs: Message[];

    uploadedFiles: any[] = [];

    files : FileWithLink[];

    getAllFiles() {
        this.fileService.listAllFiles("ezbUpload").subscribe(
            res => this.files = res
        );
    }

    runEzbAnalyzer(file : FileWithLink) {
        let url = 'http://localhost:11844/run/ezbAnalyzer?filename=' + file.filename;
        this.http.get(url).subscribe();
    }

    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
}
