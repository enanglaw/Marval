import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CandidateList } from '../candidate.model';
import { CandidateService } from '../candidate.service';
@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss'],
})
export class CandidateDetailComponent implements OnInit {
  @ViewChild('candidateDetailControl')
  candidateDetailControl: ElementRef<HTMLDivElement> | undefined;

  candidateData: CandidateList | any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.candidateData = data.candidateDetail;
    });
  }
  onCancel() {
    this.router.navigate(['auth/candidate/candidate-list']);
  }
}
