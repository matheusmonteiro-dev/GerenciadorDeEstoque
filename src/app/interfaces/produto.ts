import { Data } from "@angular/router";

export interface Produto {
    nome:string;
    quantidade:number;
    valor:number; 
    data:Data;
}
