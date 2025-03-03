import { Data } from "@angular/router";

export interface AtualizarProduto{
        id:number;
        nome:string;
        quantidade:number;
        valor:number; 
        data:Data;
}