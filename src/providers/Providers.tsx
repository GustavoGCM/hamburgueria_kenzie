import { ProductsProvider } from './ProductsContext';
import { UserProvider, iChildren } from './UserContext';

const Providers = ({ children }: iChildren) => (
  <ProductsProvider>
    <UserProvider>{children}</UserProvider>
  </ProductsProvider>
);

export default Providers;
