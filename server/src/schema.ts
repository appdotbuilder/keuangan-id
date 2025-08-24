import { z } from 'zod';

// Enums for various types
export const TransactionTypeEnum = z.enum(['PEMASUKAN', 'PENGELUARAN', 'PENGEMBALIAN']);
export type TransactionType = z.infer<typeof TransactionTypeEnum>;

export const UserRoleEnum = z.enum(['STAFF', 'ADMIN', 'SUPER_ADMIN']);
export type UserRole = z.infer<typeof UserRoleEnum>;

export const ReportTypeEnum = z.enum(['RINGKASAN_BULANAN', 'RINGKASAN_TAHUNAN', 'DETAIL_HARIAN', 'DETAIL_MINGGUAN', 'DETAIL_BULANAN', 'DETAIL_TAHUNAN', 'DETAIL_RENTANG']);
export type ReportType = z.infer<typeof ReportTypeEnum>;

export const ReportFormatEnum = z.enum(['PDF', 'EXCEL']);
export type ReportFormat = z.infer<typeof ReportFormatEnum>;

// User schema
export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password_hash: z.string(),
  nama_lengkap: z.string(),
  role: UserRoleEnum,
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type User = z.infer<typeof userSchema>;

// Category schema
export const categorySchema = z.object({
  id: z.number(),
  nama: z.string(),
  deskripsi: z.string().nullable(),
  created_at: z.coerce.date()
});

export type Category = z.infer<typeof categorySchema>;

// Transaction schema
export const transactionSchema = z.object({
  id: z.number(),
  type: TransactionTypeEnum,
  jumlah: z.number(),
  tanggal: z.coerce.date(),
  deskripsi: z.string(),
  category_id: z.number(),
  sumber_tujuan_dana: z.string(),
  user_id: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Transaction = z.infer<typeof transactionSchema>;

// Company profile schema
export const companyProfileSchema = z.object({
  id: z.number(),
  nama_perusahaan: z.string(),
  alamat: z.string().nullable(),
  telepon: z.string().nullable(),
  email: z.string().email().nullable(),
  website: z.string().nullable(),
  logo_url: z.string().nullable(),
  deskripsi: z.string().nullable(),
  updated_at: z.coerce.date()
});

export type CompanyProfile = z.infer<typeof companyProfileSchema>;

// Input schemas for creating/updating data
export const registerUserInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  nama_lengkap: z.string().min(1),
  role: UserRoleEnum.optional().default('STAFF')
});

export type RegisterUserInput = z.infer<typeof registerUserInputSchema>;

export const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const createCategoryInputSchema = z.object({
  nama: z.string().min(1),
  deskripsi: z.string().nullable().optional()
});

export type CreateCategoryInput = z.infer<typeof createCategoryInputSchema>;

export const createTransactionInputSchema = z.object({
  type: TransactionTypeEnum,
  jumlah: z.number().positive(),
  tanggal: z.coerce.date(),
  deskripsi: z.string().min(1),
  category_id: z.number(),
  sumber_tujuan_dana: z.string().min(1)
});

export type CreateTransactionInput = z.infer<typeof createTransactionInputSchema>;

export const updateTransactionInputSchema = z.object({
  id: z.number(),
  type: TransactionTypeEnum.optional(),
  jumlah: z.number().positive().optional(),
  tanggal: z.coerce.date().optional(),
  deskripsi: z.string().min(1).optional(),
  category_id: z.number().optional(),
  sumber_tujuan_dana: z.string().min(1).optional()
});

export type UpdateTransactionInput = z.infer<typeof updateTransactionInputSchema>;

export const updateUserInputSchema = z.object({
  id: z.number(),
  email: z.string().email().optional(),
  nama_lengkap: z.string().min(1).optional(),
  role: UserRoleEnum.optional(),
  is_active: z.boolean().optional()
});

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

export const updateCompanyProfileInputSchema = z.object({
  nama_perusahaan: z.string().min(1).optional(),
  alamat: z.string().nullable().optional(),
  telepon: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  website: z.string().nullable().optional(),
  logo_url: z.string().nullable().optional(),
  deskripsi: z.string().nullable().optional()
});

export type UpdateCompanyProfileInput = z.infer<typeof updateCompanyProfileInputSchema>;

export const generateReportInputSchema = z.object({
  type: ReportTypeEnum,
  format: ReportFormatEnum,
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional(),
  category_id: z.number().optional()
});

export type GenerateReportInput = z.infer<typeof generateReportInputSchema>;

export const getTransactionsInputSchema = z.object({
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional(),
  category_id: z.number().optional(),
  type: TransactionTypeEnum.optional(),
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional()
});

export type GetTransactionsInput = z.infer<typeof getTransactionsInputSchema>;

// Balance calculation type
export const balanceSchema = z.object({
  total_pemasukan: z.number(),
  total_pengeluaran: z.number(),
  total_pengembalian: z.number(),
  saldo_akhir: z.number()
});

export type Balance = z.infer<typeof balanceSchema>;

// Authentication response type
export const authResponseSchema = z.object({
  user: userSchema.omit({ password_hash: true }),
  token: z.string()
});

export type AuthResponse = z.infer<typeof authResponseSchema>;