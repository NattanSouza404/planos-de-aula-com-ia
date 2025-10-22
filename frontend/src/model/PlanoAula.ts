export type PlanoAula = {
    id: number;
    titulo: string;
    etapaEnsinoBasico: 'EDUCACAO_INFANTIL' | 'ENSINO_FUNDAMENTAL' | 'ENSINO_MEDIO',
    introducaoLudica: string;
    objetivoBNCC: string;
    passoAPassoAtividade: string;
    rubricaAvaliacao: string;
    promptUsado: string;
    dataCriacao: Date;
}