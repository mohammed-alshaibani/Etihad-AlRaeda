"use server"

import { getPayloadClient } from "@/lib/payload"

type ActionResult = { ok: true } | { ok: false; error: string }

export async function submitQuoteRequest(data: Record<string, unknown>): Promise<ActionResult> {
  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: "quote-requests",
      data: data as any,
    })
    return { ok: true }
  } catch (err) {
    console.error("[v0] submitQuoteRequest error", err)
    return { ok: false, error: "حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى." }
  }
}

export async function submitAppointment(data: Record<string, unknown>): Promise<ActionResult> {
  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: "appointments",
      data: data as any,
    })
    return { ok: true }
  } catch (err) {
    console.error("[v0] submitAppointment error", err)
    return { ok: false, error: "حدث خطأ أثناء حجز الموعد. حاول مرة أخرى." }
  }
}

export async function submitContactMessage(data: Record<string, unknown>): Promise<ActionResult> {
  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: "contact-messages",
      data: data as any,
    })
    return { ok: true }
  } catch (err) {
    console.error("[v0] submitContactMessage error", err)
    return { ok: false, error: "حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى." }
  }
}

export async function submitJobApplication(data: Record<string, unknown>): Promise<ActionResult> {
  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: "job-applications",
      data: data as any,
    })
    return { ok: true }
  } catch (err) {
    console.error("[v0] submitJobApplication error", err)
    return { ok: false, error: "حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى." }
  }
}
