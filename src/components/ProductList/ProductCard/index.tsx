/* eslint-disable import/order */
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { iProduct, ProductsContext } from '../../../providers/ProductsContext';
import { useContext } from 'react';

const ProductCard = ({ id, name, category, price, img }: iProduct) => {
  const {addToCart} = useContext(ProductsContext)

  return(
    <StyledProductCard>
    <div className='imageBox'>
      <img src={img} alt='Hamburguer' />
    </div>
    <div className='content'>
      <StyledTitle tag='h3' $fontSize='three'>
        {name}
      </StyledTitle>
      <StyledParagraph className='category'>{category}</StyledParagraph>
      <StyledParagraph className='price'>{price},00</StyledParagraph>
      <StyledButton
        $buttonSize='medium'
        $buttonStyle='green'
        id={id.toString()}
        onClick={() => addToCart(id)}
      >
        Adicionar
      </StyledButton>
    </div>
  </StyledProductCard>
  )
  };

export default ProductCard;
