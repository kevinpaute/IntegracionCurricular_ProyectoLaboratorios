import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';
import 'package:provider/provider.dart';
import 'package:lab_andes/providers/auth_provider.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:art_sweetalert/art_sweetalert.dart';
import 'dart:developer' as developer;
import 'package:intl/intl.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

class CalendarScreen extends StatefulWidget {
  @override
  _CalendarScreenState createState() => _CalendarScreenState();
}

class _CalendarScreenState extends State<CalendarScreen> {
  List<Appointment> _appointments = [];
  List<int> _visibleDays = [DateTime.saturday, DateTime.sunday]; // Por defecto, sábado y domingo

  final Map<String, Color> _materiaColors = {};
  final List<Color> _availableColors = [

    Colors.green,
    Colors.blue,
    Colors.orange,
    //Color.fromARGB(255, 188, 157, 2),
    Colors.purple,
    Colors.red,
    Colors.pink,
  ];

  @override
  void initState() {
    super.initState();
    _fetchReservations();
  }

  void _fetchReservations() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    String url = 'http://192.168.1.65:3000/api/reservas/estudiante/${authProvider.user?.id}';

    try {
      final response = await http.get(
        Uri.parse(url),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ${authProvider.user?.token}',
        },
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body) as List;
        setState(() {
          _appointments = data.map((item) {
            final String materia = item['Materia']['Catalogo_Materia']['nombre_materia'];
            if (!_materiaColors.containsKey(materia)) {
              _materiaColors[materia] = _availableColors[_materiaColors.length % _availableColors.length];
            }
            return Appointment(
              startTime: DateTime.parse(item['fecha_inicio']),
              endTime: DateTime.parse(item['fecha_fin']),
              subject: '${materia}',

              // subject: '${materia}\n${item['Laboratorio']['nombre_laboratorio']}',
              color: _materiaColors[materia]!,
              notes: json.encode(item), // Guardamos el objeto completo en notes para su uso posterior
            );
          }).toList();
        });
      } else {
        _showErrorAlert('Error al obtener las reservas.');
        developer.log('Error al obtener las reservas: ${response.statusCode} - ${response.body}');
      }
    } catch (e) {
      _showErrorAlert('Error al obtener las reservas.');
      developer.log('Error en _fetchReservations: $e');
    }
  }

  void _showErrorAlert(String message) {
    ArtSweetAlert.show(
      context: context,
      artDialogArgs: ArtDialogArgs(
        type: ArtSweetAlertType.danger,
        title: "Error",
        text: message,
        confirmButtonText: "Aceptar",
      ),
    );
  }

  void _showReservationDetails(Appointment appointment) {
    final reservationDetails = json.decode(appointment.notes!);
    final DateFormat formatter = DateFormat('dd-MM-yyyy HH:mm');

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Detalles de la Reserva', style: TextStyle(fontWeight: FontWeight.bold)),
          content: SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                _buildDetailRow(Icons.book, 'Motivo', reservationDetails['motivo']),
                _buildDetailRow(Icons.home, 'Laboratorio', reservationDetails['Laboratorio']['nombre_laboratorio']),
                _buildDetailRow(Icons.class_, 'Materia', reservationDetails['Materia']['Catalogo_Materia']['nombre_materia']),
                _buildDetailRow(Icons.person, 'Docente', '${reservationDetails['Materia']['Usuario']['Detalle_Usuario']['nombres']} ${reservationDetails['Materia']['Usuario']['Detalle_Usuario']['apellidos']}'),
                _buildDetailRow(Icons.calendar_today, 'Fecha Inicio', formatter.format(DateTime.parse(reservationDetails['fecha_inicio']))),
                _buildDetailRow(Icons.calendar_today, 'Fecha Fin', formatter.format(DateTime.parse(reservationDetails['fecha_fin']))),
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: Text('Cerrar', style: TextStyle(color: Colors.blue)),
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
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        children: <Widget>[
          Icon(icon, color: Colors.blue),
          SizedBox(width: 10),
          Text('$label: ', style: TextStyle(fontWeight: FontWeight.bold)),
          Expanded(child: Text(value)),
        ],
      ),
    );
  }

  void _addDay() {
    setState(() {
      if (_visibleDays.length < 7) {
        int newDay = (_visibleDays.length + 1) % 7;
        _visibleDays.add(newDay == 0 ? 7 : newDay);
      }
    });
  }

  void _removeDay() {
    setState(() {
      if (_visibleDays.length > 2) {
        _visibleDays.removeLast();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Horario de Clases'),
        actions: [
          IconButton(
            icon: Icon(Icons.remove),
            onPressed: _removeDay,
          ),
          IconButton(
            icon: Icon(Icons.add),
            onPressed: _addDay,
          ),
        ],
      ),
      body: SfCalendar(
        view: CalendarView.week,
        dataSource: MeetingDataSource(_appointments),
        firstDayOfWeek: 1,
        todayHighlightColor: Colors.red,
        timeSlotViewSettings: TimeSlotViewSettings(
          nonWorkingDays: _getNonWorkingDays(),
          dayFormat: 'EEE', // Cambia el formato del día a corto
        ),
        onTap: (CalendarTapDetails details) {
          if (details.appointments != null && details.appointments!.isNotEmpty) {
            final Appointment appointment = details.appointments!.first;
            _showReservationDetails(appointment);
          }
        },
      ),
    );
  }

  List<int> _getNonWorkingDays() {
    List<int> nonWorkingDays = [];
    for (int i = DateTime.monday; i <= DateTime.sunday; i++) {
      if (!_visibleDays.contains(i)) {
        nonWorkingDays.add(i);
      }
    }
    return nonWorkingDays;
  }
}

