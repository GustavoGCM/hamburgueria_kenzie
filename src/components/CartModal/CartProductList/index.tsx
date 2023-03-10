/* eslint-disable import/order */
import CartProductCard from './CartProductCard';

import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { useContext } from 'react';
import { ProductsContext } from '../../../providers/ProductsContext';

const CartProductList = () => {
  const { cartProduct, totalPrice, removeAllProducts } = useContext(ProductsContext)

  return(
    <StyledCartProductList>
    <ul>
      {cartProduct.length > 0 ? cartProduct.map((product) => <CartProductCard price={product.price} id={product.id} name={product.name} img={product.img} key={product.id} />) : null}
    </ul>

    <div className='totalBox'>
      <StyledParagraph>
        <strong>Total</strong>
      </StyledParagraph>
      <StyledParagraph className='total'>R$ {totalPrice},00</StyledParagraph>
    </div>
    <StyledButton $buttonSize='default' $buttonStyle='gray' onClick={() => removeAllProducts()}>
      Remover todos
    </StyledButton>
  </StyledCartProductList>
  )
  };

export default CartProductList;
