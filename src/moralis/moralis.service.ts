import { Injectable } from '@nestjs/common';
import Moralis from 'moralis';

@Injectable()
export class MoralisService {
    constructor() {
        Moralis.start({
            apiKey: process.env.MORALIS_APIKEY,
        });
    }

    async getCryptoPrice(chain: string): Promise<number> {
        let chainId: string;
        let address: string;

        switch (chain) {
            case 'eth':
                chainId = '0x1';
                address = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
                break;
            case 'polygon':
                chainId = '0x89';
                address = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619';
                break;
            default:
                throw new Error(`Unsupported chain: ${chain}`);
        }

        const options = { chain: chainId, address };

        try {
            const response = await Moralis.EvmApi.token.getTokenPrice(options);
            console.log("Data from Moralis response:", response);

            return response.result.usdPrice;
        } catch (error) {
            console.error("Error fetching crypto price from Moralis:", error);
            throw error;
        }
    }
}