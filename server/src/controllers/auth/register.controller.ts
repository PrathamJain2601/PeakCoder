import { Request, Response } from "express"
import { responseCodes } from "../../utils/response-codes.util";
import { hashPassword } from "../../utils/hash.util";
import { prisma } from "../../config/db.config";
import { createAccessToken, createRefreshToken, createVerificationToken } from "../../utils/jwt.util";
import { randomUUID } from "crypto";
import { sendToEmailQueue } from "../../utils/email.util";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

    type registerRequest = {
        name: string,
        username?: string,
        email: string,
        password: string
    }
    export const register = async (req: Request, res: Response) => {
        let { name, username, email, password }: registerRequest = req.body;

        if(!name || !email || !password ){
            return responseCodes.clientError.notFound(res, "all fields are required");
        }

        try {
            
            const hashedPassword = await hashPassword(password);
            if(!username){
                username = randomUUID();
            }
            const user = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    username: username,
                    password: hashedPassword
                }
            })

            const refreshToken = createRefreshToken(user.id);
            const accessToken = createAccessToken(user.id, user.isVerified);

            await prisma.session.create({
                data: {
                    userId: user.id,
                    token: refreshToken,
                }
            });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000 
            });

            res.setHeader("Authorization", `Bearer ${accessToken}`);

            const code = createVerificationToken(user.email);
            sendToEmailQueue({
                to: user.email,
                subject: "Welcome to Auth | Email verification Link",
                name: user.name,
                code: code
            });

            user.password = "";
            return responseCodes.success.created(res, user, "User created successfully & verification email sent");
        }
        catch (error: unknown) {
            console.log(error);
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    const targetField = error.meta?.target as string[];

                    if (targetField.includes('email')) {
                        return responseCodes.clientError.badRequest(res, "Email already exists");
                    }

                    if (targetField.includes('username')) {
                        return responseCodes.clientError.badRequest(res, "Username already exists");
                    }
                }
            }
            return responseCodes.serverError.internalServerError(res, "Internal server error");
        }
    }