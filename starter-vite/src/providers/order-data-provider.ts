import type { DataProvider } from "@refinedev/core";

const orders: any[] = [
    {
        id: 1,
        name: '#0101',
        createdAt: new Date(),
        lineItem: [
            {
                id: 1,
                product_id: 1,
                quantity: 2,
            },
            {
                id: 2,
                product_id: 5,
                quantity: 1,
            }
        ],
    },
    {
        id: 2,
        name: '#0202',
        createdAt: new Date(),
        lineItem: [
            {
                id: 3,
                product_id: 2,
                quantity: 4,
            },
            {
                id: 4,
                product_id: 3,
                quantity: 2,
            },
            {
                id: 5,
                product_id: 4,
                quantity: 1,
            },
        ],
    },
    {
        id: 3,
        name: '#0303',
        createdAt: new Date(),
        lineItem: [
            {
                id: 6,
                product_id: 2,
                quantity: 2,
            },
            {
                id: 7,
                product_id: 1,
                quantity: 3,
            },
            {
                id: 8,
                product_id: 4,
                quantity: 2,
            },
        ],
    },
];

export const OrderDataProvider: DataProvider = {
    getList: async () => {
        return {
            data: orders,
            total: orders.length
        };
    },
    
    getOne: async ({ id }) => {
        const order = orders.find(order => order.id === id);

        return order;
    },
    
    getMany: () => { throw new Error("Not implemented"); },
    create: () => { throw new Error("Not implemented"); },
    update: () => { throw new Error("Not implemented"); },
    getApiUrl: () => { throw new Error("Not implemented"); },
    deleteOne: () => { throw new Error("Not implemented"); },
};