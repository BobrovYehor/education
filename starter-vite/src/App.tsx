import { Refine } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { RefineThemes, ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

import { dataProvider } from "./providers/data-provider";
import { ListProducts } from "./pages/list";
import { ListOrders } from "./pages/orderList";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <Refine
          dataProvider={dataProvider}
          routerProvider={routerProvider}
          resources={[
            {
              name: "products",
              list: "/products",
              meta: { label: "Products" },
            },
            {
              name: "orders",
              list: "/orders",
              meta: { label: "Orders" },
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
              <Route path="/orders" element={<ListOrders />} />
            </Route>
          </Routes>
        </Refine>
      </ThemeProvider>
    </BrowserRouter>
  );
}
