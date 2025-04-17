const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization']; 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Authorization header is missing or incorrect');
        return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
    }

    const token = authHeader.split(' ')[1]; 

    const decoded = jwt.decode(token);
    console.log('Decoded Token Payload:', decoded);
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } 
    catch (err) {
        console.error('JWT verification error:', err);
        return res.status(403).json({ message: 'Unauthorized, JWT token is wrong or expired' });
    }
}
module.exports = ensureAuthenticated;
