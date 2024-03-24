import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HOMEPAGE_PATH, ORDER_LISTING_PATH } from "./router";

const Header = () => {
  const location = useLocation();
  const [selected, setSelected] = useState<"homepage" | "order-listing">(
    "homepage"
  );

  useEffect(() => {
    switch (location.pathname) {
      case ORDER_LISTING_PATH:
        setSelected("order-listing");
        break;
      default:
        setSelected("homepage");
    }
  }, [location.pathname]);

  return (
    <div className="header">
      <h1>CompAsia</h1>
      <div>
        <Link
          className={`nav-btn ${selected === "homepage" ? "selected" : ""}`}
          to={HOMEPAGE_PATH}
        >
          Home Page
        </Link>
        |
        <Link
          className={`nav-btn ${
            selected === "order-listing" ? "selected" : ""
          }`}
          to={ORDER_LISTING_PATH}
        >
          Order Listing
        </Link>
      </div>
    </div>
  );
};

export default Header;
