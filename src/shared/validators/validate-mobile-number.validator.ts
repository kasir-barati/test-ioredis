import {
    ValidationOptions,
    registerDecorator,
    ValidationArguments,
    buildMessage,
    isPhoneNumber,
} from 'class-validator';

export function IsPhoneNumberForRegion(
    property: string,
    validationOptions?: ValidationOptions,
) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isPhoneNumberForRegion',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    // the property name that holds the country code
                    const [countryCodeField] = args.constraints;

                    // the value of the country code on the target object
                    const countryCode = (args.object as any)[
                        countryCodeField
                    ];

                    // validate phone number for specified region
                    return isPhoneNumber(value, countryCode);
                },
                // specify custom error message
                defaultMessage: buildMessage(
                    (eachPrefix) =>
                        `${eachPrefix} $property must be a valid phone number in the specified region`,
                    validationOptions,
                ),
            },
        });
    };
}
