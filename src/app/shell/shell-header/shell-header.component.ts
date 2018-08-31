import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'of-shell-header',
  templateUrl: './shell-header.component.html',
  styleUrls: ['./shell-header.component.scss']
})
export class ShellHeaderComponent implements OnInit {
  companyUrl = "www.openfact.pe";
  constructor() { }

  ngOnInit() {
  }

}
