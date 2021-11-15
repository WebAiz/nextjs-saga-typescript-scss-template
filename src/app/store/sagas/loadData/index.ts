import { call, delay, put, take }                                                   from "redux-saga/effects";
import { User }                                                                                           from "@/src/interfaces/data.interfaces";
import axios, { AxiosResponse }                                                                           from "axios";
import requestApi                                                                                         from "@/src/request-service";
import { loadDataComplexSuccessAction, loadDataSuccessAction, postExampleSuccessAction, tickClockAction } from "@/store/actions/example";
import { failureAction }                                                                                  from "@/store/actions/shared";
import { actionTypes }                                                                                    from "@/src/interfaces/redux/action-types";
import { PostExampleAction }                                                                              from "@/src/interfaces/redux/actions/example.interfaces";

// saga handlers
export function* runClockSaga(): Generator<unknown, void> {
    // TODO correct the saga type
    yield take(actionTypes.START_CLOCK);
    while (true) {
        yield put(tickClockAction(false));
        yield delay(1000);
    }
}

export function* loadDataSaga(): Generator<unknown, void, AxiosResponse> {
    try {
        //call(fn, ...args)
        const { status, data }: AxiosResponse<User[]> = yield call(
            axios.get,
            "https://jsonplaceholder.typicode.com/users"
        );

        if (status === 200) {
            yield put(loadDataSuccessAction(data));
        }
    } catch (err) {
        yield put(failureAction(err));
    }
}

export function* loadDataSagaComplex(): Generator<unknown, void, User[]> {
    try {
        // TODO correct the saga type
        const response: User[] = yield call(requestApi.GET, "/users", null, (error) => console.log(error));
        yield put(loadDataComplexSuccessAction(response));
    } catch (err) {
        yield put(failureAction(err));
    }
}

export function* postSagaExample(action: PostExampleAction): Generator<unknown, void> {
    try {
        yield put(postExampleSuccessAction(action.payload));
    } catch (err) {
        yield put(failureAction(err));
    }
}
