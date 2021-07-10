import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignedInComponent } from './pages/signed-in/signed-in.component';
import { AuthService } from './services/auth.service'
import { DragboardComponent } from './tools/dragboard/dragboard.component';
const routes: Routes = [
  { path: '', redirectTo: 'home/login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, children: [
    {path: 'login', component: LoginComponent, },
    { path: 'user/:id', component: SignedInComponent, canActivate:[AuthService], children:[
      {path: 'game', component: DragboardComponent},
      
    ]},
  ]},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
