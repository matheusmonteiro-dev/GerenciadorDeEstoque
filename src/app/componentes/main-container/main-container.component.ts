import { Component } from '@angular/core';
import { InicialComponent } from "../../paginas/inicial/inicial.component";
import { DataServiceService } from '../../services/data-service.service';
import { BackendService } from '../../services/backend.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.css'
})
export class MainContainerComponent {
  botao:boolean=false;
  
  constructor(private dataService:DataServiceService,private backendService:BackendService){

  }
  removerEstoqueBotao(){
    this.dataService.remover();
    console.log("remover");
  }
  
  atualizarEstoqueBotao(){
    this.dataService.atualizar();
    console.log("atualizar")
  }
  
  obterEstoque(){
    this.dataService.botaoVisuAlizar();
    console.log("visualizar");
    
  }
  teste(){
    this.dataService.setData();
    console.log("teste")
  }

}
