import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodosService } from '../../periodos.service';

@Component({
  selector: 'app-editar-periodo',
  templateUrl: './editar-periodo.component.html',
  styleUrls: ['./editar-periodo.component.css']
})
export class EditarPeriodoComponent implements OnInit {

  @Input() id: number | null = null;
  @Output() onClose = new EventEmitter<boolean>();

  nombre_periodo = '';
  detalle_periodo = '';
  anio_lectivo = '';
  estado = 'activo';

  constructor(
    private periodosService: PeriodosService
  ) {}

  ngOnInit(): void {
    if (this.id !== null) {
      this.periodosService.getById(this.id).subscribe(data => {
        this.nombre_periodo = data.nombre_periodo;
        this.detalle_periodo = data.detalle_periodo;
        this.anio_lectivo = data.anio_lectivo;
        this.estado = data.estado;
      });
    }
  }

  actualizarPeriodo(): void {
    const periodoActualizado = {
      nombre_periodo: this.nombre_periodo,
      detalle_periodo: this.detalle_periodo,
      anio_lectivo: this.anio_lectivo,
      estado: this.estado
    };
    if (this.id !== null) {
      this.periodosService.update(this.id, periodoActualizado).subscribe(() => {
        this.onClose.emit(true);
      });
    }
  }

  close(): void {
    this.onClose.emit(false);
  }

  
//   id: number;
//   nombre_periodo = '';
//   detalle_periodo = '';
//   anio_lectivo = '';
//   estado = 'activo';

//   constructor(
//     private route: ActivatedRoute,
//     private periodosService: PeriodosService,
//     private router: Router
//   ) {
//     this.id = this.route.snapshot.params['id'];
//   }

//   ngOnInit(): void {
//     this.periodosService.getById(this.id).subscribe(data => {
//       this.nombre_periodo = data.nombre_periodo;
//       this.detalle_periodo = data.detalle_periodo;
//       this.anio_lectivo = data.anio_lectivo;
//       this.estado = data.estado;
//     });
//   }

//   actualizarPeriodo(): void {
//     const periodoActualizado = {
//       nombre_periodo: this.nombre_periodo,
//       detalle_periodo: this.detalle_periodo,
//       anio_lectivo: this.anio_lectivo,
//       estado: this.estado
//     };
//     this.periodosService.update(this.id, periodoActualizado).subscribe(() => {
//       this.router.navigate(['/gestion/periodos']);
//     });
//   }
}
