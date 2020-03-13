import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from "rxjs";
import {Medicine} from './../../../models/medicine';
import {MedicineService} from './../../../services/medicine.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {

  list: Observable<Medicine[]>;
  query: string = "";
  constructor(private medicineService: MedicineService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.list = this.medicineService.getMedicines(this.query);
  }

  addMedicine(): void {
    this.router.navigate(['medicine/add']);
  };

  editMedicine(id: string): void {
    this.router.navigate(['medicine/update', id]);
  };

  deleteMedicine(id: string) {
    if(confirm("Esta seguro de eliminar el item")) {
      this.medicineService.deleteMedicine(id)
      .subscribe(
        data => {
          this.reloadData();
        },
        error => console.log(error));
    }
    
  }
}
