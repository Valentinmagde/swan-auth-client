import { Component } from '@angular/core';
import { AuthService } from '../../../core/infrastructure/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/infrastructure/services/toast.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
  ) {}

  signOut() {
    this.authService.logout().subscribe({
        next: () => {
          this.authService.clearTokens();
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.toast.error(error);
        },
      });
  }
}
