/* eslint-disable import/order */
import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';
import { StyledContainer } from '../../styles/grid';
import { useContext } from 'react';
import { ProductsContext } from '../../providers/ProductsContext';

const ShopPage = () => {
  const {modalStatus} = useContext(ProductsContext)

  return(
    <StyledShopPage>
    {modalStatus ?  <CartModal /> : null}
    <Header />
    <main>
      <StyledContainer containerWidth={1300}>
        <ProductList />
      </StyledContainer>
    </main>
  </StyledShopPage>
  )
};

export default ShopPage;
