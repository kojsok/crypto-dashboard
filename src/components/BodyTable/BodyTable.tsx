import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


import { FC } from "react";
import { useCryptoData } from "../Api/useCryptoData";


interface BodyTableProps {
    searchQuery: string;
}

// Основной компонент таблицы
export const BodyTable: FC<BodyTableProps> = ({searchQuery}) => {


    const { data, error, isLoading } = useCryptoData();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {(error as Error).message}</p>;

    // console.log(searchQuery);


    const filteredCryptos = Array.isArray(data)
    ? data.filter(item => {
        if (item && item.name && typeof item.name === 'string') {
            return item.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
    })
    : [];



    return (
        <div>
            <Table className="min-w-[300px] max-w-[600px] w-full table-auto border-collapse border border-gray-400 mx-auto">
                <TableCaption>www.kojs.org</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead className="w-[100px]">Name Crypto</TableHead>
                        <TableHead>Change</TableHead>
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
