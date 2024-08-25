import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout-confirmation-dialog',
    templateUrl: './logout-confirmation-dialog.component.html',
    styleUrls: ['./logout-confirmation-dialog.component.css']
})
export class LogoutConfirmationDialogComponent {
    constructor(public dialogRef: MatDialogRef<LogoutConfirmationDialogComponent>, private router: Router) {}

    cancel(): void {
        this.dialogRef.close();
    }

    confirm(): void {
        this.dialogRef.close('confirm');
        localStorage.removeItem('loggedInUser');
        this.router.navigate(['/']);
    }
}
