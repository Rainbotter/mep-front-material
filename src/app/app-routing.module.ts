import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MepsComponent } from './pages/meps/meps.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { MepComponent } from './pages/mep/mep.component';
import { TemplateComponent } from './pages/template/template.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'meps', component: MepsComponent},
  {path: 'mep', component: MepComponent},
  {path: 'templates', component: TemplatesComponent},
  {path: 'template', component: TemplateComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
