import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GeneralService } from 'src/app/demo/service/general.service';
import { UploadService } from 'src/app/demo/service/upload.service';

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
})
export class ProductSettingsComponent {
  @Input() settingName1: string = '';
  @Input() settingName2: string = '';

  settingValue1 = '';
  settingValue2 = '';

  colors: any[] = [];
  selectedColors: any[] = [];

  uploadedFiles: any[] = [];

  @Output() deleteSetting = new EventEmitter<void>();

  constructor(private generalService: GeneralService , private uploadService : UploadService) {}

  ngOnInit() {
    this.generalService.getColors().subscribe({
      next: (response) => {
        if (response) {
          this.colors = response.data.map((color) => ({ name: color.name, id: color.id }));
        } else {
          console.error('Failed to load colors: No response data found.');
        }
      },
      error: (error) => {
        console.error('Failed to load colors:', error);
      },
    });
  }

  onFileUpload(event: any) {
    console.log(1);
    
    const file = event.files[0];
    this.uploadService.uploadFile(file).subscribe(
      (response) => {
        console.log('File uploaded successfully: ', response);
        // Handle response as needed, e.g., show success message
      },
      (error) => {
        console.error('Error uploading file: ', error);
        // Handle error as needed, e.g., show error message
      }
    );
  }

  onDeleteSetting() {
    this.deleteSetting.emit();
  }
}
