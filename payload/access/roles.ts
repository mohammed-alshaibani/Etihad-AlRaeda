/**
 * Role-Based Access Control helpers
 * Use these in collection access: {} fields to enforce role restrictions.
 *
 * Roles:
 *   superadmin    — full access to everything
 *   sales-manager — read/write orders, quotes, customers; read products
 *   content-editor — read/write posts, pages, services, media; no orders/finance
 */

import type { AccessArgs } from "payload"

type UserWithRole = {
    id: string
    role: "superadmin" | "sales-manager" | "content-editor"
}

// ─── Generic Role Checks ──────────────────────────────────────────────────────

export const isSuperAdmin = ({ req: { user } }: AccessArgs): boolean =>
    (user as unknown as UserWithRole)?.role === "superadmin"

export const isSalesManager = ({ req: { user } }: AccessArgs): boolean =>
    ["superadmin", "sales-manager"].includes((user as unknown as UserWithRole)?.role)

export const isContentEditor = ({ req: { user } }: AccessArgs): boolean =>
    !!user // all authenticated users can read/write content

export const isAuthenticated = ({ req: { user } }: AccessArgs): boolean => !!user

// ─── Pre-built Access Objects ─────────────────────────────────────────────────

/** Full access — superadmin only */
export const superAdminAccess = {
    read: isSuperAdmin,
    create: isSuperAdmin,
    update: isSuperAdmin,
    delete: isSuperAdmin,
}

/** Public read, superadmin write */
export const publicReadSuperAdminWrite = {
    read: () => true as const,
    create: isSuperAdmin,
    update: isSuperAdmin,
    delete: isSuperAdmin,
}

/** Public read, any authenticated write */
export const publicReadAuthWrite = {
    read: () => true as const,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
}

/** Sales-manager and above can read/write; public cannot */
export const salesAccess = {
    read: isSalesManager,
    create: isSalesManager,
    update: isSalesManager,
    delete: isSuperAdmin, // only superadmin can delete financial records
}

/**
 * Orders / Quotes — anyone can create (guest checkout / form submission),
 * but only sales team can read and update.
 */
export const orderAccess = {
    read: isSalesManager,
    create: () => true as const,
    update: isSalesManager,
    delete: isSuperAdmin,
}

/** Content collections — public read, authenticated write */
export const contentAccess = {
    read: () => true as const,
    create: isContentEditor,
    update: isContentEditor,
    delete: isSuperAdmin,
}
