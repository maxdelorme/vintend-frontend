// Display the header on top of the site
import logo from "../../assets/img/logo.svg";
import { IoIosSearch, IoIosMenu } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import "./header.css";
import Cookies from "js-cookie";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import Switch from "../switch/Switch";
import useWindowDimensions from "../../utils/useWindowSize";
import { useState, useEffect } from "react";

const Header = ({
  search,
  setSearch,
  setSearchParams,
  range,
  setRange,
  isAuthenticated,
  setIsAuthenticated,
  setModal,
  sort,
  setSort,
}) => {
  const disconnect = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
  };

  // this state let we know if its the signup or the login form to show
  const [showSignupOrLogin, setShowSignupOrLogin] = useState(false);

  const location = useLocation();

  // on big device all the menu should be visible
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    console.log(showSignupOrLogin);
    if (showSignupOrLogin === "signup")
      setModal({
        isVisible: true,
        children: (
          <SignupForm
            setIsAuthenticated={setIsAuthenticated}
            setModal={setModal}
            setShowSignupOrLogin={setShowSignupOrLogin}
          ></SignupForm>
        ),
      });
    else if (showSignupOrLogin === "login")
      setModal({
        isVisible: true,
        children: (
          <LoginForm
            setIsAuthenticated={setIsAuthenticated}
            setModal={setModal}
            setShowSignupOrLogin={setShowSignupOrLogin}
          ></LoginForm>
        ),
      });
  }, [showSignupOrLogin]);

  const openMenu = width > 768;
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} />
        </Link>
        <details open={openMenu}>
          <summary>
            <IoIosMenu />
          </summary>

          {location.pathname === "/" && (
            <div className="filter">
              <label className="switchLabel">
                trier par prix{" "}
                <Switch
                  isON={sort}
                  onClick={(sort) => {
                    setSort(sort);
                    setSearchParams((prev) => {
                      prev.set("sort", sort);
                      return prev;
                    });
                  }}
                  size="10px"
                  color="#FF0000"
                />
              </label>
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
                <IoIosSearch />
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
            </div>
          )}

          <span className="buttons">
            {isAuthenticated ? (
              <button className="alert" onClick={disconnect}>
                Se déconnecter
              </button>
            ) : (
              <>
                <button
                  className="outline"
                  onClick={() => setShowSignupOrLogin("signup")}
                >
                  S'inscrire
                </button>
                <button
                  className="outline"
                  onClick={() => setShowSignupOrLogin("login")}
                >
                  Se connecter
                </button>
              </>
            )}
            <button className="fill-primary">
              <Link to="/publish">Vends tes articles</Link>
            </button>
          </span>
        </details>
      </div>
    </header>
  );
};

export default Header;
