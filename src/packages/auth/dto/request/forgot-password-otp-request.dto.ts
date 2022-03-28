import {
    isDefined,
    IsEmail,
    IsIn,
    Length,
    ValidateIf,
} from 'class-validator';

import { countriesCodes } from '@src/shared/helpers/countries-codes.helper';
import { IsPhoneNumberForRegion } from '@src/shared/validators/validate-mobile-number.validator';

export class ForgotPasswordOtpRequestDto {
    @ValidateIf((requestBody: ForgotPasswordOtpRequestDto) =>
        isDefined(requestBody.mobileNumber),
    )
    @Length(2, 2)
    @IsIn(countriesCodes('2cca'))
    countryCode?: string;

    @ValidateIf(
        (requestBody: ForgotPasswordOtpRequestDto) =>
            !isDefined(requestBody.emailAddress),
    )
    // FIXME: use requestBody.countryCode would be a better way
    @IsPhoneNumberForRegion('countryCode')
    mobileNumber?: string;

    @ValidateIf(
        (requestBody: ForgotPasswordOtpRequestDto) =>
            !isDefined(requestBody.mobileNumber),
    )
    @IsEmail()
    emailAddress?: string;
}
