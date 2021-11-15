import { SharedActions }  from "@/src/interfaces/redux/actions/shared-actions.interfaces";
import { ExampleActions } from "@/src/interfaces/redux/actions/example.interfaces";

export type Action =
    SharedActions | ExampleActions;
