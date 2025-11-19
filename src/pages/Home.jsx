import axios from "axios";
import { useState, useEffect } from "react";
import Offer from "../components/Offer";
const Home = ({ search }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [search]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers",
        {
          params: {
            title: search,
          },
        }
      );
      setData(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <div>Chargement en cours....</div>
  ) : (
    <div className="listOffers">
      {data.offers.map((item) => (
        <Offer key={item._id} {...item}></Offer>
      ))}
    </div>
  );
};

export default Home;
