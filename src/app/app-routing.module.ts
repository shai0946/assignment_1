import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'process',
    //implementation of lazy loading for Process data
    loadChildren: () => import('./process/process.module').then(m => m.ProcessModule) 
  },
  {
    path: '',
    redirectTo: '/process',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
