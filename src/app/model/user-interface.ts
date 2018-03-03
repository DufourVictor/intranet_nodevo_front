export interface UserInterface {
    id: number;
    username: string;
    password: string;
    email: string;
    roles: string[];
    enabled: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
}
