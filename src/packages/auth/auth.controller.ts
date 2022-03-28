import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { ForgotPasswordOtpRequestDto } from './dto';
import { ForgotPasswordVerifyOtpRequestDto } from './dto/request/forgot-password-verify-otp-request.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * @summary
     * # User scenario:
     * 1. User forgot her/his password but s/he knows their mobile number, or their email.
     * 2. User enter their mobile number and country code, or their email.
     * 3. If there was such a user with that password and s/he could answer the security question we will generate an OTP code for them
     */
    @Post('forgot-password/otp')
    forgotPasswordSendOtp(
        @Body()
        forgotPasswordOtpRequestDto: ForgotPasswordOtpRequestDto,
    ) {
        return this.authService.forgotPasswordSendOtp(
            forgotPasswordOtpRequestDto,
        );
    }

    @Post('forgot-password/otp/verify')
    forgotPasswordVerifyOtp(
        @Body()
        forgotPasswordVerifyOtpRequestDto: ForgotPasswordVerifyOtpRequestDto,
    ) {
        return this.authService.forgotPasswordVerifyOtp(
            forgotPasswordVerifyOtpRequestDto,
        );
    }

    @Post('login')
    login(@Param('id') id: string) {
        return this.authService.findOne(+id);
    }

    @Patch('')
    update(@Param('id') id: string) {
        return this.authService.update(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.authService.remove(+id);
    }
}
