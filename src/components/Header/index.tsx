/* eslint-disable import/order */
import { MdShoppingCart, MdLogout } from 'react-icons/md';
import SearchForm from './SearchForm';
import { StyledHeader } from './style';
import LogoKenzieBurguer from '../../assets/LogoKenzieBurguer.svg';
import { StyledContainer } from '../../styles/grid';
import { useContext } from 'react';
import { ProductsContext } from '../../providers/ProductsContext';
import { UserContext } from '../../providers/UserContext';

const Header = () => {
  const { openModalCart } = useContext(ProductsContext);
  const { logout } = useContext(UserContext);

  return (
    <StyledHeader>
      <StyledContainer containerWidth={1300}>
        <div className='flexGrid'>
          <img
            src={LogoKenzieBurguer}
            alt='Kenzie Burguer Logo'
            className='logo'
          />
          <nav className='nav' role='navigation'>
            <SearchForm />
            <div className='buttons'>
              <button
                type='button'
                onClick={() => {
                  openModalCart();
                }}
              >
                <MdShoppingCart size={28} />
              </button>
              <button type='button' onClick={() => logout()} >
                <MdLogout size={28} />
              </button>
            </div>
          </nav>
        </div>
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
