import { useTable } from "@refinedev/core";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useState } from "react";

export const ListOrders = () => {
    const {
        tableQueryResult: { data: ordersData, isLoading: ordersLoading },
    } = useTable({
        resource: "orders",
        pagination: { current: 1, pageSize: 10 },
    });

    const {
        tableQueryResult: { data: productsData, isLoading: productsLoading },
    } = useTable({
        resource: "products",
    });

    const [open, setOpen] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    const handleOpen = (id: any) => {
        const order = ordersData?.data.find((order: any) => order.id === id);
        setSelectedOrder(order);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedOrder(null);
    };

    if (ordersLoading || productsLoading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    const productsMap = productsData?.data.reduce((acc: any, product: any) => {
        acc[product.id] = product;
        return acc;
    }, {});

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <table className="w-full border-collapse text-center">
                <thead>
                    <tr>
                        <th className="border-b-2 border-gray-300 p-2">ID</th>
                        <th className="border-b-2 border-gray-300 p-2">Name</th>
                        <th className="border-b-2 border-gray-300 p-2">Date</th>
                        <th className="border-b-2 border-gray-300 p-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {ordersData?.data.map((order: any) => (
                        <tr key={order.id}>
                            <td className="border-b border-gray-300 p-2">{order.id}</td>
                            <td className="border-b border-gray-300 p-2">{order.name}</td>
                            <td className="border-b border-gray-300 p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="border-b border-gray-300 p-2">
                                <Button variant="outlined" onClick={() => handleOpen(order.id)}>More info</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal open={open} onClose={handleClose}>
                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white border border-black shadow-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                    {selectedOrder && (
                        <>
                            <Typography className="mt-2">
                                <b>ID:</b> {selectedOrder.id}
                            </Typography>
                            <Typography className="mt-2">
                                <b>Name:</b> {selectedOrder.name}
                            </Typography>
                            <Typography className="mt-2">
                                <b>Date:</b> {new Date(selectedOrder.createdAt).toLocaleDateString()}
                            </Typography>
                            <Typography className="mt-2">
                                <b>Products:</b>
                            </Typography>
                            <table className="w-full mt-2 border-collapse mb-4">
                                <thead>
                                    <tr>
                                        <th className="border-b-2 border-gray-300 p-2">Product ID</th>
                                        <th className="border-b-2 border-gray-300 p-2">Product Name</th>
                                        <th className="border-b-2 border-gray-300 p-2">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.lineItem.map((item: any) => (
                                        <tr key={item.id}>
                                            <td className="border-b border-gray-300 p-2 text-center">{item.product_id}</td>
                                            <td className="border-b border-gray-300 p-2 text-center">{productsMap[item.product_id]?.name}</td>
                                            <td className="border-b border-gray-300 p-2 text-center">{item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                    <Button variant="outlined" onClick={handleClose}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};