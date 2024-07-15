import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
        { path: 'create', loadChildren: () => import('./add-product/add-product.module').then(m => m.AddProductModule) },
        { path: 'edit/:id', loadChildren: () => import('./update-product/update-product.module').then(m => m.UpdateProductModule) },
    ])],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
