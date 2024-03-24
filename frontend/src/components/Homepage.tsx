import { useEffect, useState } from "react";
import {
  CREATE_ORDER_PATH,
  CreateOrderRequestDto,
  GET_FILTER_OPTIONS_PATH,
  GET_PRODUCTS_PATH,
  GetFilterOptionsResponseDto,
  GetProductsResponseDto,
  PaginatedResponseDto,
  axiosInstance,
} from "../common/api";
import PaginationBar from "./PaginationBar";

type SearchFilters = {
  name: string;
  category: string;
  brand: string;
  color: string;
  page: number;
};
type FilterOptions = {
  categories: string[];
  brands: string[];
  colors: string[];
};
const Homepage = () => {
  const [products, setProducts] = useState<GetProductsResponseDto[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    brands: [],
    colors: [],
  });
  const [filters, setFilters] = useState<SearchFilters>({
    name: "",
    category: "",
    brand: "",
    color: "",
    page: 1,
  });
  const [totalPages, setTotalPage] = useState(0);

  const fetchData = (searchFilters: SearchFilters) => {
    const params = new URLSearchParams("");
    Object.keys(searchFilters).forEach((key: string) => {
      const value = searchFilters[key as keyof SearchFilters];
      if (value) params.set(key, String(value));
    });
    axiosInstance
      .get<PaginatedResponseDto<GetProductsResponseDto>>(GET_PRODUCTS_PATH, {
        params,
      })
      .then((res) => {
        setProducts(res.data.data);
        setTotalPage(res.data._metadata.pageCount);
      });
  };

  useEffect(() => {
    fetchData(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.page]);

  useEffect(() => {
    axiosInstance
      .get<GetFilterOptionsResponseDto>(GET_FILTER_OPTIONS_PATH)
      .then((res) => {
        setFilterOptions(res.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchData({ ...filters, page: 1 });
  };

  const handlePageChange = (pageNumber: number) => {
    setFilters({ ...filters, page: pageNumber });
  };

  const placeOrder = (productId: string) => {
    const value = document.querySelector<HTMLSelectElement>(
      `#color-${productId}`
    )?.value;
    if (value)
      axiosInstance
        .post<unknown, unknown, CreateOrderRequestDto>(CREATE_ORDER_PATH, {
          productColorId: value,
        })
        .then(() => alert("Order placed successfully"))
        .catch(() =>
          alert(
            "An error occurred when placing the order. Please try again later."
          )
        );
  };

  return (
    <div className="container homepage">
      <div className="searchbar">
        <div className="searchbar-title">Search Filter</div>
        <div>
          <label htmlFor="name">Product name</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Product Name"
            onChange={handleChange}
            value={filters.name}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <br />
          <select
            id="category"
            name="category"
            onChange={handleChange}
            value={filters.category}
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            {filterOptions.categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="brand">Brand</label>
          <br />
          <select
            id="brand"
            name="brand"
            onChange={handleChange}
            value={filters.brand}
          >
            <option value="" disabled hidden>
              Select Brand
            </option>
            {filterOptions.brands.map((brand) => (
              <option value={brand} key={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="color">Color</label>
          <br />
          <select
            id="color"
            name="color"
            onChange={handleChange}
            value={filters.color}
          >
            <option value="" disabled hidden>
              Select Color
            </option>
            {filterOptions.colors.map((color) => (
              <option value={color} key={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="product-display">
        <div className="product-list">
          {products.map((product) => (
            <div className="card" key={product.productId}>
              <div>{product.productName}</div>
              <div>{product.productPrice}</div>
              <div>
                <label htmlFor={`color-${product.productId}`}>Color</label>
                <select id={`color-${product.productId}`} name="color">
                  {product.productColors.map((color) => (
                    <option
                      value={color.productColorId}
                      key={color.productColorId}
                    >
                      {color.colorName}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => placeOrder(product.productId)}
              >
                Place Order
              </button>
            </div>
          ))}
        </div>
        <PaginationBar
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Homepage;
