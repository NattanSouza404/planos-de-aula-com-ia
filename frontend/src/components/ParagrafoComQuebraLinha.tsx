import React from "react";

const ParagrafoComQuebraLinha = ({ texto }: { texto: string }) => {
    return (
        <p>
            {texto.split('\n').map((linha, i) => (
                <React.Fragment key={i}>
                    {linha}
                    <br />
                </React.Fragment>
            ))}
        </p>
    );
}

export default ParagrafoComQuebraLinha;