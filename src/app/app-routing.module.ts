import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MepFormComponent } from './pages/mep-form/mep-form.component';
import { TemplateFormComponent } from './pages/template-form/template-form.component';
import { MepsComponent } from './pages/meps/meps.component';
import { TemplatesComponent } from './pages/templates/templates.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'meps', component: MepsComponent},
  {path: 'mepCreation', component: MepFormComponent},
  {path: 'templates', component: TemplatesComponent},
  {path: 'templateCreation', component: TemplateFormComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
