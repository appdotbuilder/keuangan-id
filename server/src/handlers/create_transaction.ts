import { type CreateTransactionInput, type Transaction } from '../schema';

export async function createTransaction(input: CreateTransactionInput, userId: number): Promise<Transaction> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is creating a new transaction in the database.
    // Should validate permissions (ADMIN and SUPER_ADMIN can create transactions).
    // Should validate that category_id exists in the database.
    return Promise.resolve({
        id: 0, // Placeholder ID
        type: input.type,
        jumlah: input.jumlah,
        tanggal: input.tanggal,
        deskripsi: input.deskripsi,
        category_id: input.category_id,
        sumber_tujuan_dana: input.sumber_tujuan_dana,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date()
    } as Transaction);
}