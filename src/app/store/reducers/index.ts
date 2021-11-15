import { CombinedState, combineReducers, Reducer } from "redux";
import { HYDRATE }                                 from "next-redux-wrapper";
import { Action }                                  from "@/src/interfaces/redux/actions";
import { CombinedStates }                          from "@/src/interfaces/redux/states";

// importing list of reducers
import { exampleReducer }                          from "./exampleReducer";
import { sharedReducer }                           from "./shared";

export type State = CombinedState<CombinedStates>;

const combinedReducer = combineReducers({
    exampleReducer,
    sharedReducer
});

const reducer: Reducer = (
    state: State,
    action: Action | { type: typeof HYDRATE; payload: State }
) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload // apply delta from hydration
        };
        // NOTE: below should be extended if you want to preserve some states on client side navigation
        if (state?.sharedReducer.count) nextState.sharedReducer.count = state.sharedReducer.count; // preserve count value on client side navigation
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};
export default reducer;
