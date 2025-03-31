const CSPMiddleware = async (req, res, next) => {
    res.setHeader('Content-Security-Policy', 
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.paypal.com https://*.paypalobjects.com https://www.paypal.com https://www.paypal.cn https://*.paypal.cn;" +
        "style-src 'self' 'unsafe-inline' https://www.paypal.com https://*.paypal.com;" +
        "frame-src 'self' https://www.paypal.com;"
    );
    next();
};

module.exports= CSPMiddleware