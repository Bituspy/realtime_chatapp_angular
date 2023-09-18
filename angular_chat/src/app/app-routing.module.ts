import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatappComponent } from './chatapp/chatapp.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'chat', component: ChatappComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
