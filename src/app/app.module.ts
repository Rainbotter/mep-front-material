import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MepComponent } from './pages/mep/mep.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule,
  MatSnackBarModule
} from '@angular/material';
import { MepsComponent } from './pages/meps/meps.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { HttpClientModule } from '@angular/common/http';
import { TemplateComponent } from './pages/template/template.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MepCreationModalComponent } from './components/modals/mep-creation-modal/mep-creation-modal.component';
import { ApiCreationModalComponent } from './components/modals/api-creation-modal/api-creation-modal.component';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { TemplateCreationModalComponent } from './components/modals/template-creation-modal/template-creation-modal.component';
import { StepsetCreationModalComponent } from './components/modals/stepset-creation-modal/stepset-creation-modal.component';
import { StepCreationModalComponent } from './components/modals/step-creation-modal/step-creation-modal.component';
import { RenameStepsetModalComponent } from './components/modals/rename-stepset-modal/rename-stepset-modal.component';
import { RenameStepModalComponent } from './components/modals/rename-step-modal/rename-step-modal.component';
import { InfoSnackbarComponent } from './components/snackbars/info-snackbar/info-snackbar.component';
import { ErrorSnackbarComponent } from './components/snackbars/error-snackbar/error-snackbar.component';
import { ActionSucceedSnackbarComponent } from './components/snackbars/action-succeed-snackbar/action-succeed-snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    MepComponent,
    HeaderComponent,
    FooterComponent,
    MepsComponent,
    TemplatesComponent,
    TemplateComponent,
    MepCreationModalComponent,
    ApiCreationModalComponent,
    ConfirmationModalComponent,
    TemplateCreationModalComponent,
    StepsetCreationModalComponent,
    StepCreationModalComponent,
    RenameStepsetModalComponent,
    RenameStepModalComponent,
    InfoSnackbarComponent,
    ErrorSnackbarComponent,
    ActionSucceedSnackbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatStepperModule,
    MatSortModule,
    MatInputModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    FormsModule,
    MatMenuModule,
    MatListModule,
    MatProgressBarModule,
    MatPaginatorModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MepCreationModalComponent,
    ApiCreationModalComponent,
    ConfirmationModalComponent,
    TemplateCreationModalComponent,
    StepsetCreationModalComponent,
    StepCreationModalComponent,
    RenameStepsetModalComponent,
    RenameStepModalComponent,
    InfoSnackbarComponent,
    ErrorSnackbarComponent,
    ActionSucceedSnackbarComponent
  ]
})
export class AppModule {
}
