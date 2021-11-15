import { HYDRATE }        from "next-redux-wrapper";
import { ExampleState }   from "@/src/interfaces/redux/states/states.interfaces";
import { actionTypes }    from "@/src/interfaces/redux/action-types";
import { ExampleActions } from "@/src/interfaces/redux/actions/example.interfaces";

export const exampleInitialState: ExampleState = {
  lastUpdate:      0,
  light:           false,
  placeholderData: null,
  loading: true,
  error:           null,
};

export const exampleReducer = (
  state = exampleInitialState,
  action: ExampleActions | { type: typeof HYDRATE; payload: ExampleState }
): ExampleState => {
  switch (action.type) {
    case actionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{ placeholderData: action.payload, loading:false }
      };

    case actionTypes.TICK_CLOCK:
      return {
        ...state,
        ...{ lastUpdate: action.ts, light: !!action.light }
      };
    case actionTypes.LOAD_DATA:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOAD_DATA_COMPLEX:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOAD_DATA_COMPLEX_SUCCESS:
      return {
        ...state,
        ...{ placeholderData: action.payload, loading:false }
      };
    default:
      return state;
  }
};
