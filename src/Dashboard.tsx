// import Link from "next/link"
// import Link from "react-router-dom";
import { Link } from 'react-router-dom';

import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChangeEvent, useState } from 'react';
import { useCryptoData } from './components/Api/useCryptoData';
import { ChartCrypto } from './components/Charts/ChartCrypto';




export function Dashboard() {
  // const [valueInput, setValueInput] = useState<number>(0);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [purchases, setPurchases] = useState<any[]>([]);

  const { data } = useCryptoData();


  const calculateTotal = (purchases: any[]) => {
    return purchases.reduce((total, purchase) => {
      return total + purchase.price * purchase.quantity;
    }, 0);
  };

  const handleChangeValueInput = (uuid: string, value: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [uuid]: value,
    }));
  };

  const handleBuy = (crypto: any) => {
    const quantity = inputValues[crypto.uuid];
    if (quantity && parseFloat(quantity) > 0) {
      setPurchases((prevPurchases) => {
        const existingPurchase = prevPurchases.find(
          (purchase) => purchase.uuid === crypto.uuid
        );

        if (existingPurchase) {
          // Если покупка уже существует, обновляем количество
          return prevPurchases.map((purchase) =>
            purchase.uuid === crypto.uuid
              ? { ...purchase, quantity: purchase.quantity + parseFloat(quantity) }
              : purchase
          );
        }

        // Если такой покупки нет, добавляем новую запись
        return [
          ...prevPurchases,
          {
            uuid: crypto.uuid,
            logo: crypto.iconUrl,
            name: crypto.name,
            price: crypto.price,
            quantity: parseFloat(quantity),
          },
        ];
      });
    }
  };

  const handleSell = (uuid: string) => {
    setPurchases((prevPurchases) =>
      prevPurchases.filter((purchase) => purchase.uuid !== uuid)
    );
  };

  console.log(purchases);


  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            to="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            to="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Analytics
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link to="#" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total in wallet
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${calculateTotal(purchases).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(".", ",")}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Income per month
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales income</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Income per day</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>


        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4">
            <ChartCrypto />
          </div>
          <div className="col-span-12 md:col-span-4">
            <ChartCrypto />
          </div>
          <div className="col-span-12 md:col-span-4">
            <ChartCrypto />
          </div>
        </div>




        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-6">
          <Card
            className="xl:col-span-3" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Сryptocurrency</CardTitle>
                <CardDescription>
                  Half-cryptocurrency for your ideas
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link to="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Crypto Name</TableHead>
                    <TableHead>
                      Price
                    </TableHead>
                    <TableHead>
                      Quantity
                    </TableHead>
                    <TableHead className="text-right">Order</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data && data.slice(0, 10).map((crypto) => {
                    return (<TableRow key={crypto.uuid}>
                      <TableCell>
                        <img
                          src={crypto.iconUrl}
                          alt={crypto.name}
                          className="w-5 h-5 rounded-full"
                        />
                      </TableCell>
                      <TableCell className="">
                        {crypto.name}
                      </TableCell>
                      <TableCell className="">
                        <div className="font-medium">{parseFloat(crypto.price).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(".", ",")}$</div>
                      </TableCell>
                      <TableCell className="">
                        <Input type="number" value={inputValues[crypto.uuid] || ""} min={0} onChange={(e) => handleChangeValueInput(crypto.uuid, e.target.value)} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button type="submit" onClick={() => handleBuy(crypto)}>Buy</Button>
                      </TableCell>
                    </TableRow>)
                  })}


                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="xl:col-span-3" x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>My wallet</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <Table>
                <TableCaption>A list crypto of your wallet.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Logo</TableHead>
                    <TableHead>Crypto name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead>Price Total</TableHead>
                    <TableHead>Sell</TableHead>
                  </TableRow>
                </TableHeader>


                <TableBody>
                  {purchases && purchases.map((crypto) => {
                    return (
                      <TableRow key={crypto.uuid}>
                        <TableCell>
                          <img
                            src={crypto.logo}
                            alt={crypto.name}
                            className="w-5 h-5 rounded-full"
                          />
                        </TableCell>
                        <TableCell>{crypto.name}</TableCell>
                        <TableCell>{crypto.quantity}</TableCell>
                        <TableCell className="text-right">${parseFloat(crypto.price).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(".", ",")}</TableCell>
                        <TableCell className="text-right">${((parseFloat(crypto.price)) * crypto.quantity).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(".", ",")}</TableCell>
                        <TableCell>
                          <Button type="submit" onClick={() => handleSell(crypto.uuid)}>Sell</Button>
                        </TableCell>

                      </TableRow>
                    )
                  })}


                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}