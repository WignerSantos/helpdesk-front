import { Component, ViewChild } from '@angular/core';
import { Chamado } from '../../../models/chamado';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ChamadoService } from '../../../services/chamado.service';
import { stat } from 'fs';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrl: './chamado-list.component.css'
})

export class ChamadoListComponent {

  ELEMENT_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = []

  displayedColumns: string[] = ["id", "titulo", "cliente", "tecnico", "dataAbertura", "prioridade", "status", "acoes"];
  dataSource =  new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ChamadoService) {};

  ngOnInit(): void {
    this.findAll();
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findAll() {
    this.service.findAll().subscribe(
      {
        next: (response) => {
          this.ELEMENT_DATA = response;
          this.dataSource =  new MatTableDataSource<Chamado>(response);
          this.dataSource.paginator = this.paginator;
        }
      }
    )
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

  orderByStatus(status: any): void {
    let list: Chamado[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status) {
        list.push(element);
      }
    })
    this.FILTERED_DATA = list;
    this.dataSource =  new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  }

}
