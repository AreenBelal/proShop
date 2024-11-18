import styled from "styled-components";


export const WishList  = styled.button`
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 10px;
  opacity: 1;
  margin-right: 3%;
  border: none;

  &:hover {
    transform: scale(1.02);
  };
`

export const SizeButton = styled.button`
height: 40px;
background: #F5F5F5 0% 0% no-repeat padding-box;
border-radius: 10px;
width: 100px;
text-align: center;
border: none;
margin-right: 15px;

p{
  font: normal normal bold 18px/40px Muli;
}
`


export const AddCartButton= styled.button`
 width: 200px;
height: 40px;
background: #FCDD06 0% 0% no-repeat padding-box;
border-radius: 10px;
opacity: 1;
border: none;
margin-left: 10px;
font: normal normal normal 20px/15px Muli;
letter-spacing: 0.48px;
color: #242424;
text-transform: capitalize;
opacity: 1;
`

export const AddToCart = styled.button`
width: 150px;
height: 40px;
background: rgba(0, 0, 0, 0.05);
border-radius: 10px;
border: 2px solid rgba(0, 0, 0, 0.01);
color: #242424;
font: normal normal bold 18px/22px Muli;
opacity: 1;
transition: all 0.3s ease;

&:hover {
  transform: scale(1.05);
}

div {
  text-align: center;
  font: normal normal normal 18px/15px Muli;
  letter-spacing: 0.48px;
  text-transform: capitalize;
}
`



export const StartPayButton = styled.button`
     height: 50px;
    background: #FCDD06 0% 0% no-repeat padding-box;
    border-radius: 10px;
    width: 80%;
    margin: auto;
    padding: 7%;
    text-align: center;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;

`