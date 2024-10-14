import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from '../price.entity';
import { MoralisService } from '../moralis/moralis.service';
import { EmailService } from '../email/email.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PriceService implements OnModuleInit {
  private lastPrices: Map<string, number> = new Map();

  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    private readonly moralisService: MoralisService,
    private readonly emailService: EmailService,
  ) { }

  async onModuleInit() {
    const chains = ['eth', 'polygon'];
    for (const chain of chains) {
      const latestPrice = await this.priceRepository.findOne({
        where: { chain },
        order: { timestamp: 'DESC' },
      });

      if (latestPrice) {
        this.lastPrices.set(chain, latestPrice.price);
        console.log(`Initialized last price for ${chain}: ${latestPrice.price}`);
      } else {
        console.log(`No price data found for ${chain}, initializing lastPrices to 0`);
        this.lastPrices.set(chain, 0);
      }
    }
  }

  @Cron('*/5 * * * *')
  async savePrice() {
    const chains = ['eth', 'polygon'];

    for (const chain of chains) {
      const currentPrice = await this.moralisService.getCryptoPrice(chain);

      const priceEntity = this.priceRepository.create({ chain, price: currentPrice, timestamp: new Date() });
      await this.priceRepository.save(priceEntity);

      const previousPrice = this.lastPrices.get(chain);

      if (previousPrice && currentPrice > previousPrice * 1.03) {
        await this.emailService.sendEmail(process.env.TO_MAIL, `${chain} Price Alert`, `The price of ${chain} has increased by more than 3%! Current price: ${currentPrice}`);
      }

      this.lastPrices.set(chain, currentPrice);
    }
  }

  async getPriceHistory(chain: string) {
    return this.priceRepository.find({
      where: { chain },
      order: { timestamp: 'DESC' },
      take: 24,
    });
  }
}
