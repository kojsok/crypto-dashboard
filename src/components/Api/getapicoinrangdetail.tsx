import { z } from "zod";
import axios from "axios";
import { API_TOKEN } from "./token";

const HistoryItemSchema = z.object({
    price: z.string(),
    timestamp: z.number(),
  });
  
  const CryptoResponseSchema = z.object({
    status: z.string(),
    data: z.object({
      change: z.string(),
      history: z.array(HistoryItemSchema),
    }),
  });

export type CryptoCoinHistory =  z.infer<typeof HistoryItemSchema>;

export const validateResponse = async (response: Response): Promise<Response> => {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  };

// Опции запроса
const options = {
    headers: {
      'x-access-token': API_TOKEN, // Замените на ваш ключ API
    },
  };

  export const fetchCryptoDataHistory = async (uuid: string, timePeriod: string): Promise<CryptoCoinHistory[]> => {
    try {
      const response = await axios.get(`https://api.coinranking.com/v2/coin/${uuid}/history?timePeriod=${timePeriod}`, options);
      
      // Валидация данных через Zod-схему
      const parsedData = CryptoResponseSchema.parse(response.data);
  
      // Возвращаем только массив coins
      return parsedData.data.history;
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

