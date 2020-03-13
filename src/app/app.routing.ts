import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {IngredientCreateComponent} from './components/ingredients/ingredient-create/ingredient-create.component';
import {IngredientListComponent} from './components/ingredients/ingredient-list/ingredient-list.component';
import {MedicineEditComponent} from './components/medicines/medicine-edit/medicine-edit.component';
import {MedicineListComponent} from './components/medicines/medicine-list/medicine-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'ingredients', component: IngredientListComponent},
  {path: 'ingredient/add', component: IngredientCreateComponent},
  {path: 'ingredient/update/:id', component: IngredientCreateComponent},
  {path: 'medicines', component: MedicineListComponent},
  {path: 'medicine/add', component: MedicineEditComponent},
  {path: 'medicine/update/:id', component: MedicineEditComponent},
];

export const routing = RouterModule.forRoot(routes);
