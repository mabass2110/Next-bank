import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Define an interface for the decoded token
interface DecodedToken {
    email: string;
    // Add other properties from the token if necessary
}

export const getDataFromToken = (request: NextRequest): string | null => {
    try {
        const token = request.cookies.get("token")?.value || '';
        
        // Use a more specific type for the decoded token
        const decodedToken = jwt.verify(token, process.env.AUTH_SECRET!) as DecodedToken;

        return decodedToken.email;
    } catch (error: unknown) {
        // Ensure that error is an instance of Error to access message safely
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred.");
    }
}
