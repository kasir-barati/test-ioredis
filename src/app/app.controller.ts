import {
    Controller,
    Get,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppService } from './service/app.service';

@ApiTags('app')
@Controller()
export class AppController {
    constructor(private appService: AppService) {}

    @UsePipes(ValidationPipe)
    @ApiBearerAuth()
    @Get('/index')
    index() {
        return this.appService.indexData();
    }
}
