import { useEffect, useState } from "react";
import {
  GET_ORDERS_PATH,
  GetOrdersResponseDto,
  PaginatedResponseDto,
  axiosInstance,
} from "../common/api";
import PaginationBar from "./PaginationBar";

const OrderListing = () => {
  const [orders, setOrders] = useState<GetOrdersResponseDto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams("");
    params.set("page", String(currentPage));
    axiosInstance
      .get<PaginatedResponseDto<GetOrdersResponseDto>>(GET_ORDERS_PATH, {
        params,
      })
      .then((res) => {
        setOrders(res.data.data);
        setTotalPage(res.data._metadata.pageCount);
      });
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <div className="order-listing">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Product Color</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.productId}</td>
                <td>{order.productName}</td>
                <td>{order.productColor}</td>
                <td>{new Date(order.orderDateTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default OrderListing;
