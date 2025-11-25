import { Routes, Route, useSearchParams } from "react-router-dom";
import Header from "./Header/Header";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound";
import Offer from "../pages/Offer/Offer";
import PublishPage from "../pages/Publish/PublishPage";
import { useState } from "react";

import Cookie from "js-cookie";
import Modal from "./Modal/Modal";
import PaiementPage from "../pages/Paiement/Paiement";
import { BasketContentProvider } from "./basket/BasketContentProvider";
import Basket from "./basket/Basket";

const Main = () => {
  const [currentQueryParameters, setSearchParams] = useSearchParams();
  const querySearch = currentQueryParameters.get("search");
  const [search, setSearch] = useState(querySearch || "");
  const [sort, setSort] = useState(false);
  const queryPriceMax = currentQueryParameters.get("priceMax") || 100;
  const queryPriceMin = currentQueryParameters.get("priceMin") || 0;
  const [range, setRange] = useState({
    min: queryPriceMin,
    max: queryPriceMax,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(Cookie.get("token")) || false
  );
  const [basket, setBasket] = useState([]);

  const [modal, setModal] = useState({
    isVisible: false,
    children: "",
  });

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        setSearchParams={setSearchParams}
        range={range}
        setRange={setRange}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        setModal={setModal}
        sort={sort}
        setSort={setSort}
      />
      <main>
        <div className="container">
          <BasketContentProvider>
            <Routes>
              <Route
                path="/"
                element={<Home search={search} range={range} sort={sort} />}
              ></Route>
              <Route path="/offers/:id" element={<Offer />} />
              <Route
                path="/publish"
                element={
                  <PublishPage
                    isAuthenticated={isAuthenticated}
                    setModal={setModal}
                    modal={modal}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                }
              />
              <Route
                path="/paiement"
                element={
                  <PaiementPage
                    isAuthenticated={isAuthenticated}
                    setModal={setModal}
                    modal={modal}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                }
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
            <Basket />
          </BasketContentProvider>
        </div>
      </main>
      {modal.isVisible && <Modal modal={modal} setModal={setModal}></Modal>}
    </>
  );
};
export default Main;
