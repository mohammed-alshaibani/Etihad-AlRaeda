import { getPayload } from "payload"
import config from "@payload-config"

/**
 * Cached Payload client for server-side data fetching.
 * Use this in Server Components, Route Handlers, and Server Actions.
 */
export async function getPayloadClient() {
  return await getPayload({ config })
}
