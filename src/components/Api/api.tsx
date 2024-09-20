import { z } from "zod";
import { QueryClient } from '@tanstack/react-query';
import axios from "axios";

// Инициализируем queryClient
export const queryClient = new QueryClient();

// Определяем Zod схемы
// Схема для отдельного объекта Welcome
// const WelcomeCryptocurrencySchema = z.object({
//     id: z.string(),
//     symbol: z.string(),
//     name: z.string(),
//     image: z.string(),
//     currentPrice: z.number(),
//     marketCap: z.number(),
//     marketCapRank: z.number(),
//     fullyDilutedValuation: z.number(),
//     totalVolume: z.number(),
//     high24H: z.number(),
//     low24H: z.number(),
//     priceChange24H: z.number(),
//     priceChangePercentage24H: z.number(),
//     marketCapChange24H: z.number(),
//     marketCapChangePercentage24H: z.number(),
//     circulatingSupply: z.number(),
//     totalSupply: z.number(),
//     maxSupply: z.number().nullable(),
//     ath: z.number(),
//     athChangePercentage: z.number(),
//     athDate: z.string(), // Исправил на строку, так как API обычно возвращает даты в виде строки
//     atl: z.number(),
//     atlChangePercentage: z.number(),
//     atlDate: z.string(), // Исправил на строку
//     roi: z.object({
//       times: z.number(),
//       currency: z.enum(["btc", "usd", "eth"]),
//       percentage: z.number(),
//     }).nullable(),
//     lastUpdated: z.string(), // Исправил на строку
// });

const WelcomeCryptocurrencySchema = z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
    image: z.string(),
    current_price: z.number().optional(), // Поле теперь необязательное
    marketCap: z.number().optional(), // Тоже можно сделать опциональным
    marketCapRank: z.number().optional(),
    fullyDilutedValuation: z.number().optional(),
    totalVolume: z.number().optional(),
    high_24h: z.number().optional(),
    low_24h: z.number().optional(),
    priceChange24H: z.number().optional(),
    priceChangePercentage24H: z.number().optional(),
    marketCapChange24H: z.number().optional(),
    marketCapChangePercentage24H: z.number().optional(),
    circulatingSupply: z.number().optional(),
    totalSupply: z.number().optional(),
    maxSupply: z.number().nullable().optional(),
    ath: z.number().optional(),
    athChangePercentage: z.number().optional(),
    athDate: z.date().optional(),
    atl: z.number().optional(),
    atlChangePercentage: z.number().optional(),
    atlDate: z.date().optional(),
    roi: z.object({
        times: z.number(),
        currency: z.enum(["btc", "usd", "eth"]),
        percentage: z.number(),
    }).nullable().optional(),
    lastUpdated: z.date().optional(),
});
  
// Схема для массива данных
const CryptocurrencyArraySchema = z.array(WelcomeCryptocurrencySchema);

// Экспорт типов
export type Welcome = z.infer<typeof WelcomeCryptocurrencySchema>;
export type WelcomeArray = z.infer<typeof CryptocurrencyArraySchema>;

// Функция для проверки ответа сервера
export const validateResponse = async (response: Response): Promise<Response> => {
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response;
};

// Функция для запроса данных через Axios с использованием схемы валидации
export const getCryptoAxios = async (): Promise<Welcome[]> => {
  const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
  
  // Логируем данные для проверки
  console.log(response.data[0]);

  // Валидируем массив данных с помощью Zod
  return CryptocurrencyArraySchema.parse(response.data);
};
