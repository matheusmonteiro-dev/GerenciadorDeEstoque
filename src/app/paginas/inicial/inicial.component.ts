import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Produto } from '../../interfaces/produto';
import { MainContainerComponent } from "../../componentes/main-container/main-container.component";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataServiceService } from '../../services/data-service.service';
import { Chart, ChartModule } from 'angular-highcharts';
import { AtualizarProduto } from '../../interfaces/atualizarProduto';


@Component({
  selector: 'app-inicial',
  standalone: true,
  imports: [ReactiveFormsModule, MainContainerComponent,CommonModule,ChartModule],
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('100ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ],
})
export class InicialComponent implements OnInit{
  showForm:boolean = false;
  estoquePronto:boolean=false;
  formAtualizar:boolean=false;
  formRemove:boolean=false;

  quantiadeMaxima!:number;
  listaEstoque:AtualizarProduto[]=[];
  lista:number[]=[];
  chart!:Chart;
  produtosForm!:FormGroup;
  
  produtos!:Produto;
  atualizarProduto!:AtualizarProduto;
  
  constructor(private dataService:DataServiceService, 
    private service:BackendService){
      
  }
  ngOnInit(): void {
    this.obterQuantidadeMaximadeAlimentosPorMes();
    this.obterQuantidadeMaximaAlimentos();
    this.obterEstoque();
    this.exibirFormularioDelete();
    this.exibirFormulario();
    this.exibirFormularioPut();
    this.produtosForm=new FormGroup({
    id:new FormControl(''),
    nome: new FormControl(''),
    quantidade: new FormControl(''),
    valor:new FormControl(''),
    data:new FormControl(''),
  }); 
  //this.lista=this.dashBoard();
  console.log(this.showForm+"a");  
  this.showForm=true;
}
  
  dashBoard(lista:number[]){
    this.chart= new Chart({
      chart:{type: 'line'},
      title:{text: 'Quantia máxima armazenada por mês'},
      xAxis:{categories:['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']},
      yAxis:{title:{text:'Quantia estocada'}},
      series:[{name:'Armazenado',type:'line',color:'blue',data:[lista[0],lista[1],lista[2],lista[3],lista[4],lista[5],lista[6],
        lista[7],lista[8],lista[9],lista[10],lista[11]]}]
      
    });
  }
  obterQuantidadeMaximadeAlimentosPorMes(){
    this.service.obterQuantiaMaxPorMes().subscribe((quantia)=>{ 
      this.dashBoard(quantia);
      console.log(quantia)
    });
  }

  obterQuantidadeMaximaAlimentos(){
    this.service.obterQuantidadeMaxima().subscribe((quantidade)=>{
      this.quantiadeMaxima=quantidade;
      console.log(quantidade);
    });
  }
  
  removerEstoque(){
    console.log(this.produtosForm.get('id')?.value);
    this.service.deleteEstoque(this.produtosForm.get('id')?.value).subscribe(()=>{
      this.obterEstoque();
      this.obterQuantidadeMaximaAlimentos();
      this.produtosForm.reset();
    });
  }
  atualizarEstoque(){
    this.atualizarProduto={id:this.produtosForm.get('id')?.value,nome:this.produtosForm.get('nome')?.value,
      quantidade:parseInt(this.produtosForm.get('quantidade')?.value),
      valor:parseFloat(this.produtosForm.get('valor')?.value),
      data:this.produtosForm.get('Id')?.value
  }
  console.log(this.produtosForm.get('nome')?.value);
  this.service.putEstoque(this.atualizarProduto).subscribe(()=>{
    this.obterEstoque();
    this.obterQuantidadeMaximaAlimentos();
    this.obterQuantidadeMaximadeAlimentosPorMes();
    this.produtosForm.reset();
  });
}

  // obterQuantia(){
  //   let minhaLista:number[]=[]
  //   for(let i=0; i<this.listaEstoque.length;i++){
  //       minhaLista[i]=this.listaEstoque[i].quantidade
  //   }
  //   return minhaLista;
  //}
  exibirFormularioDelete(){
    this.dataService.remover$.subscribe((botaoRemover)=>{
      this.formAtualizar=false;
      this.showForm=false;
      this.formRemove=botaoRemover;
     
      console.log(this.formRemove);
    })
  }
  exibirFormularioPut(){
    this.dataService.atualizar$.subscribe((botaoAtualizar)=>{
        this.showForm=false;
        this.formRemove=false;
        this.formAtualizar=botaoAtualizar;
        
        console.log(this.formAtualizar);
      })
  }
  exibirFormulario(){
    this.dataService.data$.subscribe((botaoTrue)=>{
    this.formAtualizar=false;
    this.formRemove=false;
    this.showForm=botaoTrue;
    
    console.log(this.showForm);
  })
  }
  obterEstoque(){
    this.service.getEstoque().subscribe((estoque)=>{
          this.listaEstoque=estoque;
    });
  }

  enviarProduto(){
    this.produtos={nome:this.produtosForm.get('nome')?.value,
      quantidade:parseFloat(this.produtosForm.get('quantidade')?.value),
      valor:parseFloat(this.produtosForm.get('valor')?.value),
      data:this.produtosForm.get('data')?.value
    }
    console.log(this.produtos);
    this.service.setEstoque(this.produtos).subscribe(()=>{
      this.obterEstoque();
      this.obterQuantidadeMaximaAlimentos();
      this.obterQuantidadeMaximadeAlimentosPorMes();
      this.produtosForm.reset();
    });
    
  
  }
}
