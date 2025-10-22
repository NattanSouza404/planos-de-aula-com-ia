CREATE TABLE public.planos_aula (
  pla_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  pla_titulo text NOT NULL,
  pla_etapa_ensino_basico text NOT NULL,
  pla_introducao_ludica text NOT NULL,
  pla_objetivo_bncc text NOT NULL,
  pla_passo_a_passo_atividade text NOT NULL,
  pla_rubrica_avaliacao text NOT NULL,
  pla_prompt_usado text NOT NULL,
  pla_created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT planos_aula_pkey PRIMARY KEY (pla_id)
);

COMMENT ON COLUMN public.planos_aula.pla_id IS 
    'Identificador único para cada plano de aula, chave primária.';

COMMENT ON COLUMN public.planos_aula.pla_prompt_usado IS
    'O prompt usado para criar o plano de aula.';

COMMENT ON COLUMN public.planos_aula.pla_titulo IS
    'Um título descritivo para o plano de aula.';

COMMENT ON COLUMN public.planos_aula.pla_etapa_ensino_basico IS
    'Etapa do ensino básico desse plano de aula.';

COMMENT ON COLUMN public.planos_aula.pla_introducao_ludica IS
    'Uma introdução lúdica, forma criativa e engajadora de apresentar o tema da aula.';

COMMENT ON COLUMN public.planos_aula.pla_objetivo_bncc IS
    'O objetivo de aprendizagem, alinhado com a BNCC (Base Nacional Comum Curricular).';

COMMENT ON COLUMN public.planos_aula.pla_passo_a_passo_atividade IS
    'Passo a passo da aula, um roteiro detalhado para execução.';

COMMENT ON COLUMN public.planos_aula.pla_rubrica_avaliacao IS
    'Critérios para a professora avaliar o aprendizado.';

COMMENT ON COLUMN public.planos_aula.pla_created_at IS
    'Data e hora de criação do plano de aula.';