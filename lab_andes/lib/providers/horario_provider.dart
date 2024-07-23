import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:developer' as developer;

import '../models/horario.dart';

class HorarioProvider with ChangeNotifier {
  List<Horario> _horarios = [];
  bool _hasError = false;

  List<Horario> get horarios => _horarios;
  bool get hasError => _hasError;

  Future<void> fetchReservas(int estudianteId, String token) async {
    try {
      final response = await http.get(
        Uri.parse('http://192.168.1.65:3000/api/reservas/estudiante/$estudianteId'),
         headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        List<dynamic> data = json.decode(utf8.decode(response.bodyBytes));
        _horarios = data.map((item) => Horario.fromJson(item)).toList();
        notifyListeners();
      } else {
        throw Exception('Failed to load reservas');
      }
    } catch (e) {
      developer.log('Error fetching reservas: $e');
      _hasError = true;
      notifyListeners();
    }
  }
}