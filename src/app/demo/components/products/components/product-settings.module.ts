import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductSettingsComponent } from './product-settings.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';

import { FileUploadModule } from 'primeng/fileupload';


@NgModule({
  declarations: [ProductSettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToggleButtonModule,
    SplitButtonModule,
    InputNumberModule,
    MultiSelectModule,
    FileUploadModule

  ],
  exports: [ProductSettingsComponent],
})
export class ProductSettingsModule {}
