// import Home from "./containers/home"
// import Footer from "./components/footer"
// import Register from "./containers/user/register"
// import Header from "./components/header"
// import Login from "./containers/user/login"
// import Forgot from "./containers/user/forgot"
// import Profil from "./containers/user/profil"
// import Logout from "./containers/user/logout"
// import Admin from "./containers/admin/admin"
// import AddProduct from "./containers/admin/product/addProduct"
// import EditProduct from "./containers/admin/product/editProduct"
// import OrderDetail from './containers/admin/order/orderDetail'
// import Product from './containers/product'
// import Detail from './containers/detail'
// import Basket from './containers/basket'
// import Payment from './containers/payment'
// import Success from './containers/success'
// import {Routes, Route} from "react-router-dom"
// import RequireDataAuth from "./helpers/require-data-auth"
// import QrCodeScanner from "./containers/QRcode/qrCodeScanner"

// function App() {


//   return (
//    <div className="App">
//     <Header/>
//     <Routes>
//       <Route path="/" element={<RequireDataAuth child={Home} auth={false} admin={false}/>} />
//       <Route path="/register" element={<Register />}/>
//       <Route path="/login" element={<Login />}/>
//       <Route path="/forgot" element={<Forgot />}/>
//       <Route path="/profil" element={<RequireDataAuth child={Profil} auth={true} admin={false}/>} />
//       <Route path="/logout" element={<RequireDataAuth child={Logout} auth={true} admin={false}/>} />
//       <Route path="/admin" element={<RequireDataAuth child={Admin} auth={true} admin={true}/>} />
//       <Route path="/qrcodescanner" element={<RequireDataAuth child={QrCodeScanner} auth={false} admin={false}/>} />
//       <Route path="/addProduct" element={<RequireDataAuth child={AddProduct} auth={true} admin={true}/>} />
//       <Route path="/editProduct/:id" element={<RequireDataAuth child={EditProduct} auth={true} admin={true}/>} />
//       <Route path="/orderDetail/:id" element={<RequireDataAuth child={OrderDetail} auth={true} admin={true}/>} />
//       <Route path="/product" element={<RequireDataAuth child={Product} auth={false} admin={false}/>} />
//       <Route path="/detail/:id" element={<RequireDataAuth child={Detail} auth={false} admin={false}/>} />
//       <Route path="/basket" element={<RequireDataAuth child={Basket} auth={false} admin={false}/>} />
//       <Route path="/payment/:orderId" element={<RequireDataAuth child={Payment} auth={true} admin={false}/>} />
//       <Route path="/success" element={<RequireDataAuth child={Success} auth={true} admin={false}/>} />
//       <Route path="/*" element={<RequireDataAuth child={Home} auth={false} admin={false}/>} />
//     </Routes>
//     <Footer/>

//    </div>
//   )
// }

// export default App

import { Routes, Route, Outlet, Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import Home from "./containers/home"
import Footer from "./components/footer"
import Register from "./containers/user/register"
import Header from "./components/header"
import Login from "./containers/user/login"
import Forgot from "./containers/user/forgot"
import Profil from "./containers/user/profil"
import Logout from "./containers/user/logout"
import Admin from "./containers/admin/admin"
import AddProduct from "./containers/admin/product/addProduct"
import EditProduct from "./containers/admin/product/editProduct"
import OrderDetail from './containers/admin/order/orderDetail'
import Product from './containers/product'
import Detail from './containers/detail'
import Basket from './containers/basket'
import Payment from './containers/payment'
import Success from './containers/success'
import Contact from './containers/contact'
import Faq from './containers/faq'
import Cgv from './containers/cgv'
import Mentions from './containers/mentions'
import RequireDataAuth from "./helpers/require-data-auth"
import QrCodeScanner from "./containers/QRcode/qrCodeScanner"

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifie si l'URL actuelle contient une suite malveillante après le `/`
    const currentPath = window.location.pathname;
    if (currentPath !== '/'
          && currentPath !== '/register'
          && currentPath !== '/login'
          && currentPath !== '/forgot'
          && currentPath !== '/profil'
          && currentPath !== '/logout'
          && currentPath !== '/admin'
          && currentPath !== '/qrcodescanner'
          && currentPath !== '/addProduct'
          && currentPath !== '/editProduct'
          && currentPath !== '/orderDetail'
          && currentPath !== '/product'
          && currentPath !== '/product/:type'
          && currentPath !== '/detail'
          && currentPath !== '/payment'
          && currentPath !== '/success'
          && currentPath !== '/contact'
          && currentPath !== '/faq'
          && currentPath !== '/cgv'
          && currentPath !== '/mentions'
      ) {
      // Redirige vers la page d'accueil
      navigate('/');
    }
  }, []);

  return (
    <>
    <Header />
    <div id="app">
      <Routes>
        <Route
          path="/"
          element={<RequireDataAuth child={Home} auth={false} admin={false} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route
          path="/profil"
          element={<RequireDataAuth child={Profil} auth={true} admin={false} />}
        />
        <Route
          path="/logout"
          element={<RequireDataAuth child={Logout} auth={true} admin={false} />}
        />
        <Route
          path="/admin"
          element={<RequireDataAuth child={Admin} auth={true} admin={true} />}
        />
        <Route
          path="/qrcodescanner"
          element={
            <RequireDataAuth child={QrCodeScanner} auth={false} admin={false} />
          }
        />
        <Route
          path="/addProduct"
          element={<RequireDataAuth child={AddProduct} auth={true} admin={true} />}
        />
        <Route
          path="/editProduct/:id"
          element={<RequireDataAuth child={EditProduct} auth={true} admin={true} />}
        />
        <Route
          path="/orderDetail/:id"
          element={<RequireDataAuth child={OrderDetail} auth={true} admin={true} />}
        />
        <Route
          path="/product/:type"
          element={<RequireDataAuth child={Product} auth={false} admin={false} />}
        />
        <Route
          path="/detail/:id"
          element={<RequireDataAuth child={Detail} auth={false} admin={false} />}
        />
        <Route
          path="/basket"
          element={<RequireDataAuth child={Basket} auth={false} admin={false} />}
        />
        <Route
          path="/payment/:orderId"
          element={<RequireDataAuth child={Payment} auth={true} admin={false} />}
        />
        <Route
          path="/success"
          element={<RequireDataAuth child={Success} auth={true} admin={false} />}
        />
        <Route
          path="/contact"
          element={<RequireDataAuth child={Contact} auth={false} admin={false} />}
        />
        <Route
          path="/faq"
          element={<RequireDataAuth child={Faq} auth={false} admin={false} />}
        />
        <Route
          path="/cgv"
          element={<RequireDataAuth child={Cgv} auth={false} admin={false} />}
        />
        <Route
          path="/mentions"
          element={<RequireDataAuth child={Mentions} auth={false} admin={false} />}
        />
      </Routes>
    </div>
    <Footer />
  </>
  );
}

export default App;
