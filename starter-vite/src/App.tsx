import { Refine } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { RefineThemes, ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

import { ProductDataProvider } from "./providers/product-data-provider";
import { OrderDataProvider } from "./providers/order-data-provider";
import { ListProducts } from "./pages/listProduct";
import { ListOrders } from "./pages/orderList";
import { ProductDetails } from "./pages/productDetails";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <Refine
          dataProvider={{
            default: ProductDataProvider,
            productProvider: ProductDataProvider,
            orderProvider: OrderDataProvider,
          }}
          routerProvider={routerProvider}
          resources={[
            {
              name: "products",
              list: "/products",
              meta: { 
                label: "Products",
                dataProviderName: "productProvider"
               },
            },
            {
              name: "orders",
              list: "/orders",
              meta: { 
                label: "Orders",
                dataProviderName: "orderProvider"
               },
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <ThemedLayoutV2
                  Title={(props) => (
                    <ThemedTitleV2 {...props} text="Test Refine App" />
                  )}
                >
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              <Route 
                index 
                element={<NavigateToResource resource="products" />} 
              />
              <Route path="/products" element={<ListProducts />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/orders" element={<ListOrders />} />
            </Route>
          </Routes>
        </Refine>
      </ThemeProvider>
    </BrowserRouter>
  );
}