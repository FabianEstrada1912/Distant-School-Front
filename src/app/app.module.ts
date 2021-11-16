import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfiguracionComponent } from './pagesUser/configuracion/configuracion.component';
import { EditUserComponent } from './pagesUser/edit-user/edit-user.component';
import { SolicitarComponent } from './pagesUser/solicitar/solicitar.component';
import { ChatComponent } from './pagesUser/chat/chat.component';
import { PerfilComponent } from './pagesUser/perfil/perfil.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ConfiguracionComponent,
    EditUserComponent,
    SolicitarComponent,
    ChatComponent,
    PerfilComponent,
    BusquedaComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
