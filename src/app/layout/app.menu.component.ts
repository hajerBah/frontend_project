import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../demo/components/auth/_services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService , public auth  : AuthService) { }

    ngOnInit() {
        this.model = [];
        if (this.auth.isSupplier()) {
            this.model.push( {
                label: 'Products',
                items: [
                    { label: 'Products list', icon: 'pi pi-fw pi-id-card', routerLink: ['/products'] },
                ]
            });
        }
        if (this.auth.isBrand()) {
            this.model.push( {
                label: 'Supplier',
                items: [
                    { label: 'Supplier list', icon: 'pi pi-fw pi-id-card', routerLink: ['/suppliers/list'] },
                ]
            });
        }
    }
}
