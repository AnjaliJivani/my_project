import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import { useSnackbar } from "notistack";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        const message = error.response?.data?.message || "An unexpected error occurred";
        enqueueSnackbar(message, { variant: "error" });
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-md shadow-md">
      <div className="flex justify-center items-center gap-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${showType === "table" ? "bg-sky-600 text-white" : "bg-sky-300 hover:bg-sky-400"}`}
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${showType === "card" ? "bg-sky-600 text-white" : "bg-sky-300 hover:bg-sky-400"}`}
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-gray-800">Books List</h1>
        <Link to="/books/create" className="text-sky-800 text-4xl hover:text-sky-600 transition-colors">
          <MdOutlineAddBox />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
