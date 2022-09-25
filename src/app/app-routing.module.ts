import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndexComponent } from './components/index/index.component';
import { InfoComponent } from './components/info/info.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'nav', component: NavComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'info', component: InfoComponent },
  { path: 'create', component: CreateComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
