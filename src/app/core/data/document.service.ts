import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private generic: GenericService) { }

  getDocument(organizationId: string, documentId: string): Observable<any> {
    return this.generic.all(organizationId).one("info", documentId).get();
  }

  getInfo(data): Observable<any> {
    return this.generic.all("info").post(data);
  }

  downloadXml(organizationId: string, id: string, documentId: string) {
    const client = this.generic.all(organizationId).one("xml", id);
    const url = client.path;
    return client.http
      .get(url, { headers: new HttpHeaders(), responseType: 'blob' })
      .pipe(map(response => {
        const file = {
          file: response,
          fileName: documentId + '.xml'
        };
        return file;
      })).subscribe(result => {
        saveAs(result.file, result.fileName);
      }, error => {
        Observable.throw(error);
      });
  }

  downloadPdf(organizationId: string, id: string, documentId: string) {
    const client = this.generic.all(organizationId).one("pdf", id);
    const url = client.path;
    return client.http
      .get(url, { headers: new HttpHeaders(), responseType: 'blob' })
      .pipe(map(response => {
        const file = {
          file: response,
          fileName: documentId + '.pdf'
        };
        return file;
      })).subscribe(result => {
        saveAs(result.file, result.fileName);
      }, error => {
        Observable.throw(error);
      });
  }
}
