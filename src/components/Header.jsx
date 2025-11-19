import logo from "../assets/img/logo.svg";
import { MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const Header = ({ search, setSearch, setSearchParams, range, setRange }) => {
  const newQueryParameters = new URLSearchParams();

  return (
    <header>
      <Link to="/">
        <img src={logo} />
      </Link>
      <label>
        <input
          value={search}
          onChange={(event) => {
            const searchValue = event.target.value;
            setSearch(searchValue);
            if (searchValue)
              setSearchParams((prev) => {
                prev.set("search", searchValue);
                return prev;
              });
            else {
              setSearchParams((prev) => {
                console.log(prev);
                prev.delete("search");
                return prev;
              });
            }
          }}
          type="text"
          placeholder="Recherche des articles"
        ></input>
        <MdOutlineSearch />
      </label>
      <label className="range">
        Prix entre {range[0]} €
        <RangeSlider
          value={range}
          onInput={(range) => {
            setRange(range);
            setSearchParams((prev) => {
              prev.set("priceMin", range[0]);
              prev.set("priceMax", range[1]);
              return prev;
            });
          }}
        />
        {range[1]}€
      </label>
      <span>
        <button className="outline">S'inscrire</button>
        <button className="outline">se connecter</button>
        <button className="fill-primary">vends tes articles</button>
      </span>
    </header>
  );
};

export default Header;
