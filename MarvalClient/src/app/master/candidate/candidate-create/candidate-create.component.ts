import { DatePipe } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CandidateService } from '../candidate.service';
import * as XLSX from 'xlsx';
import { CandidateList } from '../candidate.model';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardXlImage } from '@angular/material/card';

@Component({
  selector: 'app-candidate-create',
  templateUrl: './candidate-create.component.html',
  styleUrls: ['./candidate-create.component.scss'],
  providers: [DatePipe],
})
export class CandidateCreateComponent implements OnInit {
  invalidCandidates: Array<CandidateList> = [];
  public ownLoaderIsActive: boolean = false;
  public ownLoaderMsg: string = '';
  public _selectedFileToUpload: File = null as any as File;
  public _uploadedFileData: Array<Array<any>> = [];
  public _fileError: string = '';

  _fileToUpload: string = '';
  @ViewChild('invalidfilePreviewModalTemplate')
  _invalidfilePreviewModalTemplate: TemplateRef<any> = null as any as TemplateRef<any>;
  @ViewChild('filePreviewModalTemplate')
  _filePreviewModalTemplate: TemplateRef<any> = null as any as TemplateRef<any>;
  public filePreviewModal?: MatDialogRef<any>;
  constructor(
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog,
    private _httpClient: HttpClient,
    private _candidateService: CandidateService,
    private router: Router
  ) {}

  ngOnInit() {}

  onFileUploadControlChanged(evt: any) {
    this._uploadedFileData = [];
    this._fileError = '';
    if (!evt.target.files && evt.target.files.length < 1) {
      this._fileError =
        'No file selected. Please select a valid excel of csv file to upload';
      this._snackbar.open(this._fileError, 'Ok', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 5000,
      });
      return;
    }

    if (evt.target.files.length > 1) {
      this._fileError =
        'Multiple file upload is not supported. please select a single file and retry';
      this._snackbar.open(this._fileError, 'Ok', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 5000,
      });
      return;
    }

    this._selectedFileToUpload = evt.target.files[0];

    const fileTypeError = this.validateFileType();
    if (fileTypeError) {
      this._fileError = fileTypeError;
      this._snackbar.open(fileTypeError, 'Ok', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 5000,
      });
      return;
    }
    /**
     * This below is the what handles the reading of the uploaded file
     */
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(this._selectedFileToUpload);
    fileReader.onload = (e: any) => {
      this.validateFileContents(e.target.result);
    };
  }

  onPreviewSelectedFile(): void {
    if (!this._uploadedFileData) {
      return;
    }
    this.filePreviewModal = this._dialog.open(this._filePreviewModalTemplate, {
      hasBackdrop: true,
      disableClose: true,
      panelClass: ['custom-add-confirmationModal'],
    });
  }
  /**
   * This parses the string data from selected file blob and converts to array
   * @param data
   * @returns
   */
  validateFileContents(data: string) {
    const bstr: string = data;
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    this._uploadedFileData = XLSX.utils.sheet_to_json(ws, { header: 1 }); //does the conversion of excel/csl to Array of array.
    if (this._uploadedFileData.length < 1) {
      this._fileError = `Uploaded file is empty. plese fill in required details and retry`;
      this._snackbar.open(this._fileError, 'OK', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 5000,
      });
      return;
    }
    console.log(this._uploadedFileData);
  }

  validateFileType(): string {
    const fileExtension = this._selectedFileToUpload.name
      .toLowerCase()
      .substr(this._selectedFileToUpload.name.lastIndexOf('.'));
    console.log(fileExtension);
    switch (fileExtension) {
      case '.csv':
      case '.xlsx':
      case '.xls':
        return '';
      default:
        return `${this._selectedFileToUpload.name} is a not a valid type. Valid files must either be csv or excel files`;
    }
  }

  onSubmitBulkUpload(form: NgForm) {
    console.log('sent payload: ', this._uploadedFileData);
    const data = this._uploadedFileData?.map((row) =>
      this._mapToCandidate(row)
    );
    this.invalidCandidates = data?.filter(
      (c) => !c.firstName || !c.surname || !c.age || !c.sex || !c.mobile
    );

    if (this.invalidCandidates?.length > 0) {
      this.filePreviewModal = this._dialog.open(
        this._invalidfilePreviewModalTemplate,
        {
          hasBackdrop: true,
          disableClose: true,
          panelClass: ['custom-add-confirmationModal'],
        }
      );
    } else {
      this.uploadValidCandidates();
    }
  }

  uploadValidCandidates() {
    const validCandidates = this._uploadedFileData
      ?.map((row) => this._mapToCandidate(row))
      ?.filter((c) => c.firstName && c.surname && c.age && c.sex && c.mobile);
    this._candidateService
      .uploadCandidates({ data: validCandidates })
      .subscribe(
        (res: any) => {
          Swal.fire(
            'Success',
            'Array of data from uploaded file was sent successfully',
            'success'
          ).then((result) => {
            this.filePreviewModal?.close();
            this.router.navigate(['auth/candidate/candidate-list']);
          });
        },
        (error: any) => {
          this._snackbar.open(
            'failed to send uploaded data .. check logs',
            'OK'
          );
          console.log('failed to send uploaded data ->', error);
        }
      );
  }

  private _mapToCandidate(columns: Array<string>): CandidateList {
    return {
      identity: Number(columns[0]),
      firstName: columns[1],
      surname: columns[2],
      age: columns[3] ? Number(columns[3]) : 0,
      sex: columns[4],
      mobile: columns[5],
      active: columns[6] ? true : false,
    };
  }
}
