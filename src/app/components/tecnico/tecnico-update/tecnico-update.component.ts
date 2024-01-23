import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrl: './tecnico-update.component.css'
})

export class TecnicoUpdateComponent {
  tecnico: Tecnico = {
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

  update(): void {
    this.service.update(this.tecnico).subscribe(
      {
        next: () => {
          this.toast.success("Técnico atualizado com sucesso!", "Atualização");
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

  addPerfil(perfil: any): void {
    if(this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
    }
  }
  
  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }
}
