import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Medicine} from './../../../models/medicine';
import {MedicineService} from './../../../services/medicine.service';
import {Ingredient} from './../../../models/ingredient';
import {Observable} from "rxjs";
import {IngredientService} from './../../../services/ingredient.service';
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { of } from 'rxjs';

@Component({
  selector: 'app-medicine-edit',
  templateUrl: './medicine-edit.component.html',
  styleUrls: ['./medicine-edit.component.css']
})
export class MedicineEditComponent implements OnInit {

  medicine: Medicine;
  submitted = false;
  id: string;
  title: string;
  list: Observable<Ingredient[]>;
  editForm: FormGroup;
  loadItem: boolean = true;

  constructor(private medicineService: MedicineService,
    private ingredientService: IngredientService,
    private route: ActivatedRoute,
    private router: Router) {
      
    }

  ngOnInit() {
    this.medicine = new Medicine();
    this.id = this.route.snapshot.params['id'];
    this.title = "Nuevo"; 
    this.ingredientService.getIngredients().subscribe(data => {
      this.list = data;
      if (this.id) {
        this.loadItem = false;
        this.title = "Actualizar";
        this.medicineService.getMedicine(this.id)
          .subscribe(data => {
            data.expire = new Date(data.expire).toISOString().split('T')[0]
            this.medicine = data;
            this.loadItem = true;
            this.createFormInputs();
          }, error => console.log(error));
      } else {
        this.medicine.ingredients = [];
        this.createFormInputs();
      }
    }, error => console.log(error));   
  }

  save() {
    this.medicine.ingredients = [];
    this.editForm.controls.items['controls'].forEach((item, i) => {
      if (item.value) {
        delete this.list[i].selected;
        this.medicine.ingredients.push(this.list[i])
      }
    })
    this.medicine.expire = new Date(this.medicine.expire).toISOString();
    if (this.id) {
      this.medicineService.updateMedicine(this.id, this.medicine)
        .subscribe(data => this.gotoList(), error => console.log(error));
    } else {
      this.medicineService.createMedicine(this.medicine)
        .subscribe(data => this.gotoList(), error => console.log(error));
    }
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/medicines']);
  }

  createFormInputs() {
    this.editForm = new FormGroup({
      items: this.createItems(this.list)
    });
  }

  createItems(list) {
    this.medicine.ingredients.forEach((ing, i) => {
      var index = list.findIndex(item => {
        return item.id === ing.id;
      });
      list[index].selected = true;
    })
    const arr = list.map(item => {
      return new FormControl(item.selected || false);
    });
    return new FormArray(arr);
  }

}
