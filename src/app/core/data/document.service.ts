import { UrlServers } from './../../../config/of.config';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { saveAs } from 'file-saver';
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  urls: string[] = UrlServers;

  constructor(private generic: GenericService) { }

  getDocument(organizationId: string, documentId: string): Observable<any> {
    let response: Observable<any>[] = [];
    this.urls.forEach(url => {
      response.push(of(this.get(url, organizationId, documentId)))
    });
    return forkJoin(response);
  }

  getInfo(data): Observable<any> {
    let response: Observable<any>[] = [];
    this.urls.forEach(path => {
      response.push(of(this.post(path, data)));
    });
    const result = forkJoin(response);
    return result;
  }

  private get(path: string, organizationId: string, documentId: string): Observable<any> {
    return this.generic.path(path).all(organizationId).one("info", documentId).get();
  }

  private post(path: string, data: any): Observable<any> {
    return this.generic.path(path).all("info").post(data);
  }

  downloadXml(organizationId: string, id: string, documentId: string) {
    this.urls.forEach(path => {
      const client = this.generic.path(path).all(organizationId).one("xml", id);
      client.http
        .get(client.url, { headers: new HttpHeaders(), responseType: 'blob' })
        .pipe(map(response => {
          const file = {
            file: response,
            fileName: documentId + '.xml'
          };
          return file;
        })).subscribe(result => {
          saveAs(result.file, result.fileName);
        }, error => {
        });
    });

  }

  downloadPdf(organizationId: string, id: string, documentId: string) {
    this.urls.forEach(url => {
      const client = this.generic.path(url).all(organizationId).one("pdf", id);
      client.http
        .get(client.url, { headers: new HttpHeaders(), responseType: 'blob' })
        .pipe(map(response => {
          const file = {
            file: response,
            fileName: documentId + '.pdf'
          };
          return file;
        }),
          catchError(this.handleErrorObservable)).subscribe(result => {
            saveAs(result.file, result.fileName);
          }, error => {
          });
    });
  }

  private handleErrorObservable(error: Response | any) {
    return throwError(error);
  }
}
