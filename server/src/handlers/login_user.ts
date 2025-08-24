import { type LoginInput, type AuthResponse } from '../schema';

export async function loginUser(input: LoginInput): Promise<AuthResponse> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is authenticating user credentials,
    // verifying password hash, and returning user data with JWT token.
    return Promise.resolve({
        user: {
            id: 1,
            email: input.email,
            nama_lengkap: 'Placeholder User',
            role: 'STAFF',
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
        },
        token: 'placeholder-jwt-token'
    } as AuthResponse);
}