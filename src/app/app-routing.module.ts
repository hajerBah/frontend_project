import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { MydashboardComponent } from './demo/components/mydashboard/mydashboard.component';
import { AuthGuard } from './demo/components/auth/_services/auth.guard';
import { SupplierGuard } from './demo/components/auth/_services/supplier.guard';
import { BrandGuard } from './demo/components/auth/_services/brand.guard';

const routes: Routes = [
    {
        path: 'auth', loadChildren: () =>
            import('./demo/components/auth/auth.module').then((m) => m.AuthModule)
    },
    {
        path: '', component: AppLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'products', canActivate: [SupplierGuard], loadChildren: () => import('./demo/components/products/products.module').then(m => m.ProductModule) },
            { path: 'suppliers', canActivate: [BrandGuard], loadChildren: () => import('./demo/components/suppliers/suppliers.module').then(m => m.SupplierModule) },
        ],
    },
    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'pages/notfound', component: NotfoundComponent },
    { path: '**', redirectTo: 'pages/notfound' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

// children: [
//     { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
//     { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UikitModule) },
//     { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
//     { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
//     { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
//     { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
//     // New Update Template
//     { path: 'mydashboard', component: MydashboardComponent },
// ],
