import { z } from "zod";

/**
 * Helper function to validate request data with a zod schema
 * Use this in your mutator to validate request bodies/params
 */
export function validateRequest<T>(data: unknown, schema: z.ZodType<T>): T {
  return schema.parse(data);
}

/**
 * Helper function to validate response data with a zod schema
 * Use this in your mutator to validate response data
 */
export function validateResponse<T>(data: unknown, schema: z.ZodType<T>): T {
  return schema.parse(data);
}

/**
 * Example: Schema map for endpoint-based validation
 * Once orval generates your zod schemas, you can import them here and map them to endpoints
 *
 * Example usage:
 * ```typescript
 * import { UserCreateRequestSchema, UserCreateResponseSchema } from '@generated/api/schemas';
 *
 * const requestSchemaMap: Record<string, z.ZodType> = {
 *   '/api/users': UserCreateRequestSchema,
 * };
 *
 * const responseSchemaMap: Record<string, z.ZodType> = {
 *   '/api/users': UserCreateResponseSchema,
 * };
 * ```
 */
export type SchemaMap = Record<string, z.ZodType>;

/**
 * Helper to get schema for an endpoint
 */
export function getSchemaForEndpoint(
  url: string,
  schemaMap: SchemaMap
): z.ZodType | undefined {
  // Find matching schema by checking if URL contains the key
  for (const [endpoint, schema] of Object.entries(schemaMap)) {
    if (url.includes(endpoint)) {
      return schema;
    }
  }
  return undefined;
}

/**
 * Example of how to extend the mutator with zod validation:
 *
 * ```typescript
 * import { validateRequest, validateResponse, getSchemaForEndpoint } from './mutator-helpers';
 * import { requestSchemaMap, responseSchemaMap } from './schema-maps'; // You'll create this
 *
 * export async function customInstance<TData = unknown>(
 *   config: MutatorRequestOptions
 * ): Promise<TData> {
 *   // Validate request if schema exists
 *   const requestSchema = getSchemaForEndpoint(config.url, requestSchemaMap);
 *   if (requestSchema && config.data) {
 *     config.data = validateRequest(config.data, requestSchema);
 *   }
 *
 *   // Make request...
 *   const response = await axiosInstance.request<TData>(config);
 *
 *   // Validate response if schema exists
 *   const responseSchema = getSchemaForEndpoint(config.url, responseSchemaMap);
 *   if (responseSchema) {
 *     return validateResponse(response.data, responseSchema);
 *   }
 *
 *   return response.data;
 * }
 * ```
 */
