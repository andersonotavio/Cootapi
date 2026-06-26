import { createTRPCReact } from "@trpc/react-query";
import type {
  AnyQueryProcedure,
  AnyMutationProcedure,
  CombinedDataTransformer,
} from "@trpc/server";
import type { TRPCErrorFormatter } from "@trpc/server";

// Mock router type for the client-only build.
// When the server is added, replace with: import type { AppRouter } from "../server/routers";

type Proc = AnyQueryProcedure | AnyMutationProcedure;

interface AppRouter {
  _def: {
    _config: {
      $types: {
        transformer: true;
        ctx: object;
        meta: object;
        errorShape: any;
      };
      transformer: CombinedDataTransformer;
      errorFormatter: TRPCErrorFormatter<any, any>;
      allowOutsideOfServer: boolean;
      isServer: boolean;
      isDev: boolean;
    };
    router: true;
    procedure?: never;
    procedures: Record<string, Record<string, Proc>>;
    record: {
      auth: { me: AnyQueryProcedure; logout: AnyMutationProcedure };
      news: { list: AnyQueryProcedure; create: AnyMutationProcedure; update: AnyMutationProcedure; delete: AnyMutationProcedure };
      events: { list: AnyQueryProcedure; create: AnyMutationProcedure; update: AnyMutationProcedure; delete: AnyMutationProcedure };
      documents: { list: AnyQueryProcedure; upload: AnyMutationProcedure; delete: AnyMutationProcedure };
      informes: { list: AnyQueryProcedure; create: AnyMutationProcedure; update: AnyMutationProcedure; delete: AnyMutationProcedure };
      memberApplications: { list: AnyQueryProcedure; create: AnyMutationProcedure; updateStatus: AnyMutationProcedure };
      contact: { list: AnyQueryProcedure; send: AnyMutationProcedure; markRead: AnyMutationProcedure };
      admin: { stats: AnyQueryProcedure };
    };
    lazy: Record<string, never>;
  };
  createCaller: (...args: any[]) => any;
}

export const trpc = createTRPCReact<AppRouter>();
