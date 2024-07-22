import 'package:flutter/material.dart';
import 'package:lab_andes/providers/auth_provider.dart';
import 'package:lab_andes/screens/home_screen.dart';
import 'package:lab_andes/screens/login_screen.dart';
import 'package:provider/provider.dart';


void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
      ],
      child: MaterialApp(
        title: 'LabAndes',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        initialRoute: '/',
        routes: {
          '/': (context) => LoginScreen(),
          '/home': (context) => HomeScreen(),
          // Otras rutas aquí
        },
      ),
    );
  }
}
