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
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { MepsComponent } from './pages/meps/meps.component';
import { TemplatesComponent } from './pages/templates/templates.component';

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
    TemplatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
