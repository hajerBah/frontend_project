import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './list.component.html',
    providers: [MessageService]
})
export class ListComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;
    restoreProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];


    totalItems: number = 0;
    pageSize: number = 10;
    currentPage: number = 1;
    loading: boolean = false;

    constructor(private productService: ProductService, private messageService: MessageService, private router: Router) { }

    ngOnInit() {
        this.loadProducts();


        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    loadProducts(page: number = 1): void {
        this.loading = true;
        this.productService.getProducts(page, this.pageSize).subscribe({
            next: (response) => {
                if (response) {
                    this.products = response.data;
                    console.log(this.products);

                    this.totalItems = response.meta.total; // Assuming the response includes total count

                    this.currentPage = page;
                } else {
                    console.error('Failed to load products: No response data found.');
                }
            },
            error: (error) => {
                console.error('Failed to load products:', error);
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
    onPageChange(event: any): void {
        console.log(event);

        this.loadProducts(event.page + 1);
    }

    openNew() {
        this.router.navigate(['/products/create']);
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.router.navigate(['/products/edit', product.id]);
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };

    }

    confirmDeleteSelected() {

        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.productService.delete(this.product.id!).subscribe((res) => {
            this.deleteProductDialog = false;
            this.products = this.products.filter(val => val.id !== this.product.id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            this.product = {};
            this.loadProducts();
        });
    }

    restoreProduct(product: Product) {
        this.restoreProductDialog = true;
        this.product = { ...product };

    }
    confirmRestore()
    {
        this.productService.restore(this.product.id!).subscribe((res) => {
            this.restoreProductDialog = false;
            this.products = this.products.filter(val => val.id !== this.product.id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product restored', life: 3000 });
            this.product = {};
            this.loadProducts();
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }



    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

}
