import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/Shared/Dish';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  @Input()dish!: Dish;


  constructor() { }

  ngOnInit(): void {
  }

}