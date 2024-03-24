import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Homepage from "./Homepage";
import OrderListing from "./OrderListing";
import App from "../App";

const HOMEPAGE_PATH = "/";
const ORDER_LISTING_PATH = "/order-listing";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path={HOMEPAGE_PATH} element={<Homepage />} />
      <Route path={ORDER_LISTING_PATH} element={<OrderListing />} />
    </Route>
  )
);

export { HOMEPAGE_PATH, ORDER_LISTING_PATH, router };
