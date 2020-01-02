import React, { useReducer } from "react";
import GuestContext from "./guestContext";
import guestReducer from "./guestReducer";
import { TOGGLE_FILTER, SEARCH_GUEST, CLEAR_SEARCH } from "../types";

const GuestState = props => {
  const initialState = {
    filterGuest: false,
    search: null,
    guests: [
      {
        id: 1,
        name: "Jake Smith",
        phone: "333 444 5555",
        dietary: "Vegan",
        isConfirmed: true
      },
      {
        id: 2,
        name: "Merry Williams",
        phone: "222 777 9999",
        dietary: "Halal",
        isConfirmed: true
      },
      {
        id: 3,
        name: "Joe Fisher",
        phone: "111 222 3333",
        dietary: "Kosher",
        isConfirmed: false
      }
    ]
  };

  const [state, dispatch] = useReducer(guestReducer, initialState);

  const toggleFilter = () => {
    dispatch({
      type: TOGGLE_FILTER
    });
  };

  const searchGuest = guest => {
    dispatch({
      type: SEARCH_GUEST,
      payload: guest
    });
  };

  const clearSearch = () => {
    dispatch({
      type: CLEAR_SEARCH
    });
  };

  return (
    <GuestContext.Provider
      value={{
        guests: state.guests,
        filterGuest: state.filterGuest,
        search: state.search,
        toggleFilter,
        searchGuest,
        clearSearch
      }}
    >
      {props.children}
    </GuestContext.Provider>
  );
};

export default GuestState;
