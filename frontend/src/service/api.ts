import type { PedidoCriacaoAula } from "../model/PedidoCriacaoAula";
import type { PlanoAula } from "../model/PlanoAula";

const URL = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const AUTHORIZATION = `Bearer ${API_KEY}`;

const URL_CONSULTAR_PLANOS_AULA = URL+'/rest/v1/rpc/consultar_planos_de_aula';
const URL_GERAR_PLANO_AULA = URL+'/functions/v1/gerar-plano-aula';

export async function consultarTodosPlanosAula(): Promise<PlanoAula[]> {
    try {
        const option = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'apikey': API_KEY,
                Authorization: AUTHORIZATION
            },
        }

        const response = await fetch(URL_CONSULTAR_PLANOS_AULA, option);

        const planosAula: any[] = await response.json();
        
        planosAula.forEach(p => {
            p.dataCriacao = new Date(p.dataCriacao);
        });

        return planosAula;
    } catch (error) {
        console.error("Erro ao consultar planos de aula:", error);
        throw error;
    }
}

export const adicionarAtividade = async (pedidoCriarAula: PedidoCriacaoAula) => {
    const option = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'apikey': API_KEY,
            Authorization: AUTHORIZATION
        },
        body: JSON.stringify(pedidoCriarAula)
    }

    const resposta = await fetch(URL_GERAR_PLANO_AULA, option);

    if (resposta.status !== 201) {
        throw new Error("Erro ao gerar plano de aula.");
    }

    const planoAula: any = await resposta.json();
    planoAula.dataCriacao = new Date(planoAula.dataCriacao);
    
    return planoAula;
}