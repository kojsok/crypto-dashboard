import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../Api/api";
import { CryptoCoin, fetchCryptoData } from "../Api/apicoinrang";
import { FC, useMemo } from "react";
import { useCryptoData } from "../Api/useCryptoData";


interface BodyTableProps {
    searchQuery: string;
}

// Основной компонент таблицы
export const BodyTable: FC<BodyTableProps> = ({searchQuery}) => {

    // Определяем ключ для кэширования запроса
    // const QUERY_KEY = ['cryptoData'];

    // console.log(fetchCryptoData());


    // const useCryptoData = () => {
    //     console.log("useCryptoDat вызвалась");
    //     return useQuery<CryptoCoin[]>({
    //         queryKey: QUERY_KEY,
    //         queryFn: fetchCryptoData,
    //         staleTime: Infinity, // Данные будут считаться актуальными "бесконечно"
    //         // Опции запроса можно добавлять по необходимости:
    //         // staleTime: 1000 * 60 * 5, // Данные кэшируются на 5 минут
    //         // refetchInterval: 1000 * 60, // Запрос данных каждую минуту
    //     }, queryClient);
    // };

    //! Мемоизируем результат вызова useCryptoData
    const { data, error, isLoading } = useCryptoData();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {(error as Error).message}</p>;

    // const mapedarray = data?.map((item) => {
    //     console.log(item.name);
    // }
    // console.log(data && data[0].name);
    console.log(searchQuery);


    const filteredCryptos = Array.isArray(data)
    ? data.filter(item => {
        if (item && item.name && typeof item.name === 'string') {
            return item.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
    })
    : [];

    //!! Мемоизируем результат фильтрации, чтобы не пересчитывать его при каждом рендере
    // const filteredCryptos = useMemo(() => {
    //     return Array.isArray(data)
    //         ? data.filter(item => {
    //             if (item && item.name && typeof item.name === 'string') {
    //                 return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    //             }
    //             return false;
    //         })
    //         : [];
    // }, [data, searchQuery]);

 


    return (
        <div>
            <Table className="min-w-[300px] max-w-[600px] w-full table-auto border-collapse border border-gray-400 mx-auto">
                <TableCaption>www.kojs.org</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead className="w-[100px]">Name Crypto</TableHead>
                        <TableHead>Change</TableHead>
                        {/* <TableHead>low_24h</TableHead> */}
                        <TableHead className="text-right">Curent Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                
                    {filteredCryptos && filteredCryptos.map((crypto) => {
                        const changeValue = parseFloat(crypto.change);
                        return (
                            <TableRow key={crypto.uuid}>
                                <TableCell>
                                    <img
                                        src={crypto.iconUrl}
                                        alt={crypto.name}
                                        className="w-5 h-5 rounded-full"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{crypto.name}</TableCell>
                                {changeValue > 0 ?
                                    <TableCell style={{ color: '#03c228' }} className="!text-green-500">{changeValue}%</TableCell> :
                                    <TableCell style={{ color: '#ff0000' }} className="!text-red-500">{changeValue}%</TableCell>
                                }
                                <TableCell className="text-right font-medium">{parseFloat(crypto.price).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(".", ",")}$</TableCell>  
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
