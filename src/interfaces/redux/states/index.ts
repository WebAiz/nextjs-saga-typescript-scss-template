import { ExampleState, SharedState } from "@/src/interfaces/redux/states/states.interfaces";

export interface CombinedStates {
    exampleReducer: ExampleState;
    sharedReducer: SharedState;
}
