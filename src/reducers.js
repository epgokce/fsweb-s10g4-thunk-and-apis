import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: false,
};

function writeFavsToLocalStorage(favs) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      return state;
      state = {
        ...state,
        favs: [...state.favs, action.payload],
      };
      writeFavsToLocalStorage(state.favs);

    case FAV_REMOVE:
      return state;
      state = {
        ...state,
        favs: state.favs.filter((item) => item.activity !== action.payload),
      };
      writeFavsToLocalStorage(state.favs);

    case FETCH_SUCCESS:
      return state;
      return {
        ...state,
        current: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_LOADING:
      return state;
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ERROR:
      return state;
      return {
        ...state,
        error: action.payload,
      };

    case GET_FAVS_FROM_LS:
      return state;
      return {
        ...state,
        favs: readFavsFromLocalStorage(),
      };

    default:
      return state;
  }
}
