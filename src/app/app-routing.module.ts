import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MepFormComponent } from './pages/mep-form/mep-form.component';
import { TemplateFormComponent } from './pages/template-form/template-form.component';
import { MepsComponent } from './pages/meps/meps.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { MepComponent } from './pages/mep/mep.component';
import { TemplateComponent } from './pages/template/template.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'meps', component: MepsComponent},
  {path: 'mep', component: MepComponent},
  {path: 'mepCreation', component: MepFormComponent},
  {path: 'templates', component: TemplatesComponent},
  {path: 'template', component: TemplateComponent},
  {path: 'templateCreation', component: TemplateFormComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
