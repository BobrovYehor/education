import { useState } from "react";
import { useTable } from "@refinedev/core";
import { Box, Button, Typography } from "@mui/material";

export const ListProducts = () => {
    const {
        tableQueryResult: { data, isLoading },
        current,
        setCurrent,
        pageCount,
    } = useTable({
        pagination: { current: 1, pageSize: 10 },
    });

    const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

    if (isLoading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

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

    const handleAddProduct = (product: any) => {
        setSelectedProducts((prevSelectedProducts: any[]) => {
            const existingProduct = prevSelectedProducts.find((p: any) => p.id === product.id);
            if (existingProduct) {
                return prevSelectedProducts.map((p: any) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                return [...prevSelectedProducts, { id: product.id, name: product.name, quantity: 1 }];
            }
        });
    };

    const handleSaveOrder = () => {
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

        const orders: any[] = JSON.parse(localStorage.getItem("orders") || "[]");
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));

        setSelectedProducts([]);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>ID</th>
                            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>Name</th>
                            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>Material</th>
                            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>Price</th>
                            <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((product: any) => (
                            <tr key={product.id}>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{product.id}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{product.name}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{product.material}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{product.price}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                                    <Button variant="contained" color="primary" onClick={() => handleAddProduct(product)}>
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
                        {selectedProducts.map((product: any) => (
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
