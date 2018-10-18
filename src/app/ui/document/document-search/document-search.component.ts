import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, DateAdapter } from '@angular/material';
import { DataService } from '../../../core/data/data.service';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'of-document-search',
  templateUrl: './document-search.component.html',
  styleUrls: ['./document-search.component.scss']
})
export class DocumentSearchComponent implements OnInit {

  form: FormGroup;
  loading = false;
  maxDate = new Date();
  tipoDocumentos = [
    { codigo: '01', denominacion: 'FACTURA' },
    { codigo: '03', denominacion: 'BOLETA' },
    { codigo: '07', denominacion: 'NOTA DE CRÉDITO' },
    { codigo: '08', denominacion: 'NOTA DE DÉBITO' }
  ];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private dataService: DataService) {
    this.dateAdapter.setLocale('es');
  }

  ngOnInit() {
    this.buildForm();
    this.buildData();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      organizationAssignedAccountId: [null, Validators.compose([Validators.required])],
      documentId: [null, Validators.compose([Validators.required])],
      documentType: [null, Validators.compose([Validators.required])],
      issueDate: [null, Validators.compose([Validators.required])],
      totalAmount: [null, Validators.compose([Validators.required])]
    });
  }

  buildData() {
    this.form.patchValue({
      documentType: "01",
      issueDate: new Date()
    });
  }

  search() {
    if (!this.form.valid) {
      this.message('Ingrese todos los campos obligatorios.');
      return;
    }
    this.loading = true;
    this.dataService.documents().getInfo(this.form.value)
      .subscribe((observable: Observable<any>[]) => {
        observable.forEach(response => {
          response.subscribe(r => this.router.navigate(['./view', r.organizationAssignedAccountId, r.id], { relativeTo: this.route }));
        });
      }, er => this.message('No se encontro resultados.'))
      .add(() => this.loading = false);
  }

  message(message: string) {
    this.snackBar.open(message, 'ACEPTAR', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }
}
