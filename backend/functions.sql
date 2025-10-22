-- Função que retorna todos os planos de aula devidamente formatados
CREATE OR REPLACE FUNCTION consultar_planos_de_aula()
RETURNS TABLE(
  "id" bigint,
  "titulo" text,
  "etapaEnsinoBasico" text,
  "introducaoLudica" text,
  "objetivoBNCC" text,
  "passoAPassoAtividade" text,
  "rubricaAvaliacao" text,
  "promptUsado" text,
  "dataCriacao" timestamp with time zone
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        pla_id AS "id",
        pla_titulo AS "titulo",
        pla_etapa_ensino_basico AS "etapaEnsinoBasico",
        pla_introducao_ludica AS "introducaoLudica",
        pla_objetivo_bncc AS "objetivoBNCC",
        pla_passo_a_passo_atividade AS "passoAPassoAtividade",
        pla_rubrica_avaliacao AS "rubricaAvaliacao",
        pla_prompt_usado AS "promptUsado",
        pla_created_at AS "dataCriacao"
    FROM
        planos_aula;
END;
$$;

CREATE OR REPLACE FUNCTION consultar_planos_de_aula_por_id(id_plano_aula numeric)
RETURNS TABLE(
  "id" bigint,
  "titulo" text,
  "etapaEnsinoBasico" text,
  "introducaoLudica" text,
  "objetivoBNCC" text,
  "passoAPassoAtividade" text,
  "rubricaAvaliacao" text,
  "promptUsado" text,
  "dataCriacao" timestamp with time zone
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        pla_id AS "id",
        pla_titulo AS "titulo",
        pla_etapa_ensino_basico AS "etapaEnsinoBasico",
        pla_introducao_ludica AS "introducaoLudica",
        pla_objetivo_bncc AS "objetivoBNCC",
        pla_passo_a_passo_atividade AS "passoAPassoAtividade",
        pla_rubrica_avaliacao AS "rubricaAvaliacao",
        pla_prompt_usado AS "promptUsado",
        pla_created_at AS "dataCriacao"
    FROM
        planos_aula
    WHERE pla_id = id_plano_aula;
END;
$$;