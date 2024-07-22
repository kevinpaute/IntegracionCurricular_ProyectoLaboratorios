import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:lab_andes/models/user_model.dart';


class AuthProvider with ChangeNotifier {
  User? _user;
  final String _apiUrl = 'http://192.168.1.65:3000/api/auth/login';

  User? get user => _user;

  Future<void> login(String cedula, String contrasena) async {
    final response = await http.post(
      Uri.parse(_apiUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'cedula': cedula,
        'contrasena': contrasena,
      }),
    );

    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      _user = User.fromJson(responseData);
      notifyListeners();
    } else {
      throw Exception('Failed to login');
    }
  }

  void logout() {
    _user = null;
    notifyListeners();
  }
}
