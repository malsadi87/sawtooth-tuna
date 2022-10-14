import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsEqualOrGreaterThan(property: string, validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isEqualOrGreaterThan",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[relatedPropertyName];
                    return typeof value === typeof relatedValue && value >= relatedValue;
                },
                defaultMessage(args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    return `${args.property} cant be greater than ${relatedPropertyName}!`;
                  }
            }
        });
   };
}