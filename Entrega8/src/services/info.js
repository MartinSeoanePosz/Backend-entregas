export const generateUserErrorInfo = (user) => {
    return 'One or more fields are invalid. Please check the information and try again.';
}
export const generateServerErrorInfo = () => {
    return 'Internal server error. Please try again later.';
}
export const generateProductErrorInfo = (product) => {
    return 'One or more fields are invalid or missing. Please check the information and try again.';
}
export const generateAddToCartErrorInfo = (cart) => {
    return 'Failed to add product to cart, try again.';
}
