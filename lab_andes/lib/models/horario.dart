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
    return Horario(
      motivo: json['motivo'] ?? 'Sin motivo',
      laboratorio: json['Laboratorio'] != null && json['Laboratorio']['nombre_laboratorio'] != null 
        ? json['Laboratorio']['nombre_laboratorio'] 
        : 'Sin laboratorio',
      materia: json['Materia'] != null && json['Materia']['Catalogo_Materia'] != null && json['Materia']['Catalogo_Materia']['nombre_materia'] != null 
        ? json['Materia']['Catalogo_Materia']['nombre_materia'] 
        : 'Sin materia',
      docente: json['Materia'] != null && json['Materia']['Usuario'] != null && json['Materia']['Usuario']['Detalle_Usuario'] != null 
        ? '${json['Materia']['Usuario']['Detalle_Usuario']['nombres']} ${json['Materia']['Usuario']['Detalle_Usuario']['apellidos']}' 
        : 'Desconocido',
      fechaInicio: DateTime.parse(json['fecha_inicio']),
      fechaFin: DateTime.parse(json['fecha_fin']),
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
