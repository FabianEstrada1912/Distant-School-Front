import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfiguracionComponent } from './pagesUser/configuracion/configuracion.component';
import { EditUserComponent } from './pagesUser/edit-user/edit-user.component';
import { SolicitarComponent } from './pagesUser/solicitar/solicitar.component';
import { ChatComponent } from './pagesUser/chat/chat.component';
import { PerfilComponent } from './pagesUser/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfiguracionComponent,
    EditUserComponent,
    SolicitarComponent,
    ChatComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
