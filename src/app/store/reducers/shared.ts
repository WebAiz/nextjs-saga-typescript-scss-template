import { HYDRATE }      from "next-redux-wrapper";
import { SharedActions }          from "@/src/interfaces/redux/actions/shared-actions.interfaces";
import { SharedState } from "@/src/interfaces/redux/states/states.interfaces";
import { actionTypes }           from "@/src/interfaces/redux/action-types";

export const exampleInitialState: SharedState = {
    count:           0,
    error:           null,
};

export const sharedReducer = (
    state = exampleInitialState,
    action: SharedActions | { type: typeof HYDRATE; payload: SharedState }
): SharedState => {
    switch (action.type) {
        case actionTypes.FAILURE:
            return {
                ...state,
                ...{ error: action.error }
            };

        case actionTypes.INCREMENT:
            return {
                ...state,
                ...{ count: state.count + 1 }
            };

        case actionTypes.DECREMENT:
            return {
                ...state,
                ...{ count: state.count - 1 }
            };

        case actionTypes.RESET:
            return {
                ...state,
                ...{ count: exampleInitialState.count }
            };
        default:
            return state;
    }
};
