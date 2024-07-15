import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { Color } from 'src/app/demo/api/color';
import { GeneralService } from 'src/app/demo/service/general.service';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './add-product.component.html',
    styles: [`
    :host ::ng-deep .p-message {
        margin-left: .25em;
    }
    :host ::ng-deep .p-toast{
            z-index:99999;
        }
    `],
    providers: [MessageService]
})
export class AddProductComponent {
    name : string = '';

    description : string = '';

    categoryId : string = '';

    categories: SelectItem[] = [];

    selectedDrop: SelectItem = { value: '' };

    selectedCategory : string = '';

    nameError : string = '';
    
    descriptionError : string = '';

    categoryError : string = '';

    settingsList: any[] = [];

    colors : any[] = [];

    selectedColors : any[] = [];

    price  : string = '';

    valSwitch: boolean = false;

    uploadedFile: File | null = null;





    constructor(private generalService: GeneralService , private productService: ProductService,  private router: Router, private service: MessageService) { }

    ngOnInit() {
        this.generalService.getCatgories().subscribe({
            next: (response) => {
              if (response) {              
                response.data.forEach((category) => {
                    let select = {label : category.name , value : {id : category.id , name : category.name}};
                    this.categories.push(select);
                })
              } else {
                console.error('Failed to load categories: No response data found.');
              }
            },
            error: (error) => {
              console.error('Failed to load categories:', error);
            },
          });

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

    getValue($event : any)
    {        
        this.selectedCategory = $event.value.id;
    }


    saveProduct() {
    
            this.nameError = '';
            this.descriptionError = '';
            this.categoryError = '';
            if (this.name.length === 0) {
              this.nameError = 'Name is required';
            }
        
            if (this.description.length === 0) {
              this.descriptionError = 'Description is required';
            }
            if (this.selectedCategory.length === 0) {
              this.selectedCategory = 'Category is required';
            }
             
            
            const data = {
              name: this.name,
              description: this.description,
              category_id: this.selectedCategory,
              settings : this.settingsList
            };
    
            this.productService
              .create(data)
              .subscribe(
                (res: any) => {
                    console.log(res);
                    this.router.navigate(['/products']);
                  },
                  (err: HttpErrorResponse) => {                    
                    this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
                  },
              );
          }

          addSetting() {
              this.settingsList.push({
                price : this.price,
                colors : this.selectedColors,
                visibility : this.valSwitch
              });
              console.log( this.settingsList);
              
              this.price  = '';
              this.selectedColors  = [];
              this.valSwitch = false;
          }

          deleteSetting(index: number) {
            this.settingsList.splice(index, 1);
          }

          onFileUpload(event: any) {
            
              if (event.files.length > 0) {
                this.uploadedFile = event.files[0];
                console.log(this.uploadedFile);
                
              }
          }

          getColorNames(colors: Color[]): string {
            return colors.map(color => color.name).join(', ');
        }
        


 }
