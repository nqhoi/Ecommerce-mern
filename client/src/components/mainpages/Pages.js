import React, { useContext } from "react";
import { Route, Switch } from "react-router";
import { GlobalState } from "../../GlobalState";
import Categorise from "../categorise/Categorise";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import CreateProduct from "./createProduct/CreateProduct";
import DetailProduct from "./detailProduct/DetailProduct";
import OrderDetails from "./history/OrderDetails";
import OrderHistory from "./history/OrderHistory";
import Products from "./products/Products";
import NotFound from "./utils/notfound/NotFound";

function Pages() {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged 
  const [isAdmin] = state.userAPI.isAdmin

  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/detail/:id" exact component={DetailProduct} />

      <Route path="/login" exact component={isLogged ? NotFound : Login} />
      <Route path="/register" exact component={isLogged ? NotFound : Register} />

      <Route path="/category" exact component={isAdmin ? Categorise: NotFound  } />

      <Route path="/create_product" exact component={isAdmin ? CreateProduct: NotFound  } />
      <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct: NotFound  } />

      <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
      <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} />
      
      <Route path="/cart" exact component={Cart} />

      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default Pages;
