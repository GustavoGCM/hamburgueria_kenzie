/* eslint-disable import/order */
import { useContext, useEffect } from 'react';
import { ProductsContext } from '../../providers/ProductsContext';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';

const ProductList = () => {
  const { products, getProducts } = useContext(ProductsContext);
  useEffect(() => {
    getProducts()
  }, [])

  return (
    <StyledProductList>
      {products.map((product) => (
        <ProductCard
          category={product.category}
          id={product.id}
          img={product.img}
          name={product.name}
          price={product.price}
          key={product.id}
        />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
