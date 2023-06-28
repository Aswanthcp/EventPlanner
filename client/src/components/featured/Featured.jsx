import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import { getCategory } from "../../utils/Constants";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Featured = () => {
  const token = useSelector((state) => state.token);
  const [pagination, setPagination] = useState([]);
  const handleError = (error) => {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "Network error. Please try again later.";
    toast.error(errorMessage, {
      position: "top-right",
    });
  };

  const getCategoryList = () => {
    axios
      .get(getCategory, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setPagination(data);
      })
      .catch(handleError);
  };
  useEffect(() => {
    getCategoryList();
  }, []);
  return (
    <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3">
      {pagination.length > 0 ? (
        pagination.map((row) => (
          <div className="relative aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[300px]">
            <img
              src={row?.imageUrl}
              alt="AirMax Pro"
              className="z-0 h-full w-full rounded-md object-cover"
            />
            <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-left">
              <h1 className="text-lg font-semibold text-white">{row?.name}</h1>
              <p className="mt-2 text-sm text-gray-300">{row.description}</p>
              <Link to="/eventlist">
                <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
                  Shop Now &rarr;
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Featured;
