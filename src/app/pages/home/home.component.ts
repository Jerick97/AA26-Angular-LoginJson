import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { PermisosService } from 'src/app/services/permisos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users !: Usuarios[]; //declaramos un array utilizando nuestra interface Usuarios
  constructor(private usuariosService:PermisosService) {
    this.getUsuarios(); //llamamos al método traer Usuarios
  }

  ngOnInit(): void {

  }

  Logout(){
    this.usuariosService.logout(); //cerrar sesión
  }

  getUsuarios(){
    //utilizando nuestro método getUsuarios traemos todos los usuarios del Json y lo almacenamos en nuestro Array users
    this.usuariosService.getUsuarios().subscribe(
      (data: Usuarios[]) => {
        this.users = data;
      }
    );
  }
}
