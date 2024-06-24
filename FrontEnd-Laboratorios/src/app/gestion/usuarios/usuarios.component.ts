import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioModalComponent } from './usuario-modal/usuario-modal.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  filteredUsuarios: any[] = [];
  selectedRole: string = '';

  constructor(private usuarioService: UsuariosService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
      this.filterUsersByRole(); // Inicializar la vista con todos los usuarios
    });
  }

  filterUsersByRole(): void {
    if (this.selectedRole) {
      this.filteredUsuarios = this.usuarios.filter(usuario => usuario.id_rol == this.selectedRole);
    } else {
      this.filteredUsuarios = [];
    }
  }

  openEditModal(usuario: any): void {
    const modalRef = this.modalService.open(UsuarioModalComponent);
    modalRef.componentInstance.usuario = usuario;
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getUsuarios();
      }
    }).catch((error) => {});
  }

  openCreateModal(): void {
    if (this.selectedRole !== '2') {
      alert('Solo se pueden crear usuarios con el rol de laboratorista');
      return;
    }
    const modalRef = this.modalService.open(UsuarioModalComponent);
    modalRef.componentInstance.rol = this.selectedRole; // Pasar el rol al modal
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getUsuarios();
      }
    }).catch((error) => {});
  }
}
