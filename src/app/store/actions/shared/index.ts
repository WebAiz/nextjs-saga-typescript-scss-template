import { actionTypes } from "@/src/interfaces/redux/action-types";
import { DecrementAction, FailureAction, IncrementAction, ResetAction } from "@/src/interfaces/redux/actions/shared-actions.interfaces";

export const failureAction = (error: unknown): FailureAction => ({ type: actionTypes.FAILURE, error });
export const incrementAction = (): IncrementAction => ({ type: actionTypes.INCREMENT });
export const decrementAction = (): DecrementAction => ({ type: actionTypes.DECREMENT });
export const resetAction = (): ResetAction => ({ type: actionTypes.RESET });
