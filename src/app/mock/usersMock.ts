import { Usuario } from '../entidades/usuario'

export class UsersMock {
    users: Usuario[]

    constructor() {
        this.users = JSON.parse(localStorage.getItem("users"))

        if (this.users == null) {
            this.users = [];
        }
    }
}