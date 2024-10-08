import { ChangeEvent, memo, useCallback, useRef, useState } from 'react';
import { Input } from "@/components/ui/input";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '../ui/navigation-menu';
import { Link } from 'react-router-dom';
import { BodyTable } from '../BodyTable/BodyTable';

const MenuBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Массив с путями для каждой страницы
    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'News', path: '/news' },
        { name: 'Contact', path: '/contact' },
    ];

    // Используем useCallback для предотвращения ненужного создания функции при каждом рендере
    const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    return (
        <div>
            <div className="p-4 max-w-full sm:max-w-4xl mx-auto">
                <NavigationMenu className="border rounded-lg shadow-md w-full mx-auto">
                    <NavigationMenuList className="w-full flex flex-col sm:flex-row">
                        {menuItems.length > 0 ? (
                            menuItems.map(({ name, path }) => (
                                <NavigationMenuItem
                                    key={name}
                                    className="p-4 text-lg w-full sm:w-auto text-center"
                                >
                                    <Link to={path} className="text-black font-semibold md:text-base hover:underline block sm:inline">
                                        {name}
                                    </Link>
                                </NavigationMenuItem>
                            ))
                        ) : (
                            <p className="p-4 text-gray-500">No items found</p>
                        )}
                    </NavigationMenuList>
                    <div className="flex flex-col sm:flex-row justify-between items-center p-4">
                        {/* Поисковая строка для мобильных устройств будет выше меню */}
                        <Input
                            ref={searchInputRef}
                            placeholder="Search..."
                            value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)}
                            onChange={handleSearchChange}  // Мемоизированная функция
                            className="mb-4 sm:mb-0 sm:mr-4 w-full sm:w-1/2 lg:w-full xl:w-[300px]"
                        />
                    </div>
                </NavigationMenu>
            </div>
            <div className="flex items-center justify-center">
                <h1 className="mb-8 text-xl md:text-2xl lg:text-3xl font-semibold text-center min-w-[300px] max-w-[600px] mx-auto">
                    List of your popular cryptocurrencies.
                </h1>
            </div>
            {/* <BodyTable searchQuery={searchQuery} /> */}
            <MemoizedBodyTable searchQuery={searchQuery} />
        </div>
    );
};

// Мемоизация компонента BodyTable
const MemoizedBodyTable = memo(BodyTable);

export default memo(MenuBar);
