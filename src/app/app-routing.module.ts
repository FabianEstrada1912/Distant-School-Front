import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pagesUser/chat/chat.component';
import { ConfiguracionComponent } from './pagesUser/configuracion/configuracion.component';
import { EditUserComponent } from './pagesUser/edit-user/edit-user.component';
import { PerfilComponent } from './pagesUser/perfil/perfil.component';
import { SolicitarComponent } from './pagesUser/solicitar/solicitar.component';

const routes: Routes = [
  {
    path:'configuracion',
    component:ConfiguracionComponent,
    children :[
      {
        path:'',
        component:PerfilComponent,
      },{
        path:'editarUsuario',
        component:EditUserComponent,
      },{
        path:'aceptacionAmigos',
        component:SolicitarComponent,
      },{
        path:'creacion-grupos',
        component:ChatComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
