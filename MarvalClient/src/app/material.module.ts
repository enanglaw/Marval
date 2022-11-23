import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BlockUIModule } from 'ng-block-ui';
import { TableModule } from 'primeng/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';

const MODULES = [
  CommonModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatListModule,
  MatNativeDateModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatPaginatorModule,
  MatChipsModule,
  MatDividerModule,
  MatChipsModule,
  MatListModule,
  MatButtonModule,
  MatInputModule,
  MatRadioModule,
  MatIconModule,
  MatChipsModule,
  NgScrollbarModule,
  FlexLayoutModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatTabsModule,
  MatSliderModule,
  MatProgressBarModule,
  MatCardModule,
  TableModule,
  MatSlideToggleModule,
];

@NgModule({
  declarations: [],
  exports: [...MODULES, SweetAlert2Module, BlockUIModule],
  imports: [
    ...MODULES,
    CommonModule,
    SweetAlert2Module.forRoot(),
    BlockUIModule.forRoot(),
  ],
})
export class MaterialModule {}
