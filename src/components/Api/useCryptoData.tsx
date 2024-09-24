import { QueryClient, useQuery } from "@tanstack/react-query";
import { CryptoCoin, fetchCryptoData } from "./apicoinrang";
import { CryptoCoinHistory, fetchCryptoDataHistory } from "./getapicoinrangdetail";


// Инициализируем queryClient
export const queryClient = new QueryClient();

const QUERY_KEY = ['cryptoData'];
const QUERY_KEY_HISTORY = ['cryptoDataHistory'];

export const useCryptoData = () => {
    // console.log("Функция запроса на сервер вызвалась")
    return useQuery<CryptoCoin[]>({
        queryKey: QUERY_KEY,
        queryFn: fetchCryptoData,
        staleTime: Infinity, // Данные будут считаться актуальными "бесконечно"
        // Опции запроса можно добавлять по необходимости:
        // staleTime: 1000 * 60 * 5, // Данные кэшируются на 5 минут
        // refetchInterval: 1000 * 60, // Запрос данных каждую минуту
    }, queryClient);
};



const uuid = "Qwsogvtv82FCd";
const timePeriod = "1y"

export const useCryptoDataHistory = () => {
    // console.log("Функция запроса ИСТОРИИ на сервер вызвалась")
    return useQuery<CryptoCoinHistory[]>({
        queryKey: QUERY_KEY_HISTORY,
        queryFn: () => fetchCryptoDataHistory(uuid, timePeriod),
        staleTime: Infinity, // Данные будут считаться актуальными "бесконечно"
        // Опции запроса можно добавлять по необходимости:
        // staleTime: 1000 * 60 * 5, // Данные кэшируются на 5 минут
        // refetchInterval: 1000 * 60, // Запрос данных каждую минуту
    }, queryClient);
};
