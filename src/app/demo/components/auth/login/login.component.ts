import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    email: any = null;

    constructor(public layoutService: LayoutService, public authService: AuthService,
        public router: Router) { }

    ngOnInit(): void {
        if (this.authService.user && this.authService.token) {
            if (this.authService.isSupplier()) {
                this.router.navigate(['/products']);
            }
            if (this.authService.isBrand()) {
                this.router.navigate(['/suppliers/list']);
            }
        }
    }


    login(type : string) {

        if (!this.email || !this.password) {
            alert("Error Username and password");
            return;
        }
        this.authService.login(this.email, this.password , type).subscribe((resp: any) => {

            if (!resp.error && resp) {
                document.location.reload();
            }
            else {
                if (resp.error.error == 'Unauthorized') {
                    alert("No Entry");
                    return;
                }
            }


        })


    }
}
