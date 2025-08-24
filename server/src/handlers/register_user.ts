import { type RegisterUserInput, type AuthResponse } from '../schema';

export async function registerUser(input: RegisterUserInput): Promise<AuthResponse> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is registering a new user with hashed password,
    // validating email uniqueness, and returning user data with JWT token.
    return Promise.resolve({
        user: {
            id: 0, // Placeholder ID
            email: input.email,
            nama_lengkap: input.nama_lengkap,
            role: input.role || 'STAFF',
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
        },
        token: 'placeholder-jwt-token'
    } as AuthResponse);
}