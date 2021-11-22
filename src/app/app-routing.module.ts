import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './pagesUser/chat/chat.component';
import { ConfiguracionComponent } from './pagesUser/configuracion/configuracion.component';
import { EditUserComponent } from './pagesUser/edit-user/edit-user.component';
import { PerfilComponent } from './pagesUser/perfil/perfil.component';
import { SolicitarComponent } from './pagesUser/solicitar/solicitar.component';

import { AuthguardGuard } from './authguard.guard';

const routes: Routes = [
  {
    path:'configuracion',
    component:ConfiguracionComponent,
    canActivate: [AuthguardGuard],
    children :[
      {
        path:'',
        component:PerfilComponent,
        canActivate: [AuthguardGuard],
      },{
        path:'editarUsuario',
        component:EditUserComponent,
        canActivate: [AuthguardGuard],
      },{
        path:'aceptacionAmigos',
        component:SolicitarComponent,
        canActivate: [AuthguardGuard],
      },{
        path:'creacion-grupos',
        component:ChatComponent,
        canActivate: [AuthguardGuard],
      }
    ],
  },{
     path:'busqueda',
     component:BusquedaComponent,
     canActivate: [AuthguardGuard],
  },{
    path:'Dashboard',
    component:DashboardComponent,
    canActivate: [AuthguardGuard],
  },{
    path:'',
    component:LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
