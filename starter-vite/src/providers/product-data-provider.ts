import type { DataProvider } from "@refinedev/core";

const products: any[] = [
  {
    id: 1,
    name: "Tea",
    price: 5.0,
  },
  {
    id: 2,
    name: "Coffee",
    price: 7.5,
  },
  {
    id: 3,
    name: "Water",
    price: 3.25,
  },
  {
    id: 4,
    name: "Juice",
    price: 6.0,
  },
  {
    id: 5,
    name: "Cola",
    price: 7.0,
  },
];

export const ProductDataProvider: DataProvider = {
  getList: async () => {
    return {
      data: products,
      total: products.length,
    };
  },

  getOne: async ({ id }) => {
    const product = products.find((product) => product.id === Number(id));
    return { data: product };
  },
  getMany: () => {
    throw new Error("Not implemented");
  },
  create: () => {
    throw new Error("Not implemented");
  },
  update: () => {
    throw new Error("Not implemented");
  },
  getApiUrl: () => {
    throw new Error("Not implemented");
  },
  deleteOne: () => {
    throw new Error("Not implemented");
  },
};
