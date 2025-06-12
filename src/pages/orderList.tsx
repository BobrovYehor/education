import { useEffect, useState, useCallback } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface Order {
    id: string;
    name: string;
    date: string;
    products: Array<{
        id: string;
        name: string;
        quantity: number;
    }>;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const tableStyles = {
    width: '100%',
    textAlign: 'center' as const
};

const cellStyles = {
    borderBottom: '2px solid #ddd',
    padding: '8px'
};

export const ListOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        try {
            const storedOrders = localStorage.getItem("orders");
            const orders = storedOrders ? JSON.parse(storedOrders) : [];
            setOrders(orders);
        } catch (error) {
            console.error("Failed to load orders from localStorage:", error);
            setOrders([]);
        }
    }, []);

    const handleOpen = useCallback((order: Order) => {
        setSelectedOrder(order);
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setSelectedOrder(null);
    }, []);

    return (
        <div>
            <h1>Orders</h1>
            <table style={tableStyles}>
                <thead>
                    <tr>
                        <th style={cellStyles}>ID</th>
                        <th style={cellStyles}>Name</th>
                        <th style={cellStyles}>Date</th>
                        <th style={cellStyles}></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order: Order) => (
                        <tr key={order.id}>
                            <td style={cellStyles}>{order.id}</td>
                            <td style={cellStyles}>{order.name}</td>
                            <td style={cellStyles}>{order.date}</td>
                            <td style={cellStyles}>
                                <Button variant="outlined" onClick={() => handleOpen(order)}>More info</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <h2>Order details</h2>
                    {selectedOrder && (
                        <>
                            <Typography sx={{ mt: 2 }}>
                                <b>ID:</b> {selectedOrder.id}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                <b>Name:</b> {selectedOrder.name}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                <b>Date:</b> {selectedOrder.date}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                <b>Products:</b>
                                <ul>
                                    {selectedOrder.products.map((product) => (
                                        <li key={product.id}>
                                            {product.name} (Quantity: {product.quantity})
                                        </li>
                                    ))}
                                </ul>
                            </Typography>
                        </>
                    )}
                    <Button variant="outlined" onClick={handleClose} sx={{ mt: 2 }}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};
