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
  MatToolbarModule
} from '@angular/material';
import { MepsComponent } from './pages/meps/meps.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { HttpClientModule } from '@angular/common/http';
import { TemplateComponent } from './pages/template/template.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MepCreationModalComponent } from './components/mep-creation-modal/mep-creation-modal.component';
import { ApiCreationModalComponent } from './components/api-creation-modal/api-creation-modal.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { TemplateCreationModalComponent } from './components/template-creation-modal/template-creation-modal.component';

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
    TemplateCreationModalComponent
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
    MatDialogModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent],
  entryComponents: [MepCreationModalComponent, ApiCreationModalComponent, ConfirmationModalComponent, TemplateCreationModalComponent]
})
export class AppModule {
}
