import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Ingredient} from './../../../models/ingredient';
import {IngredientService} from './../../../services/ingredient.service';

@Component({
  selector: 'app-ingredient-create',
  templateUrl: './ingredient-create.component.html',
  styleUrls: ['./ingredient-create.component.css']
})
export class IngredientCreateComponent implements OnInit {
  ingredient: Ingredient;
  submitted = false;
  id: string;
  title: string;

  constructor(private ingredientService: IngredientService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.ingredient = new Ingredient();
    this.id = this.route.snapshot.params['id'];
    this.title = "Nuevo";
    if (this.id) {
      this.title = "Actualizar";
      this.ingredientService.getIngredient(this.id)
        .subscribe(data => {
          this.ingredient = data;
        }, error => console.log(error));
    }

  }

  save() {
    if (this.id) {
      this.ingredientService.updateIngredient(this.id, this.ingredient)
        .subscribe(data => this.gotoList(), error => console.log(error));
    } else {
      this.ingredientService.createIngredient(this.ingredient)
        .subscribe(data => this.gotoList(), error => console.log(error));
    }
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/ingredients']);
  }
}
