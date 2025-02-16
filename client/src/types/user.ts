export type registerPayload = {
    username: string,
    name: string,
    email: string,
    password: string
}

export type loginPayload = {
    emailOrUsername: string,
    password: string
}

export type userType = {
    avatar: string,
    company: string,
    createdAt: string,
    email: string,
    id: string,
    isVerified: boolean,
    name: string,
    password: string,
    role: string,
    updatedAt: string,
    username: string
} | null