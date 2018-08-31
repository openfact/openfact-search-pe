import { Injectable } from '@angular/core';
import { DocumentService } from './document.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private document: DocumentService) {  }

  documents(): DocumentService {
    return this.document;
  }
}