class MeetingDataSource extends CalendarDataSource {
  MeetingDataSource(List<Appointment> source) {
    appointments = source;
  }
}





// import 'package:flutter/material.dart';
// import 'package:syncfusion_flutter_calendar/calendar.dart';
// import 'package:provider/provider.dart';
// import 'package:lab_andes/providers/auth_provider.dart';
// import 'package:http/http.dart' as http;
// import 'dart:convert';
// import 'package:art_sweetalert/art_sweetalert.dart';
// import 'dart:developer' as developer;
// import 'package:intl/intl.dart';

// class CalendarScreen extends StatefulWidget {
//   @override
//   _CalendarScreenState createState() => _CalendarScreenState();
// }

// class _CalendarScreenState extends State<CalendarScreen> {
//   List<Appointment> _appointments = [];

//   @override
//   void initState() {
//     super.initState();
//     _fetchReservations();
//   }

//   void _fetchReservations() async {
//     final authProvider = Provider.of<AuthProvider>(context, listen: false);
//     String url = 'http://192.168.1.65:3000/api/reservas/estudiante/${authProvider.user?.id}';

//     try {
//       final response = await http.get(
//         Uri.parse(url),
//         headers: {
//           'Content-Type': 'application/json; charset=UTF-8',
//           'Authorization': 'Bearer ${authProvider.user?.token}',
//         },
//       );

//       if (response.statusCode == 200) {
//         final data = json.decode(response.body) as List;
//         setState(() {
//           _appointments = data.map((item) {
//             return Appointment(
//               startTime: DateTime.parse(item['fecha_inicio']),
//               endTime: DateTime.parse(item['fecha_fin']),
//               subject: 'Materia: ${item['Materia']['Catalogo_Materia']['nombre_materia']}\nLaboratorio: ${item['Laboratorio']['nombre_laboratorio']}',
//               color: Colors.blue,
//               notes: json.encode(item), // Guardamos el objeto completo en notes para su uso posterior
//             );
//           }).toList();
//         });
//       } else {
//         _showErrorAlert('Error al obtener las reservas.');
//         developer.log('Error al obtener las reservas: ${response.statusCode} - ${response.body}');
//       }
//     } catch (e) {
//       _showErrorAlert('Error al obtener las reservas.');
//       developer.log('Error en _fetchReservations: $e');
//     }
//   }

//   void _showErrorAlert(String message) {
//     ArtSweetAlert.show(
//       context: context,
//       artDialogArgs: ArtDialogArgs(
//         type: ArtSweetAlertType.danger,
//         title: "Error",
//         text: message,
//         confirmButtonText: "Aceptar",
//       ),
//     );
//   }

//   void _showReservationDetails(Appointment appointment) {
//     final reservationDetails = json.decode(appointment.notes!);
//     final DateFormat formatter = DateFormat('dd-MM-yyyy HH:mm');

//     showDialog(
//       context: context,
//       builder: (BuildContext context) {
//         return AlertDialog(
//           title: Text('Detalles de la Reserva', style: TextStyle(fontWeight: FontWeight.bold)),
//           content: SingleChildScrollView(
//             child: ListBody(
//               children: <Widget>[
//                 _buildDetailRow(Icons.book, 'Motivo', reservationDetails['motivo']),
//                 _buildDetailRow(Icons.home, 'Laboratorio', reservationDetails['Laboratorio']['nombre_laboratorio']),
//                 _buildDetailRow(Icons.class_, 'Materia', reservationDetails['Materia']['Catalogo_Materia']['nombre_materia']),
//                 _buildDetailRow(Icons.person, 'Docente', reservationDetails['Materia']['Usuario']['Detalle_Usuario']['nombres'] + ' ' + reservationDetails['Materia']['Usuario']['Detalle_Usuario']['apellidos']),
//                 _buildDetailRow(Icons.calendar_today, 'Fecha Inicio', formatter.format(DateTime.parse(reservationDetails['fecha_inicio']))),
//                 _buildDetailRow(Icons.calendar_today, 'Fecha Fin', formatter.format(DateTime.parse(reservationDetails['fecha_fin']))),
//               ],
//             ),
//           ),
//           actions: <Widget>[
//             TextButton(
//               child: Text('Cerrar', style: TextStyle(color: Colors.blue)),
//               onPressed: () {
//                 Navigator.of(context).pop();
//               },
//             ),
//           ],
//         );
//       },
//     );
//   }

//   Widget _buildDetailRow(IconData icon, String label, String value) {
//     return Padding(
//       padding: const EdgeInsets.symmetric(vertical: 8.0),
//       child: Row(
//         children: <Widget>[
//           Icon(icon, color: Colors.blue),
//           SizedBox(width: 10),
//           Text('$label: ', style: TextStyle(fontWeight: FontWeight.bold)),
//           Expanded(child: Text(value)),
//         ],
//       ),
//     );
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text('Horario de Clases'),
//       ),
//       body: SfCalendar(
//         view: CalendarView.week,
//         dataSource: MeetingDataSource(_appointments),
//         firstDayOfWeek: 1,
//         todayHighlightColor: Colors.red,
//         onTap: (CalendarTapDetails details) {
//           if (details.appointments != null && details.appointments!.isNotEmpty) {
//             final Appointment appointment = details.appointments!.first;
//             _showReservationDetails(appointment);
//           }
//         },
//       ),
//     );
//   }
// }

// class MeetingDataSource extends CalendarDataSource {
//   MeetingDataSource(List<Appointment> source) {
//     appointments = source;
//   }
// }
