import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateEditComponent } from './candidate-edit/candidate-edit.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { CandidateCreateComponent } from './candidate-create/candidate-create.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';
import { CandidateResolver } from './candidate.resolver';
import { RouterModule, Routes } from '@angular/router';
import { MasterModule } from '../master.module';

const routes: Routes = [
  {
    path: 'candidate-list', component: CandidateListComponent
  }, 
  {
    path: 'candidate-create', component: CandidateCreateComponent
  },
  {
    path: 'candidate-edit/:id', component: CandidateEditComponent,
    resolve: { candidateDetail: CandidateResolver }
  },
  {
    path: 'candidate-detail/:id', component: CandidateDetailComponent,
    resolve: { candidateDetail: CandidateResolver }
  }
]

const MODULES = [
  RouterModule.forChild(routes),
  CommonModule,
  MasterModule
];

@NgModule({
  declarations: [
    CandidateListComponent,
    CandidateEditComponent,
    CandidateFormComponent,
    CandidateCreateComponent,
    CandidateDetailComponent
  ],
  imports: [
    ...MODULES
    ],
})
export class CandidateModule { }
