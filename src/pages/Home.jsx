import react, { useEffect, useState } from "react";
import HeaderDesign from "../components/header/HeaderDesign";
import { useParams } from "react-router-dom";
import Baniere from "../components/home/Baniere";
import Title from "../components/Title";
import Filter from "../components/services/Filter";
import Products from "../components/products/ProductsDesign";
import { withNamespaces } from "react-i18next";
import { useDispatch } from "react-redux";
import { LANGUE } from "../actions";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/footer/Footer";
import Newsletter from "../components/services/Newsletter";
import { useSelector } from "react-redux";

function Home({ i18n }) {
  const local = useParams().lang;
  const favs = useSelector((state) => state.favProducts);
  const [langue, setLangue] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setLangue(local);
    i18n.changeLanguage(langue);
    dispatch(LANGUE(local));
  }, [langue]);
  return (
    <div>
      <HeaderDesign />
      <Baniere />
      <Title text="Promotion" />
      <Filter />
      <Products />
      <ScrollToTop showBelow={100} />
      <Newsletter />
      <Footer />
    </div>
  );
}
export default withNamespaces()(Home);
