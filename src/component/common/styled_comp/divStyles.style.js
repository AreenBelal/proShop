import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: auto;
`;

export const CartText = styled.div`
  text-align: center;
  font: normal normal normal 18px/15px Muli;
  letter-spacing: 0.48px;
  color: #242424;
  text-transform: capitalize;
  opacity: 1;
`;

export const OperationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  border: 1px solid #e2e2e2;
  background-color: white;
  margin-top: 10px;
`;

export const Contant = styled.div`
  height: auto;
  border: 1px solid #bcbcbc;
  opacity: 1;
  width: 90%;
  margin: 50px auto;
  box-sizing: border-box;

  p {
    text-align: left;
    font: normal normal bold 25px/15px Muli;
    letter-spacing: 0.96px;
    color: #242424;
    opacity: 1;
    margin: 30px;
    margin-top: 34px;
  }
`;

export const TableContainer = styled.div`
  margin-left: 5%;
  margin-top: 8%;
  display: block;
  width: 100%;
  height: auto;

  .title {
    text-align: left;
    font: normal normal bold 30px/15px Muli;
    letter-spacing: 1.28px;
    color: #242424;
  }
`;

export const Card = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  height: 500px;
`;

export const SecondCon = styled.div`
  height: fit-content;
  background: #f2f2f2 0% 0% no-repeat padding-box;
  border-radius: 16px;
  padding-top: 3%;

  .subtotal {
    font: normal normal bold 23px/15px Muli;
    letter-spacing: 0.64px;
    color: #242424;
    opacity: 1;
    text-align: left;
    margin-bottom: 20px;
  }
`;

export const SearchContainer = styled.div`
  background: #fcdd06;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  width: 152px;
  max-width: 100%;

  .icon{
    margin-left: 10%
  }
`;

export const TextDetails = styled.div`
text-align: left;
font: normal normal normal 18px/15px Muli;
letter-spacing: 0.96px;
color: #707070;

span{
text-align: left;
font: normal normal bold 20px/15px Muli;
letter-spacing: 0.96px;
color: #242424;
}
`

export const MainAPP = styled.div`
  height: 100vh;
  background: #F2F2F2 0% 0% no-repeat;
  margin: 0px;
  padding:0px;
  padding-top: 10%;
  padding-left: 5%;

  .firstparagraph{
    text-align: left;
    font: normal normal 300 32px/15px Muli;
    letter-spacing: 1.28px;
    color: #242424;
  }

  .secondparagraph{
    text-align: left;
    font: normal normal 900 60px/15px Muli;
    letter-spacing: 2.4px;
    color: #242424;
    text-transform: uppercase;
  }
    .thirdparagraph{
      text-align: left;
      font: normal normal 300 32px/40px Muli;
      letter-spacing: 0.48px;
      color: #242424;
    }

`

export const RememberMe = styled.div`
  text-align: center;
  font: normal normal normal 15px/42px Muli;
  letter-spacing: 0.88px;
  color: #707070;
  opacity: 0.7;
`


export const LabelAuth = styled.div`
  text-align: left;
  font: normal normal normal 15px/15px Muli;
  letter-spacing: 0.88px;
  color: #242424;
  opacity: 1;
  margin-bottom: 15px;
`

export const CardAuth = styled.div`
  width: 374px;
  margin-left: 3%;
  margin-top: 80px;


  .head{
    text-align: left;
    font: normal normal 900 35px/15px Muli;
    letter-spacing: 2.4px;
    color: #242424;
    opacity: 1;
  }

  .logintext{
  height: 84px;
  text-align: left;
  font: normal normal normal 22px/42px Muli;
  letter-spacing: 1.28px;
  color: #707070;
  opacity: 0.7;
  }
`

export const IconWish = styled.div`
width: 40px;
height: 40px;
border: 1px solid #FCDD06;
border-radius: 10px;
text-align: center;
position: relative;
`
export const TitleTablePage = styled.div`
text-align: left;
font: normal normal bold 32px/15px Muli;
letter-spacing: 1.28px;
color: #242424;

