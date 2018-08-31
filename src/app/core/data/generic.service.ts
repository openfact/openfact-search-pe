import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpClient } from '@angular/common/http';
import { Configuration } from '../../../config/of.config';
import { RequestOptionsArgs, Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private url: string;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private configuration: Configuration) {
    this.url = configuration.api;
  }
  get path() {
    return this.url;
  }

  get http() {
    return this._http;
  }

  one(path: string, id: string): GenericService {
    const restangular = this.clone();
    restangular.url += (path ? '/' + path : '') + '/' + id;
    return restangular;
  }

  all(path: string): GenericService {
    const restangular = this.clone();
    restangular.url = restangular.url + '/' + path;
    return restangular;
  }

  get(): Observable<Response> {
    return this._http.get(this.url, { headers: this.headers }).pipe(
      map((response) => {
        return response as any;
      }), catchError((res) => { return this.onError(res); }));
  }

  post(obj?: any): Observable<Response> {
    return this._http.post(this.url, obj, { headers: this.headers }).pipe(
      map((response) => {
        return response as any;
      }), catchError((res) => { return this.onError(res); }));
  }

  clone(): GenericService {
    return new GenericService(this._http, { api: this.url });
  }

  onError(error: any) {
    return throwError(error.message || error);
  }
}