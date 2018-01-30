import {HttpHeaders} from "@angular/common/http";

export const dataUrl = '/api/data';
export const filesUrl = '/files';
export const getterUrl = '/api/getter';
export const settingsUrl = '/api/settings';
export const resourcesUrl = '/api/resources';
//export const gatewayurl = '/';
export const batchUrl = '/services/batch';
export const headers = new HttpHeaders().set('Content-Type','application/json');
export const ignoredUrl = '/blacklist';
