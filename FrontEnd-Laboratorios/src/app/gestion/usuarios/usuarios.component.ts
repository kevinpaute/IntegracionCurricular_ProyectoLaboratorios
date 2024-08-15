import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearUsuariosComponent} from './crear-usuarios/crear-usuarios.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { UsuarioModalComponent } from './usuario-modal/usuario-modal.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  filteredUsuarios: any[] = [];
  totalUsuarios: number = 0;
  pageSize: number = 6;
  search: string = '';
  selectedRole: string = '';
  loading: boolean = true;

  constructor(private usuarioService: UsuariosService, private modalService: NgbModal, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  importUsuarios(): void {
    this.loading = true; // Activar animación de carga
    Swal.fire({
      title: 'Importando datos...',
      html: 'Por favor espere mientras se importan los datos.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    this.usuarioService.importUsuarios().subscribe(
      () => {
        this.getUsuarios(); // Refrescar la lista de usuarios
        Swal.fire({
          icon: 'success',
          title: 'Usuarios importados exitosamente',
          showConfirmButton: true, // Mostrar botón de confirmación
          confirmButtonText: 'OK', // Texto del botón
        });
        this.loading = false; // Desactivar animación de carga
      },
      (error) => {
        console.error('Error importing usuarios', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al importar usuarios',
          text: 'Ocurrió un problema al importar los usuarios. Por favor, intente de nuevo.',
          showConfirmButton: true, // Mostrar botón de confirmación
          confirmButtonText: 'Entendido', // Texto del botón
        });
        this.loading = false; // Desactivar animación de carga
      }
    );
  }
  
    


  getUsuarios(): void {
    this.loading = true; // Set loading to true before fetching data
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
      this.filteredUsuarios = this.usuarios;
      this.loading = false; // Set loading to false after data is fetched
    }, () => {
      this.loading = false; // Set loading to false in case of error
    });
  }

  applyFilters(): void {
    this.filteredUsuarios = this.usuarios;

    if (this.search) {
      this.filteredUsuarios = this.filteredUsuarios.filter(usuario => 
        usuario.Detalle_Usuario.nombres.toLowerCase().includes(this.search.toLowerCase()) ||
        usuario.Detalle_Usuario.cedula.toLowerCase().includes(this.search.toLowerCase())
      );
    }

    if (this.selectedRole) {
      this.filteredUsuarios = this.filteredUsuarios.filter(usuario => usuario.id_rol === parseInt(this.selectedRole));
    }
  }

  searchUsuarios(): void {
    this.applyFilters();
  }

  openCreateAssignModal(): void {
    const modalRef = this.modalService.open(CrearUsuariosComponent);
    modalRef.componentInstance.rol = this.selectedRole;
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getUsuarios();
        this.toastr.success('Usuario creado exitosamente'); // Mostrar el toast de éxito
      }
    }).catch((error) => {});
  }

  openEditModal(usuario: any): void {
    const modalRef = this.modalService.open(EditarUsuarioComponent);
    modalRef.componentInstance.usuario = usuario;
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getUsuarios();
      }
    }).catch((error) => {});
  }

  openViewModal(usuario: any): void {
    this.usuarioService.getUsuario(usuario.id_usuario).subscribe(
      (updatedUsuario) => {
        const modalRef = this.modalService.open(UsuarioModalComponent);
        modalRef.componentInstance.usuario = updatedUsuario;
      },
      (error) => {
        console.error('Error fetching updated user data', error);
      }
    );
  }
}