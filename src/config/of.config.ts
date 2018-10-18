import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public api = UrlServers[0];
}

export const UrlServers: string[] = [
    'http://openfactv2-openfact-ahren.apps.console.sistcoop.org:83/api/public/documents',
    'http://openfactv2-openfact-inpath.apps.console.sistcoop.org:83/api/public/documents',
    'http://openfactv2-openfact-xiomany.apps.console.sistcoop.org:83/api/public/documents',
    'https://openfactv2-openfact.b9ad.pro-us-east-1.openshiftapps.com/api/public/documents'
];