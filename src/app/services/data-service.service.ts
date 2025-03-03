import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private dataSubject = new BehaviorSubject<boolean>(false);
  data$ = this.dataSubject.asObservable();
  
  private visualizar= new BehaviorSubject<boolean>(false);
  visualizar$=this.visualizar.asObservable();

  private botaoAtualizar= new BehaviorSubject<boolean>(false);
  atualizar$=this.botaoAtualizar.asObservable();

  private botaoRemover= new BehaviorSubject<boolean>(false);
  remover$=this.botaoRemover.asObservable();
  
  remover(){
    this.botaoRemover.next(true);
  }

  atualizar(){
    this.botaoAtualizar.next(true);
  }
  setData() {
    this.dataSubject.next(true);
  }
  botaoVisuAlizar(){
    this.visualizar.next(true);
    
    console.log(this.visualizar.value)
  }
  
}
