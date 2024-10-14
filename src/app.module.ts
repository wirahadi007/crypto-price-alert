import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriceService } from './price/price.service';
import { PriceController } from './price/price.controller';
import { PriceCronService } from './tasks/price-cron.service';
import { Price } from './price.entity';
import { EmailService } from './email/email.service';
import { MoralisService } from './moralis/moralis.service';
import { PriceModule } from './price/price.module';
import { EmailModule } from './email/email.module';
import { MoralisModule } from './moralis/moralis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'crypto1',
      entities: [Price],
      synchronize: true,
    }),
    PriceModule,
    EmailModule,
    MoralisModule,
  ],
})
export class AppModule { }
