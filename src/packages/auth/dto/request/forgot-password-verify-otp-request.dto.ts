import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumberString, IsString, Length } from 'class-validator';

import { ForgotPasswordOtpRequestDto } from '..';

export class ForgotPasswordVerifyOtpRequestDto extends PartialType(
    ForgotPasswordOtpRequestDto,
) {
    @ApiProperty({
        title: 'OTP Code',
        description:
            'User after receiving OTP code should provide it here. The OTP code is sent to their mobile number or email address',
        required: true,
        isArray: false,
        type: String,
        example: '1234',
    })
    @IsString()
    @Length(4, 4)
    @IsNumberString()
    otpCode: string;

    @ApiProperty({
        title: 'OTP code token',
        description:
            'We sent another value in the response of calling this endpoint `POST /auth/forgot-password/otp`. Now client should resend it to the backend',
        isArray: false,
        required: true,
        example: 'asdki3545d4231dsa',
        type: String,
    })
    @IsString()
    otpCodeToken: string;
}
