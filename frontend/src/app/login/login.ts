import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { routes } from '../app.routes';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm!: FormGroup;

   constructor(
    private fb: FormBuilder, 
    private auth: AuthService,
    private route: Router) {
    
    this.loginForm = this.fb.group({
    //OJO esto lo hago con fines prácticos para no estar escribiendo el
    //usuario y contraseña en cada momento en el formulario

    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false]
  });
   }

   

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Data:', this.loginForm.value);
      this.auth.login(this.loginForm.value.email,this.loginForm.value.password).subscribe({
        next:(res)=>{
          console.log(res)
          this.route.navigate(['/dashboard'])
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
