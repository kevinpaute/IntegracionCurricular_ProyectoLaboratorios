import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:lab_andes/providers/horario_provider.dart';
import 'package:provider/provider.dart';
import 'package:lab_andes/providers/auth_provider.dart';
import 'package:lab_andes/screens/login_screen.dart';
import 'package:lab_andes/screens/qr_scanner_screen.dart';
import 'package:lab_andes/screens/calendar_screen.dart';
import 'package:lab_andes/screens/home_screen.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => HorarioProvider()),
      ],
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Lab Andes',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => LoginScreen(),
        '/home': (context) => HomeScreen(),
        '/qr_scanner': (context) => QRScannerScreen(),
        '/calendar': (context) => CalendarScreen(),
      },
      localizationsDelegates: [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: [
        const Locale('es', 'EC'), // Español
      ],
    );
  }
}
