import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from "rxjs";
import {Ingredient} from './../../../models/ingredient';
import {IngredientService} from './../../../services/ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {

  list: Observable<Ingredient[]>;
  query: string;
  
  constructor(private ingredientService: IngredientService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.list = this.ingredientService.getIngredients();
  }

  addIngredient(): void {
    this.router.navigate(['ingredient/add']);
  };

  editIngredient(id: string): void {
    this.router.navigate(['ingredient/update', id]);
  };

  deleteIngredient(id: string) {
    if(confirm("Esta seguro de eliminar el item")) {
      this.ingredientService.deleteIngredient(id)
        .subscribe(
          data => {
            this.reloadData();
          },
          error => console.log(error));
    }
  }

}
