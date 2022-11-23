import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { AuthComponent } from './auth.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'candidate',
        loadChildren: () =>
          import('../candidate/candidate.module').then(
            (a) => a.CandidateModule
          ),
      },

      { path: '**', redirectTo: 'dashboard-input' },
    ],
  },
];
