// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UsuariosService } from '../usuarios.service';

// @Component({
//   selector: 'app-editar-usuario',
//   templateUrl: './editar-usuario.component.html',
//   styleUrls: ['./editar-usuario.component.css']
// })
// export class EditarUsuarioComponent implements OnInit {
//   usuarioForm: FormGroup;
//   usuarioId: number;

//   constructor(
//     private fb: FormBuilder,
//     private usuariosService: UsuariosService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {
//     this.usuarioForm = this.fb.group({
//       primer_nombre: ['', Validators.required],
//       segundo_nombre: [''],
//       primer_apellido: ['', Validators.required],
//       segundo_apellido: [''],
//       cedula: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
//       fecha_nacimiento: ['', Validators.required],
//       correo: ['', [Validators.required, Validators.email]],
//       celular: [''],
//       genero: ['', Validators.required],
//       estado: ['', Validators.required],
//       id_rol: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.usuarioId = +id;
//       this.usuariosService.getById(this.usuarioId).subscribe(data => {
//         this.usuarioForm.patchValue(data);
//       });
//     } else {
//       // Manejar el caso donde el ID no está presente en la ruta
//       console.error('No ID found in route');
//       this.router.navigate(['/gestion/usuarios']);
//     }
//   }

//   onSubmit(): void {
//     if (this.usuarioForm.valid) {
//       this.usuariosService.update(this.usuarioId, this.usuarioForm.value).subscribe(() => {
//         this.router.navigate(['/gestion/usuarios']);
//       });
//     }
//   }
// }
