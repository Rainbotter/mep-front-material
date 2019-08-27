import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { TemplateFormComponent } from './pages/template-form/template-form.component';
import { MepFormComponent } from './pages/mep-form/mep-form.component';
import { MepComponent } from './pages/mep/mep.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatButtonModule, MatIconModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { MepsComponent } from './pages/meps/meps.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { HttpClientModule } from '@angular/common/http';
import { TemplateComponent } from './pages/template/template.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TemplateFormComponent,
    MepFormComponent,
    MepComponent,
    HeaderComponent,
    FooterComponent,
    MepsComponent,
    TemplatesComponent,
    TemplateComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
