import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from '../../Models/ProductModel';

@Component({
  selector: 'app-ProductDialog',
  templateUrl: './ProductDialog.component.html',
  styleUrls: ['./ProductDialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : ProductModel) { 
    console.log(data.id)
  }

  ngOnInit() {
  }

}
