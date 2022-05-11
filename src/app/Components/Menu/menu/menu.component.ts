import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/Shared/Dish';
import { DISHES } from 'src/app/Shared/dishes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  dishes: Dish[] = DISHES;

  selectedDish!: Dish;
  constructor() {

   }

  ngOnInit(): void {

  }
  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
