class User {
  final String token;
  final String role;
  final String nombres;
  final String apellidos;
  final int id;

  User({
    required this.token,
    required this.role,
    required this.nombres,
    required this.apellidos,
    required this.id,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      token: json['token'],
      role: json['role'],
      nombres: json['nombres'],
      apellidos: json['apellidos'],
      id: json['id'],
    );
  }
}
