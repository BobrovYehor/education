import { useTable, useOne } from "@refinedev/core";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export const ProductDetails = () => {
    const { id } = useParams();

    const { data: productData, isLoading: productLoading } = useOne({
        resource: "products",
        id: id,
    });

    const {
        tableQueryResult: { data: ordersData, isLoading: ordersLoading },
    } = useTable({
        resource: "orders",
        filters: {
            initial: [
                {
                    field: "lineItem.product_id",
                    operator: "eq",
                    value: id,
                },
            ],
        },
    });

    if (productLoading || ordersLoading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    const product = productData?.data;

    if (!product) {
        return (
            <Box className="p-6">
                <Typography variant="h4" gutterBottom>
                    Product not found
                </Typography>
            </Box>
        );
    }

    const orders = ordersData?.data ?? [];

    return (
        <Box className="p-6">
            <Typography variant="h4" gutterBottom>
                Product Details
            </Typography>
            <Box>
                <Typography variant="h6">ID: {product.id}</Typography>
                <Typography variant="h6">Name: {product.name}</Typography>
                <Typography variant="h6">Price: {product.price}</Typography>
            </Box>
            <Box className="mt-6">
                <Typography variant="h5">Orders containing this product</Typography>
                <table>
                    <thead>
                        <tr>
                            <th className="border-b-2 border-gray-300 p-2">Order ID</th>
                            <th className="border-b-2 border-gray-300 p-2">Order Name</th>
                            <th className="border-b-2 border-gray-300 p-2">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order: any) => (
                            order.lineItem.map((item: any) => (
                                item.product_id === product.id && (
                                    <tr key={item.id}>
                                        <td className="border-b border-gray-300 p-2 text-center">{order.id}</td>
                                        <td className="border-b border-gray-300 p-2 text-center">{order.name}</td>
                                        <td className="border-b border-gray-300 p-2 text-center">{item.quantity}</td>
                                    </tr>
                                )
                            ))
                        ))}
                    </tbody>
                </table>
            </Box>
        </Box>
    );
};