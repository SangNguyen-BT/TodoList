import jwt from "jsonwebtoken"

function authToken(req, res, next) {
    const {authorization} = req.headers

    const token = authorization.split(" ")[1]

    if (!token) return res.status(401).json("No token, authorization denied")

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userId = decoded.userId
        next()
    } catch (error) {
        res.status(403).json("Invalid Token")
    }
}

export default authToken