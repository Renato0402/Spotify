import { Component, OnInit } from '@angular/core'
import { Playlist } from '../entidades/playlist'
import { Usuario } from '../entidades/usuario'

export class UsersMock {
    users: Usuario[]

    constructor() {
        this.users = []
    }

    addLocal() {
        var aux = JSON.parse(localStorage.getItem("users"));

        if (aux == null) {
            aux = [];
        }

        // A TERMINAR
        for (let user of this.users) {
            /*if (aux.get(user) == null) {
                aux.push(user);
            }*/
        }

        localStorage.setItem("users", JSON.stringify(aux));
    }
}