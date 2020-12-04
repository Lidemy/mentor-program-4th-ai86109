/* eslint-disable */
import { CHANGE_FILTER } from "../actionType";

const initialState = {
  filter: 'all'
}

export default function filtersReducer(state = initialState, action) {
  switch(action.type) {
    case CHANGE_FILTER: {
      return {
        ...state,
        filter: action.payload.filter,
      }
    }
    default: {
      return state
    }
  }
}