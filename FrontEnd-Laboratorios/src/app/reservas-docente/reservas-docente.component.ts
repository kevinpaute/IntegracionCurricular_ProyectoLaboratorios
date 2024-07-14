import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/login/auth.service';
import { ReservaService } from '../services/reservas/reservas.service';
import { MateriasService } from '../gestion/materias.service';



@Component({
  selector: 'app-reservas-docente',
  templateUrl: './reservas-docente.component.html',
  styleUrls: ['./reservas-docente.component.css']
})
export class ReservasDocenteComponent implements OnInit{

  @ViewChild('reservaModal') reservaModal: TemplateRef<any>;

  calendarOptions: CalendarOptions;
  reservas: any[] = [];
  materias: any[] = [];
  selectedReserva: any = { motivo: '', fechaInicio: '', fechaFin: '', laboratorio: '', materia: '' };
  userRole: string | null  ;
  userId: number ;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private reservaService: ReservaService,
    private materiasService: MateriasService
  ) {
    this.userRole = this.authService.getRole();
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    console.log('userid', this.userId);
    this.loadMaterias();
    this.loadReservas();
    this.calendarOptions = {
      initialView: 'timeGridWeek',
      events: this.reservas,
      selectable: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this)
    };
    
  }

  loadMaterias(): void {
    this.materiasService.getMateriasByDocente(this.userId).subscribe(data => {
      this.materias = data;
    });
  }

  loadReservas(): void {
    this.reservaService.getReservas().subscribe(data => {
      this.reservas = data;
      this.calendarOptions.events = this.reservas;
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.selectedReserva.fechaInicio = selectInfo.startStr;
    this.selectedReserva.fechaFin = selectInfo.endStr;
    this.modalService.open(this.reservaModal);
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`¿Está seguro de que desea cancelar la reserva de '${clickInfo.event.title}'?`)) {
      this.reservaService.changeReservaStatus(parseInt(clickInfo.event.id)).subscribe(() => {
        this.loadReservas();
      });
    }
  }

  saveReserva() {
    this.reservaService.createReserva(this.selectedReserva).subscribe(() => {
      this.loadReservas();
      this.modalService.dismissAll();
    });
  }

  openReservaModal(template: TemplateRef<any>): void {
    this.modalService.open(template);
  }
}