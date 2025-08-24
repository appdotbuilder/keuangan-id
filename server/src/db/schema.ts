import { serial, text, pgTable, timestamp, numeric, integer, boolean, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const transactionTypeEnum = pgEnum('transaction_type', ['PEMASUKAN', 'PENGELUARAN', 'PENGEMBALIAN']);
export const userRoleEnum = pgEnum('user_role', ['STAFF', 'ADMIN', 'SUPER_ADMIN']);

// Users table
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  nama_lengkap: text('nama_lengkap').notNull(),
  role: userRoleEnum('role').notNull().default('STAFF'),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Categories table
export const categoriesTable = pgTable('categories', {
  id: serial('id').primaryKey(),
  nama: text('nama').notNull(),
  deskripsi: text('deskripsi'), // Nullable by default
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Transactions table
export const transactionsTable = pgTable('transactions', {
  id: serial('id').primaryKey(),
  type: transactionTypeEnum('type').notNull(),
  jumlah: numeric('jumlah', { precision: 15, scale: 2 }).notNull(),
  tanggal: timestamp('tanggal').notNull(),
  deskripsi: text('deskripsi').notNull(),
  category_id: integer('category_id').notNull(),
  sumber_tujuan_dana: text('sumber_tujuan_dana').notNull(),
  user_id: integer('user_id').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Company profile table
export const companyProfileTable = pgTable('company_profile', {
  id: serial('id').primaryKey(),
  nama_perusahaan: text('nama_perusahaan').notNull(),
  alamat: text('alamat'), // Nullable by default
  telepon: text('telepon'), // Nullable by default
  email: text('email'), // Nullable by default
  website: text('website'), // Nullable by default
  logo_url: text('logo_url'), // Nullable by default
  deskripsi: text('deskripsi'), // Nullable by default
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(usersTable, ({ many }) => ({
  transactions: many(transactionsTable),
}));

export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
  transactions: many(transactionsTable),
}));

export const transactionsRelations = relations(transactionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [transactionsTable.user_id],
    references: [usersTable.id],
  }),
  category: one(categoriesTable, {
    fields: [transactionsTable.category_id],
    references: [categoriesTable.id],
  }),
}));

// TypeScript types for the table schemas
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type Category = typeof categoriesTable.$inferSelect;
export type NewCategory = typeof categoriesTable.$inferInsert;

export type Transaction = typeof transactionsTable.$inferSelect;
export type NewTransaction = typeof transactionsTable.$inferInsert;

export type CompanyProfile = typeof companyProfileTable.$inferSelect;
export type NewCompanyProfile = typeof companyProfileTable.$inferInsert;

// Export all tables and relations for proper query building
export const tables = {
  users: usersTable,
  categories: categoriesTable,
  transactions: transactionsTable,
  companyProfile: companyProfileTable,
};