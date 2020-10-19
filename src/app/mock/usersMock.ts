import { Usuario } from '../entidades/usuario'

export class UsersMock {
    users: Usuario[]

    constructor() {
        this.users = JSON.parse(localStorage.getItem("users"))

        if (this.users == null) {
            this.users = [];
        }
    }

    checkIfUserExists(email: String) {
        for (let i of this.users) {
            if (i != undefined) {
                if (i.email == email) {
                    return true
                }
            }
        }

        return false
    }

    addUser(user: Usuario) {
        if(this.checkIfUserExists(user.email)){
            return false
        }else{
            this.users.push(user)

            this.addLocal()
        }
    }

    addLocal() {
        localStorage.setItem("users", JSON.stringify(this.users));
    }
}