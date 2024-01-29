import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Tecnico } from '../../../models/tecnico';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { TecnicoService } from '../../../services/tecnico.service';
import { ChamadoService } from '../../../services/chamado.service';
import { Chamado } from '../../../models/chamado';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrl: './chamado-create.component.css'
})

export class ChamadoCreateComponent {

  chamado: Chamado = {
    prioridade:  "",
    status:      "",
    titulo:      "",
    observacoes: "",
    tecnico:     "",
    cliente:     "",
    nomeCliente: "",
    nomeTecnico: ""
  }

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  prioridade: FormControl = new FormControl(null, [Validators.required])
  status: FormControl = new FormControl(null, [Validators.required])
  titulo: FormControl = new FormControl(null, [Validators.required])
  observacoes: FormControl = new FormControl(null, [Validators.required])
  tecnico: FormControl = new FormControl(null, [Validators.required])
  cliente: FormControl = new FormControl(null, [Validators.required])

  constructor(private clienteService: ClienteService,
              private tecnicoService: TecnicoService,
              private chamadoService: ChamadoService,
              private router:  Router,
              private toastService:   ToastrService) {

  }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe({
      next: (response) => {
        this.toastService.success("Chamado criado com sucesso", "Novo chamado");
        this.router.navigate(["chamados"]);
      },
      error: (ex) => {
        this.toastService.error(ex.error.error);
      }
    })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe({
      next: (response) => {
        this.clientes = response;
      }
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe({
      next: (response) => {
        this.tecnicos = response;
      }
    })
  }

  validaCampos(): boolean {
    return this.prioridade.valid &&
           this.status.valid &&
           this.titulo.valid &&
           this.observacoes.valid &&
           this.tecnico.valid &&
           this.cliente.valid
  }

}
