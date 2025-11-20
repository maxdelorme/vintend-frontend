import { Routes, Route, useSearchParams } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Offer from "../pages/Offer";
import Header from "./Header";
import { useState } from "react";

const Main = () => {
  const [currentQueryParameters, setSearchParams] = useSearchParams();
  const querySearch = currentQueryParameters.get("search");
  const [search, setSearch] = useState(querySearch || "");
  const queryPriceMax = currentQueryParameters.get("priceMax") || 100;
  const queryPriceMin = currentQueryParameters.get("priceMin") || 0;
  const [range, setRange] = useState({
    min: queryPriceMin,
    max: queryPriceMax,
  });

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        setSearchParams={setSearchParams}
        range={range}
        setRange={setRange}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home search={search} range={range} />}
          ></Route>
          <Route path="/offers/:id" element={<Offer />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </main>
    </>
  );
};

export default Main;
