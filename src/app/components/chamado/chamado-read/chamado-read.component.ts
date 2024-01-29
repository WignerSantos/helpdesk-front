import { Component } from '@angular/core';
import { ChamadoService } from '../../../services/chamado.service';
import { Chamado } from '../../../models/chamado';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrl: './chamado-read.component.css'
})

export class ChamadoReadComponent {
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

  constructor(private chamadoService: ChamadoService,
              private route:          ActivatedRoute,
              private toastService:   ToastrService,) {

  }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get("id");
    this.findById();
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

}