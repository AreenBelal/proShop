import styled ,{keyframes} from "styled-components";

export const Button = styled.button`
  width: 200px;
  height: 50px;
  background: #f2f2f2 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;
  border: none;
  
  &:hover {
    transform: scale(1.05);
  };
`;
export const ProfileButton = styled.button`
display:block;
width: 114px;
height: 30px;
text-align: left;
font: normal normal normal 20px/30px Muli;
letter-spacing: 0px;
color: #242424;
opacity: 1;
border: none;
margin-top: 4%;
`
export const IncDec = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 38px;
border: 1px solid #e2e2e2;
background-color: rgb(255, 255, 255);

  &:hover{
    transform: scale(1.02);
}
`
export const WishList  = styled.button`
  width: 50px;
  height: 50px;
  background: #f2f2f2 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;
  margin-right: 3%;
  border: none;

  &:hover {
    transform: scale(1.02);
  };

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
export const ButtonIconWishList = styled.button`
width: 25%;
background-color: transparent;
padding: 10px;
border: none;

&:hover{
 
  transform: scale(1.1);
  transition: all 0.2s ease-in-out;

}
`
export const SearchButton = styled.button`
 font-weight: bold;
font-size: 16px;
line-height: 20px;
color: #000000;
border: none;


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
export const Savechanges = styled.button`
width: 200px;
height: 40px;
background: #FCDD06 0% 0% no-repeat padding-box;
border-radius: 10px;
letter-spacing: 0.48px;
color: #242424;
text-transform: capitalize;
border: none;
font: normal normal normal 17px/15px Muli;
`
export const AngleLeft = styled.button`
       background-color: transparent;
       border: none; 

       .icons{
        color: #000000;
        font-size: 32px;
        cursor: pointer;  
        transition: transform 0.3s ease-in;
       }
`
export const AngleRight = styled.button`
 background-color: transparent;
 border: none;

 .icons{
  color: black;
  font-size: 32px;
  cursor: pointer;  
  transition: transform 0.2s ease-in-out;
 }
`

export const ButtonShop = styled.button`
  width: 220px;
  max-width: 40%;
  height: 56px;
  background: #FCDD06 0% 0% no-repeat padding-box;
  border-radius: 20px;
  border: none;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  div{
  text-align: center;
  font: normal normal normal 22px/18px Muli;
  letter-spacing: 0.88px;
  color: #242424;
  text-transform: uppercase;
  opacity: 1;
  padding: 5%;
  }
`


export const CreateProudct = styled.button`
width: 200px;
height: 40px;
background: #FCDD06 0% 0% no-repeat padding-box;
border-radius: 6px;
opacity: 1;
border: none;

p{
text-align: center;
font: normal normal normal 20px/40px Muli;
letter-spacing: 0.48px;
color: #242424;
}
`
 
export const LoginButton = styled.button`
  background: #fcdd06 0% 0% no-repeat padding-box;
  border-radius: 6px;
  opacity: 1;
  border: none;
  width: 300px;
  height: 40px;
  margin-top: 15px;

  div{
  text-align: center;
  font: normal normal normal 18px/42px Muli;
  letter-spacing: 0.88px;
  color: #242424;
  opacity: 1;
  }
`


const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

 export const AnimatedButton = styled(AddCartButton)`

  animation: ${slideUp} 0.4s ease-out;
  
  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out;
  }
`;
 