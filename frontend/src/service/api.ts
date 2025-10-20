export async function consultarTodosPlanosAula(): Promise<any[]> {
    try {
        /**
        *  const response = await fetch("http://siteexemplo/planos_de_aula/select=*");
        *  return await response.json();
        */

        return [
            { titulo: "Plano de Aula 1", descricao: "Descrição do Plano de Aula 1" },
            { titulo: "Plano de Aula 2", descricao: "Descrição do Plano de Aula 2" }
        ];
    } catch (error) {
        console.error("Erro ao consultar planos de aula:", error);
        throw error;
    }
}