import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {HomeComponent} from './components/home/home.component';
import {IngredientCreateComponent} from './components/ingredients/ingredient-create/ingredient-create.component';
import {IngredientListComponent} from './components/ingredients/ingredient-list/ingredient-list.component';
import { MedicineEditComponent } from './components/medicines/medicine-edit/medicine-edit.component';
import { MedicineListComponent } from './components/medicines/medicine-list/medicine-list.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientListComponent,
    IngredientCreateComponent,
    HomeComponent,
    MedicineEditComponent,
    MedicineListComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
