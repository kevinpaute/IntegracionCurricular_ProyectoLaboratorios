class Horario {
  final String motivo;
  final String laboratorio;
  final String materia;
  final String docente;
  final DateTime fechaInicio;
  final DateTime fechaFin;

  Horario({
    required this.motivo,
    required this.laboratorio,
    required this.materia,
    required this.docente,
    required this.fechaInicio,
    required this.fechaFin,
  });

  factory Horario.fromJson(Map<String, dynamic> json) {
    final laboratorio = json['Laboratorio']?['nombre_laboratorio'] ?? 'Sin laboratorio';
    final materia = json['Materia']?['Catalogo_Materia']?['nombre_materia'] ?? 'Sin materia';
    final docente = (json['Materia']?['Usuario']?['Detalle_Usuario']?['nombres'] ?? 'Desconocido') +
        ' ' +
        (json['Materia']?['Usuario']?['Detalle_Usuario']?['apellidos'] ?? 'Desconocido');
    
    return Horario(
      motivo: json['motivo'] ?? 'Sin motivo',
      laboratorio: laboratorio,
      materia: materia,
      docente: docente,
      fechaInicio: DateTime.parse(json['fecha_inicio'] ?? DateTime.now().toIso8601String()),
      fechaFin: DateTime.parse(json['fecha_fin'] ?? DateTime.now().toIso8601String()),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'motivo': motivo,
      'laboratorio': laboratorio,
      'materia': materia,
      'docente': docente,
      'fecha_inicio': fechaInicio.toIso8601String(),
      'fecha_fin': fechaFin.toIso8601String(),
    };
  }
}
