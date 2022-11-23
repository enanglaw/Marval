import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CandidateList } from './candidate.model';
import { CandidateService } from './candidate.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateResolver implements Resolve<CandidateList> {
  constructor(private candidateService: CandidateService) {
    
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CandidateList | Observable<CandidateList> | Promise<CandidateList> {
    let id = route.paramMap.get('id');
    if (id === null)
      id = '0';
    return this.candidateService.getCandidateById(+id);
  }
    
  
}