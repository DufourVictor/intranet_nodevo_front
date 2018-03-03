export class Users {
    id: number;
    username: string;
    email: string;
    roles = [];
    enabled: boolean;

    constructor(id, username, email, roles, enabled) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.enabled = enabled;
    }
}
