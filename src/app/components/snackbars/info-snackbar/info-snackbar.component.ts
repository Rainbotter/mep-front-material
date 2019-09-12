import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'mep-info-snackbar',
  templateUrl: './info-snackbar.component.html',
  styleUrls: ['./info-snackbar.component.css']
})
export class InfoSnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }

  ngOnInit() {
  }

}
