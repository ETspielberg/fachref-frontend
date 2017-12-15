import {HttpHeaders} from "@angular/common/http";

'use strict';

export const settingsUrl = '/api/settings';
export const dataUrl = '/api/data';
export const filesUrl = '/files';
export const getterUrl = '/api/getter';
export const resourcesUrl = '/api/resources';
export const serviceRunnerUrl = '/services/run';
export const userUrl = 'http://localhost:11999';
export const gatewayurl = '';
export const batchUrl = '/services/batch';
export const headers = new HttpHeaders().set('Content-Type','application/json');
export const ignoredUrl = '/blacklist';
