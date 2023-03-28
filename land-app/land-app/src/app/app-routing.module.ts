import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandDetailsComponent } from './land-details/land-details.component';
import { LandenComponent } from './landen/landen.component';
import { TopInwonersComponent } from './top-inwoners/top-inwoners.component';
const routes: Routes = [
  {
    path: 'landen',
    component: LandenComponent
  },
  {
    path: 'top',
    component: TopInwonersComponent
  },
  {
    path: 'detail/:id',
    component: LandDetailsComponent
  },
  {
    path: "",
    redirectTo: "/top",
    pathMatch: 'full'
  }
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
