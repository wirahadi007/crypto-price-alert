import { Module } from '@nestjs/common';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from '../price.entity';
import { MoralisModule } from '../moralis/moralis.module';
import { EmailModule } from '../email/email.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        TypeOrmModule.forFeature([Price]),
        MoralisModule,
        EmailModule,
        ScheduleModule.forRoot(),
    ],
    controllers: [PriceController],
    providers: [PriceService],
})
export class PriceModule { }
