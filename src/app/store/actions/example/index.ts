import { actionTypes }                                                                                                                                                                               from "@/src/interfaces/redux/action-types";
import { Example, User }                                                                                                                                                                   from "@/src/interfaces/data.interfaces";
import { LoadDataAction, LoadDataComplexAction, LoadDataComplexSuccessAction, LoadDataSuccessAction, PostExampleAction, PostExampleSuccessAction, StartClockAction, TickClockAction } from "@/src/interfaces/redux/actions/example.interfaces";

export const startClockAction = (): StartClockAction => ({ type: actionTypes.START_CLOCK });
export const tickClockAction = (isServer: boolean): TickClockAction => ({ type: actionTypes.TICK_CLOCK, light: !isServer, ts: Date.now() });

export const loadDataAction = (): LoadDataAction => ({ type: actionTypes.LOAD_DATA });
export const loadDataSuccessAction = (payload: User[]): LoadDataSuccessAction => ({ type: actionTypes.LOAD_DATA_SUCCESS, payload });

export const loadDataComplexAction = (): LoadDataComplexAction => ({ type: actionTypes.LOAD_DATA_COMPLEX });
export const loadDataComplexSuccessAction = (payload: User[]): LoadDataComplexSuccessAction => ({ type: actionTypes.LOAD_DATA_COMPLEX_SUCCESS, payload });

export const postExampleAction = (payload: Example): PostExampleAction => ({ type: actionTypes.POST_EXAMPLE, payload });
export const postExampleSuccessAction = (payload: Example): PostExampleSuccessAction => ({ type: actionTypes.POST_EXAMPLE_SUCCESS, payload });
