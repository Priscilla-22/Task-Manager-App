import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/lib/axios";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                identifier: { label: "Username/Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    // Use the axios instance that's already configured with baseURL
                    const res = await axios.post("/api/auth/login", {
                        identifier: credentials?.identifier,
                        password: credentials?.password
                    });

                    if (res.data?.access_token) {
                        return {
                            id: res.data.user?.id || "",
                            name: res.data.user?.username || "",
                            email: res.data.user?.email || credentials?.identifier,
                            accessToken: res.data.access_token
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Authentication error:", error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            session.user.id = token.id as string;
            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 hours session duration
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development"
};