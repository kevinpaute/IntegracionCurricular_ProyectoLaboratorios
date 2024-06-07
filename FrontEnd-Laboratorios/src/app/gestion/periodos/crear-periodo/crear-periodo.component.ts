import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeriodosService } from '../../periodos.service';

@Component({
  selector: 'app-crear-periodo',
  templateUrl: './crear-periodo.component.html',
  styleUrls: ['./crear-periodo.component.css']
})
export class CrearPeriodoComponent {
  nombre_periodo = '';
  detalle_periodo = '';
  anio_lectivo = '';
  estado = 'activo';

  constructor(private periodosService: PeriodosService, private router: Router) {}

  crearPeriodo(): void {
    const nuevoPeriodo = {
      nombre_periodo: this.nombre_periodo,
      detalle_periodo: this.detalle_periodo,
      anio_lectivo: this.anio_lectivo,
      estado: this.estado
    };
    this.periodosService.create(nuevoPeriodo).subscribe(() => {
      this.router.navigate(['/gestion/periodos']);
    });
  }
}
