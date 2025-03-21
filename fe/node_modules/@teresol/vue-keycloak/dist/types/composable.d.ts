import { KeycloakInstance } from 'keycloak-js';
import { Ref } from 'vue';
export interface KeycloakComposable {
    isAuthenticated: Ref<boolean>;
    hasFailed: Ref<boolean>;
    isPending: Ref<boolean>;
    token: Ref<string>;
    username: Ref<string>;
    roles: Ref<string[]>;
    resourceRoles: Ref<Record<string, string[]>>;
    keycloak: KeycloakInstance;
    hasRoles: (roles: string[]) => boolean;
    hasResourceRoles: (roles: string[], resource: string) => boolean;
}
export declare const useKeycloak: () => KeycloakComposable;
