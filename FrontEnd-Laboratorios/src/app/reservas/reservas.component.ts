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
import Swal from 'sweetalert2';
import { CarrerasService } from '../gestion/carreras.service';
import { CursosService } from '../gestion/cursos.service';

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
  carreras: any[] = [];
  cursos: any[] = [];
  reserva: any = {};
  selectedLaboratorio: number | "" = "";
  selectedCarrera: number | "" = "";
  selectedCurso: number | "" = "";

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
    slotMaxTime: '18:00:00', // Fin del horario
    allDaySlot: false, // Desactivar el slot de todo el día
    height: 'auto', // Ajustar la altura del calendario automáticamente
    slotDuration: '00:30:00', // Intervalos de 30 minutos
    snapDuration: '00:30:00',  // Ajuste de arrastre a intervalos de 30 minutos
    slotLabelFormat: { // Formato de la etiqueta de las horas
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Formato de 24 horas
    },

  };

  constructor(
    private materiasService: MateriasService,
    private reservaService: ReservaService,
    private modalService: NgbModal,
    private authService: AuthService,
    private reservaSocketService: ReservaSocketService,
    private changeDetector: ChangeDetectorRef,
    private laboratorioService: LaboratoriosService,
    private carrerasService: CarrerasService,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    this.loadLaboratorios();
    this.loadCarreras();
    this.loadReservas();

    // Suscribirse a los cambios en las reservas
    this.reservaSocketService.onReservaCambiada().subscribe(() => {
      this.loadReservas();
    });
  }

  getEventColor(reserva: any): string {
    const colors = [
      '#5C6BC0', // azulado
      '#7E57C2', // morado
      '#FF7043', // naranja
      '#e67c73', // flamenco
      '#33b679', // salvia
      '#039be5', // lavanda
      '#EF5350', // rojo
    ];
    return colors[reserva.id_reserva % colors.length];
  }

  loadReservas(): void {
    this.reservaService.getReservas().subscribe(data => {
      this.reservas = data;
      this.filterReservations(); // Filtrar al cargar reservas
    }, error => {
      Swal.fire('Error', 'Error al cargar las reservas', 'error');
    });
  }

  loadLaboratorios(): void {
    this.laboratorioService.getLaboratorios().subscribe(data => {
      this.laboratorios = data;
    });
  }

  loadCarreras(): void {
    this.carrerasService.getCarreras().subscribe(data => {
      this.carreras = data;
      console.log('Carreras cargadas:', data);
    });
  }
  
  onCarreraChange(): void {
    if (this.selectedCarrera) {
      this.cursosService.getCursosByCarreraUltimoPeriodo(this.selectedCarrera).subscribe(data => {
        this.cursos = data;
        console.log('Cursos cargados:', data);
        this.selectedCurso = '';
        this.materias = [];
      });
    }
  }
  
  onCursoChange(): void {
    if (this.selectedCurso) {
      this.materiasService.getMateriasByCurso(this.selectedCurso).subscribe(data => {
        this.materias = data;
        console.log('Materias cargadas:', data);
      });
    }
  }

  filterReservations(): void {
    if (this.selectedLaboratorio) {
      this.reservaService.getReservasByLaboratorio(this.selectedLaboratorio).subscribe(filteredReservations => {
        this.updateCalendarEvents(filteredReservations);
      });
    } else {
      this.updateCalendarEvents(this.reservas);
    }
  }

  updateCalendarEvents(reservas: any[]): void {
    const events: EventInput[] = reservas.map(reserva => {
      const materiaNombre = reserva.Materia?.Catalogo_Materia?.nombre_materia || 'Sin Materia';
      const laboratorioNombre = reserva.Laboratorio?.nombre_laboratorio || 'Sin Laboratorio';

      return {
        title: `${materiaNombre}\n${laboratorioNombre}`,
        start: reserva.fecha_inicio,
        end: reserva.fecha_fin,
        id: reserva.id_reserva,
        backgroundColor: this.getEventColor(reserva),
        borderColor: this.getEventColor(reserva),
        extendedProps: {
          laboratorioNombre,
          motivo: reserva.motivo
        }
      };
    });

    this.calendarOptions = {
      ...this.calendarOptions,
      events
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
    this.changeDetector.detectChanges();
  }

  openReservaModal(): void {
    this.modalService.open(this.reservaModal);
  }

  validateTime(field: string): void {
    const date = new Date(this.reserva[field]);
    const hours = date.getHours();

    if (hours < 7 || hours > 24) {
      Swal.fire('Advertencia', 'La hora debe estar entre las 07:00 y las 24:00.', 'warning');
      this.reserva[field] = '';
    } else {
      this.adjustTime(field);
    }
  }

  areFieldsFilled(): boolean {
    return this.reserva.motivo && this.reserva.fecha_inicio && this.reserva.fecha_fin && this.reserva.id_laboratorio && this.reserva.id_materia;
  }

  onSubmit(): void {
    if (!this.areFieldsFilled()) {
      Swal.fire('Error', 'Por favor, complete todos los campos antes de continuar.', 'error');
      return;
    }

    if (this.reserva.id_reserva) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Editar la reserva',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.submitReservation();
        }
      });
    } else {
      this.submitReservation();
    }
  }

  submitReservation(): void {
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
          Swal.fire('Éxito', 'Reserva actualizada exitosamente', 'success');
        },
        error => {
          Swal.fire('Error', 'Error al actualizar la reserva', 'error');
        }
      );
    } else {
      this.reservaService.createReserva(this.reserva).subscribe(
        () => {
          this.loadReservas();
          this.reservaSocketService.emitReservaCambiada(this.reserva);
          this.modalService.dismissAll();
          Swal.fire('Éxito', 'Reserva creada exitosamente', 'success');
        },
        error => {
          if (error.status === 400) {
            Swal.fire('Error', 'El laboratorio ya está reservado para este horario', 'error');
          } else {
            Swal.fire('Error', 'Error al crear la reserva', 'error');
          }
        }
      );
    }
  }

  cancelReserva(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'La reserva será cancelada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar reserva'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservaService.changeReservaStatus(this.reserva.id_reserva).subscribe(
          () => {
            this.loadReservas();
            this.reservaSocketService.emitReservaCambiada(this.reserva);
            this.modalService.dismissAll();
            Swal.fire('Éxito', 'Reserva cancelada exitosamente', 'success');
          },
          error => {
            Swal.fire('Error', 'Error al cancelar la reserva', 'error');
          }
        );
      }
    });
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
