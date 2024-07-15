import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Color } from 'src/app/demo/api/color';
import { Product } from 'src/app/demo/api/product';
import { GeneralService } from 'src/app/demo/service/general.service';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.scss']
})
export class UpdateProductComponent implements OnInit {
  name: string = '';
  description: string = '';
  categoryId: string = '';
  categories: SelectItem[] = [];
  selectedDrop: SelectItem = { value: '' };
  selectedCategory: string = '';
  nameError: string = '';
  descriptionError: string = '';
  categoryError: string = '';
  product: Product | null = null;
  settingsList : any[] = [];

  colors : any[] = [];

  selectedColors : any[] = [];

  price  : string = '';

  valSwitch: boolean = false;

  setting : number = 0;

  editMode : boolean = false;

  settingToDelete : any[] = [];
  constructor(
    private generalService: GeneralService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.generalService.getCatgories().subscribe({
      next: (response) => {
        if (response) {
          this.categories = response.data.map((category: any) => ({
            label: category.name,
            value: category.id
          }));
        } else {
          console.error('Failed to load categories: No response data found.');
        }
      },
      error: (error) => {
        console.error('Failed to load categories:', error);
      }
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productService.getProduct(id).subscribe(
          (data: any) => {
            this.product = data.data;
            this.name = data.data.name;
            this.description = data.data.description;
            if (data.data.category) {
                this.selectedDrop = {
                    value: data.data.category.id,
                    label: data.data.category.name,
                };
            }
            this.selectedCategory = data.data.category?.id || '';
            this.settingsList = data.data.settings;  
            this.settingsList = data.data.settings;            
            console.log( data.data.settings);
                      
          },
          error => {
            console.error('Error fetching product:', error);
          }
        );
      }
    });

    this.generalService.getColors().subscribe({
      next: (response) => {
        if (response) {
          this.colors = response.data.map((color) => ({ name: color.name, id: color.id }));
          console.log(this.colors );
          
        } else {
          console.error('Failed to load colors: No response data found.');
        }
      },
      error: (error) => {
        console.error('Failed to load colors:', error);
      },
    });
  }

  getValue($event: any) {
    console.log($event);
    
    this.selectedCategory = $event.value;
  }

  updateProduct() {
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
      this.categoryError = 'Category is required';
    }

    if (this.nameError || this.descriptionError || this.categoryError) {
      return; // Exit if there are errors
    }

    let data = {
      name: this.name,
      description: this.description,
      category_id: this.selectedCategory,
      settings_to_delete : this.settingToDelete,
      settings : this.settingsList
    };
    console.log(this.product?.id);
    
    this.productService.updateProduct(this.product?.id ?? '', data).subscribe(
      (res: any) => {
        this.router.navigate(['/products']);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
    getColorNames(selectedColors: Color[]): string {
      return selectedColors.map(color => color.name).join(', ');
    }

    addSetting() {
      if(this.editMode)
      {
        this.settingsList[this.setting].color = this.selectedColors;
        this.settingsList[this.setting].price = this.price;
        this.settingsList[this.setting].visibility = this.valSwitch;
      }else{
        this.settingsList.push({
          id : '',
          price : this.price,
          colors : this.selectedColors,
          visibility : this.valSwitch
        });
      }
  
      
      this.price  = '';
      this.selectedColors  = [];
      this.valSwitch = false;
      this.editMode = false;
    }

  deleteSetting(index: number) {
      let id = this.settingsList[index].id;
      if (id !== '') {
        this.settingToDelete.push(id);
      }
      this.settingsList.splice(index, 1);
  }

  editProduct(index : number)
  {   
    this.editMode = true;
    this.setting = index;
    this.price = this.settingsList[index].price;
    this.valSwitch = !!this.settingsList[index].visibility;
    this.selectedColors = this.settingsList[index].colors;
  }
}
