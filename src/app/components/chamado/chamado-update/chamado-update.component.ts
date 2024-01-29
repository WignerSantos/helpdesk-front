import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Tecnico } from '../../../models/tecnico';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { TecnicoService } from '../../../services/tecnico.service';
import { ChamadoService } from '../../../services/chamado.service';
import { Chamado } from '../../../models/chamado';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrl: './chamado-update.component.css'
})

export class ChamadoUpdateComponent {

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
              private route:          ActivatedRoute,
              private toastService:   ToastrService,
              private router:         Router) {

  }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get("id");
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe({
      next: (response) => {
        this.chamado = response;
      },
      error: (ex) => {
        this.toastService.error(ex.error.error);
      }
    })
  }

  update(): void {
    this.chamadoService.update(this.chamado).subscribe({
      next: (response) => {
        this.toastService.success("Chamado atualizado com sucesso", "Atualizar chamado");
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

  retornaStatus(status: any): string {
    if(status == "0") {
      return "ABERTO";
    } else if(status == "1") {
      return "EM ANDAMENTO";
    } 
    return "ENCERRADO";
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == "0") {
      return "BAIXA";
    } else if(prioridade == "1") {
      return "MÉDIA";
    } 
    return "ALTA";
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