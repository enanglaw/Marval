import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CandidateList } from './candidate.model';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  candidateApiURL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  uploadCandidates(formData: any): any {
    console.log(formData.data);
    return this.http.post(this.candidateApiURL + '/Candidate', formData.data);
  }
  getCandidateById(id: number): Observable<CandidateList> {
    return this.http.get<CandidateList>(
      `${this.candidateApiURL}/Candidate/Get/${id}`
    );
  }
  getCandidates(): Observable<CandidateList[]> {
    return this.http.get<CandidateList[]>(`${this.candidateApiURL}/Candidate`);
  }

  editCandidate(id: number, obj: CandidateList) {
    return this.http.put(`${this.candidateApiURL + '/Candidate'}/${id}`, obj);
  }
  deleteCandidate(id: number) {
    return this.http.delete(`${this.candidateApiURL + '/Candidate'}/${id}`);
  }
}
