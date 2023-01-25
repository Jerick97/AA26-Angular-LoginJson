
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Usuarios } from '../interfaces/usuarios';


@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  baseUrl: string = 'https://jsonplaceholder.typicode.com/users' //Url de la Api
  usuariosList: any[] = []; //almacena el usuarios obtenido por el filtrado
  private isLogin!:boolean; //validara si el usuario inicio Sesión

  constructor(private http:HttpClient, private router:Router) { }

  //Método para obtener los Usuarios
  getUsuarios(){
    return this.http.get<Usuarios[]>(`${this.baseUrl}`)//esto nos devuelve la información de los usuarios
  }

  //filtrar usuario por username y por email
  loginUsuario(username:string , email:string){
    return this.http.get<any>(`${this.baseUrl}`)
      .pipe(
        map(usuarios => {
          this.usuariosList = usuarios.filter((usuario:any) => usuario.username === username && usuario.email === email);
          //solo si se encontró un usuario con esas credenciales se asigna true a la variable isLogin
          if(this.usuariosList.length > 0){
            this.isLogin = true;
          }
          return this.usuariosList;
        })
      );
  }

  //si el usuario cierra sesión redireccionar al Login
  logout() {
    this.isLogin = false;
    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
