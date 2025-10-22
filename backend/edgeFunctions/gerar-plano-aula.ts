import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { GoogleGenerativeAI } from "npm:@google/generative-ai";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") ?? "";
const GEMINI_MODEL_NAME = "gemini-2.5-flash";

Deno.serve(async (req: Request)=>{

    if (req.method === "OPTIONS") {
        return new Response("ok", {
        headers: {
            "Access-Control-Allow-Origin": "*", // ou seu domínio específico
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
        },
        });
    }

    const pedido: PedidoCriacaoAula = await req.json();

    const planoAula = await gerarPlanoAula(pedido);

    let planoSalvo: any;

    try {
        const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
        planoSalvo = await salvarPlanoAulaNoBanco(supabaseAdmin, planoAula);

        return new Response(JSON.stringify(planoSalvo), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        });
    } catch (error: any){
        return new Response(JSON.stringify({error: error.message}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        });
    }
});

const gerarPlanoAula = async (pedido: PedidoCriacaoAula): Promise<any> => {
    const prompt = `
    Você é um assistente educacional especializado em criar planos de aula detalhados e estruturados para professores. 
    Com base nas informações fornecidas, elabore um plano de aula completo que inclua os seguintes elementos:

    1. Título da Aula: Crie um título envolvente e relevante para a aula.
    2. Objetivos de Aprendizagem: Defina claramente o que os alunos devem ser capazes de fazer ao final da aula.
    3. Materiais Necessários: Liste todos os materiais e recursos que serão utilizados durante a aula.
    4. Atividades: Descreva as atividades passo a passo, incluindo instruções detalhadas para cada etapa.
    5. Avaliação: Proponha métodos para avaliar a compreensão dos alunos sobre o conteúdo abordado.
    
    Prompt usado para gerar o plano de aula: "${pedido.promptUsado}"
    Etapa da Educação Básica: "${pedido.etapaEnsinoBasico}"
    
    Formate a resposta no seguinte formato JSON:
    {
        "titulo": "Título da Aula",
        "etapaEnsinoBasico": "EDUCACAO_INFANTIL" | "ENSINO_FUNDAMENTAL" | "ENSINO_MEDIO",
        "introducaoLudica": "Introdução lúdica para engajar os alunos.",
        "objetivoBNCC": "Objetivos alinhados à BNCC.",
        "passoAPassoAtividade": "Descrição detalhada das atividades passo a passo.",
        "rubricaAvaliacao": "Critérios de avaliação para medir o sucesso da aula.",
        "promptUsado": "O prompt original usado para gerar este plano de aula."
    }
    `;

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL_NAME });

    const generationConfig = {
        responseMimeType: "application/json",
        responseSchema: planoAulaSchema,
    };

    try {
        const result = await model.generateContent(
            prompt, generationConfig
        );

        const textoResposta = result.response.text();

        const jsonPuro = textoResposta
        .replace(/```json\s*/, '')
        .replace(/```\s*/, '')
        .replace(/\s*```$/, '')
        .trim();

        const planoAula = JSON.parse(jsonPuro);
        planoAula.id = 0;
        planoAula.dataCriacao = null;

        return {...planoAula, id: null, dataCriacao: null };
    } catch (err) {
        console.error("Erro ao chamar o Gemini:", err);
    }
}

async function salvarPlanoAulaNoBanco(supabaseAdmin: any, planoAula: PlanoAula): Promise<any> {
    
    const { data, error } = await supabaseAdmin
        .from("planos_aula")
        .insert({
            pla_titulo: planoAula.titulo,
            pla_etapa_ensino_basico: planoAula.etapaEnsinoBasico,
            pla_introducao_ludica: planoAula.introducaoLudica,
            pla_objetivo_bncc: planoAula.objetivoBNCC,
            pla_passo_a_passo_atividade: planoAula.passoAPassoAtividade,
            pla_rubrica_avaliacao: planoAula.rubricaAvaliacao,
            pla_prompt_usado: planoAula.promptUsado,
        })
        .select('pla_id');

    const id = data[0].pla_id;

    const { data: plano, error: rpcError } = await supabaseAdmin
        .rpc("consultar_planos_de_aula_por_id", { id_plano_aula: id }).single();

    if (rpcError) {
        throw new Error(rpcError.message);
    }

    return plano;
}

// Tipagens
type PlanoAula = {
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

type PedidoCriacaoAula = {
    promptUsado: string,
    etapaEnsinoBasico: 'EDUCACAO_INFANTIL' | 'ENSINO_FUNDAMENTAL' | 'ENSINO_MEDIO'
}

const planoAulaSchema = {
  type: "object",
  properties: {
    titulo: {
        type: "string",
        description: "O título da aula criada.",
    },
    introducaoLudica: {
      type: "string",
      description: "Uma forma criativa e envolvente de apresentar o tema da aula.",
    },
    objetivoBNCC: {
      type: "string",
      description: "O código e a descrição do objetivo de aprendizagem alinhado à BNCC.",
    },
    passoAPasso: {
      type: "string",
      description: "Roteiro detalhado com etapas para a execução da atividade.",
    },
    rubricaAvaliacao: {
      type: "string",
      description: "Critérios para a professora avaliar o aprendizado.",
    },
  },
  required: [
    "titulo",
    "introducaoLudica",
    "objetivoBNCC",
    "passoAPasso",
    "rubricaAvaliacao",
  ],
};