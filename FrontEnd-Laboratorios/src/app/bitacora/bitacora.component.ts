import { Component, OnInit } from '@angular/core';
import { BitacoraService } from '../services/bitacora/bitacora.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css'],
})
export class BitacoraComponent implements OnInit {
  bitacoras: any[] = [];

  constructor(private bitacoraService: BitacoraService) {}

  ngOnInit(): void {
    this.bitacoraService.getAllBitacoras().subscribe((data) => {
      this.bitacoras = data;
    });
  }

  generatePDF(bitacora: any): void {
    this.bitacoraService.getBitacoraById(bitacora.id_bitacora).subscribe((data) => {
      const doc = new jsPDF();

      doc.text('Bitácora de Uso de Laboratorio', 14, 16);
      doc.text(`Fecha: ${new Date(data.fecha).toLocaleDateString()}`, 14, 24);
      doc.text(`Laboratorio: ${data.Laboratorio.nombre_laboratorio}`, 14, 32);
      doc.text(`Código de Bitácora: ${data.codigo_bitacora}`, 14, 40);

      const tableData = data.Reserva.map((reserva: any) => [
        new Date(reserva.fecha_inicio).toLocaleDateString(),
        reserva.Materia.Catalogo_Materia.nombre_materia,
        reserva.Materia.Usuario.Detalle_Usuario.nombres + ' ' + reserva.Materia.Usuario.Detalle_Usuario.apellidos,
        reserva.motivo,
      ]);

      // doc.autoTable({
      //   head: [['Fecha', 'Materia', 'Docente', 'Motivo']],
      //   body: tableData,
      //   startY: 50,
      // });

      doc.save(`bitacora_${data.id_bitacora}.pdf`);
    });
  }
}
