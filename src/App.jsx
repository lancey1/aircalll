import React from "react";
import ReactDOM from "react-dom";
import regeneratorRuntime from "regenerator-runtime";
import { Fragment, useEffect, useState } from "react";
import ActivityFeed from "./Activity/ActivityFeed.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CallItem from "./Activity/CallItem.jsx";
import Header from "./Components/Header.jsx";
import NavBar from "./Components/NavBar.jsx";
import "./css/app.css";

const App = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState();
  const URL =
    "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities";
  // fetch data from API endpoint
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(URL);
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setError(error.message);
    }
  };
  if (data === undefined) {
    return <Fragment>Still loading...</Fragment>;
  }
  return (
    <div className="container">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<ActivityFeed fetchData={fetchData} data={data} />} />
          <Route path="/calls/:id" element={<CallItem  fetchData={fetchData}/>} />
        </Routes>
      </div>
      <NavBar />
    </div>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);

export default App;
