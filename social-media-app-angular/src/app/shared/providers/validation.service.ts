import { FormGroup } from '@angular/forms';

export class ValidationService {

  /**
   * checkIfMatchingPasswords(password, confirmPassword)
   * check password and confirm passowrd match or not
   * @param password in compare with confirm password
   * @param confirmPassword in compare with password
   */
  static checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      }
      return passwordConfirmationInput.setErrors(null);
    };
  }
}
