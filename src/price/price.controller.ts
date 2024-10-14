import { Controller, Get, Query } from '@nestjs/common';
import { PriceService } from './price.service';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@ApiTags('Price')
@Controller('price')
export class PriceController {
    constructor(private readonly priceService: PriceService) { }

    @ApiOperation({ summary: 'Get the price history for a cryptocurrency' })
    @ApiQuery({ name: 'chain', description: 'Blockchain (e.g., eth, polygon)', required: true })
    @ApiResponse({ status: 200, description: 'Price history successfully fetched.' })
    @ApiResponse({ status: 400, description: 'Invalid request parameters.' })
    @Get('get')
    async getPriceHistory(@Query('chain') chain: string) {
        return this.priceService.getPriceHistory(chain);
    }
}
