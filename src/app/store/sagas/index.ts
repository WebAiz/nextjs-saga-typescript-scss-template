import { all, call, takeLatest } from "redux-saga/effects";
import { actionTypes } from "@/src/interfaces/redux/action-types";
import { loadDataSagaComplex, postSagaExample, runClockSaga } from "../../store/sagas/loadData";

// saga watchers
function* rootSaga(): Generator {
    yield all(
        [
            call(runClockSaga),
            takeLatest(actionTypes.LOAD_DATA_COMPLEX, loadDataSagaComplex),
            takeLatest(actionTypes.POST_EXAMPLE, postSagaExample)
        ]);
}

export default rootSaga;
