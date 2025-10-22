
-- Ativa a Row Level Security na tabela de planos de aula
ALTER TABLE planos_aula ENABLE ROW LEVEL SECURITY;

-- Política de leitura e inserção na tabela de planos de aula
CREATE POLICY "Permitir leitura pública"
ON public.planos_aula
FOR SELECT
USING (true);

CREATE POLICY "Permitir inserção pública"
ON public.planos_aula
FOR INSERT
WITH CHECK (true);