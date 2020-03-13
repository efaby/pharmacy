import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Global} from './global';
@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = Global.url;
  }

  getIngredients(): Observable<any> {
    return this.http.get(this.url + 'ingredients');
  }
  getIngredient(id: string): Observable<any> {
    return this.http.get(`${this.url}ingredients/${id}`);
  }

  createIngredient(ingredient: Object): Observable<Object> {
    return this.http.post(`${this.url}ingredients`, ingredient);
  }

  updateIngredient(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}ingredients/${id}`, value);
  }

  deleteIngredient(id: string): Observable<any> {
    return this.http.delete(`${this.url}ingredients/${id}`, {responseType: 'text'});
  }
}
