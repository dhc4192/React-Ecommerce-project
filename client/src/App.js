import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { currentUser } from "./services/auth";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Header from "./components/nav/Header";
import History from "./components/user/History";
import Wishlist from "./components/user/Wishlist";
import Password from "./components/user/Password";
import Register from "./components/auth/Register";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import ForgotPassword from "./components/auth/ForgotPassword";
import AdminDashboard from "./components/admin/AdminDashboard";
import RegisterComplete from "./components/auth/RegisterComplete";
import Brand from "./components/admin/Brand";
import Product from "./components/admin/Product";
import Coupons from "./components/admin/Coupons";
import Category from "./components/admin/Category";
import Products from "./components/admin/Products";
import ProductType from "./components/admin/ProductType";
import ProductCategory from "./components/admin/ProductCategory";
import BrandUpdate from "./components/admin/BrandUpdate";
import SubCategory from "./components/admin/SubCategory";
import CategoryUpdate from "./components/admin/CategoryUpdate";
import ProductTypeUpdate from "./components/admin/ProductTypeUpdate";
import ProductCategoryUpdate from "./components/admin/ProductCategoryUpdate";
import SubCategoryUpdate from "./components/admin/SubCategoryUpdate";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((error) => console.log(error));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={Category} />
        <AdminRoute exact path="/admin/subcategory" component={SubCategory} />
        <AdminRoute exact path="/admin/brand/" component={Brand} />
        <AdminRoute exact path="/admin/product" component={Product} />
        <AdminRoute exact path="/admin/products" component={Products} />
        <AdminRoute exact path="/admin/coupon" component={Coupons} />




        <AdminRoute exact path="/admin/product_type" component={ProductType} />
        <AdminRoute
          exact
          path="/admin/product_category/"
          component={ProductCategory}
        />
        <AdminRoute exact path="/admin/brand/:slug" component={BrandUpdate} />
        <AdminRoute
          exact
          path="/admin/product_category/:slug"
          component={ProductCategoryUpdate}
        />

        <AdminRoute
          exact
          path="/admin/product_type/:slug"
          component={ProductTypeUpdate}
        />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
        <AdminRoute
          exact
          path="/admin/subcategory/:slug"
          component={SubCategoryUpdate}
        />
      </Switch>
    </>
  );
}

export default App;
