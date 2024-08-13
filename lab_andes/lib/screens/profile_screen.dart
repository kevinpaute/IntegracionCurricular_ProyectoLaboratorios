import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lab_andes/providers/auth_provider.dart';

class ProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    final user = authProvider.user;

    return Scaffold(
      appBar: AppBar(
        title: Text('Perfil'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Text('Nombre: ${user?.nombre ?? ''}', style: TextStyle(fontSize: 18)),
            // SizedBox(height: 10),
            // Text('Correo: ${user?.email ?? ''}', style: TextStyle(fontSize: 18)),
            // SizedBox(height: 10),
            // Text('Cedula: ${user?.cedula ?? ''}', style: TextStyle(fontSize: 18)),
            // SizedBox(height: 30),
            ElevatedButton(
              onPressed: () {
                _showChangePasswordDialog(context);
              },
              child: Text('Cambiar Contraseña'),
            ),
          ],
        ),
      ),
    );
  }

  void _showChangePasswordDialog(BuildContext context) {
    final _oldPasswordController = TextEditingController();
    final _newPasswordController = TextEditingController();

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Cambiar Contraseña'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: _oldPasswordController,
                decoration: InputDecoration(labelText: 'Contraseña Actual'),
                obscureText: true,
              ),
              TextField(
                controller: _newPasswordController,
                decoration: InputDecoration(labelText: 'Nueva Contraseña'),
                obscureText: true,
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('Cancelar'),
            ),
            TextButton(
              onPressed: () {
                // Lógica para cambiar la contraseña
                Navigator.of(context).pop();
              },
              child: Text('Cambiar'),
            ),
          ],
        );
      },
    );
  }
}