`
export const ContainerDetails = styled.div`
    padding-top: 25px; 
    padding-left: 15px;
    margin-right: 5%;
    display: flex;
    flex-wrap: wrap;
 
   .content{
   margin-left: 5%;
 }
`
export const CircleColor = styled.div`
width: 30px;
height: 30px;
border-radius: 50%;
border: 1px solid black;
margin-top: 2%;
`


export const SignupText = styled.div`
  position: absolute;
  text-decoration: none;
  text-align: center;
  font: normal normal normal 18px/18px Muli;
  letter-spacing: 0.88px;
  color: #242424;
  text-transform: capitalize;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`


export const StraightLine = styled.div`
  border-bottom: 1px solid  #707070;
  margin-top: 15px;
  width: 300px;
`

export const HaveAccount = styled.div`
text-align: center;
font: normal normal 300 18px/15px Muli;
letter-spacing: 0.88px;
color: #707070;
`

export const CategoryCard = styled.div`
  width: 100%;
  max-width: 250px;
  height: 250px;
  background: #f7f8fc 0% 0% no-repeat padding-box;
  border-radius: 16px;
  opacity: 1;
  margin-top: 5%;
`

export const ProductCard = styled.div`
    height: 480px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    align-items: center;
`

export const Badge = styled.div`
  width: 50px;
  height: 50px;
  background: #FC4059 0% 0% no-repeat padding-box;
  border-radius: 50%;
  position: absolute;
  right: 2%;
  top: 2%;
  display: flex;
  justify-content: center;
  align-items: center;

  div{
  text-align: center;
  font: normal normal bold 14px/30px Muli;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
  
  }
`
export const Cardmain = styled.div`
  padding-left: 5%;
  height: 483px;
  padding-bottom: 5%;
`

export const CardTitle = styled.div`
  text-align: left;
  font: normal normal bold 32px/15px Muli;
  letter-spacing: 1.28px;
  color: #242424;
  text-transform: uppercase;
  opacity: 1;
  margin: 5% 0px;
  `

export const AfterSale = styled.div`
text-align: left;
font: normal normal bold 20px/15px Muli;
letter-spacing: 0.6px;
color: #FC4059;
margin-right: 10px;
`

export const Price = styled.div`
  height: 38px;
  text-align: center;
  font: normal normal bold 20px/15px Muli;
  letter-spacing: 0.6px;
  color: #242424;
`

export const DeatilsTitle = styled.div`
text-align: left;
font: normal normal bold 25px/15px Muli;
letter-spacing: 1.28px;
color: #242424;
`


export const SalesDetails = styled.div`
text-decoration: line-through;
font: normal normal bold 24px/15px Muli;
letter-spacing: 0.48px;
color: #707070;
`



export const DiscountSale = styled.div`
text-align: right;
font: normal normal bold 20px/15px Muli;
letter-spacing: 0.4px;
color: #FC4059;
opacity: 1;
margin-bottom: 20%;
`

export const ProfileContainer = styled.div`
height: auto;
background: #F2F2F2 0% 0% no-repeat padding-box;
border-radius: 16px;
`

export const NameProfile = styled.div`
text-align: left;
font: normal normal bold 27px/40px Muli;
letter-spacing: 0px;
color: #242424;
`

export const DataProfile = styled.div`
text-align: left;
font: normal normal normal 22px/15px Muli;
letter-spacing: 0.96px;
color: #707070;
padding: 9% 0px;
margin-right: 3%;
`

export const DetailsProfile = styled.div`
text-align: left;
font: normal normal normal 20px/15px Muli;
letter-spacing: 0.96px;
color: #000000;
`



export const Layout = styled.div`
background: #F2F2F2 0% 0% no-repeat padding-box;
border-radius: 16px;
height: 242px;
margin-bottom: 15px;
display: grid;
grid-template-columns: repeat(4, 1fr); /* Creates 4 equal columns */
grid-gap: 5px; /* Adds spacing between grid items */
padding: 5px; /* Adds padding around the grid */
position: relative;
`

export const CartTitle = styled.div`
font: normal normal bold 20px/30px Muli;
letter-spacing: 0.38px;
color: #242424;  
padding: 10px;
margin-top: 20%;
`