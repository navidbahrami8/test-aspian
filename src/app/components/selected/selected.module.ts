import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectedComponent} from './selected.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: SelectedComponent
  }
];

@NgModule({
  declarations: [
    SelectedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SelectedModule {
}
