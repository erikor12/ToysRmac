export type Brand = "mctoys" | "bktoys";

export type Product = {
    id: string;
    brand: Brand;
    title: string;
    price: number;
    img?: string; // ruta relativa dentro de src/assets o URL
    desc?: string;
    year?: number;
    limited?: boolean;
};

export const PRODUCTS: Product[] = [
    // McDonald's
    {
        id: "m1",
        brand: "mctoys",
        title: "Mc Happy Toy Astronauta",
        price: 6.5,
        img: "/src/assets/mc-astronaut.png",
        desc: "Figura coleccionable de edición estándar. Plástico ABS, altura 6 cm.",
        year: 2021,
        limited: false,
    },
    {
        id: "m2",
        brand: "mctoys",
        title: "Mc Happy Toy Pirata",
        price: 7.25,
        img: "/src/assets/mc-pirata.png",
        desc: "Edición con detalles pintados a mano. Perfecto para dioramas.",
        year: 2022,
        limited: true,
    },

    // Burger King
    {
        id: "b1",
        brand: "bktoys",
        title: "BK King Robot",
        price: 7.0,
        img: "/src/assets/bk-robot.png",
        desc: "Figura articulada. Ideal para display y colección temática.",
        year: 2020,
        limited: false,
    },
    {
        id: "b2",
        brand: "bktoys",
        title: "BK King Dragón",
        price: 8.0,
        img: "/src/assets/bk-dragon.png",
        desc: "Edición limitada con base numerada. Colección 500 unidades.",
        year: 2023,
        limited: true,
    },
];

export function getProductsByBrand(brand: Brand) {
    return PRODUCTS.filter((p) => p.brand === brand);
}

export function getProduct(brand: Brand, id: string) {
    return PRODUCTS.find((p) => p.brand === brand && p.id === id);
}

