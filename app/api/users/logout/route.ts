import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout Successful",
            success: true,
        });

        response.cookies.set("token", "", {
            httpOnly: true,
        });

        return response;
    } catch (error: unknown) {  // Change any to unknown
        if (error instanceof Error) {
            // Use error.message safely
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        // In case the error is not an instance of Error, return a generic message
        return NextResponse.json(
            { error: "An unknown error occurred." },
            { status: 500 }
        );
    }
}
