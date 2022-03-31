import {
    isDefined,
    IsEmail,
    IsIn,
    Length,
    ValidateIf,
} from 'class-validator';

import { countriesCodes } from '@src/shared/helpers/countries-codes.helper';
import { IsPhoneNumberForRegion } from '@src/shared/validators/validate-mobile-number.validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordOtpRequestDto {
    @ApiProperty({
        title: 'Country Code',
        description:
            'Just in case that user wants to get OTP code by their mobile number. The valid values are sent in the `GET /x/y/z` endpoint.',
        example: 'JP',
        isArray: false,
        nullable: true,
        maxLength: 2,
        minLength: 2,
        type: String,
        enum: countriesCodes('2cca'),
    })
    @ValidateIf((requestBody: ForgotPasswordOtpRequestDto) =>
        isDefined(requestBody.mobileNumber),
    )
    @Length(2, 2)
    @IsIn(countriesCodes('2cca'))
    countryCode?: string;

    @ApiProperty({
        description:
            'If user wants to receive an OTP code in their mobile they should enter their mobile number. But user cannot enter both mobile number and email address at the same time.',
        title: 'Mobile number',
        isArray: false,
        required: false,
        example: '09109679196',
        type: String,
    })
    @ValidateIf(
        (requestBody: ForgotPasswordOtpRequestDto) =>
            !isDefined(requestBody.emailAddress),
    )
    // FIXME: use requestBody.countryCode would be a better way
    @IsPhoneNumberForRegion('countryCode')
    mobileNumber?: string;

    @ApiProperty({
        title: 'Email Address',
        description:
            'User can also receive OTP code on their email address too. But user cannot enter both mobile number and email address at the same time.',
        isArray: false,
        required: false,
        example: 'kasir.barati@gmail.com',
        type: String,
    })
    @ValidateIf(
        (requestBody: ForgotPasswordOtpRequestDto) =>
            !isDefined(requestBody.mobileNumber),
    )
    @IsEmail()
    emailAddress?: string;
}
