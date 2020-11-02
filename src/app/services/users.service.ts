import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/usuario';
import { UsersMock } from '../mock/usersMock';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersMock

  constructor(usersMock: UsersMock) {
    this.usersMock = usersMock 
  }

  checkIfUserExists(email: String) {
    for (let i of this.usersMock.users) {
      if (i != undefined) {
        if (i.email == email) {
          return true
        }
      }
    }

    return false
  }

  addUser(user: Usuario) {
    if (this.checkIfUserExists(user.email)) {
      return false
    } else {
      this.usersMock.users.push(user)

      this.addLocal()
    }
  }

  addLocal() {
    localStorage.setItem("users", JSON.stringify(this.usersMock.users));
  }
}
