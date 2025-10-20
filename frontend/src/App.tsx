import { useState, useEffect } from 'react'
import { consultarTodosPlanosAula } from './service/api';

function Page() {

  const [planosAula, setPlanosAula] = useState<any[]>([]);

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

  return (
    <div>

      <div>
        <h2>Gerador de planos de aula com IA</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <label>Selecione a etapa da Educação Básica:</label>
        <select>
          <option value="EDUCACAO_INFANTIL">Educação Infantil</option>
          <option value="ENSINO_FUNDAMENTAL">Ensino Fundamental</option>
          <option value="ENSINO_MEDIO">Ensino Médio</option>
        </select>
        
        <label>Descreva o plano de aula que deseja gerar:</label>
        <textarea placeholder='Gere uma aula de matemática sobre trigonometria'></textarea>

        <button>Gerar plano de aula</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {planosAula.map((plano, index) => 
            <tr key={index}>
              <td>{plano.titulo}</td>
              <td>{plano.descricao}</td>
            </tr>
          )}
          <tr>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default Page