// asistencia-docente.component.ts
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ReservaService } from '../services/reservas/reservas.service';
import { AuthService } from '../services/login/auth.service';
import Swal from 'sweetalert2';
import { AsistenciaService } from '../services/asistencia/asistencia.service';
import { InscripcionesService } from '../gestion/inscripciones.service';
import { UserService } from '../services/login/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-asistencia-docente',
  templateUrl: './asistencia-docente.component.html',
  styleUrls: ['./asistencia-docente.component.css']
})
export class AsistenciaDocenteComponent implements OnInit {
  reservas: any[] = [];
  asistencias: any[] = [];
  estudiantes: any[] = [];
  selectedReserva: any = null;
  qrCodeData: string = '';

  @ViewChild('qrModal') qrModal: TemplateRef<any>;

  constructor(
    private reservaService: ReservaService,
    private authService: AuthService,
    private asistenciaService: AsistenciaService,
    private inscripcionService: InscripcionesService,
    private userStateService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.userStateService.getUserId().subscribe(userId => {
      if (userId !== null) {
        this.loadReservasByDocente(userId);
      } else {
        Swal.fire('Error', 'Usuario no autenticado', 'error');
      }
    });
  }

  loadReservasByDocente(docenteId: number): void {
    this.reservaService.getReservasPorDocente(docenteId).subscribe(data => {
      this.reservas = data;
    }, error => {
      Swal.fire('Error', 'Error al cargar las reservas', 'error');
    });
  }

  loadAsistenciasByReserva(reservaId: number): void {
    this.selectedReserva = this.reservas.find(reserva => reserva.id_reserva === reservaId);
    this.asistenciaService.getAsistenciasByReserva(reservaId).subscribe(data => {
      this.asistencias = data;
    }, error => {
      Swal.fire('Error', 'Error al cargar las asistencias', 'error');
    });

    this.loadInscripcionesByMateria(this.selectedReserva.Materia.id_materia);
  }

  loadInscripcionesByMateria(materiaId: number): void {
    this.inscripcionService.getInscripcionesPorMateria(materiaId).subscribe(data => {
      this.estudiantes = data;
    }, error => {
      Swal.fire('Error', 'Error al cargar las inscripciones', 'error');
    });
  }

  saveAsistencia(asistencia: any): void {
    this.asistenciaService.updateAsistencia(asistencia.id_asistencia, asistencia).subscribe(() => {
      Swal.fire('Éxito', 'Asistencia actualizada correctamente', 'success');
    }, error => {
      Swal.fire('Error', 'Error al actualizar la asistencia', 'error');
    });
  }

  createOrUpdateAsistencia(estudiante: any): void {
    const asistencia = {
      id_inscripcion: estudiante.id_inscripcion,
      id_reserva: this.selectedReserva.id_reserva,
      tipo_asistencia: estudiante.tipo_asistencia,
      fecha_asistencia: new Date(),
      observaciones: estudiante.observaciones
    };

    this.asistenciaService.createOrUpdateAsistencia(asistencia).subscribe(() => {
      Swal.fire('Éxito', 'Asistencia registrada correctamente', 'success');
      this.loadAsistenciasByReserva(this.selectedReserva.id_reserva);
    }, error => {
      Swal.fire('Error', 'Error al registrar la asistencia', 'error');
    });
  }

  openQrModal(): void {
    this.qrCodeData = `http://localhost:3000/api/asistencias/qr?reservaId=${this.selectedReserva.id_reserva}`;
    this.modalService.open(this.qrModal);
  }
}
