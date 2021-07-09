import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../dbmodels/user';

const headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http: HttpClient) { }
  getLogin():Observable<User[]>{
    return this.http.get<User[]>(`/api/users`)
  }
  getUser(_id: string):Observable<User>{
    //console.log(_id)
    return this.http.get<User>(`/api/user/${_id}`)
  }

  setLogin(user: User):Observable<User>{
    return this.http.put<User>(`/api/login`, user ,{headers: headers});
  }

  setSignup(user: User):Observable<User>{
    return this.http.post<User>(`/api/signup`, user,{headers: headers});
  }

  signout(user: User){
    localStorage.clear()
  }
}
