
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PriceService } from '../price/price.service';

@Injectable()
export class PriceCronService {
  constructor(private priceService: PriceService) { }

  @Cron('*/5 * * * *')
  handleCron() {
    // Fetch price from API and save
    console.log("this is calling and save price to database");

    // this.priceService.fetchAndSavePrices('ethereum', 1800); // Example for Ethereum
    // this.priceService.fetchAndSavePrices('polygon', 1.5); // Example for Polygon
  }
}
