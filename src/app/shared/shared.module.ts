import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "./material.module";
import {CustomSelectedComponent} from "../core/components/custom-selected.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {icons} from "./icons";
import {HttpClientModule} from "@angular/common/http";



const MODULES = [MaterialModule,ReactiveFormsModule,FlexLayoutModule,  CommonModule,
  FormsModule,HttpClientModule]

@NgModule({
  declarations: [CustomSelectedComponent],
  imports: [...MODULES],
  exports: [...MODULES, CustomSelectedComponent]
})
export class SharedModule {
  constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    let key: keyof typeof icons;
    for (key in icons) iconRegistry.addSvgIconLiteral(key, domSanitizer.bypassSecurityTrustHtml(icons[key]));
  }
}
