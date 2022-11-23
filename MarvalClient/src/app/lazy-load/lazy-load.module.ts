
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../master/auth/auth.module').then((m) => m.AuthModule),
  },
   {
    path: 'dashboard',
   loadChildren: () => import('../master/auth/auth.module').then((m) => m.AuthModule),
  },
  
  
 
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class LazyLoadModule {}