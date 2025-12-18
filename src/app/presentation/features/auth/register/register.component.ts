import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  CircleAlert,
  User,
} from 'lucide-angular';

import { RegisterCredentials } from '../../../../core/domain/entities/auth.entity';
import { AuthService } from '../../../../core/infrastructure/services/auth.service';
import { ToastService } from '../../../../core/infrastructure/services/toast.service';
import { ValidatorsService } from '../../../../core/infrastructure/services/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    LucideAngularModule,
  ],
})
export class RegisterComponent implements OnInit, OnDestroy {
  icons = {
    user: User,
    lock: LockKeyhole,
    mail: Mail,
    eye: Eye,
    eyeOff: EyeOff,
    alert: CircleAlert,
  };

  registerForm: FormGroup;
  passwordVisible = false;
  isLoading = false;
  errorMessage: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private validatorsService: ValidatorsService
  ) {
    this.registerForm = this.fb.group({
      businessName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.validatorsService.passwordValidator(),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const credentials: RegisterCredentials = this.registerForm.value;

    this.authService
      .register(credentials)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => setTimeout(() => this.handleRegisterSuccess()),
        error: (err) => this.handleRegisterError(err),
      });
  }

  private handleRegisterSuccess(): void {
    this.isLoading = false;
    this.toast.success('Register success!');
    this.registerForm.reset();
    setTimeout(() => this.router.navigate(['/auth/login']), 1000);
  }

  private handleRegisterError(error: any): void {
    this.isLoading = false;
    this.errorMessage =
      error.message || 'Register failed. Please check your credentials.';
    this.toast.error(error.message);
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  get businessName() {
    return this.registerForm.get('businessName');
  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
}
