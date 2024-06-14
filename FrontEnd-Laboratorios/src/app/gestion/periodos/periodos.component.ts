import { Component, OnInit } from '@angular/core';
import { PeriodosService } from '../periodos.service';

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.css']
})
export class PeriodosComponent implements OnInit {
  // periodos: any[] = [];

  // constructor(private periodosService: PeriodosService) {}

  // ngOnInit(): void {
  //   this.periodosService.getAll().subscribe(data => {
  //     this.periodos = data;
  //   });
  // }

  // eliminarPeriodo(id: number): void {
  //   this.periodosService.delete(id).subscribe(() => {
  //     this.periodos = this.periodos.filter(p => p.id_periodo !== id);
  //   });
  // }

  periodos: any[] = [];
  selectedPeriodoId: number | null = null;
  showModal = false;

  constructor(private periodosService: PeriodosService) {}

  ngOnInit(): void {
    this.periodosService.getAll().subscribe(data => {
      this.periodos = data;
    });
  }

  openModal(id: number) {
    this.selectedPeriodoId = id;
    this.showModal = true;
  }

  closeModal(refresh: boolean) {
    this.showModal = false;
    this.selectedPeriodoId = null;
    if (refresh) {
      this.ngOnInit();
    }
  }

  eliminarPeriodo(id: number): void {
    this.periodosService.delete(id).subscribe(() => {
      this.periodos = this.periodos.filter(p => p.id_periodo !== id);
    });
  }
}
