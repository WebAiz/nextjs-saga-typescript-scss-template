import { actionTypes }    from "@/src/interfaces/redux/action-types";
import { Example, User } from "@/src/interfaces/data.interfaces";

export type ExampleActions =
    | LoadDataComplexAction
    | LoadDataComplexSuccessAction
    | PostExampleAction
    | PostExampleSuccessAction
    | StartClockAction
    | TickClockAction
    | LoadDataAction
    | LoadDataSuccessAction;

export interface LoadDataAction {
    type: actionTypes.LOAD_DATA;
}

export interface LoadDataSuccessAction {
    type: actionTypes.LOAD_DATA_SUCCESS;
    payload: User[];
}

export interface StartClockAction {
    type: actionTypes.START_CLOCK;
}

export interface TickClockAction {
    type: actionTypes.TICK_CLOCK;
    light: boolean;
    ts: number;
}

export interface LoadDataComplexAction {
    type: actionTypes.LOAD_DATA_COMPLEX;
}

export interface LoadDataComplexSuccessAction {
    type: actionTypes.LOAD_DATA_COMPLEX_SUCCESS;
    payload: User[];
}

export interface PostExampleAction {
    type: actionTypes.POST_EXAMPLE;
    payload: Example;
}

export interface PostExampleSuccessAction {
    type: actionTypes.POST_EXAMPLE_SUCCESS;
    payload: Example;
}
