import { NextFunction, Request, RequestHandler, Response } from "express"
import { responseCodes } from "../../utils/response-codes.util.js";
import { prisma } from "../../config/db.config.js";
import { verifyPassword } from "../../utils/hash.util.js";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../../utils/jwt.util.js";

type loginRequest = {
    emailOrUsername: string,
    password: string
}

async function checkToken(token: string, userLoggedIn: string){
    if(!token){
        return true;
    }
    try{
        const decoded = verifyRefreshToken(token);
        if (!decoded || !decoded.sub) {
            return true;
        }
        
        const user = await prisma.user.findUnique({
            where: { id: decoded.sub },
        });

        if (!user) {
            return true;
        }
        
        if(user.id == userLoggedIn){
            return false;
        }
        
        return true; 
    }
    catch(e){
        console.log(e);
        throw new Error("Internal Server Error in checkToken");
        return false;
    }
}

export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { emailOrUsername, password }:loginRequest = req.body;
    const { refreshToken } = req.cookies;
    console.log("Login request received");

    console.log(emailOrUsername, password);

    if (!password || !emailOrUsername) {
        console.log("All fields are required");
        return responseCodes.clientError.notFound(res, "All fields are required");
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: emailOrUsername},
                    { username: emailOrUsername }
                ]
            },
        });
        if(!user){
            console.log("User not found");
            return responseCodes.clientError.notFound(res, "User not found");
        }

        if(user.isVerified === false){
            console.log("User is not verified");
            return responseCodes.clientError.forbidden(res, "Please verify your email first");
        }
    
        const match = await verifyPassword(password, user.password);
        if(!match){
            console.log("Wrong email or password");
            return responseCodes.clientError.forbidden(res, "wrong email or password");
        }

        const accessToken = createAccessToken(user.id, user.isVerified);
        if(await checkToken(refreshToken, user.id)){
            const newRefreshToken = createRefreshToken(user.id);
    
            await prisma.session.create({
                data: {
                    userId: user.id,
                    token: newRefreshToken,
                }
            });
    
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000 
            });
    
        }
        
        res.setHeader("Authorization", `Bearer ${accessToken}`);

        user.password = "";
        console.log("User logged in successfully");
        return responseCodes.success.ok(res, user, "Logged in successfully");
    }
    catch(error){
        console.log(error);
        return responseCodes.serverError.internalServerError(res, "Internal Error");
    }
}
