import styled from "styled-components";
const Contenedor = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

`

const Formulario = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius:12px;
    padding: 1rem .8rem;
`

export {Contenedor, Formulario};