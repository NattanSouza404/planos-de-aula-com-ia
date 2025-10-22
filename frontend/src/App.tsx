import { useState, useEffect } from 'react'
import { adicionarAtividade, consultarTodosPlanosAula } from './service/api';
import type { PlanoAula } from './model/PlanoAula';
import { CartaoPlanoAula } from './components/CartaoPlanoAula';
import type { PedidoCriacaoAula } from './model/PedidoCriacaoAula';

function Page() {

  const [planosAula, setPlanosAula] = useState<PlanoAula[]>([]);

  useEffect(() => {
    async function getPlanosAula() {
      try {
        setPlanosAula(await consultarTodosPlanosAula());
      } catch (error) {
        console.error("Erro ao buscar planos de aula:", error);
      }
    }

    getPlanosAula();
  }, []);

  const confirmarAdicionarAtividade = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    
    if (!form){
      return;
    }
    
    const dadosFormulario = new FormData(form);

    const promptUsado = dadosFormulario.get('promptUsado');
    const etapaEnsinoBasico = dadosFormulario.get('etapaEnsinoBasico');

    const pedidoAdicionarAula: PedidoCriacaoAula = {
      promptUsado: promptUsado?.toString() || '',
      etapaEnsinoBasico: etapaEnsinoBasico as 'EDUCACAO_INFANTIL' | 'ENSINO_FUNDAMENTAL' | 'ENSINO_MEDIO'
    };
    
    const novoPlanoAula = await adicionarAtividade(pedidoAdicionarAula);

    const novosPlanosAula = [...planosAula, novoPlanoAula];
    setPlanosAula(novosPlanosAula);
  }

  return (
    <div id="container-app">

      <div>
        <h2>Gerador de planos de aula com IA</h2>
      </div>

      <form onSubmit={confirmarAdicionarAtividade} id="formulario-gerar-plano-de-aula">
        <label>Selecione a etapa da Educação Básica:</label>
        <select name="etapaEnsinoBasico">
          <option value="EDUCACAO_INFANTIL">Educação Infantil</option>
          <option value="ENSINO_FUNDAMENTAL">Ensino Fundamental</option>
          <option value="ENSINO_MEDIO">Ensino Médio</option>
        </select>
        
        <label>Descreva o plano de aula que deseja gerar:</label>
        <textarea name='promptUsado' placeholder='Crie para mim uma aula de matemática introdutória sobre trigonometria, ensinando apenas os conceitos básicos.'></textarea>

        <button type="submit">
          Gerar plano de aula
        </button>
      </form>

      {
        planosAula.length > 0 ?

        <div id="container-planos-aula">
          {        
              planosAula.map((plano, index) =>
                <CartaoPlanoAula
                  key={index}
                  planoAula={plano}
                />
              )
            }
        </div>
      :

      <div>
        <p>Sem aulas registradas</p>
      </div>

      }
      
    </div>
  )
}
export default Page