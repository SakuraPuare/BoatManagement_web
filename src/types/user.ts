import {components} from "@/api/api";

export type UserSelf = components["schemas"]["UserSelfVO"];

export interface AuthState {
    user: UserSelf | null;
    isLoading: boolean;
    error: string | null;
}
