export interface KeycloakState<T = unknown> {
    isAuthenticated: boolean;
    hasFailed: boolean;
    isPending: boolean;
    token: string;
    decodedToken: T;
    username: string;
    roles: string[];
    resourceRoles: Record<string, string[]>;
}
export declare const state: {
    isAuthenticated: boolean;
    hasFailed: boolean;
    isPending: boolean;
    token: string;
    decodedToken: unknown;
    username: string;
    roles: string[];
    resourceRoles: Record<string, string[]>;
};
export declare const setToken: (token: string) => void;
export declare const hasFailed: (value: boolean) => void;
export declare const isPending: (value: boolean) => void;
export declare const isAuthenticated: (value: boolean) => void;
