import { PartialType } from '@nestjs/swagger';
import { IsNumberString, IsString, Length } from 'class-validator';

import { ForgotPasswordOtpRequestDto } from '..';

export class ForgotPasswordVerifyOtpRequestDto extends PartialType(
    ForgotPasswordOtpRequestDto,
) {
    @IsString()
    @Length(4, 4)
    @IsNumberString()
    otpCode: string;

    @IsString()
    otpCodeToken: string;
}
