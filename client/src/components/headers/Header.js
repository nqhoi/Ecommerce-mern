import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg";
import { Link } from "react-router-dom";
import "./Header.css";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false)

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem('firstLogin')

    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories </Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout{" "}
          </Link>
        </li>
      </>
    );
  };

  const toggleMenu = () => setMenu(!menu)

  const styleMenu = {
    left: menu ? 0 : '-100%'
  }

  return (
    <header className="header">
      <div className="header__menu"  onClick={() => setMenu(!menu)} >
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="header__logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "My Shop"}</Link>
        </h1>
      </div>

      <ul  style={styleMenu}>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>

        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login ✥ Register </Link>
          </li>
        )}

        <li onClick={() => setMenu(!menu)} >
          <img src={Close} alt="" width="30" className="header__menu" />
        </li>
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="header__cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
