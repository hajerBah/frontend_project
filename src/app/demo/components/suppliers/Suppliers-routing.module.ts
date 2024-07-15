import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
        { path: 'media', loadChildren: () => import('./media/mediademo.module').then(m => m.MediaDemoModule) },
    ])],
    exports: [RouterModule]
})
export class SuppliersRoutingModule { }
