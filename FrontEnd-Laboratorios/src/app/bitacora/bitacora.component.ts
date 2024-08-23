import { Component, OnInit } from '@angular/core';
import { BitacoraService } from '../services/bitacora/bitacora.service';
import { ConfirmationService, MessageService } from 'primeng/api';
declare var $: any;
@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class BitacoraComponent implements OnInit {



  bitacoras: any[] = [];
  selectedBitacora: any = { descripcion: '' };
  selectedReservas: any[] = [];
  reservasDisponibles: any[] = [];
  searchCodigo: string = '';
  activeFilter: string = 'activas';
  loading: boolean = false;

  constructor(private bitacoraService: BitacoraService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadBitacoras();
  }

  // Cargar bitácoras según el filtro activo
  loadBitacoras() {
    this.loading = true;
    if (this.activeFilter === 'activas') {
      this.bitacoraService.getBitacorasActivas().subscribe(data => {
        this.bitacoras = data;
        this.loading = false;
      });
    } else {
      this.bitacoraService.getBitacorasCompletadas().subscribe(data => {
        this.bitacoras = data;
        this.loading = false;
      });
    }
  }

  // Abrir el modal de creación
  openCreateModal() {
    this.selectedBitacora = { descripcion: '' };
    this.selectedReservas = [];
    this.loadReservasDisponibles();
    $('#createModal').modal('show');
  }

  // Abrir el modal de subir evidencia
  openUploadModal(bitacora: any) {
    this.selectedBitacora = bitacora;
    $('#uploadModal').modal('show');
  }

  // Cargar reservas disponibles
  loadReservasDisponibles() {
    // Cargar reservas desde la API o simular datos
    this.reservasDisponibles = [
      { id: 1, descripcion: 'Laboratorio A - 11/05/2024 - 08:00 - 12:00' },
      { id: 2, descripcion: 'Laboratorio B - 12/05/2024 - 13:00 - 17:00' }
    ];
  }

  // Crear bitácora
  crearBitacora() {
    const bitacoraData = {
      descripcion: this.selectedBitacora.descripcion,
      reservas: this.selectedReservas.map(r => r.id)
    };
    this.bitacoraService.crearBitacora(bitacoraData).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Bitácora creada exitosamente' });
      $('#createModal').modal('hide');
      this.loadBitacoras();
    });
  }

  // Subir evidencia
  uploadEvidencia(event: any) {
    const file = event.target.files[0];
    this.bitacoraService.subirEvidencia(this.selectedBitacora.id_bitacora, file).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Evidencia subida exitosamente' });
      $('#uploadModal').modal('hide');
      this.loadBitacoras();
    });
  }

  // Filtrar por código de bitácora
  buscarPorCodigo() {
    if (this.searchCodigo) {
      this.bitacoras = this.bitacoras.filter(b => b.codigo_bitacora.includes(this.searchCodigo));
    } else {
      this.loadBitacoras();
    }
  }

  // Submit evidencia
  submitEvidencia() {
    // Simular la función de submit
    $('#uploadModal').modal('hide');
  }


  openEditModal(bitacora: any) {
    this.selectedBitacora = { ...bitacora };
    this.selectedReservas = [...bitacora.reservas]; // Cargar las reservas actuales
    this.loadReservasDisponibles(); // Cargar reservas disponibles adicionales
    $('#editModal').modal('show');
  }

  // Editar bitácora
  editarBitacora() {
    const bitacoraData = {
      descripcion: this.selectedBitacora.descripcion,
      reservas: this.selectedReservas.map(r => r.id)
    };
    this.bitacoraService.editarBitacora(this.selectedBitacora.id_bitacora, bitacoraData).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Bitácora actualizada exitosamente' });
      $('#editModal').modal('hide');
      this.loadBitacoras();
    });
  }
}