import jwt from "jsonwebtoken";

export function VerifyAuthenticationToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ error: "Auth token not provided." })
    }

    // separa o "Bearer" to token em si no header de auth
    const [, token] = authHeader.split(" ");

    try {
        // tenta decodificar o token usando a chave no .env
        const decoded = jwt.decode(token, process.env.JWT_SECRET);

        // manda o obj com as infos do user para os controllers se precisar usar para algo
        req.user = decoded;
        return next();
    } catch {
        return res.status(401).json({ error: "Token expired or invalid." });
    }
}