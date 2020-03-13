import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Global} from './global';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = Global.url;
  }

  getMedicines(query): Observable<any> {
    var queryText = query.length ? query : "*";
    return this.http.get(this.url + 'medicines/search/' + queryText);
  }
  getMedicine(id: string): Observable<any> {
    return this.http.get(`${this.url}medicines/${id}`);
  }

  createMedicine(ingredient: Object): Observable<Object> {
    return this.http.post(`${this.url}medicines`, ingredient);
  }

  updateMedicine(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}medicines/${id}`, value);
  }

  deleteMedicine(id: string): Observable<any> {
    return this.http.delete(`${this.url}medicines/${id}`, {responseType: 'text'});
  }

}
