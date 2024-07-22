import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('LabAndes'),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              child: Text('Menú'),
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
            ),
            ListTile(
              title: Text('Escanear QR'),
              onTap: () {
                Navigator.pushNamed(context, '/qr_scanner');
              },
            ),
            ListTile(
              title: Text('Otras funcionalidades'),
              onTap: () {
                // Navegar a otras funcionalidades
              },
            ),
          ],
        ),
      ),
      body: Center(
        child: Text('Bienvenido a LabAndes'),
      ),
    );
  }
}
