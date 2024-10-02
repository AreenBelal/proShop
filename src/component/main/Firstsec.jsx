import React from 'react'
import { MainAPP } from '../common/styled_comp/divStyles.style'
import { ButtonShop } from '../common/styled_comp/Button.style'
import { MainPageImage } from '../common/styled_comp/Image.style'

 function Firstsec() {
  return (
    <div>
    
    <MainAPP className='row' >
      
      <div className='col-xs-4 col-sm-4 col-md-8'>
      <p className='firstparagraph'>Save up to $39.99</p>
      <div className='secondparagraph my-5'>PlayStation 5 </div>
      <div className=' thirdparagraph mb-5'>Lightning-fast download speed with super-fast SSD storage</div>
      <ButtonShop className= 'mb-5'> <div> Shop now </div>  </ButtonShop>
      </div>
      
      <div className=' col-xs-3 col-sm-3 col-md-4 ms-auto pe-4'>
      <MainPageImage src='/images/playstation.png' alt='playstation' />
      </div>


      </MainAPP>
    </div>
  )
}

export default Firstsec
