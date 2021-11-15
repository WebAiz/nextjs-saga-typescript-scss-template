import React                           from "react";
import { useSelector, useDispatch }                      from "react-redux";
import { decrementAction, incrementAction, resetAction } from "@/store/actions/shared";
import { State }                                         from "@/store/reducers";
import styles from './counter.module.scss'

const Counter: React.FC = () => {
    const count = useSelector((state: State): number => state.sharedReducer.count);
    const dispatch = useDispatch();

    const onIncrement = (): void => {
        dispatch(incrementAction());
    };

    const onDecrement = (): void => {
        dispatch(decrementAction());
    };

    const onReset = (): void => {
        dispatch(resetAction());
    };

    return (
        <div className="counter">
            <style jsx>{`
              div {
                padding: 0 0 20px 0;
              }
            `}</style>
            <h1>
                Count: <span>{count}</span>
            </h1>
            <button onClick={onIncrement}>+1</button>
            <button onClick={onDecrement}>-1</button>
            <button onClick={onReset}>Reset</button>
        </div>
    );
};

export default Counter;
