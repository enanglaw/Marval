import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CandidateList } from '../candidate.model';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-candidate-edit',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.scss'],
  providers: [DatePipe],
})
export class CandidateEditComponent implements OnInit {
  model: CandidateList | any;
  candidateModel: CandidateList | any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    public datePipe: DatePipe,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.candidateModel = data.candidateDetail;
      this.model = data.candidateDetail;
    });
  }
  onSaveChanges(data: any) {
    this.candidateService.editCandidate(data.identity, data).subscribe(
      () => {
        Swal.fire('Success', 'candidate updated successfully', 'success').then(
          (result) => {
            this.router.navigate(['/auth/candidate/candidate-list']);
          }
        );
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Some Error Occured', 'error').then((result) => {
          //this.router.navigate(['/auth/leaders/list']);
        });
      }
    );
  }
}
