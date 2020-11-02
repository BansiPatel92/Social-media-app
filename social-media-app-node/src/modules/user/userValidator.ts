import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ async: false })
export class IsPasswordMatchesRequirementsConstraint implements ValidatorConstraintInterface {
  public validate(password: string, args: ValidationArguments) {
    /* 
    == Regex for password Validation ==
     one uppercase,
     one lowercase,
     min length 6,
     max length 30
     no white space 
     */
    const regex = new RegExp("^(?!.* )(?=.*?[A-Z])(?=.*?[a-z]).{6,30}$");
    return regex.test(password);
  }
}
