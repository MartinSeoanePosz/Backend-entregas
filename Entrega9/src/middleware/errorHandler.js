import EErors from "../services/enum.js";

export default (error, req, res, next) => {
    switch (error.code) {
        case EErors.INVALID_PRODUCT:
            return res.status(400).json({
                message: error.message,
                code: EErors.INVALID_PRODUCT,
                cause: error.cause,
            });
        case EErors.AUTHENTICATION_ERROR:
            return res.status(400).json({
                message: "Invalid email or password",
                code: EErors.AUTHENTICATION_ERROR,
                cause: error.cause,
            });
        case EErors.FAILED_TO_ADD_PRODUCT:
            return res.status(500).json({
                message: "Failed to add product to cart",
                code: EErors.FAILED_TO_ADD_PRODUCT,
                cause: error.cause,
            });
        default:
            // For other errors, send a generic response
            return res.status(500).json({
                message: 'Internal server error',
                code: EErors.INTERNAL_SERVER_ERROR,
                cause: error.message,
            });
    }
}