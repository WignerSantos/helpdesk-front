import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrl: './cliente-delete.component.css'
})

export class ClienteDeleteComponent {
  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: ""
  }

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

  delete(): void {
    this.service.delete(this.cliente.id).subscribe(
      {
        next: () => {
          this.toast.success("cliente deletado com sucesso!", "Remoção");
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
}

