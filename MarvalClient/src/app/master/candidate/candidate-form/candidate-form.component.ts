import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CandidateList } from '../candidate.model';
import { CandidateService } from '../candidate.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss'],
})
export class CandidateFormComponent implements OnInit {
  @Input() model: CandidateList | any;
  @Input() heading: any;
  @Output() onSaveChanges: EventEmitter<any> = new EventEmitter<any>();

  isFormLoded: boolean = false;
  showLoading: boolean = false;
  form: FormGroup | any;
  count: number = 0;
  progress = 0;

  constructor(
    private formBuilder: FormBuilder,
    private candidateService: CandidateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inItForm();
  }

  get f() {
    return this.form.controls;
  }

  inItForm() {
    this.form = this.formBuilder.group({
      identity: 0,
      firstName: ['', { validators: [Validators.required] }],
      surname: ['', { validators: [Validators.required] }],
      sex: ['', { validators: [Validators.required, Validators.maxLength(1)] }],
      mobile: ['', { validators: [Validators.required] }],
      age: ['', { validators: [Validators.required] }],
      active: ['', { validators: [Validators.required] }],
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }

    this.isFormLoded = true;
  }

  saveChanges() {
    if (this.form.valid) {
      const body = this.form.value;
      this.onSaveChanges.emit(body);
    }
  }

  onCancel() {
    this.router.navigate(['auth/candidate/candidate-list']);
  }
}
