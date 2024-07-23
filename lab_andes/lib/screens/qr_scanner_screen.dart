import 'dart:convert';
import 'dart:developer';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:lab_andes/providers/auth_provider.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'package:provider/provider.dart';
import 'package:art_sweetalert/art_sweetalert.dart';
import 'package:http/http.dart' as http;

class QRScannerScreen extends StatefulWidget {
  @override
  _QRScannerScreenState createState() => _QRScannerScreenState();
}

class _QRScannerScreenState extends State<QRScannerScreen> with SingleTickerProviderStateMixin {
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  QRViewController? _controller;
  Barcode? result;
  bool _isProcessing = false;
  bool _isSuccess = false;
  late AnimationController _animationController;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: Duration(seconds: 2),
    )..repeat(reverse: false);
  }

  @override
  void reassemble() {
    super.reassemble();
    if (Platform.isAndroid) {
      _controller?.pauseCamera();
    } else if (Platform.isIOS) {
      _controller?.resumeCamera();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Escanear Código QR'),
      ),
      body: Stack(
        children: [
          QRView(
            key: qrKey,
            onQRViewCreated: _onQRViewCreated,
          ),
          Center(
            child: Container(
              width: 250,
              height: 250,
              decoration: BoxDecoration(
                border: Border.all(color: _isSuccess ? Colors.green : Colors.red, width: 2),
                borderRadius: BorderRadius.circular(12),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    if (!_isSuccess)
                      Positioned(
                        top: 0,
                        left: 0,
                        right: 0,
                        child: AnimatedBuilder(
                          animation: _animationController,
                          builder: (context, child) {
                            return Container(
                              height: 4.0,
                              color: Colors.green,
                              margin: EdgeInsets.only(
                                top: _animationController.value * 250,
                              ),
                            );
                          },
                        ),
                      ),
                    Positioned(
                      top: 10,
                      child: Text(
                        'Escaneando...',
                        style: TextStyle(color: Colors.white, fontSize: 18),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _onQRViewCreated(QRViewController controller) {
    setState(() {
      this._controller = controller;
    });
    controller.scannedDataStream.listen((scanData) async {
      if (_isProcessing) return; // Previene escaneos múltiples
      setState(() {
        result = scanData;
        _isProcessing = true; // Marca que se está procesando el escaneo
      });

      if (result != null && result!.code != null) {
        log('Código QR escaneado: ${result!.code}');
        final Uri uri = Uri.parse(result!.code!);
        final String? reservaId = uri.queryParameters['reservaId'];
        if (reservaId != null) {
          await _markAttendance(int.parse(reservaId));
        } else {
          log('Código QR no contiene id_reserva válido.');
          _showErrorAlert("Código QR no válido.");
        }
      }

      setState(() {
        _isProcessing = false; // Marca que el procesamiento ha terminado
      });
    });
  }

  Future<void> _markAttendance(int reservaId) async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    String url = 'http://192.168.1.65:3000/api/asistencias/qr';
    final response = await http.post(
      Uri.parse(url),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ${authProvider.user?.token}',
      },
      body: jsonEncode(<String, dynamic>{
        'id_reserva': reservaId,
        'id_estudiante': authProvider.user?.id,
      }),
    );

    if (response.statusCode == 200) {
      log('Asistencia registrada exitosamente.');
      setState(() {
        _isSuccess = true;
      });
      _animationController.stop();
      await Future.delayed(Duration(seconds: 1)); // Delay para mostrar la animación
      _showSuccessAlert("Asistencia registrada exitosamente.");
    } else {
      log('Error al registrar la asistencia. Código de estado: ${response.statusCode}');
      _showErrorAlert("Error al registrar la asistencia.");
    }

    _controller?.dispose();
  }

  void _showSuccessAlert(String message) {
    ArtSweetAlert.show(
      context: context,
      artDialogArgs: ArtDialogArgs(
        type: ArtSweetAlertType.success,
        title: "¡Éxito!",
        text: message,
        confirmButtonText: "Aceptar",
        onConfirm: () {
          Navigator.pushReplacementNamed(context, '/home');
        },
      ),
    );
  }

  void _showErrorAlert(String message) {
    ArtSweetAlert.show(
      context: context,
      artDialogArgs: ArtDialogArgs(
        type: ArtSweetAlertType.danger,
        title: "Error",
        text: message,
        confirmButtonText: "Reintentar",
        cancelButtonText: "Salir",
        onConfirm: () {
          setState(() {
            _isSuccess = false;
            _isProcessing = false;
          });
          _controller?.resumeCamera();
        },
        onCancel: () {
          Navigator.pushReplacementNamed(context, '/home');
        },
      ),
    );
  }

  @override
  void dispose() {
    _controller?.dispose();
    _animationController.dispose();
    super.dispose();
  }
}