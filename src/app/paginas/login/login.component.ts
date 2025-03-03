import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from "../../componentes/container/container.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { LoginServiceService } from '../../services/login-service.service';
import { Login } from '../../interfaces/login';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ContainerComponent,ReactiveFormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  usuario!:Login;
  token!:string;

  constructor(private service:LoginServiceService,private router :Router){}
  loginForm!:FormGroup
    ngOnInit(): void {
        this.loginForm=new FormGroup({
        email:new FormControl(''),
        senha:new FormControl('')
    });
  }
    login(){
      this.usuario={email:this.loginForm.get('email')?.value,
      senha:this.loginForm.get('senha')?.value}
      console.log(this.usuario);
      this.service.enviarLogin(this.usuario).subscribe(()=>{
        this.router.navigate(['/pagina-inicial']);
      });
  }
}
