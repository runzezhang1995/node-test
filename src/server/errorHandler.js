/* eslint-disable no-unused-vars */
export default (err, req, res, next) => {
    res.status(400).json({
        success: false,
        error: err.message,
    });
};
