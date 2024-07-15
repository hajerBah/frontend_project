import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { Supplier } from 'src/app/demo/api/supplier';
import { GeneralService } from 'src/app/demo/service/general.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { SupplierService } from 'src/app/demo/service/supplier.service';
import { AuthService } from '../../auth/_services/auth.service';

@Component({
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

    suppliers: Supplier[] = [];

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];

    totalItems: number = 0;
    pageSize: number = 10;
    currentPage: number = 1;
    loading: boolean = false;

    selectedCategory : string = '';

    categories: SelectItem[] = [];



    constructor(private supplierService: SupplierService, private generalService  : GeneralService , private auth : AuthService) { }

    ngOnInit() {
      //  this.productService.getProducts().then(data => this.products = data);      
      
      this.generalService.getCatgories().subscribe({
        next: (response) => {
          if (response) {              
            response.data.forEach((category) => {
                let select = {label : category.name , value : category.id };
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

      this.selectedCategory = this.auth.user.category.id;
      this.loadSuppliers();
    }

    onSortChange(event: any) {
        this.selectedCategory  = event.value;
       this.loadSuppliers();

        
    }

    onFilter(dv: DataView, event: Event) {
        console.log(event);
        
        dv.filter((event.target as HTMLInputElement).value);
    }

    loadSuppliers(page: number = 1): void {
        this.loading = true;
        this.supplierService.getSuppliersByCategory(this.selectedCategory,page, this.pageSize).subscribe({
            next: (response) => {
                if (response) {
                    this.suppliers = response.data;
                    console.log(this.suppliers);

                    this.totalItems = response.meta.total; // Assuming the response includes total count

                    this.currentPage = page;
                } else {
                    console.error('Failed to load suppliers: No response data found.');
                }
            },
            error: (error) => {
                console.error('Failed to load suppliers:', error);
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
}
