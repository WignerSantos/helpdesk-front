import { Component } from '@angular/core';
import { Credenciais } from '../../models/credenciais';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  creds: Credenciais = {
    email: "",
    senha: ""
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private toast: ToastrService, private service: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    
  }

  logar() {
    this.service.autheticate(this.creds).subscribe(
      {
        next: (response) => {
          this.service.successfulLogin(response.body);
          this.router.navigate([""])
        },
        error: () => this.toast.error("Usuário e/ou senha inválidos!")
      }
    )
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }
}