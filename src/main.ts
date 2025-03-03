import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'
import { InicialComponent } from './app/paginas/inicial/inicial.component';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { LoginComponent } from "./app/paginas/login/login.component";
import { provideRouter, RouterModule } from '@angular/router';





bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  