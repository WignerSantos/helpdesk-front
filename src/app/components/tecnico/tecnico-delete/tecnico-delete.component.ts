import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrl: './tecnico-delete.component.css'
})

export class TecnicoDeleteComponent {
  tecnico: Tecnico = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: ""
  }

  constructor(private service: TecnicoService,
              private router: Router,
              private route: ActivatedRoute,
              private toast: ToastrService) {};

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get("id");
    this.findByid();
  }

  findByid(): void {
    this.service.findById(this.tecnico.id).subscribe(
    {
      next: (response) => {
        response.perfis = []
        this.tecnico = response;
      }
    })
  }

  delete(): void {
    this.service.delete(this.tecnico.id).subscribe(
      {
        next: () => {
          this.toast.success("Técnico deletado com sucesso!", "Remoção");
          this.router.navigate(["tecnicos"]);
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

