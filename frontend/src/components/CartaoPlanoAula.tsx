import type { CSSProperties } from "react";
import type { PlanoAula } from "../model/PlanoAula"
import { formatarData } from "../utils/formatarData";
import ParagrafoComQuebraLinha from "./ParagrafoComQuebraLinha";

type Props = {
    planoAula: PlanoAula;
}

export const CartaoPlanoAula = ({planoAula}: Props) => {
    return (
        <div className="cartao-plano-aula" style={style}>
            <h3 style={{textAlign: 'center'}}>{planoAula.titulo}</h3>
            <h5 style={{textAlign: 'center'}}>{formatarData(planoAula.dataCriacao)}</h5>

            <h4 style={{textAlign: 'center'}}>{planoAula.etapaEnsinoBasico}</h4>
        
            <h4>Introdução Lúdica</h4>
            <p>{planoAula.introducaoLudica}</p>
            
            <h4>Objetivo BNCC</h4>
            <p>{planoAula.objetivoBNCC}</p>
            
            <h4>Passo a passo da atividade</h4>
            <ParagrafoComQuebraLinha texto={planoAula.passoAPassoAtividade} />

            <h4>Rúbrica da Avaliação</h4>
            <p>{planoAula.rubricaAvaliacao}</p>
            
            <h4>Prompt usado para gerar essa aula</h4>
            <p>{planoAula.promptUsado}</p>
        </div>
    );
}

const style: CSSProperties = {
    backgroundColor: '#D1D1D1',
    color: 'black',
    textAlign: 'left',
    marginLeft: '32px'
}