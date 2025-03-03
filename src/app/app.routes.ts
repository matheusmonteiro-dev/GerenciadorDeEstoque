import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { InicialComponent } from './paginas/inicial/inicial.component';


export const routes: Routes = [{path:"login", component:LoginComponent},
    {
        path:"pagina-inicial",
        component:InicialComponent
    },
    { 
        path:'', 
        redirectTo:"/login", 
        pathMatch:'full'
    }];
