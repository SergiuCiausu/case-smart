import Cookies from "js-cookie";

export const setCookie = (name: string, value: any, days: number) => {
    Cookies.remove(name);
    Cookies.set(name, JSON.stringify(value), { expires: days, path: "/" });
};

export const getCookie = (name: string): string | null => {
    const cookie = Cookies.get(name);
    return cookie ? decodeURIComponent(cookie) : null;
};

export const trackProductVisit = (productId: number) => {
    console.log("Tracking product:", productId);

    let visitedProducts: string[] = [];
    const cookieValue = getCookie("visited_products");
    console.log("Existing Cookie Value:", cookieValue);

    if (cookieValue) {
        try {
            visitedProducts = JSON.parse(cookieValue);
        } catch (error) {
            console.error("Error parsing cookie:", error);
            visitedProducts = [];
        }
    }

    visitedProducts = visitedProducts.filter(
        (id) => id && id !== "undefined" && id !== ""
    );

    if (!visitedProducts.includes(productId)) {
        visitedProducts.push(productId);
        console.log("Updated Visited Products:", visitedProducts);
        setCookie("visited_products", visitedProducts, 30);
    }
};