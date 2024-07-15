import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListComponent }
	])],
	exports: [RouterModule]
})
export class ListProductModule { }
