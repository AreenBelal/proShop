import styled from "styled-components";

export const TitleTablePage = styled.div`
text-align: left;
font: normal normal bold 32px/15px Muli;
letter-spacing: 1.28px;
color: #242424;
`
 

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

  .btn{
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
    border: none;
  }
`




export const OperationContainer = styled.div`
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 200px;
      border: 2px solid #e2e2e2;
      border-left: 0px;
      border-right: 0px;
      background-color: white;
      margin-top: 10px;
  
      button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 38px;
        border: 0;
        border-left: 1px dashed #e2e2e2;
        border-right: 1px dashed #e2e2e2;
        background-color: rgb(255, 255, 255);

          &:hover{
            transform: scale(1.02);
        }
      }
`

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

export const IconWish = styled.div`
width: 40px;
height: 40px;
border: 1px solid #FCDD06;
border-radius: 10px;
text-align: center;
position: relative;
`

export const CircleColor = styled.div`
width: 30px;
height: 30px;
border-radius: 50%;
border: 1px solid black;
margin-top: 2%;
`

 



export const DiscountDetails  = styled.div `
.discount{
    text-align: right;
    font: normal normal bold 20px/15px Muli;
    letter-spacing: 0.4px;
    color: #FC4059;
    opacity: 1;
    margin-bottom: 20%;
}

.title{
  text-align: left;
  font: normal normal bold 25px/15px Muli;
  letter-spacing: 1.28px;
  color: #242424;
}

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
  padding: 5%;
  height: 483px;
  padding-bottom: 5%;

  p{
    text-align: left;
    font: normal normal bold 32px/15px Muli;
    letter-spacing: 1.28px;
    color: #242424;
    text-transform: uppercase;
    margin: 5% 0px;
  }
`

export const Logindiv = styled.div`

.LoginImage{
      animation: slide-down 0.5s ease;
      width: 700px;
      height: 80vh;
      max-width: 100%;
      margin-top: 100px;
      margin-bottom: 250px;
      padding: 0px 10px;
      margin-left: 80px;
      object-fit: cover;
}
`

export const CardForm = styled.form`

.labelAuth{
  text-align: left;
  font: normal normal normal 15px/15px Muli;
  letter-spacing: 0.88px;
  color: #242424;
  opacity: 1;
  margin-bottom: 15px;
}

input{
  display: block;
  width: 300px;
  height: 25px;
  padding: 10px;
  border: 1px solid #242424;
  border-radius: 6px;
  opacity: 1;
  margin-bottom: 15px;
  margin-top: 15px;
}


.loginButton{
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

}


.rememberMe{
    text-align: center;
  font: normal normal normal 15px/42px Muli;
  letter-spacing: 0.88px;
  color: #707070;
  opacity: 0.7;
  }

  .chBox{

  width: 12px;
  height: 12px;
  background: #ffffff;
  border: 1px solid #000000;
  margin-right: 15px;
  appearance: none;
  position: relative;


  &:checked:after {
    content: "";
    position: absolute;
    left: 2%;
    top: -50%;
    width: 6px;
    height: 10px;
    border: solid black;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    transform-origin: bottom left;
  }
  }


  .authLinks{
    text-decoration: none;
  text-align: left;
  font: normal normal 300 16px/15px Muli;
  letter-spacing: 0.88px;
  color: #242424;
  opacity: 1;
  }

  .signupButton{
    border: 3px solid #fcdd06;
    border-radius: 20px;
    opacity: 1;
    width: 230px;
    height: 40px;
    background-color: transparent;
    text-decoration: none;
    position: relative;
  }

.SignupText{
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
}
`

export const StraightLine = styled.div`
  border-bottom: 1px solid  #707070;
  margin-top: 15px;
  width: 300px;
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

  .haveAccount{
    text-align: center;
      font: normal normal 300 18px/15px Muli;
      letter-spacing: 0.88px;
      color: #707070;
  }
      .linkLogin{
        margin-left: 10px;
          text-decoration: none;
        text-align: center;
        font: normal normal normal 18px/15px Muli;
        letter-spacing: 0.88px;
        color: #242424;
      }
  
`

export const CardCategory = styled.div`
  width: 100%;
  max-width: 250px;
  height: 250px;
  background: #f7f8fc 0% 0% no-repeat padding-box;
  border-radius: 16px;
  margin-top: 5%;
`


export const ParagrahDetails = styled.div`
  text-align: left;
  font: normal normal normal 16px/30px Muli;
  letter-spacing: 0.32px;
  color: #242424;
  margin-top: 50px;
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
  text-decoration: line-through;
`
export const ProductMain = styled.div`
  height: 750px;
  background: hsl(228, 45%, 98%) 0% 0% no-repeat padding-box;
  opacity: 1;
  max-width: 100%;
  margin: 5% 0px;

  .title{
    margin: 0px auto;
      font: normal normal bold 32px/15px Muli;
      letter-spacing: 1.28px;
      color: #242424;
      text-transform: uppercase;
      opacity: 1;
      text-align: center;
      padding-top: 5%;
  }
`


export const CartText = styled.div`
  text-align: center;
  font: normal normal normal 18px/15px Muli;
  letter-spacing: 0.48px;
  color: #242424;
  text-transform: capitalize;
  opacity: 1;
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


 

   .salesDetails{
    text-decoration: line-through;
    font: normal normal bold 24px/15px Muli;
    letter-spacing: 0.48px;
    color: #707070;
   }

   .title{
    text-align: left;
    font: normal normal bold 20px/13px Muli;
    letter-spacing: 1.05px;
    color: #242424;
 }

 .price{
      height: 38px;
      text-align: center;
      font: normal normal bold 20px/15px Muli;
      letter-spacing: 0.6px;
      color: #242424;
 }
 
`

export const Layout = styled.div`
background: #F2F2F2 0% 0% no-repeat padding-box;
border-radius: 16px;
height: 242px;
margin-bottom: 15px; 
`


export const SecondPart = styled.div`
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
`

export const ProfileContainer = styled.div`
height: fit-content;
background: #F2F2F2 0% 0% no-repeat padding-box;
border-radius: 16px;

.name{
  text-align: left;
font: normal normal bold 27px/40px Muli;
letter-spacing: 0px;
color: #242424;
}
.profile_button{
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
}

.dataProfile{
  text-align: left;
font: normal normal normal 22px/15px Muli;
letter-spacing: 0.96px;
color: #707070;
padding: 3% 0px;
margin-right: 3%;
}

.detailsProfile{
  text-align: left;
font: normal normal normal 20px/15px Muli;
letter-spacing: 0.96px;
color: #000000;
}

label{
    width: 50%;
    height: 40px;
    background: #FCDD06 0% 0% no-repeat padding-box;
    border: none;
    margin: 2% auto;
    display: block;
    
    div{
      text-align: center;
      font: normal normal normal 18px/40px Muli;
      letter-spacing: 0.52px;
      color: #000000;
 
    }
}
`

;

