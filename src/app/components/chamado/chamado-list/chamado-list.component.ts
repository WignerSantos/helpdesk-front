import { Component, ViewChild } from '@angular/core';
import { Chamado } from '../../../models/chamado';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrl: './chamado-list.component.css'
})
export class ChamadoListComponent {

  ELEMENT_DATA: Chamado[] = [
    {
      id: 1,
      dataAbertura: "23/01/2024",
      dataFechamento: "23/01/2024",
      prioridade: "ALTA",
      status: "ANDAMENTO",
      titulo: "Chamado 1",
      descricao: "Teste Chamado 1",
      tecnico: 1,
      cliente: 6,
      nomeCliente: "Valdir Cezar",
      nomeTecnico: "Albert Einstein"
    }
  ];

  displayedColumns: string[] = ["id", "titulo", "cliente", "tecnico", "dataAbertura", "prioridade", "status", "acoes"];
  dataSource =  new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {};

  ngOnInit(): void {

  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
