import {HttpHeaders} from "@angular/common/http";

export const dataUrl = '/api/data';
export const filesUrl = '/files';
export const settingsUrl = '/api/settings';
export const counterretrievalUrl = '/api/counterretrieval';
export const resourcesUrl = '/api/resources';
export const stockanalyzerUrl = '/api/stockanalyzer';
export const ignoredUrl = '/api/blacklist';

export const headers = new HttpHeaders().set('Content-Type','application/json');
