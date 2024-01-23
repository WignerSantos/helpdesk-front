export interface Chamado {
    id?:                any;
    dataAbertura?:   string;
    dataFechamento?: string;
    prioridade:      string;
    stauts:          string;
    titulo:          string;
    descricao:       string;
    tecnico:            any;
    cliente:            any;
    nomeCliente:     string;
    nomeTecnico:     string;
}