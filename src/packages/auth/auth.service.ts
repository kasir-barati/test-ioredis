import { Injectable } from '@nestjs/common';

import { ForgotPasswordOtpRequestDto } from './dto';
import { ForgotPasswordVerifyOtpRequestDto } from './dto/request/forgot-password-verify-otp-request.dto';

@Injectable()
export class AuthService {
    forgotPasswordSendOtp(
        forgotPasswordOtpRequestDto: ForgotPasswordOtpRequestDto,
    ) {
        return 'This action adds a new auth';
    }

    forgotPasswordVerifyOtp(
        forgotPasswordVerifyOtpRequestDto: ForgotPasswordVerifyOtpRequestDto,
    ) {
        return `This action returns all auth`;
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`;
    }

    update(id: number) {
        return `This action updates a #${id} auth`;
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }
}
