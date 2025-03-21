export declare function isTokenReady(): Promise<void>;
export declare function getKeycloak(): Keycloak.KeycloakInstance;
export declare function getToken(): Promise<string>;
export declare function isLoggedIn(): Promise<boolean>;
export declare function updateToken(): Promise<string>;
export declare function createKeycloak(config: Keycloak.KeycloakConfig | string): Keycloak.KeycloakInstance;
export declare function initKeycloak(initConfig: Keycloak.KeycloakInitOptions): Promise<void>;
