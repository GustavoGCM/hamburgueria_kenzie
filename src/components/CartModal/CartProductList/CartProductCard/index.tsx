/* eslint-disable import/order */
import { MdDelete } from 'react-icons/md';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { iProduct, ProductsContext } from '../../../../providers/ProductsContext';
import { useContext } from 'react';

const CartProductCard = ({ img, name, id }: iProduct) => {
  const {removeFromCart} = useContext(ProductsContext)

  return(
    <StyledCartProductCard>
    <div className='imageBox'>
      <img src={img} alt='Hamburguer' />
    </div>
    <div className='contentBox'>
      <StyledTitle tag='h3' $fontSize='three'>
        {name}
      </StyledTitle>
      <button type='button' aria-label='Remover' id={id.toString()} onClick={() => removeFromCart(id)}>
        <MdDelete size={24} />
      </button>
    </div>
  </StyledCartProductCard>
  )
  };

export default CartProductCard;
