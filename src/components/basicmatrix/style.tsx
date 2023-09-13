import styled from 'styled-components';

export const MatrixRCDiv = styled.div`

display: grid;
gap: 5px;
grid-template-areas: "matrix add-column"
"add-row .";
width: fit-content;
height: fit-content;
margin-bottom:15px;`

export const MatrixDiv = styled.div`
border: 2px solid #726363;
background: #21262d;
width: fit-content;
border-radius: 3px;
padding: 5px;
font-family: "Roboto";
font-weight: 600;
color: white;
position:absolute;
touch-action:none;
`
export const MatrixElementsDiv = styled.div`
display: grid;
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: auto;
gap: 5px 5px;
// grid-template-areas: ". ."
//     ". .";
width: fit-content;
background: #0d1117;
border-radius: 4px;
padding: 10px;
`

export const MatrixElement = styled.input.attrs({ 
    type: 'number',
  })`
  background: #1e1929;
  color: #fff;
  cursor: pointer;
  width: 50px;
  aspect-ratio: 1;
  border-radius: 5px;
  border: none;
  text-align: center;
    &:active {
      background-color: #f1ac15;
    }
  `
export const ColumnAddBtn = styled.p`
writing-mode: tb-rl;
margin: 0;
border-radius: 3px;
margin: 0;
width: fit-content;
grid-area: add-column;
background: #0d1117;
display: grid;
grid-auto-flow: column;
font-size: medium;
> span {
  padding: 3px 10px;
  display: grid;
  align-items: center;
  font-family: monospace;
  font-weight: 300;
  font-size: large;
}`

export const RowAddBtn = styled.p`
height: fit-content;
margin: 0;
border-radius: 3px;
margin: 0;
grid-area: add-row;
background: #0d1117;
display: grid;
grid-auto-flow: column;
font-size: medium;
> span {
  padding: 3px 10px;
  display: grid;
  align-items: center;
  font-family: monospace;
  font-weight: 300;
  font-size: large;
}`



export const MatrixSolOptions = styled.ul`
list-style-type: none;
display: flex;
gap: 0px;
padding: 0px;
margin: 0;
border-radius: 5px;
background: #0d1117;
font-family: monospace;

> li {
  border-right: 1px solid #41415c;
  padding: 3px 8px;
  cursor: pointer;
  font-size: small;
}`

export const MatrixSolDiv = styled.div`
border: 4px #41415c solid;
padding: 3px;
border-radius: 5px;
display: grid;
gap: 5px;`


export const InputndBtn = styled.div`
display: grid;
grid-auto-flow: column;
align-items: center;
background: #4d4dc2;`