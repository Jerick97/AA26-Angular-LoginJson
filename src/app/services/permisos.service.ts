
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  baseUrl: string = 'https://jsonplaceholder.typicode.com/users' //Url de la Api
  usuariosList: any[] = []; //almacena el usuarios obtenido por el filtrado
  constructor(private http:HttpClient) { }

  //Método para obtener los Usuarios
  getUsuarios(){
    return this.http.get<any>(`${this.baseUrl}`)//esto nos devuelve la información de los usuarios
  }

  //filtrar usuario por username y por email
  loginUsuario(username:string , email:string){
    return this.http.get<any>(`${this.baseUrl}`)
      .pipe(
        map(usuarios => {
          this.usuariosList = usuarios.filter((usuario:any) => usuario.username === username && usuario.email === email);
          return this.usuariosList;
        })
      );
  }
}
