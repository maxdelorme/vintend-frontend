import logo from "../../assets/img/logo.svg";
import { MdOutlineSearch } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import "./header.css";
import Cookie from "js-cookie";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";

const Header = ({
  search,
  setSearch,
  setSearchParams,
  range,
  setRange,
  isAuthenticated,
  setIsAuthenticated,
  setModal,
}) => {
  const disconnect = () => {
    Cookie.remove("token");
    setIsAuthenticated(false);
  };

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
        Prix&nbsp;entre&nbsp;
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
        {isAuthenticated ? (
          <button className="alert" onClick={disconnect}>
            Se déconnecter
          </button>
        ) : (
          <>
            <button
              className="outline"
              onClick={() =>
                setModal({
                  isVisible: true,
                  children: (
                    <SignupForm
                      setIsAuthenticated={setIsAuthenticated}
                      setModal={setModal}
                    ></SignupForm>
                  ),
                })
              }
            >
              S'inscrire
            </button>
            <button
              className="outline"
              onClick={() =>
                setModal({
                  isVisible: true,
                  children: (
                    <LoginForm
                      setIsAuthenticated={setIsAuthenticated}
                      setModal={setModal}
                    ></LoginForm>
                  ),
                })
              }
            >
              Se connecter
            </button>
          </>
        )}
        <button className="fill-primary">Vends tes articles</button>
      </span>
    </header>
  );
};

export default Header;
