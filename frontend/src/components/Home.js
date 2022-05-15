/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect } from "react";
import Metadata from "./layout/Metadata";

import Product from "./product/Product";
import Loader from "./layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.success("Sucess");
      return alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, alert, error]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`Buy Best Products Online`} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row" style={{ border: "0px solid black" }}>
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
