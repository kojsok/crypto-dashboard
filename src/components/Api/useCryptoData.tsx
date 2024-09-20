import { QueryClient, useQuery } from "@tanstack/react-query";
import { CryptoCoin, fetchCryptoData } from "./apicoinrang";


// Инициализируем queryClient
export const queryClient = new QueryClient();

const QUERY_KEY = ['cryptoData'];

export const useCryptoData = () => {
    console.log("Функция запроса на сервер вызвалась")
    return useQuery<CryptoCoin[]>({
        queryKey: QUERY_KEY,
        queryFn: fetchCryptoData,
        staleTime: Infinity, // Данные будут считаться актуальными "бесконечно"
        // Опции запроса можно добавлять по необходимости:
        // staleTime: 1000 * 60 * 5, // Данные кэшируются на 5 минут
        // refetchInterval: 1000 * 60, // Запрос данных каждую минуту
    }, queryClient);
};