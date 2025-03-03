import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../interfaces/produto';
import { Observable } from 'rxjs';
import { AtualizarProduto } from '../interfaces/atualizarProduto';
import { RemoverProduto } from '../interfaces/remover-produto';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }
  private readonly API = 'http://localhost:8080/';

  obterQuantiaMaxPorMes():Observable<number[]>{
    return this.http.get<number[]>(this.API+"cadastrar/quantiaMaximaPorMes");
  }

  obterQuantidadeMaxima():Observable<number>{
    return this.http.get<number>(this.API+"cadastrar/quantidadeMaxima");
  }
  deleteEstoque(id:number):Observable<void>{ 
    return this.http.delete<void>(`${this.API}cadastrar/${id}`,{withCredentials: true});
  }
  putEstoque(produto:Produto):Observable<AtualizarProduto>{
    return this.http.put<AtualizarProduto>(this.API+"cadastrar",produto,{withCredentials: true});
  }
  setEstoque(produto:Produto):Observable<Produto>{
  return this.http.post<Produto>(this.API+"cadastrar",produto,{withCredentials: true});
  }
  getEstoque():Observable<AtualizarProduto[]>{
    return this.http.get<AtualizarProduto[]>(this.API+"cadastrar");
  }
  

}
