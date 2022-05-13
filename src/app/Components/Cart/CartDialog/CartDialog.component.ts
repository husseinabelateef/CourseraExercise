import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseOrder } from '../../ViewModel/ResponseOrder';

@Component({
  selector: 'app-CartDialog',
  templateUrl: './CartDialog.component.html',
  styleUrls: ['./CartDialog.component.scss']
})
export class CartDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ResponseOrder) { }

  ngOnInit() {
  }

}
