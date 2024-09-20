import { z } from "zod";
import { QueryClient } from '@tanstack/react-query';
import axios from "axios";




// export type Welcome = {
//     status: string;
//     data:   Data;
// }

// export type Data = {
//     stats: Stats;
//     coins: Coin[];
// }

// export type Coin = {
//     uuid:              string;
//     symbol:            string;
//     name:              string;
//     color:             string;
//     iconURL:           string;
//     marketCap:         string;
//     price:             string;
//     listedAt:          number;
//     tier:              number;
//     change:            string;
//     rank:              number;
//     sparkline:         (null | string)[];
//     lowVolume:         boolean;
//     coinrankingURL:    string;
//     the24HVolume:      string;
//     btcPrice:          string;
//     contractAddresses: string[];
// }

// export type Stats = {
//     total:          number;
//     totalCoins:     number;
//     totalMarkets:   number;
//     totalExchanges: number;
//     totalMarketCap: string;
//     total24HVolume: string;
// }



// Zod-схема для отдельной криптовалюты
const cryptoCoinSchema = z.object({
    uuid: z.string(),
    symbol: z.string(),
    name: z.string(),
    color: z.string().optional(),
    iconUrl: z.string().url(),
    marketCap: z.string(),
    price: z.string(),
    listedAt: z.number(),
    tier: z.number(),
    change: z.string(),
    rank: z.number(),
    sparkline: z.array(z.string().nullable()).optional(),
    lowVolume: z.boolean(),
    coinrankingUrl: z.string().url(),
    '24hVolume': z.string(),
    btcPrice: z.string(),
    contractAddresses: z.array(z.string()).optional(),
  });
  
  // Zod-схема для ответа от API
  export const cryptoSchema = z.object({
    status: z.string(),
    data: z.object({
      stats: z.object({
        total: z.number(),
        totalCoins: z.number(),
        totalMarkets: z.number(),
        totalExchanges: z.number(),
        totalMarketCap: z.string(),
        total24hVolume: z.string(),
      }),
      coins: z.array(cryptoCoinSchema),
    }),
  });
  

  // Exporting types
export type CryptoResponse = z.infer<typeof cryptoSchema>;
export type Coin = z.infer<typeof cryptoSchema.shape.data.shape.coins.element>;
export type Stats = z.infer<typeof cryptoSchema.shape.data.shape.stats>;
export type CryptoCoin = z.infer<typeof cryptoCoinSchema>; //работаем с ней

// Функция для проверки ответа сервера
export const validateResponse = async (response: Response): Promise<Response> => {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  };



// Опции запроса
const options = {
    headers: {
      'x-access-token': 'coinranking8d9eb63143e05c751858b2841856c4cc10cde0acf6c39182', // Замените на ваш ключ API
    },
  };

// Функция получения данных с корректным возвратом
export const fetchCryptoData = async (): Promise<CryptoCoin[]> => {
    try {
      const response = await axios.get('https://api.coinranking.com/v2/coins', options);
      
      // Валидация данных через Zod-схему
      const parsedData = cryptoSchema.parse(response.data);
  
      // Возвращаем только массив coins
      return parsedData.data.coins;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Axios error: ${error.response?.data}`);
      } else if (error instanceof z.ZodError) {
        throw new Error(`Zod validation error: ${error.errors}`);
      } else {
        throw new Error('Unexpected error occurred');
      }
    }
  };
  
  // Вызов функции
//   fetchCryptoData();