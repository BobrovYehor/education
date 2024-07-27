import { useEffect, useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

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

export const ListOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    useEffect(() => {
        const storedOrders = localStorage.getItem("orders");
        const orders = storedOrders ? JSON.parse(storedOrders) : [];
        setOrders(orders);
    }, []);

    const handleOpen = (order: any) => {
        setSelectedOrder(order);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div>
            <h1>Orders</h1>
            <table style={{ width: '100%', textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>ID</th>
                        <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>Name</th>
                        <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>Date</th>
                        <th style={{ borderBottom: '2px solid #ddd', padding: '8px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order: any) => (
                        <tr key={order.id}>
                            <td style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>{order.id}</td>
                            <td style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>{order.name}</td>
                            <td style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>{order.date}</td>
                            <td style={{ borderBottom: '2px solid #ddd', padding: '8px' }}>
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
                                    {selectedOrder.products.map((product: any) => (
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