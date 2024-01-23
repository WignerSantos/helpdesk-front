import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrl: './cliente-update.component.css'
})

export class ClienteUpdateComponent {
  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: ""
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  email: FormControl = new FormControl(null, Validators.email);
  cpf: FormControl = new FormControl(null, Validators.required);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(private service: ClienteService,
              private router: Router,
              private route: ActivatedRoute,
              private toast: ToastrService) {};

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get("id");
    this.findByid();
  }

  findByid(): void {
    this.service.findById(this.cliente.id).subscribe(
    {
      next: (response) => {
        response.perfis = []
        this.cliente = response;
      }
    })
  }

  update(): void {
    this.service.update(this.cliente).subscribe(
      {
        next: () => {
          this.toast.success("cliente atualizado com sucesso!", "Atualização");
          this.router.navigate(["clientes"]);
        },
        error: (ex) => {
          if(ex.error.errors) {
            ex.error.errors.forEach(element => {
              this.toast.error(element.message);
            });
          } else {
            this.toast.error(ex.error.message);
          }
        }
      })
  }

  addPerfil(perfil: any): void {
    if(this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
  }
  
  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }
}
