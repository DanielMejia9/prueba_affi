import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm!: FormGroup;

   constructor(private fb: FormBuilder, private auth: AuthService) {
    this.loginForm = this.fb.group({
    //OJO esto lo hago con fines prácticos para no estar escribiendo el
    //usuario y contraseña en cada momento en el formulario
    //Es una mala practico 
    email: ['test@correo.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    remember: [false]
  });
   }

   

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Data:', this.loginForm.value);
      this.auth.login(this.loginForm.value.email,this.loginForm.value.password).subscribe({
        next:(res)=>{
          console.log(res)
        },
        error:()=>{
          this.loginForm.markAllAsTouched();
        },
      })
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Formulario inválido');
    }
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
