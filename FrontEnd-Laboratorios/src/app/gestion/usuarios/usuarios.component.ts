import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.getAll().subscribe(data => {
      this.usuarios = data;
    });
  }

  deleteUsuario(id: number): void {
    this.usuariosService.delete(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u.id_usuario !== id);
    });
  }
}
