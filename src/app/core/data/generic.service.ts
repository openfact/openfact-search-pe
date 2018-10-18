import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Configuration } from '../../../config/of.config';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private _url: string;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private configuration: Configuration) {
    this._url = configuration.api;
  }

  get http() {
    return this._http;
  }

  get url() {
    return this._url;
  }

  path(path: string): GenericService {
    return new GenericService(this._http, { api: path });
  }

  one(path: string, id: string): GenericService {
    const restangular = this.clone();
    restangular._url += (path ? '/' + path : '') + '/' + id;
    return restangular;
  }

  all(path: string): GenericService {
    const restangular = this.clone();
    restangular._url = restangular._url + '/' + path;
    return restangular;
  }

  get(): Observable<Response> {
    return this._http.get(this._url, { headers: this.headers }).pipe(
      map((response) => {
        return response as any;
      }), catchError((res) => { return this.onError(res); }));
  }

  post(obj?: any): Observable<Response> {
    return this._http.post(this._url, obj, { headers: this.headers }).pipe(
      map((response) => {
        return response as any;
      }), catchError((res) => { return this.onError(res); }));
  }

  clone(): GenericService {
    return new GenericService(this._http, { api: this._url });
  }

  onError(error: any) {
    return throwError(error.message || error);
  }
}