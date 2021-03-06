import {
  TOGGLE_FILTER,
  SEARCH_GUEST,
  CLEAR_SEARCH,
  ADD_GUEST,
  REMOVE_GUEST,
  UPDATE_GUEST,
  EDIT_GUEST,
  CLEAR_EDIT,
  GET_GUESTS,
  GUEST_ERROR,
  CLEAR_GUEST
} from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case SEARCH_GUEST:
      const reg = new RegExp(`${payload}`, "gi");
      return {
        ...state,
        search: state.guests.filter(guest => guest.name.match(reg))
      };

    case CLEAR_SEARCH:
      return {
        ...state,
        search: null
      };

    case TOGGLE_FILTER:
      return {
        ...state,
        filterGuest: !state.filterGuest
      };

    case GET_GUESTS:
      return {
        ...state,
        guests: payload,
        errors: null
      };

    case ADD_GUEST:
      return {
        ...state,
        guests: [...state.guests, payload]
      };

    case REMOVE_GUEST:
      return {
        ...state,
        guests: state.guests.filter(guest => guest._id !== payload)
      };

    case UPDATE_GUEST:
      return {
        ...state,
        guests: state.guests.map(guest =>
          guest._id === payload._id ? payload : guest
        )
      };

    case EDIT_GUEST:
      return {
        ...state,
        enableEdit: payload
      };

    case CLEAR_EDIT:
      return {
        ...state,
        enableEdit: null
      };

    case GUEST_ERROR:
      return {
        ...state,
        guests: [],
        errors: payload
      };

    case CLEAR_GUEST:
      return {
        ...state,
        guestFilter: false,
        searchGuest: null,
        editGuest: null,
        guests: [],
        error: null
      };

    default:
      return state;
  }
};
