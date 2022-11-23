import { HttpEventType } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CandidateList } from '../candidate.model';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent implements OnInit {
  serverUrl = environment.ServerUrl;
  showProgressBar: boolean | any;
  errors: string[] = [];
  resultsLength!: number;
  pageSize = 5;
  isOpen: boolean = false;
  candidateData: MatTableDataSource<CandidateList> | any;
  @ViewChild('paginator') paginator: MatPaginator | any;
  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isOpen = false;
    }
  }
  columnsToDisplay: string[] = [
    'SlNo',
    'firstName',
    'surname',
    'mobile',
    'actions',
  ];

  constructor(
    private elementRef: ElementRef,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.showProgressBar = true;
    this.candidateService.getCandidates().subscribe(
      (data) => {
        this.candidateData = new MatTableDataSource(data);
        this.candidateData.paginator = this.paginator;
        this.resultsLength = this.candidateData.data.length;
        this.showProgressBar = false;
      },
      (error) => {
        console.log(error);
        this.candidateData = new MatTableDataSource();
        this.candidateData.paginator = this.paginator;
        this.resultsLength = this.candidateData.data.length;
        this.showProgressBar = false;
      }
    );
  }

  delete(id: number) {
    this.candidateService.deleteCandidate(id).subscribe(
      (a) => {
        Swal.fire('Success', 'candidate deleted successfully', 'success').then(
          (result) => {
            this.getAll();
          }
        );
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Some Error Occured', 'error').then((result) => {});
      }
    );
  }
}
