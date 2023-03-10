/* eslint-disable no-console */
/* eslint-disable import/order */
import { all } from 'axios';
import { createContext, useEffect, useState } from 'react';
import { api } from '../services';
import { iChildren } from './UserContext';

export interface iProduct {
  id: number;
  name?: string;
  category?: string;
  price: number;
  img?: string;
}

interface iProductsContext {
  closeModalCart: () => void;
  modalStatus: null | true;
  openModalCart: () => void;
  products: iProduct[];
  getProducts: () => Promise<void>;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartProduct: iProduct[];
  totalPrice: number;
  removeAllProducts: () => void;
  searchProduct: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const ProductsContext = createContext<iProductsContext>(
  {} as iProductsContext
);

export const ProductsProvider = ({ children }: iChildren) => {
  const [modalStatus, setModalStatus] = useState<null | true>(null);
  const [products, setProducts] = useState<iProduct[]>([]);
  const [allProducts, setAllProducts] = useState<iProduct[]>([]);
  const [cartProduct, setCartProduct] = useState([] as iProduct[]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [search, setSearch] = useState('');

  const closeModalCart = () => {
    setModalStatus(null);
  };

  const openModalCart = () => {
    setModalStatus(true);
  };

  const getProducts = async () => {
    const token = localStorage.getItem('@TOKEN');

    try {
      const response = await api.get('products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
      setAllProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (id: number) => {
    const finded = products.find((product) => product.id === id);
    const verifyContent = cartProduct.find((product) => product.id === id);

    if (finded && !verifyContent) {
      setCartProduct([...cartProduct, finded]);
      setTotalPrice(totalPrice + finded.price);
    }
  };

  const removeFromCart = (id: number) => {
    const filtered = cartProduct.filter((product) => product.id !== id);
    const finded = cartProduct.find((product) => product.id === id);

    setCartProduct(filtered);
    if (finded) {
      setTotalPrice(totalPrice - finded.price);
    }
  };

  const removeAllProducts = () => {
    setCartProduct([]);
    setTotalPrice(0);
  };

  const searchProduct = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setProducts(allProducts);

    if (products.length > 0) {
      const mySearch = products.filter((product) =>
        product.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );

      if (mySearch) {
        setProducts(mySearch);
      } else {
        setProducts(allProducts);
      }
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        closeModalCart,
        openModalCart,
        modalStatus,
        products,
        getProducts,
        addToCart,
        removeFromCart,
        cartProduct,
        totalPrice,
        removeAllProducts,
        searchProduct,
        setSearch,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
