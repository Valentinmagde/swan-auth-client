import { Observable, throwError } from "rxjs";

import { RegisterCredentials } from "../../entities/auth.entity";
import { AuthRepository } from "../../repositories/auth.repository";
import { Injectable } from "@angular/core";
import { ValidatorsService } from "../../../infrastructure/services/validators.service";

@Injectable({
  providedIn: 'root'
})

export class RegisterUseCase {
  constructor(private authRepository: AuthRepository, private validatorsService: ValidatorsService) { }

  execute(credentials: RegisterCredentials): Observable<any> {
    // Validate email format
    if (!this.validatorsService.isValidEmail(credentials.email)) {
      return throwError(() => new Error('Invalid email format'));
    }

    // Validate password
    if (!this.validatorsService.isValidPassword(credentials.password)) {
      return throwError(() => new Error('Password does not meet requirements'));
    }

    return this.authRepository.register(credentials);
  }
}