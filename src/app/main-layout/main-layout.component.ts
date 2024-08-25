import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationDialogComponent } from '../logout-confirmation-dialog/logout-confirmation-dialog.component';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

    sidebarClosed = false;

    constructor(private dialog: MatDialog) {}

    toggleSidebar() {
        this.sidebarClosed = !this.sidebarClosed;
    }

    confirmLogout() {
        const dialogRef = this.dialog.open(LogoutConfirmationDialogComponent, {
            width: '350px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'confirm') {
                // Implement logout logic here
                // Redirect user to login screen
            }
        });
    }
}
