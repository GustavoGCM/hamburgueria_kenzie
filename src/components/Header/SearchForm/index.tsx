/* eslint-disable import/order */
import { MdSearch } from 'react-icons/md';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { useContext } from 'react';
import { ProductsContext } from '../../../providers/ProductsContext';

const SearchForm = () => {
  const {setSearch, searchProduct} = useContext(ProductsContext)

  return (
    <StyledSearchForm>
      <input type='text' placeholder='Digitar pesquisa' onChange={(e) => setSearch(e.target.value)} />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green' onClick={(e) => searchProduct(e)}>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
