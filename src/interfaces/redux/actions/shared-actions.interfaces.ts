import { actionTypes } from "@/src/interfaces/redux/action-types";

export type SharedActions =
    | FailureAction
    | IncrementAction
    | DecrementAction
    | ResetAction;

export interface FailureAction {
    type: actionTypes.FAILURE;
    error: unknown;
}

export interface IncrementAction {
    type: actionTypes.INCREMENT;
}

export interface DecrementAction {
    type: actionTypes.DECREMENT;
}

export interface ResetAction {
    type: actionTypes.RESET;
}
