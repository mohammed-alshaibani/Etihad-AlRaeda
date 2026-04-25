/* eslint-disable no-restricted-exports */
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { ServerFunctionClient } from "payload"

import config from "@payload-config"
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts"
import type React from "react"

import "@/app/globals.css"
import "@payloadcms/next/css"
import "@payloadcms/ui/styles.css"
import { importMap } from "./admin/importMap.js"
import "./custom.css"

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  "use server"
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
