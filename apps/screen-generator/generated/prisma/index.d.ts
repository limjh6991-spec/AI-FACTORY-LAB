
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model post
 * 
 */
export type post = $Result.DefaultSelection<Prisma.$postPayload>
/**
 * Model product
 * 
 */
export type product = $Result.DefaultSelection<Prisma.$productPayload>
/**
 * Model sys_menu
 * 
 */
export type sys_menu = $Result.DefaultSelection<Prisma.$sys_menuPayload>
/**
 * Model sys_role
 * 
 */
export type sys_role = $Result.DefaultSelection<Prisma.$sys_rolePayload>
/**
 * Model sys_menu_role
 * 
 */
export type sys_menu_role = $Result.DefaultSelection<Prisma.$sys_menu_rolePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Products
 * const products = await prisma.product.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Products
   * const products = await prisma.product.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.postDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.productDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sys_menu`: Exposes CRUD operations for the **sys_menu** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sys_menus
    * const sys_menus = await prisma.sys_menu.findMany()
    * ```
    */
  get sys_menu(): Prisma.sys_menuDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sys_role`: Exposes CRUD operations for the **sys_role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sys_roles
    * const sys_roles = await prisma.sys_role.findMany()
    * ```
    */
  get sys_role(): Prisma.sys_roleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sys_menu_role`: Exposes CRUD operations for the **sys_menu_role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sys_menu_roles
    * const sys_menu_roles = await prisma.sys_menu_role.findMany()
    * ```
    */
  get sys_menu_role(): Prisma.sys_menu_roleDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Product: 'Product',
    post: 'post',
    product: 'product',
    sys_menu: 'sys_menu',
    sys_role: 'sys_role',
    sys_menu_role: 'sys_menu_role'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "product" | "post" | "product" | "sys_menu" | "sys_role" | "sys_menu_role"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      post: {
        payload: Prisma.$postPayload<ExtArgs>
        fields: Prisma.postFieldRefs
        operations: {
          findUnique: {
            args: Prisma.postFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.postFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          findFirst: {
            args: Prisma.postFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.postFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          findMany: {
            args: Prisma.postFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>[]
          }
          create: {
            args: Prisma.postCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          createMany: {
            args: Prisma.postCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.postCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>[]
          }
          delete: {
            args: Prisma.postDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          update: {
            args: Prisma.postUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          deleteMany: {
            args: Prisma.postDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.postUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.postUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>[]
          }
          upsert: {
            args: Prisma.postUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.postGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.postCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      product: {
        payload: Prisma.$productPayload<ExtArgs>
        fields: Prisma.productFieldRefs
        operations: {
          findUnique: {
            args: Prisma.productFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.productFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>
          }
          findFirst: {
            args: Prisma.productFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.productFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>
          }
          findMany: {
            args: Prisma.productFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>[]
          }
          create: {
            args: Prisma.productCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>
          }
          createMany: {
            args: Prisma.productCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.productCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>[]
          }
          delete: {
            args: Prisma.productDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>
          }
          update: {
            args: Prisma.productUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>
          }
          deleteMany: {
            args: Prisma.productDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.productUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.productUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>[]
          }
          upsert: {
            args: Prisma.productUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.productGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.productCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      sys_menu: {
        payload: Prisma.$sys_menuPayload<ExtArgs>
        fields: Prisma.sys_menuFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sys_menuFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menuPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sys_menuFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menuPayload>
          }
          findFirst: {
            args: Prisma.sys_menuFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menuPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sys_menuFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menuPayload>
          }
          findMany: {
            args: Prisma.sys_menuFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menuPayload>[]
          }
          create: {
            args: Prisma.sys_menuCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menuPayload>
          }
          createMany: {
            args: Prisma.sys_menuCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.sys_menuCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menuPayload>[]
          }
          delete: {
            args: Prisma.sys_menuDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menuPayload>
          }
          update: {
            args: Prisma.sys_menuUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menuPayload>
          }
          deleteMany: {
            args: Prisma.sys_menuDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sys_menuUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.sys_menuUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menuPayload>[]
          }
          upsert: {
            args: Prisma.sys_menuUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menuPayload>
          }
          aggregate: {
            args: Prisma.Sys_menuAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSys_menu>
          }
          groupBy: {
            args: Prisma.sys_menuGroupByArgs<ExtArgs>
            result: $Utils.Optional<Sys_menuGroupByOutputType>[]
          }
          count: {
            args: Prisma.sys_menuCountArgs<ExtArgs>
            result: $Utils.Optional<Sys_menuCountAggregateOutputType> | number
          }
        }
      }
      sys_role: {
        payload: Prisma.$sys_rolePayload<ExtArgs>
        fields: Prisma.sys_roleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sys_roleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_rolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sys_roleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_rolePayload>
          }
          findFirst: {
            args: Prisma.sys_roleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_rolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sys_roleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_rolePayload>
          }
          findMany: {
            args: Prisma.sys_roleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_rolePayload>[]
          }
          create: {
            args: Prisma.sys_roleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_rolePayload>
          }
          createMany: {
            args: Prisma.sys_roleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.sys_roleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_rolePayload>[]
          }
          delete: {
            args: Prisma.sys_roleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_rolePayload>
          }
          update: {
            args: Prisma.sys_roleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_rolePayload>
          }
          deleteMany: {
            args: Prisma.sys_roleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sys_roleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.sys_roleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_rolePayload>[]
          }
          upsert: {
            args: Prisma.sys_roleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_rolePayload>
          }
          aggregate: {
            args: Prisma.Sys_roleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSys_role>
          }
          groupBy: {
            args: Prisma.sys_roleGroupByArgs<ExtArgs>
            result: $Utils.Optional<Sys_roleGroupByOutputType>[]
          }
          count: {
            args: Prisma.sys_roleCountArgs<ExtArgs>
            result: $Utils.Optional<Sys_roleCountAggregateOutputType> | number
          }
        }
      }
      sys_menu_role: {
        payload: Prisma.$sys_menu_rolePayload<ExtArgs>
        fields: Prisma.sys_menu_roleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sys_menu_roleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menu_rolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sys_menu_roleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menu_rolePayload>
          }
          findFirst: {
            args: Prisma.sys_menu_roleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menu_rolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sys_menu_roleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menu_rolePayload>
          }
          findMany: {
            args: Prisma.sys_menu_roleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menu_rolePayload>[]
          }
          create: {
            args: Prisma.sys_menu_roleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menu_rolePayload>
          }
          createMany: {
            args: Prisma.sys_menu_roleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.sys_menu_roleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menu_rolePayload>[]
          }
          delete: {
            args: Prisma.sys_menu_roleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menu_rolePayload>
          }
          update: {
            args: Prisma.sys_menu_roleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menu_rolePayload>
          }
          deleteMany: {
            args: Prisma.sys_menu_roleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sys_menu_roleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.sys_menu_roleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menu_rolePayload>[]
          }
          upsert: {
            args: Prisma.sys_menu_roleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sys_menu_rolePayload>
          }
          aggregate: {
            args: Prisma.Sys_menu_roleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSys_menu_role>
          }
          groupBy: {
            args: Prisma.sys_menu_roleGroupByArgs<ExtArgs>
            result: $Utils.Optional<Sys_menu_roleGroupByOutputType>[]
          }
          count: {
            args: Prisma.sys_menu_roleCountArgs<ExtArgs>
            result: $Utils.Optional<Sys_menu_roleCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    product?: ProductOmit
    post?: postOmit
    product?: productOmit
    sys_menu?: sys_menuOmit
    sys_role?: sys_roleOmit
    sys_menu_role?: sys_menu_roleOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Sys_menuCountOutputType
   */

  export type Sys_menuCountOutputType = {
    children: number
    menu_roles: number
  }

  export type Sys_menuCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | Sys_menuCountOutputTypeCountChildrenArgs
    menu_roles?: boolean | Sys_menuCountOutputTypeCountMenu_rolesArgs
  }

  // Custom InputTypes
  /**
   * Sys_menuCountOutputType without action
   */
  export type Sys_menuCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sys_menuCountOutputType
     */
    select?: Sys_menuCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Sys_menuCountOutputType without action
   */
  export type Sys_menuCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sys_menuWhereInput
  }

  /**
   * Sys_menuCountOutputType without action
   */
  export type Sys_menuCountOutputTypeCountMenu_rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sys_menu_roleWhereInput
  }


  /**
   * Count Type Sys_roleCountOutputType
   */

  export type Sys_roleCountOutputType = {
    menu_roles: number
  }

  export type Sys_roleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menu_roles?: boolean | Sys_roleCountOutputTypeCountMenu_rolesArgs
  }

  // Custom InputTypes
  /**
   * Sys_roleCountOutputType without action
   */
  export type Sys_roleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sys_roleCountOutputType
     */
    select?: Sys_roleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Sys_roleCountOutputType without action
   */
  export type Sys_roleCountOutputTypeCountMenu_rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sys_menu_roleWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    id: number | null
    price: Decimal | null
    stock: number | null
  }

  export type ProductSumAggregateOutputType = {
    id: number | null
    price: Decimal | null
    stock: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: number | null
    productCode: string | null
    productName: string | null
    category: string | null
    price: Decimal | null
    stock: number | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
  }

  export type ProductMaxAggregateOutputType = {
    id: number | null
    productCode: string | null
    productName: string | null
    category: string | null
    price: Decimal | null
    stock: number | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    productCode: number
    productName: number
    category: number
    price: number
    stock: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    createdBy: number
    updatedBy: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    id?: true
    price?: true
    stock?: true
  }

  export type ProductSumAggregateInputType = {
    id?: true
    price?: true
    stock?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    productCode?: true
    productName?: true
    category?: true
    price?: true
    stock?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    productCode?: true
    productName?: true
    category?: true
    price?: true
    stock?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    productCode?: true
    productName?: true
    category?: true
    price?: true
    stock?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: number
    productCode: string
    productName: string
    category: string
    price: Decimal
    stock: number
    description: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    createdBy: string | null
    updatedBy: string | null
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productCode?: boolean
    productName?: boolean
    category?: boolean
    price?: boolean
    stock?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productCode?: boolean
    productName?: boolean
    category?: boolean
    price?: boolean
    stock?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productCode?: boolean
    productName?: boolean
    category?: boolean
    price?: boolean
    stock?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    productCode?: boolean
    productName?: boolean
    category?: boolean
    price?: boolean
    stock?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productCode" | "productName" | "category" | "price" | "stock" | "description" | "isActive" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy", ExtArgs["result"]["product"]>

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      productCode: string
      productName: string
      category: string
      price: Prisma.Decimal
      stock: number
      description: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      createdBy: string | null
      updatedBy: string | null
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'Int'>
    readonly productCode: FieldRef<"Product", 'String'>
    readonly productName: FieldRef<"Product", 'String'>
    readonly category: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Decimal'>
    readonly stock: FieldRef<"Product", 'Int'>
    readonly description: FieldRef<"Product", 'String'>
    readonly isActive: FieldRef<"Product", 'Boolean'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
    readonly createdBy: FieldRef<"Product", 'String'>
    readonly updatedBy: FieldRef<"Product", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
  }


  /**
   * Model post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    id: number | null
  }

  export type PostSumAggregateOutputType = {
    id: number | null
  }

  export type PostMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    id?: true
  }

  export type PostSumAggregateInputType = {
    id?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which post to aggregate.
     */
    where?: postWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of posts to fetch.
     */
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: postWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type postGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: postWhereInput
    orderBy?: postOrderByWithAggregationInput | postOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: postScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends postGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type postSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["post"]>

  export type postSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["post"]>

  export type postSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["post"]>

  export type postSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type postOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["post"]>

  export type $postPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "post"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type postGetPayload<S extends boolean | null | undefined | postDefaultArgs> = $Result.GetResult<Prisma.$postPayload, S>

  type postCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<postFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface postDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['post'], meta: { name: 'post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {postFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends postFindUniqueArgs>(args: SelectSubset<T, postFindUniqueArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {postFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends postFindUniqueOrThrowArgs>(args: SelectSubset<T, postFindUniqueOrThrowArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends postFindFirstArgs>(args?: SelectSubset<T, postFindFirstArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends postFindFirstOrThrowArgs>(args?: SelectSubset<T, postFindFirstOrThrowArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends postFindManyArgs>(args?: SelectSubset<T, postFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {postCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends postCreateArgs>(args: SelectSubset<T, postCreateArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {postCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends postCreateManyArgs>(args?: SelectSubset<T, postCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {postCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends postCreateManyAndReturnArgs>(args?: SelectSubset<T, postCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {postDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends postDeleteArgs>(args: SelectSubset<T, postDeleteArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {postUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends postUpdateArgs>(args: SelectSubset<T, postUpdateArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {postDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends postDeleteManyArgs>(args?: SelectSubset<T, postDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends postUpdateManyArgs>(args: SelectSubset<T, postUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {postUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends postUpdateManyAndReturnArgs>(args: SelectSubset<T, postUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {postUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends postUpsertArgs>(args: SelectSubset<T, postUpsertArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends postCountArgs>(
      args?: Subset<T, postCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends postGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: postGroupByArgs['orderBy'] }
        : { orderBy?: postGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, postGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the post model
   */
  readonly fields: postFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__postClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the post model
   */
  interface postFieldRefs {
    readonly id: FieldRef<"post", 'Int'>
    readonly name: FieldRef<"post", 'String'>
    readonly createdAt: FieldRef<"post", 'DateTime'>
    readonly updatedAt: FieldRef<"post", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * post findUnique
   */
  export type postFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Filter, which post to fetch.
     */
    where: postWhereUniqueInput
  }

  /**
   * post findUniqueOrThrow
   */
  export type postFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Filter, which post to fetch.
     */
    where: postWhereUniqueInput
  }

  /**
   * post findFirst
   */
  export type postFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Filter, which post to fetch.
     */
    where?: postWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of posts to fetch.
     */
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for posts.
     */
    cursor?: postWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * post findFirstOrThrow
   */
  export type postFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Filter, which post to fetch.
     */
    where?: postWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of posts to fetch.
     */
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for posts.
     */
    cursor?: postWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * post findMany
   */
  export type postFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Filter, which posts to fetch.
     */
    where?: postWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of posts to fetch.
     */
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing posts.
     */
    cursor?: postWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * post create
   */
  export type postCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * The data needed to create a post.
     */
    data: XOR<postCreateInput, postUncheckedCreateInput>
  }

  /**
   * post createMany
   */
  export type postCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many posts.
     */
    data: postCreateManyInput | postCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * post createManyAndReturn
   */
  export type postCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * The data used to create many posts.
     */
    data: postCreateManyInput | postCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * post update
   */
  export type postUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * The data needed to update a post.
     */
    data: XOR<postUpdateInput, postUncheckedUpdateInput>
    /**
     * Choose, which post to update.
     */
    where: postWhereUniqueInput
  }

  /**
   * post updateMany
   */
  export type postUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update posts.
     */
    data: XOR<postUpdateManyMutationInput, postUncheckedUpdateManyInput>
    /**
     * Filter which posts to update
     */
    where?: postWhereInput
    /**
     * Limit how many posts to update.
     */
    limit?: number
  }

  /**
   * post updateManyAndReturn
   */
  export type postUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * The data used to update posts.
     */
    data: XOR<postUpdateManyMutationInput, postUncheckedUpdateManyInput>
    /**
     * Filter which posts to update
     */
    where?: postWhereInput
    /**
     * Limit how many posts to update.
     */
    limit?: number
  }

  /**
   * post upsert
   */
  export type postUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * The filter to search for the post to update in case it exists.
     */
    where: postWhereUniqueInput
    /**
     * In case the post found by the `where` argument doesn't exist, create a new post with this data.
     */
    create: XOR<postCreateInput, postUncheckedCreateInput>
    /**
     * In case the post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<postUpdateInput, postUncheckedUpdateInput>
  }

  /**
   * post delete
   */
  export type postDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Filter which post to delete.
     */
    where: postWhereUniqueInput
  }

  /**
   * post deleteMany
   */
  export type postDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which posts to delete
     */
    where?: postWhereInput
    /**
     * Limit how many posts to delete.
     */
    limit?: number
  }

  /**
   * post without action
   */
  export type postDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
  }


  /**
   * Model product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    id: number | null
    price: Decimal | null
    stock: number | null
  }

  export type ProductSumAggregateOutputType = {
    id: number | null
    price: Decimal | null
    stock: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: number | null
    productCode: string | null
    productName: string | null
    category: string | null
    price: Decimal | null
    stock: number | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
  }

  export type ProductMaxAggregateOutputType = {
    id: number | null
    productCode: string | null
    productName: string | null
    category: string | null
    price: Decimal | null
    stock: number | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
    updatedBy: string | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    productCode: number
    productName: number
    category: number
    price: number
    stock: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    createdBy: number
    updatedBy: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    id?: true
    price?: true
    stock?: true
  }

  export type ProductSumAggregateInputType = {
    id?: true
    price?: true
    stock?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    productCode?: true
    productName?: true
    category?: true
    price?: true
    stock?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    productCode?: true
    productName?: true
    category?: true
    price?: true
    stock?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    productCode?: true
    productName?: true
    category?: true
    price?: true
    stock?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    updatedBy?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which product to aggregate.
     */
    where?: productWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of products to fetch.
     */
    orderBy?: productOrderByWithRelationInput | productOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: productWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type productGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: productWhereInput
    orderBy?: productOrderByWithAggregationInput | productOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: productScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: number
    productCode: string
    productName: string
    category: string
    price: Decimal
    stock: number
    description: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    createdBy: string | null
    updatedBy: string | null
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends productGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type productSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productCode?: boolean
    productName?: boolean
    category?: boolean
    price?: boolean
    stock?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["product"]>

  export type productSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productCode?: boolean
    productName?: boolean
    category?: boolean
    price?: boolean
    stock?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["product"]>

  export type productSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productCode?: boolean
    productName?: boolean
    category?: boolean
    price?: boolean
    stock?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["product"]>

  export type productSelectScalar = {
    id?: boolean
    productCode?: boolean
    productName?: boolean
    category?: boolean
    price?: boolean
    stock?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    updatedBy?: boolean
  }

  export type productOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productCode" | "productName" | "category" | "price" | "stock" | "description" | "isActive" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy", ExtArgs["result"]["product"]>

  export type $productPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "product"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      productCode: string
      productName: string
      category: string
      price: Prisma.Decimal
      stock: number
      description: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      createdBy: string | null
      updatedBy: string | null
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type productGetPayload<S extends boolean | null | undefined | productDefaultArgs> = $Result.GetResult<Prisma.$productPayload, S>

  type productCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<productFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface productDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['product'], meta: { name: 'product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {productFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends productFindUniqueArgs>(args: SelectSubset<T, productFindUniqueArgs<ExtArgs>>): Prisma__productClient<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {productFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends productFindUniqueOrThrowArgs>(args: SelectSubset<T, productFindUniqueOrThrowArgs<ExtArgs>>): Prisma__productClient<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends productFindFirstArgs>(args?: SelectSubset<T, productFindFirstArgs<ExtArgs>>): Prisma__productClient<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends productFindFirstOrThrowArgs>(args?: SelectSubset<T, productFindFirstOrThrowArgs<ExtArgs>>): Prisma__productClient<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends productFindManyArgs>(args?: SelectSubset<T, productFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {productCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends productCreateArgs>(args: SelectSubset<T, productCreateArgs<ExtArgs>>): Prisma__productClient<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {productCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends productCreateManyArgs>(args?: SelectSubset<T, productCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {productCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends productCreateManyAndReturnArgs>(args?: SelectSubset<T, productCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {productDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends productDeleteArgs>(args: SelectSubset<T, productDeleteArgs<ExtArgs>>): Prisma__productClient<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {productUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends productUpdateArgs>(args: SelectSubset<T, productUpdateArgs<ExtArgs>>): Prisma__productClient<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {productDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends productDeleteManyArgs>(args?: SelectSubset<T, productDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends productUpdateManyArgs>(args: SelectSubset<T, productUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {productUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends productUpdateManyAndReturnArgs>(args: SelectSubset<T, productUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {productUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends productUpsertArgs>(args: SelectSubset<T, productUpsertArgs<ExtArgs>>): Prisma__productClient<$Result.GetResult<Prisma.$productPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends productCountArgs>(
      args?: Subset<T, productCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends productGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: productGroupByArgs['orderBy'] }
        : { orderBy?: productGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, productGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the product model
   */
  readonly fields: productFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__productClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the product model
   */
  interface productFieldRefs {
    readonly id: FieldRef<"product", 'Int'>
    readonly productCode: FieldRef<"product", 'String'>
    readonly productName: FieldRef<"product", 'String'>
    readonly category: FieldRef<"product", 'String'>
    readonly price: FieldRef<"product", 'Decimal'>
    readonly stock: FieldRef<"product", 'Int'>
    readonly description: FieldRef<"product", 'String'>
    readonly isActive: FieldRef<"product", 'Boolean'>
    readonly createdAt: FieldRef<"product", 'DateTime'>
    readonly updatedAt: FieldRef<"product", 'DateTime'>
    readonly createdBy: FieldRef<"product", 'String'>
    readonly updatedBy: FieldRef<"product", 'String'>
  }
    

  // Custom InputTypes
  /**
   * product findUnique
   */
  export type productFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * Filter, which product to fetch.
     */
    where: productWhereUniqueInput
  }

  /**
   * product findUniqueOrThrow
   */
  export type productFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * Filter, which product to fetch.
     */
    where: productWhereUniqueInput
  }

  /**
   * product findFirst
   */
  export type productFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * Filter, which product to fetch.
     */
    where?: productWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of products to fetch.
     */
    orderBy?: productOrderByWithRelationInput | productOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for products.
     */
    cursor?: productWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * product findFirstOrThrow
   */
  export type productFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * Filter, which product to fetch.
     */
    where?: productWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of products to fetch.
     */
    orderBy?: productOrderByWithRelationInput | productOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for products.
     */
    cursor?: productWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * product findMany
   */
  export type productFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * Filter, which products to fetch.
     */
    where?: productWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of products to fetch.
     */
    orderBy?: productOrderByWithRelationInput | productOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing products.
     */
    cursor?: productWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * product create
   */
  export type productCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * The data needed to create a product.
     */
    data: XOR<productCreateInput, productUncheckedCreateInput>
  }

  /**
   * product createMany
   */
  export type productCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many products.
     */
    data: productCreateManyInput | productCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * product createManyAndReturn
   */
  export type productCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * The data used to create many products.
     */
    data: productCreateManyInput | productCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * product update
   */
  export type productUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * The data needed to update a product.
     */
    data: XOR<productUpdateInput, productUncheckedUpdateInput>
    /**
     * Choose, which product to update.
     */
    where: productWhereUniqueInput
  }

  /**
   * product updateMany
   */
  export type productUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update products.
     */
    data: XOR<productUpdateManyMutationInput, productUncheckedUpdateManyInput>
    /**
     * Filter which products to update
     */
    where?: productWhereInput
    /**
     * Limit how many products to update.
     */
    limit?: number
  }

  /**
   * product updateManyAndReturn
   */
  export type productUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * The data used to update products.
     */
    data: XOR<productUpdateManyMutationInput, productUncheckedUpdateManyInput>
    /**
     * Filter which products to update
     */
    where?: productWhereInput
    /**
     * Limit how many products to update.
     */
    limit?: number
  }

  /**
   * product upsert
   */
  export type productUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * The filter to search for the product to update in case it exists.
     */
    where: productWhereUniqueInput
    /**
     * In case the product found by the `where` argument doesn't exist, create a new product with this data.
     */
    create: XOR<productCreateInput, productUncheckedCreateInput>
    /**
     * In case the product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<productUpdateInput, productUncheckedUpdateInput>
  }

  /**
   * product delete
   */
  export type productDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
    /**
     * Filter which product to delete.
     */
    where: productWhereUniqueInput
  }

  /**
   * product deleteMany
   */
  export type productDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which products to delete
     */
    where?: productWhereInput
    /**
     * Limit how many products to delete.
     */
    limit?: number
  }

  /**
   * product without action
   */
  export type productDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the product
     */
    select?: productSelect<ExtArgs> | null
    /**
     * Omit specific fields from the product
     */
    omit?: productOmit<ExtArgs> | null
  }


  /**
   * Model sys_menu
   */

  export type AggregateSys_menu = {
    _count: Sys_menuCountAggregateOutputType | null
    _avg: Sys_menuAvgAggregateOutputType | null
    _sum: Sys_menuSumAggregateOutputType | null
    _min: Sys_menuMinAggregateOutputType | null
    _max: Sys_menuMaxAggregateOutputType | null
  }

  export type Sys_menuAvgAggregateOutputType = {
    menu_level: number | null
    sort_order: number | null
  }

  export type Sys_menuSumAggregateOutputType = {
    menu_level: number | null
    sort_order: number | null
  }

  export type Sys_menuMinAggregateOutputType = {
    menu_id: string | null
    parent_id: string | null
    menu_level: number | null
    sort_order: number | null
    menu_name: string | null
    menu_name_en: string | null
    menu_path: string | null
    menu_icon: string | null
    screen_id: string | null
    screen_type: string | null
    is_active: boolean | null
    is_visible: boolean | null
    badge_text: string | null
    badge_type: string | null
    created_by: string | null
    created_at: Date | null
    updated_by: string | null
    updated_at: Date | null
  }

  export type Sys_menuMaxAggregateOutputType = {
    menu_id: string | null
    parent_id: string | null
    menu_level: number | null
    sort_order: number | null
    menu_name: string | null
    menu_name_en: string | null
    menu_path: string | null
    menu_icon: string | null
    screen_id: string | null
    screen_type: string | null
    is_active: boolean | null
    is_visible: boolean | null
    badge_text: string | null
    badge_type: string | null
    created_by: string | null
    created_at: Date | null
    updated_by: string | null
    updated_at: Date | null
  }

  export type Sys_menuCountAggregateOutputType = {
    menu_id: number
    parent_id: number
    menu_level: number
    sort_order: number
    menu_name: number
    menu_name_en: number
    menu_path: number
    menu_icon: number
    screen_id: number
    screen_type: number
    is_active: number
    is_visible: number
    badge_text: number
    badge_type: number
    created_by: number
    created_at: number
    updated_by: number
    updated_at: number
    _all: number
  }


  export type Sys_menuAvgAggregateInputType = {
    menu_level?: true
    sort_order?: true
  }

  export type Sys_menuSumAggregateInputType = {
    menu_level?: true
    sort_order?: true
  }

  export type Sys_menuMinAggregateInputType = {
    menu_id?: true
    parent_id?: true
    menu_level?: true
    sort_order?: true
    menu_name?: true
    menu_name_en?: true
    menu_path?: true
    menu_icon?: true
    screen_id?: true
    screen_type?: true
    is_active?: true
    is_visible?: true
    badge_text?: true
    badge_type?: true
    created_by?: true
    created_at?: true
    updated_by?: true
    updated_at?: true
  }

  export type Sys_menuMaxAggregateInputType = {
    menu_id?: true
    parent_id?: true
    menu_level?: true
    sort_order?: true
    menu_name?: true
    menu_name_en?: true
    menu_path?: true
    menu_icon?: true
    screen_id?: true
    screen_type?: true
    is_active?: true
    is_visible?: true
    badge_text?: true
    badge_type?: true
    created_by?: true
    created_at?: true
    updated_by?: true
    updated_at?: true
  }

  export type Sys_menuCountAggregateInputType = {
    menu_id?: true
    parent_id?: true
    menu_level?: true
    sort_order?: true
    menu_name?: true
    menu_name_en?: true
    menu_path?: true
    menu_icon?: true
    screen_id?: true
    screen_type?: true
    is_active?: true
    is_visible?: true
    badge_text?: true
    badge_type?: true
    created_by?: true
    created_at?: true
    updated_by?: true
    updated_at?: true
    _all?: true
  }

  export type Sys_menuAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sys_menu to aggregate.
     */
    where?: sys_menuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sys_menus to fetch.
     */
    orderBy?: sys_menuOrderByWithRelationInput | sys_menuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sys_menuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sys_menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sys_menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sys_menus
    **/
    _count?: true | Sys_menuCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Sys_menuAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Sys_menuSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Sys_menuMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Sys_menuMaxAggregateInputType
  }

  export type GetSys_menuAggregateType<T extends Sys_menuAggregateArgs> = {
        [P in keyof T & keyof AggregateSys_menu]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSys_menu[P]>
      : GetScalarType<T[P], AggregateSys_menu[P]>
  }




  export type sys_menuGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sys_menuWhereInput
    orderBy?: sys_menuOrderByWithAggregationInput | sys_menuOrderByWithAggregationInput[]
    by: Sys_menuScalarFieldEnum[] | Sys_menuScalarFieldEnum
    having?: sys_menuScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Sys_menuCountAggregateInputType | true
    _avg?: Sys_menuAvgAggregateInputType
    _sum?: Sys_menuSumAggregateInputType
    _min?: Sys_menuMinAggregateInputType
    _max?: Sys_menuMaxAggregateInputType
  }

  export type Sys_menuGroupByOutputType = {
    menu_id: string
    parent_id: string | null
    menu_level: number
    sort_order: number
    menu_name: string
    menu_name_en: string | null
    menu_path: string | null
    menu_icon: string | null
    screen_id: string | null
    screen_type: string
    is_active: boolean
    is_visible: boolean
    badge_text: string | null
    badge_type: string | null
    created_by: string | null
    created_at: Date
    updated_by: string | null
    updated_at: Date
    _count: Sys_menuCountAggregateOutputType | null
    _avg: Sys_menuAvgAggregateOutputType | null
    _sum: Sys_menuSumAggregateOutputType | null
    _min: Sys_menuMinAggregateOutputType | null
    _max: Sys_menuMaxAggregateOutputType | null
  }

  type GetSys_menuGroupByPayload<T extends sys_menuGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Sys_menuGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Sys_menuGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Sys_menuGroupByOutputType[P]>
            : GetScalarType<T[P], Sys_menuGroupByOutputType[P]>
        }
      >
    >


  export type sys_menuSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    menu_id?: boolean
    parent_id?: boolean
    menu_level?: boolean
    sort_order?: boolean
    menu_name?: boolean
    menu_name_en?: boolean
    menu_path?: boolean
    menu_icon?: boolean
    screen_id?: boolean
    screen_type?: boolean
    is_active?: boolean
    is_visible?: boolean
    badge_text?: boolean
    badge_type?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_by?: boolean
    updated_at?: boolean
    parent?: boolean | sys_menu$parentArgs<ExtArgs>
    children?: boolean | sys_menu$childrenArgs<ExtArgs>
    menu_roles?: boolean | sys_menu$menu_rolesArgs<ExtArgs>
    _count?: boolean | Sys_menuCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sys_menu"]>

  export type sys_menuSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    menu_id?: boolean
    parent_id?: boolean
    menu_level?: boolean
    sort_order?: boolean
    menu_name?: boolean
    menu_name_en?: boolean
    menu_path?: boolean
    menu_icon?: boolean
    screen_id?: boolean
    screen_type?: boolean
    is_active?: boolean
    is_visible?: boolean
    badge_text?: boolean
    badge_type?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_by?: boolean
    updated_at?: boolean
    parent?: boolean | sys_menu$parentArgs<ExtArgs>
  }, ExtArgs["result"]["sys_menu"]>

  export type sys_menuSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    menu_id?: boolean
    parent_id?: boolean
    menu_level?: boolean
    sort_order?: boolean
    menu_name?: boolean
    menu_name_en?: boolean
    menu_path?: boolean
    menu_icon?: boolean
    screen_id?: boolean
    screen_type?: boolean
    is_active?: boolean
    is_visible?: boolean
    badge_text?: boolean
    badge_type?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_by?: boolean
    updated_at?: boolean
    parent?: boolean | sys_menu$parentArgs<ExtArgs>
  }, ExtArgs["result"]["sys_menu"]>

  export type sys_menuSelectScalar = {
    menu_id?: boolean
    parent_id?: boolean
    menu_level?: boolean
    sort_order?: boolean
    menu_name?: boolean
    menu_name_en?: boolean
    menu_path?: boolean
    menu_icon?: boolean
    screen_id?: boolean
    screen_type?: boolean
    is_active?: boolean
    is_visible?: boolean
    badge_text?: boolean
    badge_type?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_by?: boolean
    updated_at?: boolean
  }

  export type sys_menuOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"menu_id" | "parent_id" | "menu_level" | "sort_order" | "menu_name" | "menu_name_en" | "menu_path" | "menu_icon" | "screen_id" | "screen_type" | "is_active" | "is_visible" | "badge_text" | "badge_type" | "created_by" | "created_at" | "updated_by" | "updated_at", ExtArgs["result"]["sys_menu"]>
  export type sys_menuInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | sys_menu$parentArgs<ExtArgs>
    children?: boolean | sys_menu$childrenArgs<ExtArgs>
    menu_roles?: boolean | sys_menu$menu_rolesArgs<ExtArgs>
    _count?: boolean | Sys_menuCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type sys_menuIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | sys_menu$parentArgs<ExtArgs>
  }
  export type sys_menuIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | sys_menu$parentArgs<ExtArgs>
  }

  export type $sys_menuPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "sys_menu"
    objects: {
      parent: Prisma.$sys_menuPayload<ExtArgs> | null
      children: Prisma.$sys_menuPayload<ExtArgs>[]
      menu_roles: Prisma.$sys_menu_rolePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      menu_id: string
      parent_id: string | null
      menu_level: number
      sort_order: number
      menu_name: string
      menu_name_en: string | null
      menu_path: string | null
      menu_icon: string | null
      screen_id: string | null
      screen_type: string
      is_active: boolean
      is_visible: boolean
      badge_text: string | null
      badge_type: string | null
      created_by: string | null
      created_at: Date
      updated_by: string | null
      updated_at: Date
    }, ExtArgs["result"]["sys_menu"]>
    composites: {}
  }

  type sys_menuGetPayload<S extends boolean | null | undefined | sys_menuDefaultArgs> = $Result.GetResult<Prisma.$sys_menuPayload, S>

  type sys_menuCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<sys_menuFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Sys_menuCountAggregateInputType | true
    }

  export interface sys_menuDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['sys_menu'], meta: { name: 'sys_menu' } }
    /**
     * Find zero or one Sys_menu that matches the filter.
     * @param {sys_menuFindUniqueArgs} args - Arguments to find a Sys_menu
     * @example
     * // Get one Sys_menu
     * const sys_menu = await prisma.sys_menu.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sys_menuFindUniqueArgs>(args: SelectSubset<T, sys_menuFindUniqueArgs<ExtArgs>>): Prisma__sys_menuClient<$Result.GetResult<Prisma.$sys_menuPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sys_menu that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {sys_menuFindUniqueOrThrowArgs} args - Arguments to find a Sys_menu
     * @example
     * // Get one Sys_menu
     * const sys_menu = await prisma.sys_menu.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sys_menuFindUniqueOrThrowArgs>(args: SelectSubset<T, sys_menuFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sys_menuClient<$Result.GetResult<Prisma.$sys_menuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sys_menu that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_menuFindFirstArgs} args - Arguments to find a Sys_menu
     * @example
     * // Get one Sys_menu
     * const sys_menu = await prisma.sys_menu.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sys_menuFindFirstArgs>(args?: SelectSubset<T, sys_menuFindFirstArgs<ExtArgs>>): Prisma__sys_menuClient<$Result.GetResult<Prisma.$sys_menuPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sys_menu that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_menuFindFirstOrThrowArgs} args - Arguments to find a Sys_menu
     * @example
     * // Get one Sys_menu
     * const sys_menu = await prisma.sys_menu.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sys_menuFindFirstOrThrowArgs>(args?: SelectSubset<T, sys_menuFindFirstOrThrowArgs<ExtArgs>>): Prisma__sys_menuClient<$Result.GetResult<Prisma.$sys_menuPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sys_menus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_menuFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sys_menus
     * const sys_menus = await prisma.sys_menu.findMany()
     * 
     * // Get first 10 Sys_menus
     * const sys_menus = await prisma.sys_menu.findMany({ take: 10 })
     * 
     * // Only select the `menu_id`
     * const sys_menuWithMenu_idOnly = await prisma.sys_menu.findMany({ select: { menu_id: true } })
     * 
     */
    findMany<T extends sys_menuFindManyArgs>(args?: SelectSubset<T, sys_menuFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sys_menuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sys_menu.
     * @param {sys_menuCreateArgs} args - Arguments to create a Sys_menu.
     * @example
     * // Create one Sys_menu
     * const Sys_menu = await prisma.sys_menu.create({
     *   data: {
     *     // ... data to create a Sys_menu
     *   }
     * })
     * 
     */
    create<T extends sys_menuCreateArgs>(args: SelectSubset<T, sys_menuCreateArgs<ExtArgs>>): Prisma__sys_menuClient<$Result.GetResult<Prisma.$sys_menuPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sys_menus.
     * @param {sys_menuCreateManyArgs} args - Arguments to create many Sys_menus.
     * @example
     * // Create many Sys_menus
     * const sys_menu = await prisma.sys_menu.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sys_menuCreateManyArgs>(args?: SelectSubset<T, sys_menuCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sys_menus and returns the data saved in the database.
     * @param {sys_menuCreateManyAndReturnArgs} args - Arguments to create many Sys_menus.
     * @example
     * // Create many Sys_menus
     * const sys_menu = await prisma.sys_menu.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sys_menus and only return the `menu_id`
     * const sys_menuWithMenu_idOnly = await prisma.sys_menu.createManyAndReturn({
     *   select: { menu_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends sys_menuCreateManyAndReturnArgs>(args?: SelectSubset<T, sys_menuCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sys_menuPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sys_menu.
     * @param {sys_menuDeleteArgs} args - Arguments to delete one Sys_menu.
     * @example
     * // Delete one Sys_menu
     * const Sys_menu = await prisma.sys_menu.delete({
     *   where: {
     *     // ... filter to delete one Sys_menu
     *   }
     * })
     * 
     */
    delete<T extends sys_menuDeleteArgs>(args: SelectSubset<T, sys_menuDeleteArgs<ExtArgs>>): Prisma__sys_menuClient<$Result.GetResult<Prisma.$sys_menuPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sys_menu.
     * @param {sys_menuUpdateArgs} args - Arguments to update one Sys_menu.
     * @example
     * // Update one Sys_menu
     * const sys_menu = await prisma.sys_menu.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sys_menuUpdateArgs>(args: SelectSubset<T, sys_menuUpdateArgs<ExtArgs>>): Prisma__sys_menuClient<$Result.GetResult<Prisma.$sys_menuPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sys_menus.
     * @param {sys_menuDeleteManyArgs} args - Arguments to filter Sys_menus to delete.
     * @example
     * // Delete a few Sys_menus
     * const { count } = await prisma.sys_menu.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sys_menuDeleteManyArgs>(args?: SelectSubset<T, sys_menuDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sys_menus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_menuUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sys_menus
     * const sys_menu = await prisma.sys_menu.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sys_menuUpdateManyArgs>(args: SelectSubset<T, sys_menuUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sys_menus and returns the data updated in the database.
     * @param {sys_menuUpdateManyAndReturnArgs} args - Arguments to update many Sys_menus.
     * @example
     * // Update many Sys_menus
     * const sys_menu = await prisma.sys_menu.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sys_menus and only return the `menu_id`
     * const sys_menuWithMenu_idOnly = await prisma.sys_menu.updateManyAndReturn({
     *   select: { menu_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends sys_menuUpdateManyAndReturnArgs>(args: SelectSubset<T, sys_menuUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sys_menuPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sys_menu.
     * @param {sys_menuUpsertArgs} args - Arguments to update or create a Sys_menu.
     * @example
     * // Update or create a Sys_menu
     * const sys_menu = await prisma.sys_menu.upsert({
     *   create: {
     *     // ... data to create a Sys_menu
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sys_menu we want to update
     *   }
     * })
     */
    upsert<T extends sys_menuUpsertArgs>(args: SelectSubset<T, sys_menuUpsertArgs<ExtArgs>>): Prisma__sys_menuClient<$Result.GetResult<Prisma.$sys_menuPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sys_menus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_menuCountArgs} args - Arguments to filter Sys_menus to count.
     * @example
     * // Count the number of Sys_menus
     * const count = await prisma.sys_menu.count({
     *   where: {
     *     // ... the filter for the Sys_menus we want to count
     *   }
     * })
    **/
    count<T extends sys_menuCountArgs>(
      args?: Subset<T, sys_menuCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Sys_menuCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sys_menu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sys_menuAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Sys_menuAggregateArgs>(args: Subset<T, Sys_menuAggregateArgs>): Prisma.PrismaPromise<GetSys_menuAggregateType<T>>

    /**
     * Group by Sys_menu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_menuGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends sys_menuGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sys_menuGroupByArgs['orderBy'] }
        : { orderBy?: sys_menuGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, sys_menuGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSys_menuGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the sys_menu model
   */
  readonly fields: sys_menuFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for sys_menu.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sys_menuClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends sys_menu$parentArgs<ExtArgs> = {}>(args?: Subset<T, sys_menu$parentArgs<ExtArgs>>): Prisma__sys_menuClient<$Result.GetResult<Prisma.$sys_menuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends sys_menu$childrenArgs<ExtArgs> = {}>(args?: Subset<T, sys_menu$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sys_menuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    menu_roles<T extends sys_menu$menu_rolesArgs<ExtArgs> = {}>(args?: Subset<T, sys_menu$menu_rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sys_menu_rolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the sys_menu model
   */
  interface sys_menuFieldRefs {
    readonly menu_id: FieldRef<"sys_menu", 'String'>
    readonly parent_id: FieldRef<"sys_menu", 'String'>
    readonly menu_level: FieldRef<"sys_menu", 'Int'>
    readonly sort_order: FieldRef<"sys_menu", 'Int'>
    readonly menu_name: FieldRef<"sys_menu", 'String'>
    readonly menu_name_en: FieldRef<"sys_menu", 'String'>
    readonly menu_path: FieldRef<"sys_menu", 'String'>
    readonly menu_icon: FieldRef<"sys_menu", 'String'>
    readonly screen_id: FieldRef<"sys_menu", 'String'>
    readonly screen_type: FieldRef<"sys_menu", 'String'>
    readonly is_active: FieldRef<"sys_menu", 'Boolean'>
    readonly is_visible: FieldRef<"sys_menu", 'Boolean'>
    readonly badge_text: FieldRef<"sys_menu", 'String'>
    readonly badge_type: FieldRef<"sys_menu", 'String'>
    readonly created_by: FieldRef<"sys_menu", 'String'>
    readonly created_at: FieldRef<"sys_menu", 'DateTime'>
    readonly updated_by: FieldRef<"sys_menu", 'String'>
    readonly updated_at: FieldRef<"sys_menu", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * sys_menu findUnique
   */
  export type sys_menuFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu
     */
    select?: sys_menuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu
     */
    omit?: sys_menuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menuInclude<ExtArgs> | null
    /**
     * Filter, which sys_menu to fetch.
     */
    where: sys_menuWhereUniqueInput
  }

  /**
   * sys_menu findUniqueOrThrow
   */
  export type sys_menuFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu
     */
    select?: sys_menuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu
     */
    omit?: sys_menuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menuInclude<ExtArgs> | null
    /**
     * Filter, which sys_menu to fetch.
     */
    where: sys_menuWhereUniqueInput
  }

  /**
   * sys_menu findFirst
   */
  export type sys_menuFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu
     */
    select?: sys_menuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu
     */
    omit?: sys_menuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menuInclude<ExtArgs> | null
    /**
     * Filter, which sys_menu to fetch.
     */
    where?: sys_menuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sys_menus to fetch.
     */
    orderBy?: sys_menuOrderByWithRelationInput | sys_menuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sys_menus.
     */
    cursor?: sys_menuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sys_menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sys_menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sys_menus.
     */
    distinct?: Sys_menuScalarFieldEnum | Sys_menuScalarFieldEnum[]
  }

  /**
   * sys_menu findFirstOrThrow
   */
  export type sys_menuFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu
     */
    select?: sys_menuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu
     */
    omit?: sys_menuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menuInclude<ExtArgs> | null
    /**
     * Filter, which sys_menu to fetch.
     */
    where?: sys_menuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sys_menus to fetch.
     */
    orderBy?: sys_menuOrderByWithRelationInput | sys_menuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sys_menus.
     */
    cursor?: sys_menuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sys_menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sys_menus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sys_menus.
     */
    distinct?: Sys_menuScalarFieldEnum | Sys_menuScalarFieldEnum[]
  }

  /**
   * sys_menu findMany
   */
  export type sys_menuFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu
     */
    select?: sys_menuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu
     */
    omit?: sys_menuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menuInclude<ExtArgs> | null
    /**
     * Filter, which sys_menus to fetch.
     */
    where?: sys_menuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sys_menus to fetch.
     */
    orderBy?: sys_menuOrderByWithRelationInput | sys_menuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sys_menus.
     */
    cursor?: sys_menuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sys_menus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sys_menus.
     */
    skip?: number
    distinct?: Sys_menuScalarFieldEnum | Sys_menuScalarFieldEnum[]
  }

  /**
   * sys_menu create
   */
  export type sys_menuCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu
     */
    select?: sys_menuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu
     */
    omit?: sys_menuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menuInclude<ExtArgs> | null
    /**
     * The data needed to create a sys_menu.
     */
    data: XOR<sys_menuCreateInput, sys_menuUncheckedCreateInput>
  }

  /**
   * sys_menu createMany
   */
  export type sys_menuCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sys_menus.
     */
    data: sys_menuCreateManyInput | sys_menuCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sys_menu createManyAndReturn
   */
  export type sys_menuCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu
     */
    select?: sys_menuSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu
     */
    omit?: sys_menuOmit<ExtArgs> | null
    /**
     * The data used to create many sys_menus.
     */
    data: sys_menuCreateManyInput | sys_menuCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menuIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * sys_menu update
   */
  export type sys_menuUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu
     */
    select?: sys_menuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu
     */
    omit?: sys_menuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menuInclude<ExtArgs> | null
    /**
     * The data needed to update a sys_menu.
     */
    data: XOR<sys_menuUpdateInput, sys_menuUncheckedUpdateInput>
    /**
     * Choose, which sys_menu to update.
     */
    where: sys_menuWhereUniqueInput
  }

  /**
   * sys_menu updateMany
   */
  export type sys_menuUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sys_menus.
     */
    data: XOR<sys_menuUpdateManyMutationInput, sys_menuUncheckedUpdateManyInput>
    /**
     * Filter which sys_menus to update
     */
    where?: sys_menuWhereInput
    /**
     * Limit how many sys_menus to update.
     */
    limit?: number
  }

  /**
   * sys_menu updateManyAndReturn
   */
  export type sys_menuUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu
     */
    select?: sys_menuSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu
     */
    omit?: sys_menuOmit<ExtArgs> | null
    /**
     * The data used to update sys_menus.
     */
    data: XOR<sys_menuUpdateManyMutationInput, sys_menuUncheckedUpdateManyInput>
    /**
     * Filter which sys_menus to update
     */
    where?: sys_menuWhereInput
    /**
     * Limit how many sys_menus to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menuIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * sys_menu upsert
   */
  export type sys_menuUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu
     */
    select?: sys_menuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu
     */
    omit?: sys_menuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menuInclude<ExtArgs> | null
    /**
     * The filter to search for the sys_menu to update in case it exists.
     */
    where: sys_menuWhereUniqueInput
    /**
     * In case the sys_menu found by the `where` argument doesn't exist, create a new sys_menu with this data.
     */
    create: XOR<sys_menuCreateInput, sys_menuUncheckedCreateInput>
    /**
     * In case the sys_menu was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sys_menuUpdateInput, sys_menuUncheckedUpdateInput>
  }

  /**
   * sys_menu delete
   */
  export type sys_menuDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu
     */
    select?: sys_menuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu
     */
    omit?: sys_menuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menuInclude<ExtArgs> | null
    /**
     * Filter which sys_menu to delete.
     */
    where: sys_menuWhereUniqueInput
  }

  /**
   * sys_menu deleteMany
   */
  export type sys_menuDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sys_menus to delete
     */
    where?: sys_menuWhereInput
    /**
     * Limit how many sys_menus to delete.
     */
    limit?: number
  }

  /**
   * sys_menu.parent
   */
  export type sys_menu$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu
     */
    select?: sys_menuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu
     */
    omit?: sys_menuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menuInclude<ExtArgs> | null
    where?: sys_menuWhereInput
  }

  /**
   * sys_menu.children
   */
  export type sys_menu$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu
     */
    select?: sys_menuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu
     */
    omit?: sys_menuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menuInclude<ExtArgs> | null
    where?: sys_menuWhereInput
    orderBy?: sys_menuOrderByWithRelationInput | sys_menuOrderByWithRelationInput[]
    cursor?: sys_menuWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Sys_menuScalarFieldEnum | Sys_menuScalarFieldEnum[]
  }

  /**
   * sys_menu.menu_roles
   */
  export type sys_menu$menu_rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu_role
     */
    select?: sys_menu_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu_role
     */
    omit?: sys_menu_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menu_roleInclude<ExtArgs> | null
    where?: sys_menu_roleWhereInput
    orderBy?: sys_menu_roleOrderByWithRelationInput | sys_menu_roleOrderByWithRelationInput[]
    cursor?: sys_menu_roleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Sys_menu_roleScalarFieldEnum | Sys_menu_roleScalarFieldEnum[]
  }

  /**
   * sys_menu without action
   */
  export type sys_menuDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu
     */
    select?: sys_menuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu
     */
    omit?: sys_menuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menuInclude<ExtArgs> | null
  }


  /**
   * Model sys_role
   */

  export type AggregateSys_role = {
    _count: Sys_roleCountAggregateOutputType | null
    _min: Sys_roleMinAggregateOutputType | null
    _max: Sys_roleMaxAggregateOutputType | null
  }

  export type Sys_roleMinAggregateOutputType = {
    role_id: string | null
    role_name: string | null
    role_desc: string | null
    is_active: boolean | null
    created_at: Date | null
  }

  export type Sys_roleMaxAggregateOutputType = {
    role_id: string | null
    role_name: string | null
    role_desc: string | null
    is_active: boolean | null
    created_at: Date | null
  }

  export type Sys_roleCountAggregateOutputType = {
    role_id: number
    role_name: number
    role_desc: number
    is_active: number
    created_at: number
    _all: number
  }


  export type Sys_roleMinAggregateInputType = {
    role_id?: true
    role_name?: true
    role_desc?: true
    is_active?: true
    created_at?: true
  }

  export type Sys_roleMaxAggregateInputType = {
    role_id?: true
    role_name?: true
    role_desc?: true
    is_active?: true
    created_at?: true
  }

  export type Sys_roleCountAggregateInputType = {
    role_id?: true
    role_name?: true
    role_desc?: true
    is_active?: true
    created_at?: true
    _all?: true
  }

  export type Sys_roleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sys_role to aggregate.
     */
    where?: sys_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sys_roles to fetch.
     */
    orderBy?: sys_roleOrderByWithRelationInput | sys_roleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sys_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sys_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sys_roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sys_roles
    **/
    _count?: true | Sys_roleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Sys_roleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Sys_roleMaxAggregateInputType
  }

  export type GetSys_roleAggregateType<T extends Sys_roleAggregateArgs> = {
        [P in keyof T & keyof AggregateSys_role]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSys_role[P]>
      : GetScalarType<T[P], AggregateSys_role[P]>
  }




  export type sys_roleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sys_roleWhereInput
    orderBy?: sys_roleOrderByWithAggregationInput | sys_roleOrderByWithAggregationInput[]
    by: Sys_roleScalarFieldEnum[] | Sys_roleScalarFieldEnum
    having?: sys_roleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Sys_roleCountAggregateInputType | true
    _min?: Sys_roleMinAggregateInputType
    _max?: Sys_roleMaxAggregateInputType
  }

  export type Sys_roleGroupByOutputType = {
    role_id: string
    role_name: string
    role_desc: string | null
    is_active: boolean
    created_at: Date
    _count: Sys_roleCountAggregateOutputType | null
    _min: Sys_roleMinAggregateOutputType | null
    _max: Sys_roleMaxAggregateOutputType | null
  }

  type GetSys_roleGroupByPayload<T extends sys_roleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Sys_roleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Sys_roleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Sys_roleGroupByOutputType[P]>
            : GetScalarType<T[P], Sys_roleGroupByOutputType[P]>
        }
      >
    >


  export type sys_roleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role_id?: boolean
    role_name?: boolean
    role_desc?: boolean
    is_active?: boolean
    created_at?: boolean
    menu_roles?: boolean | sys_role$menu_rolesArgs<ExtArgs>
    _count?: boolean | Sys_roleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sys_role"]>

  export type sys_roleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role_id?: boolean
    role_name?: boolean
    role_desc?: boolean
    is_active?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["sys_role"]>

  export type sys_roleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role_id?: boolean
    role_name?: boolean
    role_desc?: boolean
    is_active?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["sys_role"]>

  export type sys_roleSelectScalar = {
    role_id?: boolean
    role_name?: boolean
    role_desc?: boolean
    is_active?: boolean
    created_at?: boolean
  }

  export type sys_roleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"role_id" | "role_name" | "role_desc" | "is_active" | "created_at", ExtArgs["result"]["sys_role"]>
  export type sys_roleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menu_roles?: boolean | sys_role$menu_rolesArgs<ExtArgs>
    _count?: boolean | Sys_roleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type sys_roleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type sys_roleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $sys_rolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "sys_role"
    objects: {
      menu_roles: Prisma.$sys_menu_rolePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      role_id: string
      role_name: string
      role_desc: string | null
      is_active: boolean
      created_at: Date
    }, ExtArgs["result"]["sys_role"]>
    composites: {}
  }

  type sys_roleGetPayload<S extends boolean | null | undefined | sys_roleDefaultArgs> = $Result.GetResult<Prisma.$sys_rolePayload, S>

  type sys_roleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<sys_roleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Sys_roleCountAggregateInputType | true
    }

  export interface sys_roleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['sys_role'], meta: { name: 'sys_role' } }
    /**
     * Find zero or one Sys_role that matches the filter.
     * @param {sys_roleFindUniqueArgs} args - Arguments to find a Sys_role
     * @example
     * // Get one Sys_role
     * const sys_role = await prisma.sys_role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sys_roleFindUniqueArgs>(args: SelectSubset<T, sys_roleFindUniqueArgs<ExtArgs>>): Prisma__sys_roleClient<$Result.GetResult<Prisma.$sys_rolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sys_role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {sys_roleFindUniqueOrThrowArgs} args - Arguments to find a Sys_role
     * @example
     * // Get one Sys_role
     * const sys_role = await prisma.sys_role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sys_roleFindUniqueOrThrowArgs>(args: SelectSubset<T, sys_roleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sys_roleClient<$Result.GetResult<Prisma.$sys_rolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sys_role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_roleFindFirstArgs} args - Arguments to find a Sys_role
     * @example
     * // Get one Sys_role
     * const sys_role = await prisma.sys_role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sys_roleFindFirstArgs>(args?: SelectSubset<T, sys_roleFindFirstArgs<ExtArgs>>): Prisma__sys_roleClient<$Result.GetResult<Prisma.$sys_rolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sys_role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_roleFindFirstOrThrowArgs} args - Arguments to find a Sys_role
     * @example
     * // Get one Sys_role
     * const sys_role = await prisma.sys_role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sys_roleFindFirstOrThrowArgs>(args?: SelectSubset<T, sys_roleFindFirstOrThrowArgs<ExtArgs>>): Prisma__sys_roleClient<$Result.GetResult<Prisma.$sys_rolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sys_roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_roleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sys_roles
     * const sys_roles = await prisma.sys_role.findMany()
     * 
     * // Get first 10 Sys_roles
     * const sys_roles = await prisma.sys_role.findMany({ take: 10 })
     * 
     * // Only select the `role_id`
     * const sys_roleWithRole_idOnly = await prisma.sys_role.findMany({ select: { role_id: true } })
     * 
     */
    findMany<T extends sys_roleFindManyArgs>(args?: SelectSubset<T, sys_roleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sys_rolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sys_role.
     * @param {sys_roleCreateArgs} args - Arguments to create a Sys_role.
     * @example
     * // Create one Sys_role
     * const Sys_role = await prisma.sys_role.create({
     *   data: {
     *     // ... data to create a Sys_role
     *   }
     * })
     * 
     */
    create<T extends sys_roleCreateArgs>(args: SelectSubset<T, sys_roleCreateArgs<ExtArgs>>): Prisma__sys_roleClient<$Result.GetResult<Prisma.$sys_rolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sys_roles.
     * @param {sys_roleCreateManyArgs} args - Arguments to create many Sys_roles.
     * @example
     * // Create many Sys_roles
     * const sys_role = await prisma.sys_role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sys_roleCreateManyArgs>(args?: SelectSubset<T, sys_roleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sys_roles and returns the data saved in the database.
     * @param {sys_roleCreateManyAndReturnArgs} args - Arguments to create many Sys_roles.
     * @example
     * // Create many Sys_roles
     * const sys_role = await prisma.sys_role.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sys_roles and only return the `role_id`
     * const sys_roleWithRole_idOnly = await prisma.sys_role.createManyAndReturn({
     *   select: { role_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends sys_roleCreateManyAndReturnArgs>(args?: SelectSubset<T, sys_roleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sys_rolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sys_role.
     * @param {sys_roleDeleteArgs} args - Arguments to delete one Sys_role.
     * @example
     * // Delete one Sys_role
     * const Sys_role = await prisma.sys_role.delete({
     *   where: {
     *     // ... filter to delete one Sys_role
     *   }
     * })
     * 
     */
    delete<T extends sys_roleDeleteArgs>(args: SelectSubset<T, sys_roleDeleteArgs<ExtArgs>>): Prisma__sys_roleClient<$Result.GetResult<Prisma.$sys_rolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sys_role.
     * @param {sys_roleUpdateArgs} args - Arguments to update one Sys_role.
     * @example
     * // Update one Sys_role
     * const sys_role = await prisma.sys_role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sys_roleUpdateArgs>(args: SelectSubset<T, sys_roleUpdateArgs<ExtArgs>>): Prisma__sys_roleClient<$Result.GetResult<Prisma.$sys_rolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sys_roles.
     * @param {sys_roleDeleteManyArgs} args - Arguments to filter Sys_roles to delete.
     * @example
     * // Delete a few Sys_roles
     * const { count } = await prisma.sys_role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sys_roleDeleteManyArgs>(args?: SelectSubset<T, sys_roleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sys_roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_roleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sys_roles
     * const sys_role = await prisma.sys_role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sys_roleUpdateManyArgs>(args: SelectSubset<T, sys_roleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sys_roles and returns the data updated in the database.
     * @param {sys_roleUpdateManyAndReturnArgs} args - Arguments to update many Sys_roles.
     * @example
     * // Update many Sys_roles
     * const sys_role = await prisma.sys_role.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sys_roles and only return the `role_id`
     * const sys_roleWithRole_idOnly = await prisma.sys_role.updateManyAndReturn({
     *   select: { role_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends sys_roleUpdateManyAndReturnArgs>(args: SelectSubset<T, sys_roleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sys_rolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sys_role.
     * @param {sys_roleUpsertArgs} args - Arguments to update or create a Sys_role.
     * @example
     * // Update or create a Sys_role
     * const sys_role = await prisma.sys_role.upsert({
     *   create: {
     *     // ... data to create a Sys_role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sys_role we want to update
     *   }
     * })
     */
    upsert<T extends sys_roleUpsertArgs>(args: SelectSubset<T, sys_roleUpsertArgs<ExtArgs>>): Prisma__sys_roleClient<$Result.GetResult<Prisma.$sys_rolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sys_roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_roleCountArgs} args - Arguments to filter Sys_roles to count.
     * @example
     * // Count the number of Sys_roles
     * const count = await prisma.sys_role.count({
     *   where: {
     *     // ... the filter for the Sys_roles we want to count
     *   }
     * })
    **/
    count<T extends sys_roleCountArgs>(
      args?: Subset<T, sys_roleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Sys_roleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sys_role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sys_roleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Sys_roleAggregateArgs>(args: Subset<T, Sys_roleAggregateArgs>): Prisma.PrismaPromise<GetSys_roleAggregateType<T>>

    /**
     * Group by Sys_role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_roleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends sys_roleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sys_roleGroupByArgs['orderBy'] }
        : { orderBy?: sys_roleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, sys_roleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSys_roleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the sys_role model
   */
  readonly fields: sys_roleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for sys_role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sys_roleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    menu_roles<T extends sys_role$menu_rolesArgs<ExtArgs> = {}>(args?: Subset<T, sys_role$menu_rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sys_menu_rolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the sys_role model
   */
  interface sys_roleFieldRefs {
    readonly role_id: FieldRef<"sys_role", 'String'>
    readonly role_name: FieldRef<"sys_role", 'String'>
    readonly role_desc: FieldRef<"sys_role", 'String'>
    readonly is_active: FieldRef<"sys_role", 'Boolean'>
    readonly created_at: FieldRef<"sys_role", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * sys_role findUnique
   */
  export type sys_roleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_role
     */
    select?: sys_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_role
     */
    omit?: sys_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_roleInclude<ExtArgs> | null
    /**
     * Filter, which sys_role to fetch.
     */
    where: sys_roleWhereUniqueInput
  }

  /**
   * sys_role findUniqueOrThrow
   */
  export type sys_roleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_role
     */
    select?: sys_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_role
     */
    omit?: sys_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_roleInclude<ExtArgs> | null
    /**
     * Filter, which sys_role to fetch.
     */
    where: sys_roleWhereUniqueInput
  }

  /**
   * sys_role findFirst
   */
  export type sys_roleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_role
     */
    select?: sys_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_role
     */
    omit?: sys_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_roleInclude<ExtArgs> | null
    /**
     * Filter, which sys_role to fetch.
     */
    where?: sys_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sys_roles to fetch.
     */
    orderBy?: sys_roleOrderByWithRelationInput | sys_roleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sys_roles.
     */
    cursor?: sys_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sys_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sys_roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sys_roles.
     */
    distinct?: Sys_roleScalarFieldEnum | Sys_roleScalarFieldEnum[]
  }

  /**
   * sys_role findFirstOrThrow
   */
  export type sys_roleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_role
     */
    select?: sys_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_role
     */
    omit?: sys_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_roleInclude<ExtArgs> | null
    /**
     * Filter, which sys_role to fetch.
     */
    where?: sys_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sys_roles to fetch.
     */
    orderBy?: sys_roleOrderByWithRelationInput | sys_roleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sys_roles.
     */
    cursor?: sys_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sys_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sys_roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sys_roles.
     */
    distinct?: Sys_roleScalarFieldEnum | Sys_roleScalarFieldEnum[]
  }

  /**
   * sys_role findMany
   */
  export type sys_roleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_role
     */
    select?: sys_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_role
     */
    omit?: sys_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_roleInclude<ExtArgs> | null
    /**
     * Filter, which sys_roles to fetch.
     */
    where?: sys_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sys_roles to fetch.
     */
    orderBy?: sys_roleOrderByWithRelationInput | sys_roleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sys_roles.
     */
    cursor?: sys_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sys_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sys_roles.
     */
    skip?: number
    distinct?: Sys_roleScalarFieldEnum | Sys_roleScalarFieldEnum[]
  }

  /**
   * sys_role create
   */
  export type sys_roleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_role
     */
    select?: sys_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_role
     */
    omit?: sys_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_roleInclude<ExtArgs> | null
    /**
     * The data needed to create a sys_role.
     */
    data: XOR<sys_roleCreateInput, sys_roleUncheckedCreateInput>
  }

  /**
   * sys_role createMany
   */
  export type sys_roleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sys_roles.
     */
    data: sys_roleCreateManyInput | sys_roleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sys_role createManyAndReturn
   */
  export type sys_roleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_role
     */
    select?: sys_roleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sys_role
     */
    omit?: sys_roleOmit<ExtArgs> | null
    /**
     * The data used to create many sys_roles.
     */
    data: sys_roleCreateManyInput | sys_roleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sys_role update
   */
  export type sys_roleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_role
     */
    select?: sys_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_role
     */
    omit?: sys_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_roleInclude<ExtArgs> | null
    /**
     * The data needed to update a sys_role.
     */
    data: XOR<sys_roleUpdateInput, sys_roleUncheckedUpdateInput>
    /**
     * Choose, which sys_role to update.
     */
    where: sys_roleWhereUniqueInput
  }

  /**
   * sys_role updateMany
   */
  export type sys_roleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sys_roles.
     */
    data: XOR<sys_roleUpdateManyMutationInput, sys_roleUncheckedUpdateManyInput>
    /**
     * Filter which sys_roles to update
     */
    where?: sys_roleWhereInput
    /**
     * Limit how many sys_roles to update.
     */
    limit?: number
  }

  /**
   * sys_role updateManyAndReturn
   */
  export type sys_roleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_role
     */
    select?: sys_roleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sys_role
     */
    omit?: sys_roleOmit<ExtArgs> | null
    /**
     * The data used to update sys_roles.
     */
    data: XOR<sys_roleUpdateManyMutationInput, sys_roleUncheckedUpdateManyInput>
    /**
     * Filter which sys_roles to update
     */
    where?: sys_roleWhereInput
    /**
     * Limit how many sys_roles to update.
     */
    limit?: number
  }

  /**
   * sys_role upsert
   */
  export type sys_roleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_role
     */
    select?: sys_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_role
     */
    omit?: sys_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_roleInclude<ExtArgs> | null
    /**
     * The filter to search for the sys_role to update in case it exists.
     */
    where: sys_roleWhereUniqueInput
    /**
     * In case the sys_role found by the `where` argument doesn't exist, create a new sys_role with this data.
     */
    create: XOR<sys_roleCreateInput, sys_roleUncheckedCreateInput>
    /**
     * In case the sys_role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sys_roleUpdateInput, sys_roleUncheckedUpdateInput>
  }

  /**
   * sys_role delete
   */
  export type sys_roleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_role
     */
    select?: sys_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_role
     */
    omit?: sys_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_roleInclude<ExtArgs> | null
    /**
     * Filter which sys_role to delete.
     */
    where: sys_roleWhereUniqueInput
  }

  /**
   * sys_role deleteMany
   */
  export type sys_roleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sys_roles to delete
     */
    where?: sys_roleWhereInput
    /**
     * Limit how many sys_roles to delete.
     */
    limit?: number
  }

  /**
   * sys_role.menu_roles
   */
  export type sys_role$menu_rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu_role
     */
    select?: sys_menu_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu_role
     */
    omit?: sys_menu_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menu_roleInclude<ExtArgs> | null
    where?: sys_menu_roleWhereInput
    orderBy?: sys_menu_roleOrderByWithRelationInput | sys_menu_roleOrderByWithRelationInput[]
    cursor?: sys_menu_roleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Sys_menu_roleScalarFieldEnum | Sys_menu_roleScalarFieldEnum[]
  }

  /**
   * sys_role without action
   */
  export type sys_roleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_role
     */
    select?: sys_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_role
     */
    omit?: sys_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_roleInclude<ExtArgs> | null
  }


  /**
   * Model sys_menu_role
   */

  export type AggregateSys_menu_role = {
    _count: Sys_menu_roleCountAggregateOutputType | null
    _avg: Sys_menu_roleAvgAggregateOutputType | null
    _sum: Sys_menu_roleSumAggregateOutputType | null
    _min: Sys_menu_roleMinAggregateOutputType | null
    _max: Sys_menu_roleMaxAggregateOutputType | null
  }

  export type Sys_menu_roleAvgAggregateOutputType = {
    id: number | null
  }

  export type Sys_menu_roleSumAggregateOutputType = {
    id: number | null
  }

  export type Sys_menu_roleMinAggregateOutputType = {
    id: number | null
    menu_id: string | null
    role_id: string | null
    can_read: boolean | null
    can_create: boolean | null
    can_update: boolean | null
    can_delete: boolean | null
    can_export: boolean | null
    can_print: boolean | null
    created_at: Date | null
  }

  export type Sys_menu_roleMaxAggregateOutputType = {
    id: number | null
    menu_id: string | null
    role_id: string | null
    can_read: boolean | null
    can_create: boolean | null
    can_update: boolean | null
    can_delete: boolean | null
    can_export: boolean | null
    can_print: boolean | null
    created_at: Date | null
  }

  export type Sys_menu_roleCountAggregateOutputType = {
    id: number
    menu_id: number
    role_id: number
    can_read: number
    can_create: number
    can_update: number
    can_delete: number
    can_export: number
    can_print: number
    created_at: number
    _all: number
  }


  export type Sys_menu_roleAvgAggregateInputType = {
    id?: true
  }

  export type Sys_menu_roleSumAggregateInputType = {
    id?: true
  }

  export type Sys_menu_roleMinAggregateInputType = {
    id?: true
    menu_id?: true
    role_id?: true
    can_read?: true
    can_create?: true
    can_update?: true
    can_delete?: true
    can_export?: true
    can_print?: true
    created_at?: true
  }

  export type Sys_menu_roleMaxAggregateInputType = {
    id?: true
    menu_id?: true
    role_id?: true
    can_read?: true
    can_create?: true
    can_update?: true
    can_delete?: true
    can_export?: true
    can_print?: true
    created_at?: true
  }

  export type Sys_menu_roleCountAggregateInputType = {
    id?: true
    menu_id?: true
    role_id?: true
    can_read?: true
    can_create?: true
    can_update?: true
    can_delete?: true
    can_export?: true
    can_print?: true
    created_at?: true
    _all?: true
  }

  export type Sys_menu_roleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sys_menu_role to aggregate.
     */
    where?: sys_menu_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sys_menu_roles to fetch.
     */
    orderBy?: sys_menu_roleOrderByWithRelationInput | sys_menu_roleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sys_menu_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sys_menu_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sys_menu_roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sys_menu_roles
    **/
    _count?: true | Sys_menu_roleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Sys_menu_roleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Sys_menu_roleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Sys_menu_roleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Sys_menu_roleMaxAggregateInputType
  }

  export type GetSys_menu_roleAggregateType<T extends Sys_menu_roleAggregateArgs> = {
        [P in keyof T & keyof AggregateSys_menu_role]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSys_menu_role[P]>
      : GetScalarType<T[P], AggregateSys_menu_role[P]>
  }




  export type sys_menu_roleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sys_menu_roleWhereInput
    orderBy?: sys_menu_roleOrderByWithAggregationInput | sys_menu_roleOrderByWithAggregationInput[]
    by: Sys_menu_roleScalarFieldEnum[] | Sys_menu_roleScalarFieldEnum
    having?: sys_menu_roleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Sys_menu_roleCountAggregateInputType | true
    _avg?: Sys_menu_roleAvgAggregateInputType
    _sum?: Sys_menu_roleSumAggregateInputType
    _min?: Sys_menu_roleMinAggregateInputType
    _max?: Sys_menu_roleMaxAggregateInputType
  }

  export type Sys_menu_roleGroupByOutputType = {
    id: number
    menu_id: string
    role_id: string
    can_read: boolean
    can_create: boolean
    can_update: boolean
    can_delete: boolean
    can_export: boolean
    can_print: boolean
    created_at: Date
    _count: Sys_menu_roleCountAggregateOutputType | null
    _avg: Sys_menu_roleAvgAggregateOutputType | null
    _sum: Sys_menu_roleSumAggregateOutputType | null
    _min: Sys_menu_roleMinAggregateOutputType | null
    _max: Sys_menu_roleMaxAggregateOutputType | null
  }

  type GetSys_menu_roleGroupByPayload<T extends sys_menu_roleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Sys_menu_roleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Sys_menu_roleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Sys_menu_roleGroupByOutputType[P]>
            : GetScalarType<T[P], Sys_menu_roleGroupByOutputType[P]>
        }
      >
    >


  export type sys_menu_roleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menu_id?: boolean
    role_id?: boolean
    can_read?: boolean
    can_create?: boolean
    can_update?: boolean
    can_delete?: boolean
    can_export?: boolean
    can_print?: boolean
    created_at?: boolean
    menu?: boolean | sys_menuDefaultArgs<ExtArgs>
    role?: boolean | sys_roleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sys_menu_role"]>

  export type sys_menu_roleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menu_id?: boolean
    role_id?: boolean
    can_read?: boolean
    can_create?: boolean
    can_update?: boolean
    can_delete?: boolean
    can_export?: boolean
    can_print?: boolean
    created_at?: boolean
    menu?: boolean | sys_menuDefaultArgs<ExtArgs>
    role?: boolean | sys_roleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sys_menu_role"]>

  export type sys_menu_roleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menu_id?: boolean
    role_id?: boolean
    can_read?: boolean
    can_create?: boolean
    can_update?: boolean
    can_delete?: boolean
    can_export?: boolean
    can_print?: boolean
    created_at?: boolean
    menu?: boolean | sys_menuDefaultArgs<ExtArgs>
    role?: boolean | sys_roleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sys_menu_role"]>

  export type sys_menu_roleSelectScalar = {
    id?: boolean
    menu_id?: boolean
    role_id?: boolean
    can_read?: boolean
    can_create?: boolean
    can_update?: boolean
    can_delete?: boolean
    can_export?: boolean
    can_print?: boolean
    created_at?: boolean
  }

  export type sys_menu_roleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "menu_id" | "role_id" | "can_read" | "can_create" | "can_update" | "can_delete" | "can_export" | "can_print" | "created_at", ExtArgs["result"]["sys_menu_role"]>
  export type sys_menu_roleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menu?: boolean | sys_menuDefaultArgs<ExtArgs>
    role?: boolean | sys_roleDefaultArgs<ExtArgs>
  }
  export type sys_menu_roleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menu?: boolean | sys_menuDefaultArgs<ExtArgs>
    role?: boolean | sys_roleDefaultArgs<ExtArgs>
  }
  export type sys_menu_roleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menu?: boolean | sys_menuDefaultArgs<ExtArgs>
    role?: boolean | sys_roleDefaultArgs<ExtArgs>
  }

  export type $sys_menu_rolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "sys_menu_role"
    objects: {
      menu: Prisma.$sys_menuPayload<ExtArgs>
      role: Prisma.$sys_rolePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      menu_id: string
      role_id: string
      can_read: boolean
      can_create: boolean
      can_update: boolean
      can_delete: boolean
      can_export: boolean
      can_print: boolean
      created_at: Date
    }, ExtArgs["result"]["sys_menu_role"]>
    composites: {}
  }

  type sys_menu_roleGetPayload<S extends boolean | null | undefined | sys_menu_roleDefaultArgs> = $Result.GetResult<Prisma.$sys_menu_rolePayload, S>

  type sys_menu_roleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<sys_menu_roleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Sys_menu_roleCountAggregateInputType | true
    }

  export interface sys_menu_roleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['sys_menu_role'], meta: { name: 'sys_menu_role' } }
    /**
     * Find zero or one Sys_menu_role that matches the filter.
     * @param {sys_menu_roleFindUniqueArgs} args - Arguments to find a Sys_menu_role
     * @example
     * // Get one Sys_menu_role
     * const sys_menu_role = await prisma.sys_menu_role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sys_menu_roleFindUniqueArgs>(args: SelectSubset<T, sys_menu_roleFindUniqueArgs<ExtArgs>>): Prisma__sys_menu_roleClient<$Result.GetResult<Prisma.$sys_menu_rolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sys_menu_role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {sys_menu_roleFindUniqueOrThrowArgs} args - Arguments to find a Sys_menu_role
     * @example
     * // Get one Sys_menu_role
     * const sys_menu_role = await prisma.sys_menu_role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sys_menu_roleFindUniqueOrThrowArgs>(args: SelectSubset<T, sys_menu_roleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sys_menu_roleClient<$Result.GetResult<Prisma.$sys_menu_rolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sys_menu_role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_menu_roleFindFirstArgs} args - Arguments to find a Sys_menu_role
     * @example
     * // Get one Sys_menu_role
     * const sys_menu_role = await prisma.sys_menu_role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sys_menu_roleFindFirstArgs>(args?: SelectSubset<T, sys_menu_roleFindFirstArgs<ExtArgs>>): Prisma__sys_menu_roleClient<$Result.GetResult<Prisma.$sys_menu_rolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sys_menu_role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_menu_roleFindFirstOrThrowArgs} args - Arguments to find a Sys_menu_role
     * @example
     * // Get one Sys_menu_role
     * const sys_menu_role = await prisma.sys_menu_role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sys_menu_roleFindFirstOrThrowArgs>(args?: SelectSubset<T, sys_menu_roleFindFirstOrThrowArgs<ExtArgs>>): Prisma__sys_menu_roleClient<$Result.GetResult<Prisma.$sys_menu_rolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sys_menu_roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_menu_roleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sys_menu_roles
     * const sys_menu_roles = await prisma.sys_menu_role.findMany()
     * 
     * // Get first 10 Sys_menu_roles
     * const sys_menu_roles = await prisma.sys_menu_role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sys_menu_roleWithIdOnly = await prisma.sys_menu_role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends sys_menu_roleFindManyArgs>(args?: SelectSubset<T, sys_menu_roleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sys_menu_rolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sys_menu_role.
     * @param {sys_menu_roleCreateArgs} args - Arguments to create a Sys_menu_role.
     * @example
     * // Create one Sys_menu_role
     * const Sys_menu_role = await prisma.sys_menu_role.create({
     *   data: {
     *     // ... data to create a Sys_menu_role
     *   }
     * })
     * 
     */
    create<T extends sys_menu_roleCreateArgs>(args: SelectSubset<T, sys_menu_roleCreateArgs<ExtArgs>>): Prisma__sys_menu_roleClient<$Result.GetResult<Prisma.$sys_menu_rolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sys_menu_roles.
     * @param {sys_menu_roleCreateManyArgs} args - Arguments to create many Sys_menu_roles.
     * @example
     * // Create many Sys_menu_roles
     * const sys_menu_role = await prisma.sys_menu_role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sys_menu_roleCreateManyArgs>(args?: SelectSubset<T, sys_menu_roleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sys_menu_roles and returns the data saved in the database.
     * @param {sys_menu_roleCreateManyAndReturnArgs} args - Arguments to create many Sys_menu_roles.
     * @example
     * // Create many Sys_menu_roles
     * const sys_menu_role = await prisma.sys_menu_role.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sys_menu_roles and only return the `id`
     * const sys_menu_roleWithIdOnly = await prisma.sys_menu_role.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends sys_menu_roleCreateManyAndReturnArgs>(args?: SelectSubset<T, sys_menu_roleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sys_menu_rolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sys_menu_role.
     * @param {sys_menu_roleDeleteArgs} args - Arguments to delete one Sys_menu_role.
     * @example
     * // Delete one Sys_menu_role
     * const Sys_menu_role = await prisma.sys_menu_role.delete({
     *   where: {
     *     // ... filter to delete one Sys_menu_role
     *   }
     * })
     * 
     */
    delete<T extends sys_menu_roleDeleteArgs>(args: SelectSubset<T, sys_menu_roleDeleteArgs<ExtArgs>>): Prisma__sys_menu_roleClient<$Result.GetResult<Prisma.$sys_menu_rolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sys_menu_role.
     * @param {sys_menu_roleUpdateArgs} args - Arguments to update one Sys_menu_role.
     * @example
     * // Update one Sys_menu_role
     * const sys_menu_role = await prisma.sys_menu_role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sys_menu_roleUpdateArgs>(args: SelectSubset<T, sys_menu_roleUpdateArgs<ExtArgs>>): Prisma__sys_menu_roleClient<$Result.GetResult<Prisma.$sys_menu_rolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sys_menu_roles.
     * @param {sys_menu_roleDeleteManyArgs} args - Arguments to filter Sys_menu_roles to delete.
     * @example
     * // Delete a few Sys_menu_roles
     * const { count } = await prisma.sys_menu_role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sys_menu_roleDeleteManyArgs>(args?: SelectSubset<T, sys_menu_roleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sys_menu_roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_menu_roleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sys_menu_roles
     * const sys_menu_role = await prisma.sys_menu_role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sys_menu_roleUpdateManyArgs>(args: SelectSubset<T, sys_menu_roleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sys_menu_roles and returns the data updated in the database.
     * @param {sys_menu_roleUpdateManyAndReturnArgs} args - Arguments to update many Sys_menu_roles.
     * @example
     * // Update many Sys_menu_roles
     * const sys_menu_role = await prisma.sys_menu_role.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sys_menu_roles and only return the `id`
     * const sys_menu_roleWithIdOnly = await prisma.sys_menu_role.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends sys_menu_roleUpdateManyAndReturnArgs>(args: SelectSubset<T, sys_menu_roleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sys_menu_rolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sys_menu_role.
     * @param {sys_menu_roleUpsertArgs} args - Arguments to update or create a Sys_menu_role.
     * @example
     * // Update or create a Sys_menu_role
     * const sys_menu_role = await prisma.sys_menu_role.upsert({
     *   create: {
     *     // ... data to create a Sys_menu_role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sys_menu_role we want to update
     *   }
     * })
     */
    upsert<T extends sys_menu_roleUpsertArgs>(args: SelectSubset<T, sys_menu_roleUpsertArgs<ExtArgs>>): Prisma__sys_menu_roleClient<$Result.GetResult<Prisma.$sys_menu_rolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sys_menu_roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_menu_roleCountArgs} args - Arguments to filter Sys_menu_roles to count.
     * @example
     * // Count the number of Sys_menu_roles
     * const count = await prisma.sys_menu_role.count({
     *   where: {
     *     // ... the filter for the Sys_menu_roles we want to count
     *   }
     * })
    **/
    count<T extends sys_menu_roleCountArgs>(
      args?: Subset<T, sys_menu_roleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Sys_menu_roleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sys_menu_role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sys_menu_roleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Sys_menu_roleAggregateArgs>(args: Subset<T, Sys_menu_roleAggregateArgs>): Prisma.PrismaPromise<GetSys_menu_roleAggregateType<T>>

    /**
     * Group by Sys_menu_role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sys_menu_roleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends sys_menu_roleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sys_menu_roleGroupByArgs['orderBy'] }
        : { orderBy?: sys_menu_roleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, sys_menu_roleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSys_menu_roleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the sys_menu_role model
   */
  readonly fields: sys_menu_roleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for sys_menu_role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sys_menu_roleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    menu<T extends sys_menuDefaultArgs<ExtArgs> = {}>(args?: Subset<T, sys_menuDefaultArgs<ExtArgs>>): Prisma__sys_menuClient<$Result.GetResult<Prisma.$sys_menuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    role<T extends sys_roleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, sys_roleDefaultArgs<ExtArgs>>): Prisma__sys_roleClient<$Result.GetResult<Prisma.$sys_rolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the sys_menu_role model
   */
  interface sys_menu_roleFieldRefs {
    readonly id: FieldRef<"sys_menu_role", 'Int'>
    readonly menu_id: FieldRef<"sys_menu_role", 'String'>
    readonly role_id: FieldRef<"sys_menu_role", 'String'>
    readonly can_read: FieldRef<"sys_menu_role", 'Boolean'>
    readonly can_create: FieldRef<"sys_menu_role", 'Boolean'>
    readonly can_update: FieldRef<"sys_menu_role", 'Boolean'>
    readonly can_delete: FieldRef<"sys_menu_role", 'Boolean'>
    readonly can_export: FieldRef<"sys_menu_role", 'Boolean'>
    readonly can_print: FieldRef<"sys_menu_role", 'Boolean'>
    readonly created_at: FieldRef<"sys_menu_role", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * sys_menu_role findUnique
   */
  export type sys_menu_roleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu_role
     */
    select?: sys_menu_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu_role
     */
    omit?: sys_menu_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menu_roleInclude<ExtArgs> | null
    /**
     * Filter, which sys_menu_role to fetch.
     */
    where: sys_menu_roleWhereUniqueInput
  }

  /**
   * sys_menu_role findUniqueOrThrow
   */
  export type sys_menu_roleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu_role
     */
    select?: sys_menu_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu_role
     */
    omit?: sys_menu_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menu_roleInclude<ExtArgs> | null
    /**
     * Filter, which sys_menu_role to fetch.
     */
    where: sys_menu_roleWhereUniqueInput
  }

  /**
   * sys_menu_role findFirst
   */
  export type sys_menu_roleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu_role
     */
    select?: sys_menu_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu_role
     */
    omit?: sys_menu_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menu_roleInclude<ExtArgs> | null
    /**
     * Filter, which sys_menu_role to fetch.
     */
    where?: sys_menu_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sys_menu_roles to fetch.
     */
    orderBy?: sys_menu_roleOrderByWithRelationInput | sys_menu_roleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sys_menu_roles.
     */
    cursor?: sys_menu_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sys_menu_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sys_menu_roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sys_menu_roles.
     */
    distinct?: Sys_menu_roleScalarFieldEnum | Sys_menu_roleScalarFieldEnum[]
  }

  /**
   * sys_menu_role findFirstOrThrow
   */
  export type sys_menu_roleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu_role
     */
    select?: sys_menu_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu_role
     */
    omit?: sys_menu_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menu_roleInclude<ExtArgs> | null
    /**
     * Filter, which sys_menu_role to fetch.
     */
    where?: sys_menu_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sys_menu_roles to fetch.
     */
    orderBy?: sys_menu_roleOrderByWithRelationInput | sys_menu_roleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sys_menu_roles.
     */
    cursor?: sys_menu_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sys_menu_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sys_menu_roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sys_menu_roles.
     */
    distinct?: Sys_menu_roleScalarFieldEnum | Sys_menu_roleScalarFieldEnum[]
  }

  /**
   * sys_menu_role findMany
   */
  export type sys_menu_roleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu_role
     */
    select?: sys_menu_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu_role
     */
    omit?: sys_menu_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menu_roleInclude<ExtArgs> | null
    /**
     * Filter, which sys_menu_roles to fetch.
     */
    where?: sys_menu_roleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sys_menu_roles to fetch.
     */
    orderBy?: sys_menu_roleOrderByWithRelationInput | sys_menu_roleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sys_menu_roles.
     */
    cursor?: sys_menu_roleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sys_menu_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sys_menu_roles.
     */
    skip?: number
    distinct?: Sys_menu_roleScalarFieldEnum | Sys_menu_roleScalarFieldEnum[]
  }

  /**
   * sys_menu_role create
   */
  export type sys_menu_roleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu_role
     */
    select?: sys_menu_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu_role
     */
    omit?: sys_menu_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menu_roleInclude<ExtArgs> | null
    /**
     * The data needed to create a sys_menu_role.
     */
    data: XOR<sys_menu_roleCreateInput, sys_menu_roleUncheckedCreateInput>
  }

  /**
   * sys_menu_role createMany
   */
  export type sys_menu_roleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sys_menu_roles.
     */
    data: sys_menu_roleCreateManyInput | sys_menu_roleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sys_menu_role createManyAndReturn
   */
  export type sys_menu_roleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu_role
     */
    select?: sys_menu_roleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu_role
     */
    omit?: sys_menu_roleOmit<ExtArgs> | null
    /**
     * The data used to create many sys_menu_roles.
     */
    data: sys_menu_roleCreateManyInput | sys_menu_roleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menu_roleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * sys_menu_role update
   */
  export type sys_menu_roleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu_role
     */
    select?: sys_menu_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu_role
     */
    omit?: sys_menu_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menu_roleInclude<ExtArgs> | null
    /**
     * The data needed to update a sys_menu_role.
     */
    data: XOR<sys_menu_roleUpdateInput, sys_menu_roleUncheckedUpdateInput>
    /**
     * Choose, which sys_menu_role to update.
     */
    where: sys_menu_roleWhereUniqueInput
  }

  /**
   * sys_menu_role updateMany
   */
  export type sys_menu_roleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sys_menu_roles.
     */
    data: XOR<sys_menu_roleUpdateManyMutationInput, sys_menu_roleUncheckedUpdateManyInput>
    /**
     * Filter which sys_menu_roles to update
     */
    where?: sys_menu_roleWhereInput
    /**
     * Limit how many sys_menu_roles to update.
     */
    limit?: number
  }

  /**
   * sys_menu_role updateManyAndReturn
   */
  export type sys_menu_roleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu_role
     */
    select?: sys_menu_roleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu_role
     */
    omit?: sys_menu_roleOmit<ExtArgs> | null
    /**
     * The data used to update sys_menu_roles.
     */
    data: XOR<sys_menu_roleUpdateManyMutationInput, sys_menu_roleUncheckedUpdateManyInput>
    /**
     * Filter which sys_menu_roles to update
     */
    where?: sys_menu_roleWhereInput
    /**
     * Limit how many sys_menu_roles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menu_roleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * sys_menu_role upsert
   */
  export type sys_menu_roleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu_role
     */
    select?: sys_menu_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu_role
     */
    omit?: sys_menu_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menu_roleInclude<ExtArgs> | null
    /**
     * The filter to search for the sys_menu_role to update in case it exists.
     */
    where: sys_menu_roleWhereUniqueInput
    /**
     * In case the sys_menu_role found by the `where` argument doesn't exist, create a new sys_menu_role with this data.
     */
    create: XOR<sys_menu_roleCreateInput, sys_menu_roleUncheckedCreateInput>
    /**
     * In case the sys_menu_role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sys_menu_roleUpdateInput, sys_menu_roleUncheckedUpdateInput>
  }

  /**
   * sys_menu_role delete
   */
  export type sys_menu_roleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu_role
     */
    select?: sys_menu_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu_role
     */
    omit?: sys_menu_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menu_roleInclude<ExtArgs> | null
    /**
     * Filter which sys_menu_role to delete.
     */
    where: sys_menu_roleWhereUniqueInput
  }

  /**
   * sys_menu_role deleteMany
   */
  export type sys_menu_roleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sys_menu_roles to delete
     */
    where?: sys_menu_roleWhereInput
    /**
     * Limit how many sys_menu_roles to delete.
     */
    limit?: number
  }

  /**
   * sys_menu_role without action
   */
  export type sys_menu_roleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sys_menu_role
     */
    select?: sys_menu_roleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sys_menu_role
     */
    omit?: sys_menu_roleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sys_menu_roleInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProductScalarFieldEnum: {
    id: 'id',
    productCode: 'productCode',
    productName: 'productName',
    category: 'category',
    price: 'price',
    stock: 'stock',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    productCode: 'productCode',
    productName: 'productName',
    category: 'category',
    price: 'price',
    stock: 'stock',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const Sys_menuScalarFieldEnum: {
    menu_id: 'menu_id',
    parent_id: 'parent_id',
    menu_level: 'menu_level',
    sort_order: 'sort_order',
    menu_name: 'menu_name',
    menu_name_en: 'menu_name_en',
    menu_path: 'menu_path',
    menu_icon: 'menu_icon',
    screen_id: 'screen_id',
    screen_type: 'screen_type',
    is_active: 'is_active',
    is_visible: 'is_visible',
    badge_text: 'badge_text',
    badge_type: 'badge_type',
    created_by: 'created_by',
    created_at: 'created_at',
    updated_by: 'updated_by',
    updated_at: 'updated_at'
  };

  export type Sys_menuScalarFieldEnum = (typeof Sys_menuScalarFieldEnum)[keyof typeof Sys_menuScalarFieldEnum]


  export const Sys_roleScalarFieldEnum: {
    role_id: 'role_id',
    role_name: 'role_name',
    role_desc: 'role_desc',
    is_active: 'is_active',
    created_at: 'created_at'
  };

  export type Sys_roleScalarFieldEnum = (typeof Sys_roleScalarFieldEnum)[keyof typeof Sys_roleScalarFieldEnum]


  export const Sys_menu_roleScalarFieldEnum: {
    id: 'id',
    menu_id: 'menu_id',
    role_id: 'role_id',
    can_read: 'can_read',
    can_create: 'can_create',
    can_update: 'can_update',
    can_delete: 'can_delete',
    can_export: 'can_export',
    can_print: 'can_print',
    created_at: 'created_at'
  };

  export type Sys_menu_roleScalarFieldEnum = (typeof Sys_menu_roleScalarFieldEnum)[keyof typeof Sys_menu_roleScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: IntFilter<"Product"> | number
    productCode?: StringFilter<"Product"> | string
    productName?: StringFilter<"Product"> | string
    category?: StringFilter<"Product"> | string
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    stock?: IntFilter<"Product"> | number
    description?: StringNullableFilter<"Product"> | string | null
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    createdBy?: StringNullableFilter<"Product"> | string | null
    updatedBy?: StringNullableFilter<"Product"> | string | null
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    productCode?: SortOrder
    productName?: SortOrder
    category?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    productCode?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    productName?: StringFilter<"Product"> | string
    category?: StringFilter<"Product"> | string
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    stock?: IntFilter<"Product"> | number
    description?: StringNullableFilter<"Product"> | string | null
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    createdBy?: StringNullableFilter<"Product"> | string | null
    updatedBy?: StringNullableFilter<"Product"> | string | null
  }, "id" | "productCode">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    productCode?: SortOrder
    productName?: SortOrder
    category?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Product"> | number
    productCode?: StringWithAggregatesFilter<"Product"> | string
    productName?: StringWithAggregatesFilter<"Product"> | string
    category?: StringWithAggregatesFilter<"Product"> | string
    price?: DecimalWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string
    stock?: IntWithAggregatesFilter<"Product"> | number
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    isActive?: BoolWithAggregatesFilter<"Product"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"Product"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"Product"> | string | null
  }

  export type postWhereInput = {
    AND?: postWhereInput | postWhereInput[]
    OR?: postWhereInput[]
    NOT?: postWhereInput | postWhereInput[]
    id?: IntFilter<"post"> | number
    name?: StringFilter<"post"> | string
    createdAt?: DateTimeFilter<"post"> | Date | string
    updatedAt?: DateTimeFilter<"post"> | Date | string
  }

  export type postOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type postWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: postWhereInput | postWhereInput[]
    OR?: postWhereInput[]
    NOT?: postWhereInput | postWhereInput[]
    name?: StringFilter<"post"> | string
    createdAt?: DateTimeFilter<"post"> | Date | string
    updatedAt?: DateTimeFilter<"post"> | Date | string
  }, "id">

  export type postOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: postCountOrderByAggregateInput
    _avg?: postAvgOrderByAggregateInput
    _max?: postMaxOrderByAggregateInput
    _min?: postMinOrderByAggregateInput
    _sum?: postSumOrderByAggregateInput
  }

  export type postScalarWhereWithAggregatesInput = {
    AND?: postScalarWhereWithAggregatesInput | postScalarWhereWithAggregatesInput[]
    OR?: postScalarWhereWithAggregatesInput[]
    NOT?: postScalarWhereWithAggregatesInput | postScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"post"> | number
    name?: StringWithAggregatesFilter<"post"> | string
    createdAt?: DateTimeWithAggregatesFilter<"post"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"post"> | Date | string
  }

  export type productWhereInput = {
    AND?: productWhereInput | productWhereInput[]
    OR?: productWhereInput[]
    NOT?: productWhereInput | productWhereInput[]
    id?: IntFilter<"product"> | number
    productCode?: StringFilter<"product"> | string
    productName?: StringFilter<"product"> | string
    category?: StringFilter<"product"> | string
    price?: DecimalFilter<"product"> | Decimal | DecimalJsLike | number | string
    stock?: IntFilter<"product"> | number
    description?: StringNullableFilter<"product"> | string | null
    isActive?: BoolFilter<"product"> | boolean
    createdAt?: DateTimeFilter<"product"> | Date | string
    updatedAt?: DateTimeFilter<"product"> | Date | string
    createdBy?: StringNullableFilter<"product"> | string | null
    updatedBy?: StringNullableFilter<"product"> | string | null
  }

  export type productOrderByWithRelationInput = {
    id?: SortOrder
    productCode?: SortOrder
    productName?: SortOrder
    category?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
  }

  export type productWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    productCode?: string
    AND?: productWhereInput | productWhereInput[]
    OR?: productWhereInput[]
    NOT?: productWhereInput | productWhereInput[]
    productName?: StringFilter<"product"> | string
    category?: StringFilter<"product"> | string
    price?: DecimalFilter<"product"> | Decimal | DecimalJsLike | number | string
    stock?: IntFilter<"product"> | number
    description?: StringNullableFilter<"product"> | string | null
    isActive?: BoolFilter<"product"> | boolean
    createdAt?: DateTimeFilter<"product"> | Date | string
    updatedAt?: DateTimeFilter<"product"> | Date | string
    createdBy?: StringNullableFilter<"product"> | string | null
    updatedBy?: StringNullableFilter<"product"> | string | null
  }, "id" | "productCode">

  export type productOrderByWithAggregationInput = {
    id?: SortOrder
    productCode?: SortOrder
    productName?: SortOrder
    category?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: productCountOrderByAggregateInput
    _avg?: productAvgOrderByAggregateInput
    _max?: productMaxOrderByAggregateInput
    _min?: productMinOrderByAggregateInput
    _sum?: productSumOrderByAggregateInput
  }

  export type productScalarWhereWithAggregatesInput = {
    AND?: productScalarWhereWithAggregatesInput | productScalarWhereWithAggregatesInput[]
    OR?: productScalarWhereWithAggregatesInput[]
    NOT?: productScalarWhereWithAggregatesInput | productScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"product"> | number
    productCode?: StringWithAggregatesFilter<"product"> | string
    productName?: StringWithAggregatesFilter<"product"> | string
    category?: StringWithAggregatesFilter<"product"> | string
    price?: DecimalWithAggregatesFilter<"product"> | Decimal | DecimalJsLike | number | string
    stock?: IntWithAggregatesFilter<"product"> | number
    description?: StringNullableWithAggregatesFilter<"product"> | string | null
    isActive?: BoolWithAggregatesFilter<"product"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"product"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"product"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"product"> | string | null
  }

  export type sys_menuWhereInput = {
    AND?: sys_menuWhereInput | sys_menuWhereInput[]
    OR?: sys_menuWhereInput[]
    NOT?: sys_menuWhereInput | sys_menuWhereInput[]
    menu_id?: StringFilter<"sys_menu"> | string
    parent_id?: StringNullableFilter<"sys_menu"> | string | null
    menu_level?: IntFilter<"sys_menu"> | number
    sort_order?: IntFilter<"sys_menu"> | number
    menu_name?: StringFilter<"sys_menu"> | string
    menu_name_en?: StringNullableFilter<"sys_menu"> | string | null
    menu_path?: StringNullableFilter<"sys_menu"> | string | null
    menu_icon?: StringNullableFilter<"sys_menu"> | string | null
    screen_id?: StringNullableFilter<"sys_menu"> | string | null
    screen_type?: StringFilter<"sys_menu"> | string
    is_active?: BoolFilter<"sys_menu"> | boolean
    is_visible?: BoolFilter<"sys_menu"> | boolean
    badge_text?: StringNullableFilter<"sys_menu"> | string | null
    badge_type?: StringNullableFilter<"sys_menu"> | string | null
    created_by?: StringNullableFilter<"sys_menu"> | string | null
    created_at?: DateTimeFilter<"sys_menu"> | Date | string
    updated_by?: StringNullableFilter<"sys_menu"> | string | null
    updated_at?: DateTimeFilter<"sys_menu"> | Date | string
    parent?: XOR<Sys_menuNullableScalarRelationFilter, sys_menuWhereInput> | null
    children?: Sys_menuListRelationFilter
    menu_roles?: Sys_menu_roleListRelationFilter
  }

  export type sys_menuOrderByWithRelationInput = {
    menu_id?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    menu_level?: SortOrder
    sort_order?: SortOrder
    menu_name?: SortOrder
    menu_name_en?: SortOrderInput | SortOrder
    menu_path?: SortOrderInput | SortOrder
    menu_icon?: SortOrderInput | SortOrder
    screen_id?: SortOrderInput | SortOrder
    screen_type?: SortOrder
    is_active?: SortOrder
    is_visible?: SortOrder
    badge_text?: SortOrderInput | SortOrder
    badge_type?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_by?: SortOrderInput | SortOrder
    updated_at?: SortOrder
    parent?: sys_menuOrderByWithRelationInput
    children?: sys_menuOrderByRelationAggregateInput
    menu_roles?: sys_menu_roleOrderByRelationAggregateInput
  }

  export type sys_menuWhereUniqueInput = Prisma.AtLeast<{
    menu_id?: string
    AND?: sys_menuWhereInput | sys_menuWhereInput[]
    OR?: sys_menuWhereInput[]
    NOT?: sys_menuWhereInput | sys_menuWhereInput[]
    parent_id?: StringNullableFilter<"sys_menu"> | string | null
    menu_level?: IntFilter<"sys_menu"> | number
    sort_order?: IntFilter<"sys_menu"> | number
    menu_name?: StringFilter<"sys_menu"> | string
    menu_name_en?: StringNullableFilter<"sys_menu"> | string | null
    menu_path?: StringNullableFilter<"sys_menu"> | string | null
    menu_icon?: StringNullableFilter<"sys_menu"> | string | null
    screen_id?: StringNullableFilter<"sys_menu"> | string | null
    screen_type?: StringFilter<"sys_menu"> | string
    is_active?: BoolFilter<"sys_menu"> | boolean
    is_visible?: BoolFilter<"sys_menu"> | boolean
    badge_text?: StringNullableFilter<"sys_menu"> | string | null
    badge_type?: StringNullableFilter<"sys_menu"> | string | null
    created_by?: StringNullableFilter<"sys_menu"> | string | null
    created_at?: DateTimeFilter<"sys_menu"> | Date | string
    updated_by?: StringNullableFilter<"sys_menu"> | string | null
    updated_at?: DateTimeFilter<"sys_menu"> | Date | string
    parent?: XOR<Sys_menuNullableScalarRelationFilter, sys_menuWhereInput> | null
    children?: Sys_menuListRelationFilter
    menu_roles?: Sys_menu_roleListRelationFilter
  }, "menu_id">

  export type sys_menuOrderByWithAggregationInput = {
    menu_id?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    menu_level?: SortOrder
    sort_order?: SortOrder
    menu_name?: SortOrder
    menu_name_en?: SortOrderInput | SortOrder
    menu_path?: SortOrderInput | SortOrder
    menu_icon?: SortOrderInput | SortOrder
    screen_id?: SortOrderInput | SortOrder
    screen_type?: SortOrder
    is_active?: SortOrder
    is_visible?: SortOrder
    badge_text?: SortOrderInput | SortOrder
    badge_type?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_by?: SortOrderInput | SortOrder
    updated_at?: SortOrder
    _count?: sys_menuCountOrderByAggregateInput
    _avg?: sys_menuAvgOrderByAggregateInput
    _max?: sys_menuMaxOrderByAggregateInput
    _min?: sys_menuMinOrderByAggregateInput
    _sum?: sys_menuSumOrderByAggregateInput
  }

  export type sys_menuScalarWhereWithAggregatesInput = {
    AND?: sys_menuScalarWhereWithAggregatesInput | sys_menuScalarWhereWithAggregatesInput[]
    OR?: sys_menuScalarWhereWithAggregatesInput[]
    NOT?: sys_menuScalarWhereWithAggregatesInput | sys_menuScalarWhereWithAggregatesInput[]
    menu_id?: StringWithAggregatesFilter<"sys_menu"> | string
    parent_id?: StringNullableWithAggregatesFilter<"sys_menu"> | string | null
    menu_level?: IntWithAggregatesFilter<"sys_menu"> | number
    sort_order?: IntWithAggregatesFilter<"sys_menu"> | number
    menu_name?: StringWithAggregatesFilter<"sys_menu"> | string
    menu_name_en?: StringNullableWithAggregatesFilter<"sys_menu"> | string | null
    menu_path?: StringNullableWithAggregatesFilter<"sys_menu"> | string | null
    menu_icon?: StringNullableWithAggregatesFilter<"sys_menu"> | string | null
    screen_id?: StringNullableWithAggregatesFilter<"sys_menu"> | string | null
    screen_type?: StringWithAggregatesFilter<"sys_menu"> | string
    is_active?: BoolWithAggregatesFilter<"sys_menu"> | boolean
    is_visible?: BoolWithAggregatesFilter<"sys_menu"> | boolean
    badge_text?: StringNullableWithAggregatesFilter<"sys_menu"> | string | null
    badge_type?: StringNullableWithAggregatesFilter<"sys_menu"> | string | null
    created_by?: StringNullableWithAggregatesFilter<"sys_menu"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"sys_menu"> | Date | string
    updated_by?: StringNullableWithAggregatesFilter<"sys_menu"> | string | null
    updated_at?: DateTimeWithAggregatesFilter<"sys_menu"> | Date | string
  }

  export type sys_roleWhereInput = {
    AND?: sys_roleWhereInput | sys_roleWhereInput[]
    OR?: sys_roleWhereInput[]
    NOT?: sys_roleWhereInput | sys_roleWhereInput[]
    role_id?: StringFilter<"sys_role"> | string
    role_name?: StringFilter<"sys_role"> | string
    role_desc?: StringNullableFilter<"sys_role"> | string | null
    is_active?: BoolFilter<"sys_role"> | boolean
    created_at?: DateTimeFilter<"sys_role"> | Date | string
    menu_roles?: Sys_menu_roleListRelationFilter
  }

  export type sys_roleOrderByWithRelationInput = {
    role_id?: SortOrder
    role_name?: SortOrder
    role_desc?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    menu_roles?: sys_menu_roleOrderByRelationAggregateInput
  }

  export type sys_roleWhereUniqueInput = Prisma.AtLeast<{
    role_id?: string
    AND?: sys_roleWhereInput | sys_roleWhereInput[]
    OR?: sys_roleWhereInput[]
    NOT?: sys_roleWhereInput | sys_roleWhereInput[]
    role_name?: StringFilter<"sys_role"> | string
    role_desc?: StringNullableFilter<"sys_role"> | string | null
    is_active?: BoolFilter<"sys_role"> | boolean
    created_at?: DateTimeFilter<"sys_role"> | Date | string
    menu_roles?: Sys_menu_roleListRelationFilter
  }, "role_id">

  export type sys_roleOrderByWithAggregationInput = {
    role_id?: SortOrder
    role_name?: SortOrder
    role_desc?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    _count?: sys_roleCountOrderByAggregateInput
    _max?: sys_roleMaxOrderByAggregateInput
    _min?: sys_roleMinOrderByAggregateInput
  }

  export type sys_roleScalarWhereWithAggregatesInput = {
    AND?: sys_roleScalarWhereWithAggregatesInput | sys_roleScalarWhereWithAggregatesInput[]
    OR?: sys_roleScalarWhereWithAggregatesInput[]
    NOT?: sys_roleScalarWhereWithAggregatesInput | sys_roleScalarWhereWithAggregatesInput[]
    role_id?: StringWithAggregatesFilter<"sys_role"> | string
    role_name?: StringWithAggregatesFilter<"sys_role"> | string
    role_desc?: StringNullableWithAggregatesFilter<"sys_role"> | string | null
    is_active?: BoolWithAggregatesFilter<"sys_role"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"sys_role"> | Date | string
  }

  export type sys_menu_roleWhereInput = {
    AND?: sys_menu_roleWhereInput | sys_menu_roleWhereInput[]
    OR?: sys_menu_roleWhereInput[]
    NOT?: sys_menu_roleWhereInput | sys_menu_roleWhereInput[]
    id?: IntFilter<"sys_menu_role"> | number
    menu_id?: StringFilter<"sys_menu_role"> | string
    role_id?: StringFilter<"sys_menu_role"> | string
    can_read?: BoolFilter<"sys_menu_role"> | boolean
    can_create?: BoolFilter<"sys_menu_role"> | boolean
    can_update?: BoolFilter<"sys_menu_role"> | boolean
    can_delete?: BoolFilter<"sys_menu_role"> | boolean
    can_export?: BoolFilter<"sys_menu_role"> | boolean
    can_print?: BoolFilter<"sys_menu_role"> | boolean
    created_at?: DateTimeFilter<"sys_menu_role"> | Date | string
    menu?: XOR<Sys_menuScalarRelationFilter, sys_menuWhereInput>
    role?: XOR<Sys_roleScalarRelationFilter, sys_roleWhereInput>
  }

  export type sys_menu_roleOrderByWithRelationInput = {
    id?: SortOrder
    menu_id?: SortOrder
    role_id?: SortOrder
    can_read?: SortOrder
    can_create?: SortOrder
    can_update?: SortOrder
    can_delete?: SortOrder
    can_export?: SortOrder
    can_print?: SortOrder
    created_at?: SortOrder
    menu?: sys_menuOrderByWithRelationInput
    role?: sys_roleOrderByWithRelationInput
  }

  export type sys_menu_roleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    menu_id_role_id?: sys_menu_roleMenu_idRole_idCompoundUniqueInput
    AND?: sys_menu_roleWhereInput | sys_menu_roleWhereInput[]
    OR?: sys_menu_roleWhereInput[]
    NOT?: sys_menu_roleWhereInput | sys_menu_roleWhereInput[]
    menu_id?: StringFilter<"sys_menu_role"> | string
    role_id?: StringFilter<"sys_menu_role"> | string
    can_read?: BoolFilter<"sys_menu_role"> | boolean
    can_create?: BoolFilter<"sys_menu_role"> | boolean
    can_update?: BoolFilter<"sys_menu_role"> | boolean
    can_delete?: BoolFilter<"sys_menu_role"> | boolean
    can_export?: BoolFilter<"sys_menu_role"> | boolean
    can_print?: BoolFilter<"sys_menu_role"> | boolean
    created_at?: DateTimeFilter<"sys_menu_role"> | Date | string
    menu?: XOR<Sys_menuScalarRelationFilter, sys_menuWhereInput>
    role?: XOR<Sys_roleScalarRelationFilter, sys_roleWhereInput>
  }, "id" | "menu_id_role_id">

  export type sys_menu_roleOrderByWithAggregationInput = {
    id?: SortOrder
    menu_id?: SortOrder
    role_id?: SortOrder
    can_read?: SortOrder
    can_create?: SortOrder
    can_update?: SortOrder
    can_delete?: SortOrder
    can_export?: SortOrder
    can_print?: SortOrder
    created_at?: SortOrder
    _count?: sys_menu_roleCountOrderByAggregateInput
    _avg?: sys_menu_roleAvgOrderByAggregateInput
    _max?: sys_menu_roleMaxOrderByAggregateInput
    _min?: sys_menu_roleMinOrderByAggregateInput
    _sum?: sys_menu_roleSumOrderByAggregateInput
  }

  export type sys_menu_roleScalarWhereWithAggregatesInput = {
    AND?: sys_menu_roleScalarWhereWithAggregatesInput | sys_menu_roleScalarWhereWithAggregatesInput[]
    OR?: sys_menu_roleScalarWhereWithAggregatesInput[]
    NOT?: sys_menu_roleScalarWhereWithAggregatesInput | sys_menu_roleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"sys_menu_role"> | number
    menu_id?: StringWithAggregatesFilter<"sys_menu_role"> | string
    role_id?: StringWithAggregatesFilter<"sys_menu_role"> | string
    can_read?: BoolWithAggregatesFilter<"sys_menu_role"> | boolean
    can_create?: BoolWithAggregatesFilter<"sys_menu_role"> | boolean
    can_update?: BoolWithAggregatesFilter<"sys_menu_role"> | boolean
    can_delete?: BoolWithAggregatesFilter<"sys_menu_role"> | boolean
    can_export?: BoolWithAggregatesFilter<"sys_menu_role"> | boolean
    can_print?: BoolWithAggregatesFilter<"sys_menu_role"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"sys_menu_role"> | Date | string
  }

  export type ProductCreateInput = {
    productCode: string
    productName: string
    category: string
    price: Decimal | DecimalJsLike | number | string
    stock?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
  }

  export type ProductUncheckedCreateInput = {
    id?: number
    productCode: string
    productName: string
    category: string
    price: Decimal | DecimalJsLike | number | string
    stock?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
  }

  export type ProductUpdateInput = {
    productCode?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    productCode?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductCreateManyInput = {
    id?: number
    productCode: string
    productName: string
    category: string
    price: Decimal | DecimalJsLike | number | string
    stock?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: string | null
    updatedBy?: string | null
  }

  export type ProductUpdateManyMutationInput = {
    productCode?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    productCode?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type postCreateInput = {
    name: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type postUncheckedCreateInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type postUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type postUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type postCreateManyInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type postUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type postUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type productCreateInput = {
    productCode: string
    productName: string
    category: string
    price: Decimal | DecimalJsLike | number | string
    stock?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    createdBy?: string | null
    updatedBy?: string | null
  }

  export type productUncheckedCreateInput = {
    id?: number
    productCode: string
    productName: string
    category: string
    price: Decimal | DecimalJsLike | number | string
    stock?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    createdBy?: string | null
    updatedBy?: string | null
  }

  export type productUpdateInput = {
    productCode?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type productUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    productCode?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type productCreateManyInput = {
    id?: number
    productCode: string
    productName: string
    category: string
    price: Decimal | DecimalJsLike | number | string
    stock?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    createdBy?: string | null
    updatedBy?: string | null
  }

  export type productUpdateManyMutationInput = {
    productCode?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type productUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    productCode?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sys_menuCreateInput = {
    menu_id: string
    menu_level?: number
    sort_order?: number
    menu_name: string
    menu_name_en?: string | null
    menu_path?: string | null
    menu_icon?: string | null
    screen_id?: string | null
    screen_type?: string
    is_active?: boolean
    is_visible?: boolean
    badge_text?: string | null
    badge_type?: string | null
    created_by?: string | null
    created_at?: Date | string
    updated_by?: string | null
    updated_at?: Date | string
    parent?: sys_menuCreateNestedOneWithoutChildrenInput
    children?: sys_menuCreateNestedManyWithoutParentInput
    menu_roles?: sys_menu_roleCreateNestedManyWithoutMenuInput
  }

  export type sys_menuUncheckedCreateInput = {
    menu_id: string
    parent_id?: string | null
    menu_level?: number
    sort_order?: number
    menu_name: string
    menu_name_en?: string | null
    menu_path?: string | null
    menu_icon?: string | null
    screen_id?: string | null
    screen_type?: string
    is_active?: boolean
    is_visible?: boolean
    badge_text?: string | null
    badge_type?: string | null
    created_by?: string | null
    created_at?: Date | string
    updated_by?: string | null
    updated_at?: Date | string
    children?: sys_menuUncheckedCreateNestedManyWithoutParentInput
    menu_roles?: sys_menu_roleUncheckedCreateNestedManyWithoutMenuInput
  }

  export type sys_menuUpdateInput = {
    menu_id?: StringFieldUpdateOperationsInput | string
    menu_level?: IntFieldUpdateOperationsInput | number
    sort_order?: IntFieldUpdateOperationsInput | number
    menu_name?: StringFieldUpdateOperationsInput | string
    menu_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    menu_path?: NullableStringFieldUpdateOperationsInput | string | null
    menu_icon?: NullableStringFieldUpdateOperationsInput | string | null
    screen_id?: NullableStringFieldUpdateOperationsInput | string | null
    screen_type?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_visible?: BoolFieldUpdateOperationsInput | boolean
    badge_text?: NullableStringFieldUpdateOperationsInput | string | null
    badge_type?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: sys_menuUpdateOneWithoutChildrenNestedInput
    children?: sys_menuUpdateManyWithoutParentNestedInput
    menu_roles?: sys_menu_roleUpdateManyWithoutMenuNestedInput
  }

  export type sys_menuUncheckedUpdateInput = {
    menu_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    menu_level?: IntFieldUpdateOperationsInput | number
    sort_order?: IntFieldUpdateOperationsInput | number
    menu_name?: StringFieldUpdateOperationsInput | string
    menu_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    menu_path?: NullableStringFieldUpdateOperationsInput | string | null
    menu_icon?: NullableStringFieldUpdateOperationsInput | string | null
    screen_id?: NullableStringFieldUpdateOperationsInput | string | null
    screen_type?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_visible?: BoolFieldUpdateOperationsInput | boolean
    badge_text?: NullableStringFieldUpdateOperationsInput | string | null
    badge_type?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: sys_menuUncheckedUpdateManyWithoutParentNestedInput
    menu_roles?: sys_menu_roleUncheckedUpdateManyWithoutMenuNestedInput
  }

  export type sys_menuCreateManyInput = {
    menu_id: string
    parent_id?: string | null
    menu_level?: number
    sort_order?: number
    menu_name: string
    menu_name_en?: string | null
    menu_path?: string | null
    menu_icon?: string | null
    screen_id?: string | null
    screen_type?: string
    is_active?: boolean
    is_visible?: boolean
    badge_text?: string | null
    badge_type?: string | null
    created_by?: string | null
    created_at?: Date | string
    updated_by?: string | null
    updated_at?: Date | string
  }

  export type sys_menuUpdateManyMutationInput = {
    menu_id?: StringFieldUpdateOperationsInput | string
    menu_level?: IntFieldUpdateOperationsInput | number
    sort_order?: IntFieldUpdateOperationsInput | number
    menu_name?: StringFieldUpdateOperationsInput | string
    menu_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    menu_path?: NullableStringFieldUpdateOperationsInput | string | null
    menu_icon?: NullableStringFieldUpdateOperationsInput | string | null
    screen_id?: NullableStringFieldUpdateOperationsInput | string | null
    screen_type?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_visible?: BoolFieldUpdateOperationsInput | boolean
    badge_text?: NullableStringFieldUpdateOperationsInput | string | null
    badge_type?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sys_menuUncheckedUpdateManyInput = {
    menu_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    menu_level?: IntFieldUpdateOperationsInput | number
    sort_order?: IntFieldUpdateOperationsInput | number
    menu_name?: StringFieldUpdateOperationsInput | string
    menu_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    menu_path?: NullableStringFieldUpdateOperationsInput | string | null
    menu_icon?: NullableStringFieldUpdateOperationsInput | string | null
    screen_id?: NullableStringFieldUpdateOperationsInput | string | null
    screen_type?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_visible?: BoolFieldUpdateOperationsInput | boolean
    badge_text?: NullableStringFieldUpdateOperationsInput | string | null
    badge_type?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sys_roleCreateInput = {
    role_id: string
    role_name: string
    role_desc?: string | null
    is_active?: boolean
    created_at?: Date | string
    menu_roles?: sys_menu_roleCreateNestedManyWithoutRoleInput
  }

  export type sys_roleUncheckedCreateInput = {
    role_id: string
    role_name: string
    role_desc?: string | null
    is_active?: boolean
    created_at?: Date | string
    menu_roles?: sys_menu_roleUncheckedCreateNestedManyWithoutRoleInput
  }

  export type sys_roleUpdateInput = {
    role_id?: StringFieldUpdateOperationsInput | string
    role_name?: StringFieldUpdateOperationsInput | string
    role_desc?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    menu_roles?: sys_menu_roleUpdateManyWithoutRoleNestedInput
  }

  export type sys_roleUncheckedUpdateInput = {
    role_id?: StringFieldUpdateOperationsInput | string
    role_name?: StringFieldUpdateOperationsInput | string
    role_desc?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    menu_roles?: sys_menu_roleUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type sys_roleCreateManyInput = {
    role_id: string
    role_name: string
    role_desc?: string | null
    is_active?: boolean
    created_at?: Date | string
  }

  export type sys_roleUpdateManyMutationInput = {
    role_id?: StringFieldUpdateOperationsInput | string
    role_name?: StringFieldUpdateOperationsInput | string
    role_desc?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sys_roleUncheckedUpdateManyInput = {
    role_id?: StringFieldUpdateOperationsInput | string
    role_name?: StringFieldUpdateOperationsInput | string
    role_desc?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sys_menu_roleCreateInput = {
    can_read?: boolean
    can_create?: boolean
    can_update?: boolean
    can_delete?: boolean
    can_export?: boolean
    can_print?: boolean
    created_at?: Date | string
    menu: sys_menuCreateNestedOneWithoutMenu_rolesInput
    role: sys_roleCreateNestedOneWithoutMenu_rolesInput
  }

  export type sys_menu_roleUncheckedCreateInput = {
    id?: number
    menu_id: string
    role_id: string
    can_read?: boolean
    can_create?: boolean
    can_update?: boolean
    can_delete?: boolean
    can_export?: boolean
    can_print?: boolean
    created_at?: Date | string
  }

  export type sys_menu_roleUpdateInput = {
    can_read?: BoolFieldUpdateOperationsInput | boolean
    can_create?: BoolFieldUpdateOperationsInput | boolean
    can_update?: BoolFieldUpdateOperationsInput | boolean
    can_delete?: BoolFieldUpdateOperationsInput | boolean
    can_export?: BoolFieldUpdateOperationsInput | boolean
    can_print?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    menu?: sys_menuUpdateOneRequiredWithoutMenu_rolesNestedInput
    role?: sys_roleUpdateOneRequiredWithoutMenu_rolesNestedInput
  }

  export type sys_menu_roleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    menu_id?: StringFieldUpdateOperationsInput | string
    role_id?: StringFieldUpdateOperationsInput | string
    can_read?: BoolFieldUpdateOperationsInput | boolean
    can_create?: BoolFieldUpdateOperationsInput | boolean
    can_update?: BoolFieldUpdateOperationsInput | boolean
    can_delete?: BoolFieldUpdateOperationsInput | boolean
    can_export?: BoolFieldUpdateOperationsInput | boolean
    can_print?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sys_menu_roleCreateManyInput = {
    id?: number
    menu_id: string
    role_id: string
    can_read?: boolean
    can_create?: boolean
    can_update?: boolean
    can_delete?: boolean
    can_export?: boolean
    can_print?: boolean
    created_at?: Date | string
  }

  export type sys_menu_roleUpdateManyMutationInput = {
    can_read?: BoolFieldUpdateOperationsInput | boolean
    can_create?: BoolFieldUpdateOperationsInput | boolean
    can_update?: BoolFieldUpdateOperationsInput | boolean
    can_delete?: BoolFieldUpdateOperationsInput | boolean
    can_export?: BoolFieldUpdateOperationsInput | boolean
    can_print?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sys_menu_roleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    menu_id?: StringFieldUpdateOperationsInput | string
    role_id?: StringFieldUpdateOperationsInput | string
    can_read?: BoolFieldUpdateOperationsInput | boolean
    can_create?: BoolFieldUpdateOperationsInput | boolean
    can_update?: BoolFieldUpdateOperationsInput | boolean
    can_delete?: BoolFieldUpdateOperationsInput | boolean
    can_export?: BoolFieldUpdateOperationsInput | boolean
    can_print?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    productCode?: SortOrder
    productName?: SortOrder
    category?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    stock?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    productCode?: SortOrder
    productName?: SortOrder
    category?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    productCode?: SortOrder
    productName?: SortOrder
    category?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    stock?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type postCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type postAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type postMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type postMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type postSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type productCountOrderByAggregateInput = {
    id?: SortOrder
    productCode?: SortOrder
    productName?: SortOrder
    category?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type productAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    stock?: SortOrder
  }

  export type productMaxOrderByAggregateInput = {
    id?: SortOrder
    productCode?: SortOrder
    productName?: SortOrder
    category?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type productMinOrderByAggregateInput = {
    id?: SortOrder
    productCode?: SortOrder
    productName?: SortOrder
    category?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
  }

  export type productSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    stock?: SortOrder
  }

  export type Sys_menuNullableScalarRelationFilter = {
    is?: sys_menuWhereInput | null
    isNot?: sys_menuWhereInput | null
  }

  export type Sys_menuListRelationFilter = {
    every?: sys_menuWhereInput
    some?: sys_menuWhereInput
    none?: sys_menuWhereInput
  }

  export type Sys_menu_roleListRelationFilter = {
    every?: sys_menu_roleWhereInput
    some?: sys_menu_roleWhereInput
    none?: sys_menu_roleWhereInput
  }

  export type sys_menuOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type sys_menu_roleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type sys_menuCountOrderByAggregateInput = {
    menu_id?: SortOrder
    parent_id?: SortOrder
    menu_level?: SortOrder
    sort_order?: SortOrder
    menu_name?: SortOrder
    menu_name_en?: SortOrder
    menu_path?: SortOrder
    menu_icon?: SortOrder
    screen_id?: SortOrder
    screen_type?: SortOrder
    is_active?: SortOrder
    is_visible?: SortOrder
    badge_text?: SortOrder
    badge_type?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_by?: SortOrder
    updated_at?: SortOrder
  }

  export type sys_menuAvgOrderByAggregateInput = {
    menu_level?: SortOrder
    sort_order?: SortOrder
  }

  export type sys_menuMaxOrderByAggregateInput = {
    menu_id?: SortOrder
    parent_id?: SortOrder
    menu_level?: SortOrder
    sort_order?: SortOrder
    menu_name?: SortOrder
    menu_name_en?: SortOrder
    menu_path?: SortOrder
    menu_icon?: SortOrder
    screen_id?: SortOrder
    screen_type?: SortOrder
    is_active?: SortOrder
    is_visible?: SortOrder
    badge_text?: SortOrder
    badge_type?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_by?: SortOrder
    updated_at?: SortOrder
  }

  export type sys_menuMinOrderByAggregateInput = {
    menu_id?: SortOrder
    parent_id?: SortOrder
    menu_level?: SortOrder
    sort_order?: SortOrder
    menu_name?: SortOrder
    menu_name_en?: SortOrder
    menu_path?: SortOrder
    menu_icon?: SortOrder
    screen_id?: SortOrder
    screen_type?: SortOrder
    is_active?: SortOrder
    is_visible?: SortOrder
    badge_text?: SortOrder
    badge_type?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_by?: SortOrder
    updated_at?: SortOrder
  }

  export type sys_menuSumOrderByAggregateInput = {
    menu_level?: SortOrder
    sort_order?: SortOrder
  }

  export type sys_roleCountOrderByAggregateInput = {
    role_id?: SortOrder
    role_name?: SortOrder
    role_desc?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
  }

  export type sys_roleMaxOrderByAggregateInput = {
    role_id?: SortOrder
    role_name?: SortOrder
    role_desc?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
  }

  export type sys_roleMinOrderByAggregateInput = {
    role_id?: SortOrder
    role_name?: SortOrder
    role_desc?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
  }

  export type Sys_menuScalarRelationFilter = {
    is?: sys_menuWhereInput
    isNot?: sys_menuWhereInput
  }

  export type Sys_roleScalarRelationFilter = {
    is?: sys_roleWhereInput
    isNot?: sys_roleWhereInput
  }

  export type sys_menu_roleMenu_idRole_idCompoundUniqueInput = {
    menu_id: string
    role_id: string
  }

  export type sys_menu_roleCountOrderByAggregateInput = {
    id?: SortOrder
    menu_id?: SortOrder
    role_id?: SortOrder
    can_read?: SortOrder
    can_create?: SortOrder
    can_update?: SortOrder
    can_delete?: SortOrder
    can_export?: SortOrder
    can_print?: SortOrder
    created_at?: SortOrder
  }

  export type sys_menu_roleAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type sys_menu_roleMaxOrderByAggregateInput = {
    id?: SortOrder
    menu_id?: SortOrder
    role_id?: SortOrder
    can_read?: SortOrder
    can_create?: SortOrder
    can_update?: SortOrder
    can_delete?: SortOrder
    can_export?: SortOrder
    can_print?: SortOrder
    created_at?: SortOrder
  }

  export type sys_menu_roleMinOrderByAggregateInput = {
    id?: SortOrder
    menu_id?: SortOrder
    role_id?: SortOrder
    can_read?: SortOrder
    can_create?: SortOrder
    can_update?: SortOrder
    can_delete?: SortOrder
    can_export?: SortOrder
    can_print?: SortOrder
    created_at?: SortOrder
  }

  export type sys_menu_roleSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type sys_menuCreateNestedOneWithoutChildrenInput = {
    create?: XOR<sys_menuCreateWithoutChildrenInput, sys_menuUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: sys_menuCreateOrConnectWithoutChildrenInput
    connect?: sys_menuWhereUniqueInput
  }

  export type sys_menuCreateNestedManyWithoutParentInput = {
    create?: XOR<sys_menuCreateWithoutParentInput, sys_menuUncheckedCreateWithoutParentInput> | sys_menuCreateWithoutParentInput[] | sys_menuUncheckedCreateWithoutParentInput[]
    connectOrCreate?: sys_menuCreateOrConnectWithoutParentInput | sys_menuCreateOrConnectWithoutParentInput[]
    createMany?: sys_menuCreateManyParentInputEnvelope
    connect?: sys_menuWhereUniqueInput | sys_menuWhereUniqueInput[]
  }

  export type sys_menu_roleCreateNestedManyWithoutMenuInput = {
    create?: XOR<sys_menu_roleCreateWithoutMenuInput, sys_menu_roleUncheckedCreateWithoutMenuInput> | sys_menu_roleCreateWithoutMenuInput[] | sys_menu_roleUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: sys_menu_roleCreateOrConnectWithoutMenuInput | sys_menu_roleCreateOrConnectWithoutMenuInput[]
    createMany?: sys_menu_roleCreateManyMenuInputEnvelope
    connect?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
  }

  export type sys_menuUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<sys_menuCreateWithoutParentInput, sys_menuUncheckedCreateWithoutParentInput> | sys_menuCreateWithoutParentInput[] | sys_menuUncheckedCreateWithoutParentInput[]
    connectOrCreate?: sys_menuCreateOrConnectWithoutParentInput | sys_menuCreateOrConnectWithoutParentInput[]
    createMany?: sys_menuCreateManyParentInputEnvelope
    connect?: sys_menuWhereUniqueInput | sys_menuWhereUniqueInput[]
  }

  export type sys_menu_roleUncheckedCreateNestedManyWithoutMenuInput = {
    create?: XOR<sys_menu_roleCreateWithoutMenuInput, sys_menu_roleUncheckedCreateWithoutMenuInput> | sys_menu_roleCreateWithoutMenuInput[] | sys_menu_roleUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: sys_menu_roleCreateOrConnectWithoutMenuInput | sys_menu_roleCreateOrConnectWithoutMenuInput[]
    createMany?: sys_menu_roleCreateManyMenuInputEnvelope
    connect?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
  }

  export type sys_menuUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<sys_menuCreateWithoutChildrenInput, sys_menuUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: sys_menuCreateOrConnectWithoutChildrenInput
    upsert?: sys_menuUpsertWithoutChildrenInput
    disconnect?: sys_menuWhereInput | boolean
    delete?: sys_menuWhereInput | boolean
    connect?: sys_menuWhereUniqueInput
    update?: XOR<XOR<sys_menuUpdateToOneWithWhereWithoutChildrenInput, sys_menuUpdateWithoutChildrenInput>, sys_menuUncheckedUpdateWithoutChildrenInput>
  }

  export type sys_menuUpdateManyWithoutParentNestedInput = {
    create?: XOR<sys_menuCreateWithoutParentInput, sys_menuUncheckedCreateWithoutParentInput> | sys_menuCreateWithoutParentInput[] | sys_menuUncheckedCreateWithoutParentInput[]
    connectOrCreate?: sys_menuCreateOrConnectWithoutParentInput | sys_menuCreateOrConnectWithoutParentInput[]
    upsert?: sys_menuUpsertWithWhereUniqueWithoutParentInput | sys_menuUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: sys_menuCreateManyParentInputEnvelope
    set?: sys_menuWhereUniqueInput | sys_menuWhereUniqueInput[]
    disconnect?: sys_menuWhereUniqueInput | sys_menuWhereUniqueInput[]
    delete?: sys_menuWhereUniqueInput | sys_menuWhereUniqueInput[]
    connect?: sys_menuWhereUniqueInput | sys_menuWhereUniqueInput[]
    update?: sys_menuUpdateWithWhereUniqueWithoutParentInput | sys_menuUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: sys_menuUpdateManyWithWhereWithoutParentInput | sys_menuUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: sys_menuScalarWhereInput | sys_menuScalarWhereInput[]
  }

  export type sys_menu_roleUpdateManyWithoutMenuNestedInput = {
    create?: XOR<sys_menu_roleCreateWithoutMenuInput, sys_menu_roleUncheckedCreateWithoutMenuInput> | sys_menu_roleCreateWithoutMenuInput[] | sys_menu_roleUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: sys_menu_roleCreateOrConnectWithoutMenuInput | sys_menu_roleCreateOrConnectWithoutMenuInput[]
    upsert?: sys_menu_roleUpsertWithWhereUniqueWithoutMenuInput | sys_menu_roleUpsertWithWhereUniqueWithoutMenuInput[]
    createMany?: sys_menu_roleCreateManyMenuInputEnvelope
    set?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
    disconnect?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
    delete?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
    connect?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
    update?: sys_menu_roleUpdateWithWhereUniqueWithoutMenuInput | sys_menu_roleUpdateWithWhereUniqueWithoutMenuInput[]
    updateMany?: sys_menu_roleUpdateManyWithWhereWithoutMenuInput | sys_menu_roleUpdateManyWithWhereWithoutMenuInput[]
    deleteMany?: sys_menu_roleScalarWhereInput | sys_menu_roleScalarWhereInput[]
  }

  export type sys_menuUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<sys_menuCreateWithoutParentInput, sys_menuUncheckedCreateWithoutParentInput> | sys_menuCreateWithoutParentInput[] | sys_menuUncheckedCreateWithoutParentInput[]
    connectOrCreate?: sys_menuCreateOrConnectWithoutParentInput | sys_menuCreateOrConnectWithoutParentInput[]
    upsert?: sys_menuUpsertWithWhereUniqueWithoutParentInput | sys_menuUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: sys_menuCreateManyParentInputEnvelope
    set?: sys_menuWhereUniqueInput | sys_menuWhereUniqueInput[]
    disconnect?: sys_menuWhereUniqueInput | sys_menuWhereUniqueInput[]
    delete?: sys_menuWhereUniqueInput | sys_menuWhereUniqueInput[]
    connect?: sys_menuWhereUniqueInput | sys_menuWhereUniqueInput[]
    update?: sys_menuUpdateWithWhereUniqueWithoutParentInput | sys_menuUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: sys_menuUpdateManyWithWhereWithoutParentInput | sys_menuUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: sys_menuScalarWhereInput | sys_menuScalarWhereInput[]
  }

  export type sys_menu_roleUncheckedUpdateManyWithoutMenuNestedInput = {
    create?: XOR<sys_menu_roleCreateWithoutMenuInput, sys_menu_roleUncheckedCreateWithoutMenuInput> | sys_menu_roleCreateWithoutMenuInput[] | sys_menu_roleUncheckedCreateWithoutMenuInput[]
    connectOrCreate?: sys_menu_roleCreateOrConnectWithoutMenuInput | sys_menu_roleCreateOrConnectWithoutMenuInput[]
    upsert?: sys_menu_roleUpsertWithWhereUniqueWithoutMenuInput | sys_menu_roleUpsertWithWhereUniqueWithoutMenuInput[]
    createMany?: sys_menu_roleCreateManyMenuInputEnvelope
    set?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
    disconnect?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
    delete?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
    connect?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
    update?: sys_menu_roleUpdateWithWhereUniqueWithoutMenuInput | sys_menu_roleUpdateWithWhereUniqueWithoutMenuInput[]
    updateMany?: sys_menu_roleUpdateManyWithWhereWithoutMenuInput | sys_menu_roleUpdateManyWithWhereWithoutMenuInput[]
    deleteMany?: sys_menu_roleScalarWhereInput | sys_menu_roleScalarWhereInput[]
  }

  export type sys_menu_roleCreateNestedManyWithoutRoleInput = {
    create?: XOR<sys_menu_roleCreateWithoutRoleInput, sys_menu_roleUncheckedCreateWithoutRoleInput> | sys_menu_roleCreateWithoutRoleInput[] | sys_menu_roleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: sys_menu_roleCreateOrConnectWithoutRoleInput | sys_menu_roleCreateOrConnectWithoutRoleInput[]
    createMany?: sys_menu_roleCreateManyRoleInputEnvelope
    connect?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
  }

  export type sys_menu_roleUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<sys_menu_roleCreateWithoutRoleInput, sys_menu_roleUncheckedCreateWithoutRoleInput> | sys_menu_roleCreateWithoutRoleInput[] | sys_menu_roleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: sys_menu_roleCreateOrConnectWithoutRoleInput | sys_menu_roleCreateOrConnectWithoutRoleInput[]
    createMany?: sys_menu_roleCreateManyRoleInputEnvelope
    connect?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
  }

  export type sys_menu_roleUpdateManyWithoutRoleNestedInput = {
    create?: XOR<sys_menu_roleCreateWithoutRoleInput, sys_menu_roleUncheckedCreateWithoutRoleInput> | sys_menu_roleCreateWithoutRoleInput[] | sys_menu_roleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: sys_menu_roleCreateOrConnectWithoutRoleInput | sys_menu_roleCreateOrConnectWithoutRoleInput[]
    upsert?: sys_menu_roleUpsertWithWhereUniqueWithoutRoleInput | sys_menu_roleUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: sys_menu_roleCreateManyRoleInputEnvelope
    set?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
    disconnect?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
    delete?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
    connect?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
    update?: sys_menu_roleUpdateWithWhereUniqueWithoutRoleInput | sys_menu_roleUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: sys_menu_roleUpdateManyWithWhereWithoutRoleInput | sys_menu_roleUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: sys_menu_roleScalarWhereInput | sys_menu_roleScalarWhereInput[]
  }

  export type sys_menu_roleUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<sys_menu_roleCreateWithoutRoleInput, sys_menu_roleUncheckedCreateWithoutRoleInput> | sys_menu_roleCreateWithoutRoleInput[] | sys_menu_roleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: sys_menu_roleCreateOrConnectWithoutRoleInput | sys_menu_roleCreateOrConnectWithoutRoleInput[]
    upsert?: sys_menu_roleUpsertWithWhereUniqueWithoutRoleInput | sys_menu_roleUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: sys_menu_roleCreateManyRoleInputEnvelope
    set?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
    disconnect?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
    delete?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
    connect?: sys_menu_roleWhereUniqueInput | sys_menu_roleWhereUniqueInput[]
    update?: sys_menu_roleUpdateWithWhereUniqueWithoutRoleInput | sys_menu_roleUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: sys_menu_roleUpdateManyWithWhereWithoutRoleInput | sys_menu_roleUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: sys_menu_roleScalarWhereInput | sys_menu_roleScalarWhereInput[]
  }

  export type sys_menuCreateNestedOneWithoutMenu_rolesInput = {
    create?: XOR<sys_menuCreateWithoutMenu_rolesInput, sys_menuUncheckedCreateWithoutMenu_rolesInput>
    connectOrCreate?: sys_menuCreateOrConnectWithoutMenu_rolesInput
    connect?: sys_menuWhereUniqueInput
  }

  export type sys_roleCreateNestedOneWithoutMenu_rolesInput = {
    create?: XOR<sys_roleCreateWithoutMenu_rolesInput, sys_roleUncheckedCreateWithoutMenu_rolesInput>
    connectOrCreate?: sys_roleCreateOrConnectWithoutMenu_rolesInput
    connect?: sys_roleWhereUniqueInput
  }

  export type sys_menuUpdateOneRequiredWithoutMenu_rolesNestedInput = {
    create?: XOR<sys_menuCreateWithoutMenu_rolesInput, sys_menuUncheckedCreateWithoutMenu_rolesInput>
    connectOrCreate?: sys_menuCreateOrConnectWithoutMenu_rolesInput
    upsert?: sys_menuUpsertWithoutMenu_rolesInput
    connect?: sys_menuWhereUniqueInput
    update?: XOR<XOR<sys_menuUpdateToOneWithWhereWithoutMenu_rolesInput, sys_menuUpdateWithoutMenu_rolesInput>, sys_menuUncheckedUpdateWithoutMenu_rolesInput>
  }

  export type sys_roleUpdateOneRequiredWithoutMenu_rolesNestedInput = {
    create?: XOR<sys_roleCreateWithoutMenu_rolesInput, sys_roleUncheckedCreateWithoutMenu_rolesInput>
    connectOrCreate?: sys_roleCreateOrConnectWithoutMenu_rolesInput
    upsert?: sys_roleUpsertWithoutMenu_rolesInput
    connect?: sys_roleWhereUniqueInput
    update?: XOR<XOR<sys_roleUpdateToOneWithWhereWithoutMenu_rolesInput, sys_roleUpdateWithoutMenu_rolesInput>, sys_roleUncheckedUpdateWithoutMenu_rolesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type sys_menuCreateWithoutChildrenInput = {
    menu_id: string
    menu_level?: number
    sort_order?: number
    menu_name: string
    menu_name_en?: string | null
    menu_path?: string | null
    menu_icon?: string | null
    screen_id?: string | null
    screen_type?: string
    is_active?: boolean
    is_visible?: boolean
    badge_text?: string | null
    badge_type?: string | null
    created_by?: string | null
    created_at?: Date | string
    updated_by?: string | null
    updated_at?: Date | string
    parent?: sys_menuCreateNestedOneWithoutChildrenInput
    menu_roles?: sys_menu_roleCreateNestedManyWithoutMenuInput
  }

  export type sys_menuUncheckedCreateWithoutChildrenInput = {
    menu_id: string
    parent_id?: string | null
    menu_level?: number
    sort_order?: number
    menu_name: string
    menu_name_en?: string | null
    menu_path?: string | null
    menu_icon?: string | null
    screen_id?: string | null
    screen_type?: string
    is_active?: boolean
    is_visible?: boolean
    badge_text?: string | null
    badge_type?: string | null
    created_by?: string | null
    created_at?: Date | string
    updated_by?: string | null
    updated_at?: Date | string
    menu_roles?: sys_menu_roleUncheckedCreateNestedManyWithoutMenuInput
  }

  export type sys_menuCreateOrConnectWithoutChildrenInput = {
    where: sys_menuWhereUniqueInput
    create: XOR<sys_menuCreateWithoutChildrenInput, sys_menuUncheckedCreateWithoutChildrenInput>
  }

  export type sys_menuCreateWithoutParentInput = {
    menu_id: string
    menu_level?: number
    sort_order?: number
    menu_name: string
    menu_name_en?: string | null
    menu_path?: string | null
    menu_icon?: string | null
    screen_id?: string | null
    screen_type?: string
    is_active?: boolean
    is_visible?: boolean
    badge_text?: string | null
    badge_type?: string | null
    created_by?: string | null
    created_at?: Date | string
    updated_by?: string | null
    updated_at?: Date | string
    children?: sys_menuCreateNestedManyWithoutParentInput
    menu_roles?: sys_menu_roleCreateNestedManyWithoutMenuInput
  }

  export type sys_menuUncheckedCreateWithoutParentInput = {
    menu_id: string
    menu_level?: number
    sort_order?: number
    menu_name: string
    menu_name_en?: string | null
    menu_path?: string | null
    menu_icon?: string | null
    screen_id?: string | null
    screen_type?: string
    is_active?: boolean
    is_visible?: boolean
    badge_text?: string | null
    badge_type?: string | null
    created_by?: string | null
    created_at?: Date | string
    updated_by?: string | null
    updated_at?: Date | string
    children?: sys_menuUncheckedCreateNestedManyWithoutParentInput
    menu_roles?: sys_menu_roleUncheckedCreateNestedManyWithoutMenuInput
  }

  export type sys_menuCreateOrConnectWithoutParentInput = {
    where: sys_menuWhereUniqueInput
    create: XOR<sys_menuCreateWithoutParentInput, sys_menuUncheckedCreateWithoutParentInput>
  }

  export type sys_menuCreateManyParentInputEnvelope = {
    data: sys_menuCreateManyParentInput | sys_menuCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type sys_menu_roleCreateWithoutMenuInput = {
    can_read?: boolean
    can_create?: boolean
    can_update?: boolean
    can_delete?: boolean
    can_export?: boolean
    can_print?: boolean
    created_at?: Date | string
    role: sys_roleCreateNestedOneWithoutMenu_rolesInput
  }

  export type sys_menu_roleUncheckedCreateWithoutMenuInput = {
    id?: number
    role_id: string
    can_read?: boolean
    can_create?: boolean
    can_update?: boolean
    can_delete?: boolean
    can_export?: boolean
    can_print?: boolean
    created_at?: Date | string
  }

  export type sys_menu_roleCreateOrConnectWithoutMenuInput = {
    where: sys_menu_roleWhereUniqueInput
    create: XOR<sys_menu_roleCreateWithoutMenuInput, sys_menu_roleUncheckedCreateWithoutMenuInput>
  }

  export type sys_menu_roleCreateManyMenuInputEnvelope = {
    data: sys_menu_roleCreateManyMenuInput | sys_menu_roleCreateManyMenuInput[]
    skipDuplicates?: boolean
  }

  export type sys_menuUpsertWithoutChildrenInput = {
    update: XOR<sys_menuUpdateWithoutChildrenInput, sys_menuUncheckedUpdateWithoutChildrenInput>
    create: XOR<sys_menuCreateWithoutChildrenInput, sys_menuUncheckedCreateWithoutChildrenInput>
    where?: sys_menuWhereInput
  }

  export type sys_menuUpdateToOneWithWhereWithoutChildrenInput = {
    where?: sys_menuWhereInput
    data: XOR<sys_menuUpdateWithoutChildrenInput, sys_menuUncheckedUpdateWithoutChildrenInput>
  }

  export type sys_menuUpdateWithoutChildrenInput = {
    menu_id?: StringFieldUpdateOperationsInput | string
    menu_level?: IntFieldUpdateOperationsInput | number
    sort_order?: IntFieldUpdateOperationsInput | number
    menu_name?: StringFieldUpdateOperationsInput | string
    menu_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    menu_path?: NullableStringFieldUpdateOperationsInput | string | null
    menu_icon?: NullableStringFieldUpdateOperationsInput | string | null
    screen_id?: NullableStringFieldUpdateOperationsInput | string | null
    screen_type?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_visible?: BoolFieldUpdateOperationsInput | boolean
    badge_text?: NullableStringFieldUpdateOperationsInput | string | null
    badge_type?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: sys_menuUpdateOneWithoutChildrenNestedInput
    menu_roles?: sys_menu_roleUpdateManyWithoutMenuNestedInput
  }

  export type sys_menuUncheckedUpdateWithoutChildrenInput = {
    menu_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    menu_level?: IntFieldUpdateOperationsInput | number
    sort_order?: IntFieldUpdateOperationsInput | number
    menu_name?: StringFieldUpdateOperationsInput | string
    menu_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    menu_path?: NullableStringFieldUpdateOperationsInput | string | null
    menu_icon?: NullableStringFieldUpdateOperationsInput | string | null
    screen_id?: NullableStringFieldUpdateOperationsInput | string | null
    screen_type?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_visible?: BoolFieldUpdateOperationsInput | boolean
    badge_text?: NullableStringFieldUpdateOperationsInput | string | null
    badge_type?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    menu_roles?: sys_menu_roleUncheckedUpdateManyWithoutMenuNestedInput
  }

  export type sys_menuUpsertWithWhereUniqueWithoutParentInput = {
    where: sys_menuWhereUniqueInput
    update: XOR<sys_menuUpdateWithoutParentInput, sys_menuUncheckedUpdateWithoutParentInput>
    create: XOR<sys_menuCreateWithoutParentInput, sys_menuUncheckedCreateWithoutParentInput>
  }

  export type sys_menuUpdateWithWhereUniqueWithoutParentInput = {
    where: sys_menuWhereUniqueInput
    data: XOR<sys_menuUpdateWithoutParentInput, sys_menuUncheckedUpdateWithoutParentInput>
  }

  export type sys_menuUpdateManyWithWhereWithoutParentInput = {
    where: sys_menuScalarWhereInput
    data: XOR<sys_menuUpdateManyMutationInput, sys_menuUncheckedUpdateManyWithoutParentInput>
  }

  export type sys_menuScalarWhereInput = {
    AND?: sys_menuScalarWhereInput | sys_menuScalarWhereInput[]
    OR?: sys_menuScalarWhereInput[]
    NOT?: sys_menuScalarWhereInput | sys_menuScalarWhereInput[]
    menu_id?: StringFilter<"sys_menu"> | string
    parent_id?: StringNullableFilter<"sys_menu"> | string | null
    menu_level?: IntFilter<"sys_menu"> | number
    sort_order?: IntFilter<"sys_menu"> | number
    menu_name?: StringFilter<"sys_menu"> | string
    menu_name_en?: StringNullableFilter<"sys_menu"> | string | null
    menu_path?: StringNullableFilter<"sys_menu"> | string | null
    menu_icon?: StringNullableFilter<"sys_menu"> | string | null
    screen_id?: StringNullableFilter<"sys_menu"> | string | null
    screen_type?: StringFilter<"sys_menu"> | string
    is_active?: BoolFilter<"sys_menu"> | boolean
    is_visible?: BoolFilter<"sys_menu"> | boolean
    badge_text?: StringNullableFilter<"sys_menu"> | string | null
    badge_type?: StringNullableFilter<"sys_menu"> | string | null
    created_by?: StringNullableFilter<"sys_menu"> | string | null
    created_at?: DateTimeFilter<"sys_menu"> | Date | string
    updated_by?: StringNullableFilter<"sys_menu"> | string | null
    updated_at?: DateTimeFilter<"sys_menu"> | Date | string
  }

  export type sys_menu_roleUpsertWithWhereUniqueWithoutMenuInput = {
    where: sys_menu_roleWhereUniqueInput
    update: XOR<sys_menu_roleUpdateWithoutMenuInput, sys_menu_roleUncheckedUpdateWithoutMenuInput>
    create: XOR<sys_menu_roleCreateWithoutMenuInput, sys_menu_roleUncheckedCreateWithoutMenuInput>
  }

  export type sys_menu_roleUpdateWithWhereUniqueWithoutMenuInput = {
    where: sys_menu_roleWhereUniqueInput
    data: XOR<sys_menu_roleUpdateWithoutMenuInput, sys_menu_roleUncheckedUpdateWithoutMenuInput>
  }

  export type sys_menu_roleUpdateManyWithWhereWithoutMenuInput = {
    where: sys_menu_roleScalarWhereInput
    data: XOR<sys_menu_roleUpdateManyMutationInput, sys_menu_roleUncheckedUpdateManyWithoutMenuInput>
  }

  export type sys_menu_roleScalarWhereInput = {
    AND?: sys_menu_roleScalarWhereInput | sys_menu_roleScalarWhereInput[]
    OR?: sys_menu_roleScalarWhereInput[]
    NOT?: sys_menu_roleScalarWhereInput | sys_menu_roleScalarWhereInput[]
    id?: IntFilter<"sys_menu_role"> | number
    menu_id?: StringFilter<"sys_menu_role"> | string
    role_id?: StringFilter<"sys_menu_role"> | string
    can_read?: BoolFilter<"sys_menu_role"> | boolean
    can_create?: BoolFilter<"sys_menu_role"> | boolean
    can_update?: BoolFilter<"sys_menu_role"> | boolean
    can_delete?: BoolFilter<"sys_menu_role"> | boolean
    can_export?: BoolFilter<"sys_menu_role"> | boolean
    can_print?: BoolFilter<"sys_menu_role"> | boolean
    created_at?: DateTimeFilter<"sys_menu_role"> | Date | string
  }

  export type sys_menu_roleCreateWithoutRoleInput = {
    can_read?: boolean
    can_create?: boolean
    can_update?: boolean
    can_delete?: boolean
    can_export?: boolean
    can_print?: boolean
    created_at?: Date | string
    menu: sys_menuCreateNestedOneWithoutMenu_rolesInput
  }

  export type sys_menu_roleUncheckedCreateWithoutRoleInput = {
    id?: number
    menu_id: string
    can_read?: boolean
    can_create?: boolean
    can_update?: boolean
    can_delete?: boolean
    can_export?: boolean
    can_print?: boolean
    created_at?: Date | string
  }

  export type sys_menu_roleCreateOrConnectWithoutRoleInput = {
    where: sys_menu_roleWhereUniqueInput
    create: XOR<sys_menu_roleCreateWithoutRoleInput, sys_menu_roleUncheckedCreateWithoutRoleInput>
  }

  export type sys_menu_roleCreateManyRoleInputEnvelope = {
    data: sys_menu_roleCreateManyRoleInput | sys_menu_roleCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type sys_menu_roleUpsertWithWhereUniqueWithoutRoleInput = {
    where: sys_menu_roleWhereUniqueInput
    update: XOR<sys_menu_roleUpdateWithoutRoleInput, sys_menu_roleUncheckedUpdateWithoutRoleInput>
    create: XOR<sys_menu_roleCreateWithoutRoleInput, sys_menu_roleUncheckedCreateWithoutRoleInput>
  }

  export type sys_menu_roleUpdateWithWhereUniqueWithoutRoleInput = {
    where: sys_menu_roleWhereUniqueInput
    data: XOR<sys_menu_roleUpdateWithoutRoleInput, sys_menu_roleUncheckedUpdateWithoutRoleInput>
  }

  export type sys_menu_roleUpdateManyWithWhereWithoutRoleInput = {
    where: sys_menu_roleScalarWhereInput
    data: XOR<sys_menu_roleUpdateManyMutationInput, sys_menu_roleUncheckedUpdateManyWithoutRoleInput>
  }

  export type sys_menuCreateWithoutMenu_rolesInput = {
    menu_id: string
    menu_level?: number
    sort_order?: number
    menu_name: string
    menu_name_en?: string | null
    menu_path?: string | null
    menu_icon?: string | null
    screen_id?: string | null
    screen_type?: string
    is_active?: boolean
    is_visible?: boolean
    badge_text?: string | null
    badge_type?: string | null
    created_by?: string | null
    created_at?: Date | string
    updated_by?: string | null
    updated_at?: Date | string
    parent?: sys_menuCreateNestedOneWithoutChildrenInput
    children?: sys_menuCreateNestedManyWithoutParentInput
  }

  export type sys_menuUncheckedCreateWithoutMenu_rolesInput = {
    menu_id: string
    parent_id?: string | null
    menu_level?: number
    sort_order?: number
    menu_name: string
    menu_name_en?: string | null
    menu_path?: string | null
    menu_icon?: string | null
    screen_id?: string | null
    screen_type?: string
    is_active?: boolean
    is_visible?: boolean
    badge_text?: string | null
    badge_type?: string | null
    created_by?: string | null
    created_at?: Date | string
    updated_by?: string | null
    updated_at?: Date | string
    children?: sys_menuUncheckedCreateNestedManyWithoutParentInput
  }

  export type sys_menuCreateOrConnectWithoutMenu_rolesInput = {
    where: sys_menuWhereUniqueInput
    create: XOR<sys_menuCreateWithoutMenu_rolesInput, sys_menuUncheckedCreateWithoutMenu_rolesInput>
  }

  export type sys_roleCreateWithoutMenu_rolesInput = {
    role_id: string
    role_name: string
    role_desc?: string | null
    is_active?: boolean
    created_at?: Date | string
  }

  export type sys_roleUncheckedCreateWithoutMenu_rolesInput = {
    role_id: string
    role_name: string
    role_desc?: string | null
    is_active?: boolean
    created_at?: Date | string
  }

  export type sys_roleCreateOrConnectWithoutMenu_rolesInput = {
    where: sys_roleWhereUniqueInput
    create: XOR<sys_roleCreateWithoutMenu_rolesInput, sys_roleUncheckedCreateWithoutMenu_rolesInput>
  }

  export type sys_menuUpsertWithoutMenu_rolesInput = {
    update: XOR<sys_menuUpdateWithoutMenu_rolesInput, sys_menuUncheckedUpdateWithoutMenu_rolesInput>
    create: XOR<sys_menuCreateWithoutMenu_rolesInput, sys_menuUncheckedCreateWithoutMenu_rolesInput>
    where?: sys_menuWhereInput
  }

  export type sys_menuUpdateToOneWithWhereWithoutMenu_rolesInput = {
    where?: sys_menuWhereInput
    data: XOR<sys_menuUpdateWithoutMenu_rolesInput, sys_menuUncheckedUpdateWithoutMenu_rolesInput>
  }

  export type sys_menuUpdateWithoutMenu_rolesInput = {
    menu_id?: StringFieldUpdateOperationsInput | string
    menu_level?: IntFieldUpdateOperationsInput | number
    sort_order?: IntFieldUpdateOperationsInput | number
    menu_name?: StringFieldUpdateOperationsInput | string
    menu_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    menu_path?: NullableStringFieldUpdateOperationsInput | string | null
    menu_icon?: NullableStringFieldUpdateOperationsInput | string | null
    screen_id?: NullableStringFieldUpdateOperationsInput | string | null
    screen_type?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_visible?: BoolFieldUpdateOperationsInput | boolean
    badge_text?: NullableStringFieldUpdateOperationsInput | string | null
    badge_type?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: sys_menuUpdateOneWithoutChildrenNestedInput
    children?: sys_menuUpdateManyWithoutParentNestedInput
  }

  export type sys_menuUncheckedUpdateWithoutMenu_rolesInput = {
    menu_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    menu_level?: IntFieldUpdateOperationsInput | number
    sort_order?: IntFieldUpdateOperationsInput | number
    menu_name?: StringFieldUpdateOperationsInput | string
    menu_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    menu_path?: NullableStringFieldUpdateOperationsInput | string | null
    menu_icon?: NullableStringFieldUpdateOperationsInput | string | null
    screen_id?: NullableStringFieldUpdateOperationsInput | string | null
    screen_type?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_visible?: BoolFieldUpdateOperationsInput | boolean
    badge_text?: NullableStringFieldUpdateOperationsInput | string | null
    badge_type?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: sys_menuUncheckedUpdateManyWithoutParentNestedInput
  }

  export type sys_roleUpsertWithoutMenu_rolesInput = {
    update: XOR<sys_roleUpdateWithoutMenu_rolesInput, sys_roleUncheckedUpdateWithoutMenu_rolesInput>
    create: XOR<sys_roleCreateWithoutMenu_rolesInput, sys_roleUncheckedCreateWithoutMenu_rolesInput>
    where?: sys_roleWhereInput
  }

  export type sys_roleUpdateToOneWithWhereWithoutMenu_rolesInput = {
    where?: sys_roleWhereInput
    data: XOR<sys_roleUpdateWithoutMenu_rolesInput, sys_roleUncheckedUpdateWithoutMenu_rolesInput>
  }

  export type sys_roleUpdateWithoutMenu_rolesInput = {
    role_id?: StringFieldUpdateOperationsInput | string
    role_name?: StringFieldUpdateOperationsInput | string
    role_desc?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sys_roleUncheckedUpdateWithoutMenu_rolesInput = {
    role_id?: StringFieldUpdateOperationsInput | string
    role_name?: StringFieldUpdateOperationsInput | string
    role_desc?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sys_menuCreateManyParentInput = {
    menu_id: string
    menu_level?: number
    sort_order?: number
    menu_name: string
    menu_name_en?: string | null
    menu_path?: string | null
    menu_icon?: string | null
    screen_id?: string | null
    screen_type?: string
    is_active?: boolean
    is_visible?: boolean
    badge_text?: string | null
    badge_type?: string | null
    created_by?: string | null
    created_at?: Date | string
    updated_by?: string | null
    updated_at?: Date | string
  }

  export type sys_menu_roleCreateManyMenuInput = {
    id?: number
    role_id: string
    can_read?: boolean
    can_create?: boolean
    can_update?: boolean
    can_delete?: boolean
    can_export?: boolean
    can_print?: boolean
    created_at?: Date | string
  }

  export type sys_menuUpdateWithoutParentInput = {
    menu_id?: StringFieldUpdateOperationsInput | string
    menu_level?: IntFieldUpdateOperationsInput | number
    sort_order?: IntFieldUpdateOperationsInput | number
    menu_name?: StringFieldUpdateOperationsInput | string
    menu_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    menu_path?: NullableStringFieldUpdateOperationsInput | string | null
    menu_icon?: NullableStringFieldUpdateOperationsInput | string | null
    screen_id?: NullableStringFieldUpdateOperationsInput | string | null
    screen_type?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_visible?: BoolFieldUpdateOperationsInput | boolean
    badge_text?: NullableStringFieldUpdateOperationsInput | string | null
    badge_type?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: sys_menuUpdateManyWithoutParentNestedInput
    menu_roles?: sys_menu_roleUpdateManyWithoutMenuNestedInput
  }

  export type sys_menuUncheckedUpdateWithoutParentInput = {
    menu_id?: StringFieldUpdateOperationsInput | string
    menu_level?: IntFieldUpdateOperationsInput | number
    sort_order?: IntFieldUpdateOperationsInput | number
    menu_name?: StringFieldUpdateOperationsInput | string
    menu_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    menu_path?: NullableStringFieldUpdateOperationsInput | string | null
    menu_icon?: NullableStringFieldUpdateOperationsInput | string | null
    screen_id?: NullableStringFieldUpdateOperationsInput | string | null
    screen_type?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_visible?: BoolFieldUpdateOperationsInput | boolean
    badge_text?: NullableStringFieldUpdateOperationsInput | string | null
    badge_type?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: sys_menuUncheckedUpdateManyWithoutParentNestedInput
    menu_roles?: sys_menu_roleUncheckedUpdateManyWithoutMenuNestedInput
  }

  export type sys_menuUncheckedUpdateManyWithoutParentInput = {
    menu_id?: StringFieldUpdateOperationsInput | string
    menu_level?: IntFieldUpdateOperationsInput | number
    sort_order?: IntFieldUpdateOperationsInput | number
    menu_name?: StringFieldUpdateOperationsInput | string
    menu_name_en?: NullableStringFieldUpdateOperationsInput | string | null
    menu_path?: NullableStringFieldUpdateOperationsInput | string | null
    menu_icon?: NullableStringFieldUpdateOperationsInput | string | null
    screen_id?: NullableStringFieldUpdateOperationsInput | string | null
    screen_type?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_visible?: BoolFieldUpdateOperationsInput | boolean
    badge_text?: NullableStringFieldUpdateOperationsInput | string | null
    badge_type?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sys_menu_roleUpdateWithoutMenuInput = {
    can_read?: BoolFieldUpdateOperationsInput | boolean
    can_create?: BoolFieldUpdateOperationsInput | boolean
    can_update?: BoolFieldUpdateOperationsInput | boolean
    can_delete?: BoolFieldUpdateOperationsInput | boolean
    can_export?: BoolFieldUpdateOperationsInput | boolean
    can_print?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: sys_roleUpdateOneRequiredWithoutMenu_rolesNestedInput
  }

  export type sys_menu_roleUncheckedUpdateWithoutMenuInput = {
    id?: IntFieldUpdateOperationsInput | number
    role_id?: StringFieldUpdateOperationsInput | string
    can_read?: BoolFieldUpdateOperationsInput | boolean
    can_create?: BoolFieldUpdateOperationsInput | boolean
    can_update?: BoolFieldUpdateOperationsInput | boolean
    can_delete?: BoolFieldUpdateOperationsInput | boolean
    can_export?: BoolFieldUpdateOperationsInput | boolean
    can_print?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sys_menu_roleUncheckedUpdateManyWithoutMenuInput = {
    id?: IntFieldUpdateOperationsInput | number
    role_id?: StringFieldUpdateOperationsInput | string
    can_read?: BoolFieldUpdateOperationsInput | boolean
    can_create?: BoolFieldUpdateOperationsInput | boolean
    can_update?: BoolFieldUpdateOperationsInput | boolean
    can_delete?: BoolFieldUpdateOperationsInput | boolean
    can_export?: BoolFieldUpdateOperationsInput | boolean
    can_print?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sys_menu_roleCreateManyRoleInput = {
    id?: number
    menu_id: string
    can_read?: boolean
    can_create?: boolean
    can_update?: boolean
    can_delete?: boolean
    can_export?: boolean
    can_print?: boolean
    created_at?: Date | string
  }

  export type sys_menu_roleUpdateWithoutRoleInput = {
    can_read?: BoolFieldUpdateOperationsInput | boolean
    can_create?: BoolFieldUpdateOperationsInput | boolean
    can_update?: BoolFieldUpdateOperationsInput | boolean
    can_delete?: BoolFieldUpdateOperationsInput | boolean
    can_export?: BoolFieldUpdateOperationsInput | boolean
    can_print?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    menu?: sys_menuUpdateOneRequiredWithoutMenu_rolesNestedInput
  }

  export type sys_menu_roleUncheckedUpdateWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    menu_id?: StringFieldUpdateOperationsInput | string
    can_read?: BoolFieldUpdateOperationsInput | boolean
    can_create?: BoolFieldUpdateOperationsInput | boolean
    can_update?: BoolFieldUpdateOperationsInput | boolean
    can_delete?: BoolFieldUpdateOperationsInput | boolean
    can_export?: BoolFieldUpdateOperationsInput | boolean
    can_print?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sys_menu_roleUncheckedUpdateManyWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    menu_id?: StringFieldUpdateOperationsInput | string
    can_read?: BoolFieldUpdateOperationsInput | boolean
    can_create?: BoolFieldUpdateOperationsInput | boolean
    can_update?: BoolFieldUpdateOperationsInput | boolean
    can_delete?: BoolFieldUpdateOperationsInput | boolean
    can_export?: BoolFieldUpdateOperationsInput | boolean
    can_print?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}