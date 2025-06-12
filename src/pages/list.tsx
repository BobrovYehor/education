import { useState, useCallback, useMemo } from "react";
import { useTable } from "@refinedev/core";
import { Box, Button, Typography } from "@mui/material";

interface Product {
    id: string;
    name: string;
    material: string;
    price: number;
}

interface SelectedProduct {
    id: string;
    name: string;
    quantity: number;
}

interface Order {
    id: string;
    name: string;
    date: string;
    products: SelectedProduct[];
}

const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse' as const
};

const cellStyles = {
    padding: '8px',
    borderBottom: '1px solid #ddd'
};

const headerCellStyles = {
    borderBottom: '2px solid #ddd',
    padding: '8px'
};

export const ListProducts = () => {
    const {
        tableQueryResult: { data, isLoading },
        current,
        setCurrent,
        pageCount,
    } = useTable({
        pagination: { current: 1, pageSize: 10 },
    });

    const [selectedProductsMap, setSelectedProductsMap] = useState<Map<string, SelectedProduct>>(new Map());

    const selectedProducts = useMemo(() => Array.from(selectedProductsMap.values()), [selectedProductsMap]);

    const onPrevious = () => {
        if (current > 1) {
            setCurrent(current - 1);
        }
    };

    const onNext = () => {
        if (current < pageCount) {
            setCurrent(current + 1);
        }
    };

    const onPage = (page: number) => {
        setCurrent(page);
    };

    const handleAddProduct = useCallback((product: Product) => {
        setSelectedProductsMap(prevMap => {
            const newMap = new Map(prevMap);
            const existingProduct = newMap.get(product.id);
            
            if (existingProduct) {
                newMap.set(product.id, {
                    ...existingProduct,
                    quantity: existingProduct.quantity + 1
                });
            } else {
                newMap.set(product.id, {
                    id: product.id,
                    name: product.name,
                    quantity: 1
                });
            }
            
            return newMap;
        });
    }, []);

    const handleSaveOrder = useCallback(() => {
        const orderNumber = `#${1010 + Math.floor(Math.random() * 1000)}`;
        const orderDate = new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        console.log("Formatted Date:", orderDate);

        const order = {
            id: orderNumber,
            name: orderNumber,
            date: orderDate,
            products: selectedProducts,
        };

        try {
            const orders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");
            orders.push(order);
            localStorage.setItem("orders", JSON.stringify(orders));
            setSelectedProductsMap(new Map());
        } catch (error) {
            console.error("Failed to save order to localStorage:", error);
        }
    }, [selectedProducts]);

    if (isLoading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
                <table style={tableStyles}>
                    <thead>
                        <tr>
                            <th style={headerCellStyles}>ID</th>
                            <th style={headerCellStyles}>Name</th>
                            <th style={headerCellStyles}>Material</th>
                            <th style={headerCellStyles}>Price</th>
                            <th style={headerCellStyles}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((product) => (
                            <tr key={product.id}>
                                <td style={cellStyles}>{product.id}</td>
                                <td style={cellStyles}>{product.name}</td>
                                <td style={cellStyles}>{product.material}</td>
                                <td style={cellStyles}>{product.price}</td>
                                <td style={cellStyles}>
                                    <Button variant="contained" color="primary" onClick={() => handleAddProduct(product as Product)}>
                                        Add to order
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Button variant="outlined" onClick={onPrevious} disabled={current === 1}>
                    {"<"}
                </Button>
                <Box sx={{ marginX: 2 }}>
                    {current - 1 > 0 && (
                        <Button variant="text" onClick={() => onPage(current - 1)}>{current - 1}</Button>
                    )}
                    <Button variant="contained" disabled>{current}</Button>
                    {current + 1 < pageCount && (
                        <Button variant="text" onClick={() => onPage(current + 1)}>{current + 1}</Button>
                    )}
                </Box>
                <Button variant="outlined" onClick={onNext} disabled={current === pageCount}>
                    {">"}
                </Button>
            </Box>
            {selectedProducts.length > 0 && (
                <Box sx={{ marginTop: 3 }}>
                    <Typography variant="h6">Selected Products</Typography>
                    <ul>
                        {selectedProducts.map((product: SelectedProduct) => (
                            <li key={product.id}>{product.name} - {product.quantity}</li>
                        ))}
                    </ul>
                    <Button variant="contained" color="primary" onClick={handleSaveOrder}>
                        Save order
                    </Button>
                </Box>
            )}
        </Box>
    );
};
