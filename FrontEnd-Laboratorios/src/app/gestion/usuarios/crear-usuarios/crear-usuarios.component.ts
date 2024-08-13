import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Country, CountryService } from '../../../services/country/country.service';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {
  @Input() rol: string;
  usuarioForm: FormGroup;
  roles: any[] = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Laboratorista' },
    { id: 3, nombre: 'Docente' },
    { id: 4, nombre: 'Estudiante' }
  ];

  isCreating: boolean = true;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private usuarioService: UsuariosService
  ) {
    this.usuarioForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      genero: ['', Validators.required],
      estado: ['Activo', Validators.required],
      rol: ['', Validators.required],
      esEcuatoriano: [false] // Checkbox para indicar si es ecuatoriano
    });
  }

  ngOnInit(): void {
    this.usuarioForm.get('esEcuatoriano')?.valueChanges.subscribe(isEcuatoriano => {
      if (isEcuatoriano) {
        this.usuarioForm.get('cedula')?.setValidators([Validators.required, this.cedulaValidator.bind(this)]);
        this.usuarioForm.get('cedula')?.updateValueAndValidity();
      } else {
        this.usuarioForm.get('cedula')?.clearValidators();
        this.usuarioForm.get('cedula')?.updateValueAndValidity();
      }
    });
  }

  save(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    const usuarioData = {
      Detalle_Usuario: {
        nombres: this.usuarioForm.value.nombres,
        apellidos: this.usuarioForm.value.apellidos,
        cedula: this.usuarioForm.value.cedula,
        fecha_nacimiento: this.usuarioForm.value.fecha_nacimiento,
        correo: this.usuarioForm.value.correo,
        celular: this.usuarioForm.value.celular,
        edad: this.calculateAge(this.usuarioForm.value.fecha_nacimiento),
        genero: this.usuarioForm.value.genero,
        estado: this.usuarioForm.value.estado,
        contrasena: this.usuarioForm.value.cedula
      },
      id_rol: parseInt(this.usuarioForm.value.rol) // Convertir el rol a número
    };

    console.log("Saving user with data:", usuarioData);

    this.usuarioService.createUsuario(usuarioData).subscribe({
      next: () => this.activeModal.close('saved'),
      error: err => console.error("Error creating user:", err)
    });
  }

  calculateAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  cedulaValidator(control: AbstractControl): { [key: string]: any } | null {
    const cedula = control.value;

    if (!cedula) {
      return null;
    }

    if (cedula.length !== 10) return { invalidCedula: true };

    const digitoRegion = parseInt(cedula.substring(0, 2));

    if (digitoRegion < 1 || digitoRegion > 24) return { invalidCedula: true };

    const ultimoDigito = parseInt(cedula.substring(9, 10));
    const pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));
    let impares = 0;

    for (let i = 0; i < 9; i += 2) {
      let numero = parseInt(cedula.substring(i, i + 1)) * 2;
      if (numero > 9) numero -= 9;
      impares += numero;
    }

    const sumaTotal = pares + impares;
    const decena = Math.ceil(sumaTotal / 10) * 10;
    const digitoVerificador = decena - sumaTotal;

    return digitoVerificador === ultimoDigito || (digitoVerificador === 10 && ultimoDigito === 0) ? null : { invalidCedula: true };
  }
}