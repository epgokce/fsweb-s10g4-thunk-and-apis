import React, { useEffect } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Item from "./components/Item";
import FavItem from "./components/FavItem";
import { useDispatch, useSelector } from "react-redux";
import {
  addFav,
  fetchAnother,
  getFavsFromLocalStorage,
  removeFav,
} from "./actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const API = "https://www.boredapi.com/api/activity";

export default function App() {
  const loading = useSelector((store) => store.loading);
  const current = useSelector((store) => store.current);
  const favs = useSelector((store) => store.favs);
  const error = useSelector((store) => store.error);

  function addToFavs() {
    dispatch(addFav(current));
    toast.success("Film favorilere eklendi", {
      onClose: () => dispatch(fetchAnother()),
    });
  }

  function deleteFav(title) {
    dispatch(removeFav(title));
  }
  const dispatch = useDispatch();

  const fetchHandler = () => {
    dispatch(fetchAnother());
  };

  useEffect(() => {
    dispatch(fetchAnother());
    dispatch(getFavsFromLocalStorage());
  }, [dispatch]);


  return (
    <div className="wrapper max-w-xl mx-auto px-4">
      <ToastContainer
        autoClose={2000}
        pauseOnFocusLoss
        draggable
        pauseOnHover= {false}
        theme="colored"
      />
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {loading && (<div className="bg-white p-6 text-center shadow-md">YÜKLENİYOR</div>)}{error && (
            <div className="bg-white p-6 text-center shadow-md text-2xl text-blue-800">
              {error}!
            </div>
          )}
          {current && <Item data={current} />}

          <div className="flex gap-3 justify-end py-3">
            <button
            onClick={fetchHandler}
              className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
            >
              Başka bir tane
            </button>
            <button
              onClick={addToFavs}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
            >
              Favorilere ekle
            </button>
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            {favs.length > 0
              ? ( favs.map((item) => (
                <FavItem key={item.key} id={item.key} activity={item.activity}
                deleteFav={deleteFav} />
              ))
              ) : (<div className="bg-white p-6 text-center shadow-md">Henüz bir favoriniz yok</div>
            )}
          </div>
        </Route>
      </Switch>
    </div>
  );
}
