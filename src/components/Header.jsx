import logo from "../assets/img/logo.svg";
import { MdOutlineSearch } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
const Header = ({ search, setSearch }) => {
  const [currentQueryParameters, setSearchParams] = useSearchParams();
  // permet de manipuler les query de l'URL via les méthodes .append(), .set(), .delete(), .get(), etc...
  const newQueryParameters = new URLSearchParams();
  console.log("in header", search);
  useEffect(() => {
    setSearch(search || currentQueryParameters.get("search"));
  }, []);
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
              newQueryParameters.set("search", event.target.value);
            else newQueryParameters.delete("search");
            setSearchParams(newQueryParameters);
          }}
          type="text"
          placeholder="Recherche des articles"
        ></input>
        <MdOutlineSearch />
      </label>
      <button className="outline">S'inscrire</button>
      <button className="outline">se connecter</button>
      <button className="fill-primary">vends tes articles</button>
    </header>
  );
};

export default Header;
