# Planos de Aula com IA

### Tecnologias
- Supabase
- React
- Gemini

### Descrição

Gerar um plano de aula com auxílio de Inteligência Artificial a partir do input do usuário, com os seguintes componentes:
-  Introdução lúdica: Forma criativa e engajadora de apresentar o tema 
-  Objetivo de aprendizagem da BNCC: Alinhado à Base Nacional Comum Curricular 
-  Passo a passo da atividade: Roteiro detalhado para execução 
-  Rubrica de avaliação: Critérios para a professora avaliar o aprendizado

### Instruções de instalação

Para usar o projeto, é necessário instalar o [Node.js](https://nodejs.org/en/download). Com o Node.js instalado, deve-se navegar até a pasta 'frontend' e instalar as dependências:

```
# Entrar na pasta do frontend
cd frontend/

# Instala dependências
npm install
```

### Como configurar as variáveis de ambiente

#### No Supabase
Nos Secrets na aba de 'Edge Functions' dentro do Supabase, deve-se adicionar a variável 'GEMINI_API_KEY' com uma chave de API válida do Gemini.

#### No frontend React
Na pasta frontend, crie um arquivo chamado '.env' e coloque as variáveis seguindo a estrutura do .env.example.

```
VITE_SUPABASE_URL=https://<SEU_PROJETO_AQUI>.supabase.co
VITE_SUPABASE_ANON_KEY=<SUA_CHAVE_AQUI>
```

### Como executar o projeto

#### No Supabase

É necessário ter uma conta e criar um projeto dentro do Supabase.

Após isso, será necessário executar os scripts da pasta 'backend' desse repositório. Os scripts devem ser executados na aba 'SQL Editor' do Supabase e nessa ordem:

1. tabelas.sql
2. row_level_security.sql
3. functions.sql

Depois disso, vá para a aba de Edge Functions e adicione a Edge Function 'gerar-plano-aula' com o script do arquivo 'gerar-plano-aula.ts' dentro da pasta 'backend/edgeFunctions'.

#### No frontend React

Para executar o frontend, navegue até a pasta 'frontend' e execute o comando para iniciar.
```
# Entrar na pasta do frontend
cd frontend/

# Comando para executar
npm run dev
```

### Decisões técnicas tomadas

#### Uso de React
Optei pelo React porque com ele foi possível ter certa agilidade na criação da tela, e também por eu possuir familiariade e outros projetos meus para usar de referência.

#### Consulta dos planos de aula por funções
Decidi usar funções do banco para consultar os planos de aula. A razão era para não expor no frontend a estrutura da tabela (é mais correto retornar no frontend um plano de aula com o atributo 'titulo' ao invés de 'pla_titulo').

Outra alternativa para as funções seria criar Views, mas optei pelas funções caso fosse necessário adicionar mais alguma lógica.

### Desafios encontrados e soluções

#### Erros nas requisições
Durante o desenvolvimento, foi necessário realizar várias requisições, muitas delas resultavam em erros. Para resolver isso, foi necessário usar:
- Os logs da Edge Function pelo próprio Supabase
- As Developer Tools do navegador

Nas Developer Tools do navegador, usei a função de Debug (usando Breakpoints) para acompanhar o fluxo de execução e os valores das variáveis e também utilizei a aba de 'Redes' (ou Network) para analisar as requisições do frontend e as respostas do backend.

### Descrição da estrutura de dados
| Coluna                      | Comentário                                                                        |
| --------------------------- | --------------------------------------------------------------------------------- |
| pla_id                      | Identificador único para cada plano de aula, chave primária.                      |
| pla_titulo                  | Um título descritivo para o plano de aula.                                        |
| pla_etapa_ensino_basico     | Etapa do ensino básico desse plano de aula.                                       |
| pla_introducao_ludica       | Uma introdução lúdica, forma criativa e engajadora de apresentar o tema da aula.  |
| pla_objetivo_bncc           | O objetivo de aprendizagem, alinhado com a BNCC (Base Nacional Comum Curricular). |
| pla_passo_a_passo_atividade | Passo a passo da aula, um roteiro detalhado para execução.                        |
| pla_rubrica_avaliacao       | Critérios para a professora avaliar o aprendizado.                                |
| pla_prompt_usado            | O prompt usado para criar o plano de aula.                                        |
| pla_created_at              | Data e hora de criação do plano de aula.                                          |

## Referências
[Documentação Oficial Supabase](https://supabase.com/docs)
[Base Nacional Comum Curricular](https://basenacionalcomum.mec.gov.br/)
[Google AI Studio](http://aistudio.google.com/)