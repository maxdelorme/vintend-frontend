import logo from "../assets/img/logo.svg";
import { MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

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
        Prix&nbsp;entre
        <InputRange
          value={range}
          maxValue={100}
          minValue={0}
          formatLabel={(value) => `${value} €`}
          onChange={(range) => {
            setRange(range);
            setSearchParams((prev) => {
              prev.set("priceMin", range.min);
              prev.set("priceMax", range.max);
              return prev;
            });
          }}
        />
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
