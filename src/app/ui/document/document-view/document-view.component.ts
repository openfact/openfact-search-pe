import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'of-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent implements OnInit {

  document: any = {};
  constructor(
    private snackBar: MatSnackBar,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let organizationId, documentId;
      if (params['organizationId'] != null && params['documentId'] != null) {
        organizationId = params['organizationId'];
        documentId = params['documentId'];
        this.dataService.documents().getDocument(organizationId, documentId)
          .subscribe((observable: Observable<any>[]) => {
            observable.forEach(response => {
              response.subscribe(r => (this.document = r));
            });
          }, er => {
            this.message('No se encontro resultados.');
          }).add(() => { });
      }
    });
  }

  newConsult() {
    this.router.navigate(['../../../'], { relativeTo: this.route });
  }

  downloadXml(document: any) {
    this.message('Descargando XML');
    this.dataService.documents().downloadXml(document.organizationAssignedAccountId, document.id, document.documentId);
  }

  downloadPdf(document: any) {
    this.message('Descargando PDF');
    this.dataService.documents().downloadPdf(document.organizationAssignedAccountId, document.id, document.documentId);
  }

  message(message: string) {
    this.snackBar.open(message, 'ACEPTAR', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }
}
