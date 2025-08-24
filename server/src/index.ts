import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import { 
  registerUserInputSchema,
  loginInputSchema,
  createCategoryInputSchema,
  createTransactionInputSchema,
  updateTransactionInputSchema,
  updateUserInputSchema,
  updateCompanyProfileInputSchema,
  generateReportInputSchema,
  getTransactionsInputSchema
} from './schema';

// Import handlers
import { registerUser } from './handlers/register_user';
import { loginUser } from './handlers/login_user';
import { getUsers } from './handlers/get_users';
import { updateUser } from './handlers/update_user';
import { deleteUser } from './handlers/delete_user';
import { createCategory } from './handlers/create_category';
import { getCategories } from './handlers/get_categories';
import { updateCategory } from './handlers/update_category';
import { deleteCategory } from './handlers/delete_category';
import { createTransaction } from './handlers/create_transaction';
import { getTransactions } from './handlers/get_transactions';
import { updateTransaction } from './handlers/update_transaction';
import { deleteTransaction } from './handlers/delete_transaction';
import { getBalance } from './handlers/get_balance';
import { getCompanyProfile } from './handlers/get_company_profile';
import { updateCompanyProfile } from './handlers/update_company_profile';
import { generateReport } from './handlers/generate_report';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Authentication routes
  register: publicProcedure
    .input(registerUserInputSchema)
    .mutation(({ input }) => registerUser(input)),

  login: publicProcedure
    .input(loginInputSchema)
    .mutation(({ input }) => loginUser(input)),

  // User management routes
  getUsers: publicProcedure
    .query(() => getUsers()),

  updateUser: publicProcedure
    .input(updateUserInputSchema)
    .mutation(({ input }) => updateUser(input)),

  deleteUser: publicProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(({ input }) => deleteUser(input.userId)),

  // Category management routes
  createCategory: publicProcedure
    .input(createCategoryInputSchema)
    .mutation(({ input }) => createCategory(input)),

  getCategories: publicProcedure
    .query(() => getCategories()),

  updateCategory: publicProcedure
    .input(z.object({ id: z.number() }).merge(createCategoryInputSchema))
    .mutation(({ input }) => updateCategory(input.id, { nama: input.nama, deskripsi: input.deskripsi })),

  deleteCategory: publicProcedure
    .input(z.object({ categoryId: z.number() }))
    .mutation(({ input }) => deleteCategory(input.categoryId)),

  // Transaction management routes
  createTransaction: publicProcedure
    .input(createTransactionInputSchema)
    .mutation(({ input }) => createTransaction(input, 1)), // TODO: Get userId from auth context

  getTransactions: publicProcedure
    .input(getTransactionsInputSchema)
    .query(({ input }) => getTransactions(input)),

  updateTransaction: publicProcedure
    .input(updateTransactionInputSchema)
    .mutation(({ input }) => updateTransaction(input)),

  deleteTransaction: publicProcedure
    .input(z.object({ transactionId: z.number() }))
    .mutation(({ input }) => deleteTransaction(input.transactionId)),

  // Balance calculation
  getBalance: publicProcedure
    .input(z.object({ 
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional()
    }))
    .query(({ input }) => getBalance(input.startDate, input.endDate)),

  // Company profile routes
  getCompanyProfile: publicProcedure
    .query(() => getCompanyProfile()),

  updateCompanyProfile: publicProcedure
    .input(updateCompanyProfileInputSchema)
    .mutation(({ input }) => updateCompanyProfile(input)),

  // Report generation
  generateReport: publicProcedure
    .input(generateReportInputSchema)
    .mutation(({ input }) => generateReport(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();