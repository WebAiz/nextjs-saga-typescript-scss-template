import { User } from "@/src/interfaces/data.interfaces";

export interface SharedState {
    count: number;
    error: null | unknown;

}
export interface ExampleState {
    lastUpdate: number;
    light: boolean;
    placeholderData: User[] | null;
    loading: boolean;
    error: null | Error;
}
