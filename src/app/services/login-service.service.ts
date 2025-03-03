import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private readonly API='http://localhost:8080/login';
  constructor(private http:HttpClient) { 
  }
  enviarLogin(login:Login):Observable<string>{
      return this.http.post<string>(this.API,login,{ withCredentials: true });
  }
  receberMensagem():Observable<string>{
    return this.http.get<string>(this.API);
  }
}
