import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';
import 'dart:convert';
import 'dart:developer' as developer;

import '../models/horario.dart';
import '../providers/horario_provider.dart';
import '../providers/auth_provider.dart';
import 'package:intl/intl.dart';

class CalendarScreen extends StatefulWidget {
  @override
  _CalendarScreenState createState() => _CalendarScreenState();
}

class _CalendarScreenState extends State<CalendarScreen> {
  @override
  void initState() {
    super.initState();
    _fetchReservations();
  }

  void _fetchReservations() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final horarioProvider = Provider.of<HorarioProvider>(context, listen: false);
    await horarioProvider.fetchReservas(authProvider.user!.id, authProvider.user!.token);
  }

  void _showReservationDetails(Horario horario) {
    final formatter = DateFormat('dd-MM-yyyy HH:mm');
    developer.log('Mostrando detalles: ${horario.toJson()}');
    
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Detalle de la Reserva'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              _buildDetailRow(Icons.book, 'Motivo', horario.motivo),
              _buildDetailRow(Icons.home, 'Laboratorio', horario.laboratorio),
              _buildDetailRow(Icons.class_, 'Materia', horario.materia),
              _buildDetailRow(Icons.person, 'Docente', horario.docente),
              _buildDetailRow(Icons.calendar_today, 'Fecha Inicio', formatter.format(horario.fechaInicio)),
              _buildDetailRow(Icons.calendar_today, 'Fecha Fin', formatter.format(horario.fechaFin)),
            ],
          ),
          actions: [
            TextButton(
              child: Text('Cerrar'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  Widget _buildDetailRow(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        children: <Widget>[
          Icon(icon),
          SizedBox(width: 10),
          Text(
            '$label: ',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          Expanded(
            child: Text(value),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Horario de Clases'),
      ),
      body: Consumer<HorarioProvider>(
        builder: (context, horarioProvider, child) {
          if (horarioProvider.hasError) {
            return Center(child: Text('Error cargando datos'));
          }

          if (horarioProvider.horarios.isEmpty) {
            return Center(child: CircularProgressIndicator());
          }

          return SfCalendar(
            view: CalendarView.week,
            dataSource: MeetingDataSource(horarioProvider.horarios),
            firstDayOfWeek: 1,
            todayHighlightColor: Colors.red,
            onTap: (CalendarTapDetails details) {
              if (details.appointments != null && details.appointments!.isNotEmpty) {
                final Appointment appointment = details.appointments!.first;
                final horario = appointment.notes as Horario;
                _showReservationDetails(horario);
              }
            },
          );
        },
      ),
    );
  }
}

class MeetingDataSource extends CalendarDataSource {
  MeetingDataSource(List<Horario> source) {
    appointments = source
        .map((horario) => Appointment(
              startTime: horario.fechaInicio,
              endTime: horario.fechaFin,
              subject: 'Materia: ${horario.materia}\nLaboratorio: ${horario.laboratorio}',
              notes: jsonEncode(horario.toJson()), // Convertir el objeto a JSON para almacenarlo como una cadena
              color: Colors.blue,
            ))
        .toList();
  }
}
