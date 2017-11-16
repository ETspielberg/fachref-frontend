import {HttpHeaders} from "@angular/common/http";

'use strict';

export const settingsUrl = 'http://localhost:11300';
export const dataUrl = 'http://localhost:11200';
export const filesUrl = 'http://localhost:11855/files';
export const getterUrl = 'http://localhost:11800/getter';
export const resourcesUrl = 'http://localhost:11500';
export const serviceRunnerUrl = 'http://localhost:11844/run';
export const batchUrl = 'http://localhost:11822/batch';
export const headers = new HttpHeaders().set('Content-Type','application/json');
export const ignoredUrl = 'http://localhost:11400/blacklist';
