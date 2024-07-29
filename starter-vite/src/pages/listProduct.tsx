import { useTable } from "@refinedev/core";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ListProducts = () => {
    const {
        tableQueryResult: { data, isLoading },
        current,
        setCurrent,
        pageCount,
    } = useTable({
        resource: "products",
        pagination: { current: 1, pageSize: 10 },
    });

    const navigate = useNavigate();

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

    return (
        <Box className="p-6">
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>
            <Box >
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b-2 border-gray-300 p-2">ID</th>
                            <th className="border-b-2 border-gray-300 p-2">Name</th>
                            <th className="border-b-2 border-gray-300 p-2">Price</th>
                            <th className="border-b-2 border-gray-300 p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((product: any) => (
                            <tr key={product.id}>
                                <td className="border-b border-gray-300 p-2 text-center">{product.id}</td>
                                <td className="border-b border-gray-300 p-2 text-center">{product.name}</td>
                                <td className="border-b border-gray-300 p-2 text-center">{product.price}</td>
                                <td className="border-b border-gray-300 p-2 text-center">
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => navigate(`/products/${product.id}`)}
                                    >
                                        View product
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>
            <Box className="flex justify-center mt-2">
                <Button variant="outlined" onClick={onPrevious} disabled={current === 1}>
                    {"<"}
                </Button>
                <Box className='mx-2'>
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
        </Box>
    );
};