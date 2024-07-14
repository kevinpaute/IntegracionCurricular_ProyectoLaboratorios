import { Component, OnInit, ChangeDetectorRef, TemplateRef, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservaService } from '../services/reservas/reservas.service';
import { AuthService } from '../services/login/auth.service';
import { ReservaSocketService } from '../services/reservas/reserva-socket.service';
import { MateriasService } from '../gestion/materias.service';
import { LaboratoriosService } from '../services/laboratorios/laboratorios.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  @ViewChild('reservaModal', { static: true }) reservaModal: TemplateRef<any>;

  reservas: any[] = [];
  laboratorios: any[] = [];
  materias: any[] = [];
  reserva: any = {};
  selectedLaboratorio: number | null = null;

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      bootstrapPlugin
    ],
    themeSystem: 'bootstrap',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'timeGridWeek',
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events: [],
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    locale: 'es', // Cambiar idioma a español
    buttonText: { // Personalizar textos de los botones
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día'
    },
    slotMinTime: '07:00:00', // Inicio del horario
    slotMaxTime: '24:00:00', // Fin del horario
    allDaySlot: false, // Desactivar el slot de todo el día
    height: 'auto', // Ajustar la altura del calendario automáticamente
    slotDuration: '00:30:00', // Intervalos de 30 minutos
    snapDuration: '00:30:00',  // Ajuste de arrastre a intervalos de 30 minutos
    slotLabelFormat: { // Formato de la etiqueta de las horas
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Formato de 24 horas
    },
    // eventContent: function(arg) {
    //   let customContent = document.createElement('div');
    //   let time = document.createElement('div');
    //   let title = document.createElement('div');
    //   let laboratorioNombre = document.createElement('div');
  
    //   // Include the time element from the default
    //   time.innerHTML = arg.timeText;
    //   time.classList.add('fc-event-time');
  
    //   // Add the title and laboratorioNombre
    //   title.innerHTML = arg.event.title;
    //   title.classList.add('fc-event-title');
  
    //   laboratorioNombre.innerHTML = `${arg.event.extendedProps['laboratorioNombre']}`;
    //   laboratorioNombre.classList.add('fc-event-laboratorio');
  
    //   customContent.appendChild(time);
    //   customContent.appendChild(title);
    //   customContent.appendChild(laboratorioNombre);
  
    //   return { domNodes: [customContent] };
    // }
  };

  constructor(
    private materiasService: MateriasService,
    private reservaService: ReservaService,
    private modalService: NgbModal,
    private authService: AuthService,
    private reservaSocketService: ReservaSocketService,
    private changeDetector: ChangeDetectorRef,
    private laboratorioService: LaboratoriosService
  ) {}

  ngOnInit(): void {
    this.loadLaboratorios();
    this.loadMaterias();
    this.loadReservas();
  }

  getEventColor(reserva: any): string {
    const colors = [
      '#A569BD', '#5499C7', '#1ABC9C', '#CD6155', '#EB984E', '#D4AC0D', '#5DADE2'
    ];
    return colors[reserva.id_reserva % colors.length];
  }
  loadReservas(): void {
    this.reservaService.getReservas().subscribe(data => {
      console.log('Reservas cargadas:', data);
      this.reservas = data;
      this.filterReservations(); // Filtrar al cargar reservas
    });
  }

  loadLaboratorios(): void {
    this.laboratorioService.getLaboratorios().subscribe(data => {
      console.log('Laboratorios cargados:', data);
      this.laboratorios = data;
    });
  }

  loadMaterias(): void {
    this.materiasService.getAll().subscribe(data => {
      console.log('Materias cargadas:', data);
      this.materias = data;
    });
  }

  filterReservations(): void {
    console.log('Laboratorio seleccionado:', this.selectedLaboratorio);
    if (this.selectedLaboratorio) {
      this.reservaService.getReservasByLaboratorio(this.selectedLaboratorio).subscribe(filteredReservations => {
        console.log('Reservas filtradas:', filteredReservations);
        this.updateCalendarEvents(filteredReservations);
      });
    } else {
      this.updateCalendarEvents(this.reservas);
    }
  }

  updateCalendarEvents(reservas: any[]): void {
    console.log('Actualizando eventos del calendario con reservas:', reservas);
    const events: EventInput[] = reservas.map(reserva => {
      const materiaNombre = reserva.Materia?.Catalogo_Materia?.nombre_materia || 'Sin Materia';
      const laboratorioNombre = reserva.Laboratorio?.nombre_laboratorio || 'Sin Laboratorio';
  
      return {
        title: materiaNombre,
        start: reserva.fecha_inicio,
        end: reserva.fecha_fin,
        id: reserva.id_reserva,
        backgroundColor: this.getEventColor(reserva), // Color de fondo del evento
        borderColor: this.getEventColor(reserva), // Color del borde del evento
        extendedProps: {
          laboratorioNombre: laboratorioNombre,
          motivo: reserva.motivo
        }
      };
    });
    console.log('Eventos generados:', events);
    this.calendarOptions = {
      ...this.calendarOptions,
      events: events
    };
    this.changeDetector.detectChanges(); // Forzar la detección de cambios
  }
  

  handleDateSelect(selectInfo: DateSelectArg) {
    this.reserva = {
      motivo: '',
      fecha_inicio: this.formatDate(selectInfo.start),
      fecha_fin: this.formatDate(selectInfo.end),
      id_laboratorio: null,
      id_materia: null,
      estado: 'activo'
    };
    this.openReservaModal();
  }

  handleEventClick(clickInfo: EventClickArg) {
    const reservaId = clickInfo.event.id;
    this.reserva = this.reservas.find(r => r.id_reserva === parseInt(reservaId));
    this.reserva.fecha_inicio = this.formatDate(new Date(this.reserva.fecha_inicio));
    this.reserva.fecha_fin = this.formatDate(new Date(this.reserva.fecha_fin));
    this.openReservaModal();
  }

  handleEvents(events: EventApi[]) {
    console.log('Eventos del calendario establecidos:', events);
    this.changeDetector.detectChanges();
  }

  openReservaModal(): void {
    this.modalService.open(this.reservaModal);
  }

  validateTime(field: string): void {
    const date = new Date(this.reserva[field]);
    const hours = date.getHours();
  
    if (hours < 7 || hours > 24) {
      alert('La hora debe estar entre las 07:00 y las 24:00.');
      this.reserva[field] = '';
    }
  }
  
  onSubmit(): void {
    console.log('Submitting reservation:', this.reserva);
    this.reserva.id_laboratorio = Number(this.reserva.id_laboratorio);
    this.reserva.id_materia = Number(this.reserva.id_materia);
    this.reserva.fecha_inicio = this.formatDate(new Date(this.reserva.fecha_inicio));
    this.reserva.fecha_fin = this.formatDate(new Date(this.reserva.fecha_fin));
  
    if (this.reserva.id_reserva) {
      this.reservaService.updateReserva(this.reserva.id_reserva, this.reserva).subscribe(
        () => {
          this.loadReservas();
          this.reservaSocketService.emitReservaCambiada(this.reserva);
          this.modalService.dismissAll();
        },
        error => {
          console.error('Error updating reservation:', error);
        }
      );
    } else {
      this.reservaService.createReserva(this.reserva).subscribe(
        () => {
          this.loadReservas();
          this.reservaSocketService.emitReservaCambiada(this.reserva);
          this.modalService.dismissAll();
        },
        error => {
          console.error('Error creating reservation:', error);
        }
      );
    }
  }
  
  
  

  cancelReserva(): void {
    this.reservaService.changeReservaStatus(this.reserva.id_reserva).subscribe(
      () => {
        this.loadReservas();
        this.reservaSocketService.emitReservaCambiada(this.reserva);
        this.modalService.dismissAll();
      },
      error => {
        console.error('Error al cancelar la reserva:', error);
      }
    );
  }


  

  formatDate(date: Date): string {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().slice(0, 16);
  }

  checkLaboratorioAvailability(): void {
    if (this.reserva.fecha_inicio && this.reserva.fecha_fin) {
      this.loadReservas(); // Recargar reservas para asegurarse de que las verificaciones estén actualizadas
    }
  }

  isLaboratorioAvailable(laboratorioId: number): boolean {
    const startDate = new Date(this.reserva.fecha_inicio);
    const endDate = new Date(this.reserva.fecha_fin);

    return !this.reservas.some(reserva =>
      reserva.id_laboratorio === laboratorioId &&
      new Date(reserva.fecha_inicio) < endDate &&
      new Date(reserva.fecha_fin) > startDate
    );
  }

  adjustTime(field: string): void {
    const date = new Date(this.reserva[field]);
    const minutes = date.getMinutes();
    const adjustedMinutes = minutes < 30 ? 0 : 30;
    date.setMinutes(adjustedMinutes, 0, 0);
    this.reserva[field] = this.formatDate(date);
  }


  
}
