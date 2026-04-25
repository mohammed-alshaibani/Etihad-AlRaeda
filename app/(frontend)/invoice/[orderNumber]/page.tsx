import { notFound } from "next/navigation"
import { getPayloadClient } from "@/lib/payload"
import { Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InvoicePageProps {
  params: Promise<{ orderNumber: string }>
}

function formatPrice(amount: number, currency = "SAR") {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const { orderNumber } = await params
  const payload = await getPayloadClient()

  const { docs: orders } = await payload.find({
    collection: "orders",
    where: { orderNumber: { equals: orderNumber } },
    limit: 1,
  })

  const order = orders[0]

  if (!order) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 print:bg-white print:py-0">
      <div className="mx-auto max-w-4xl bg-white p-8 shadow-premium print:shadow-none md:p-16">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-border pb-12 md:flex-row print:flex-row">
          <div>
            <h1 className="font-display text-4xl font-bold text-primary">فاتورة ضريبية</h1>
            <p className="mt-2 text-muted-foreground">رقم الفاتورة: <span dir="ltr">{order.orderNumber}</span></p>
            <p className="text-muted-foreground">تاريخ الإصدار: {new Date(order.createdAt).toLocaleDateString('ar-SA')}</p>
          </div>
          <div className="text-right">
             <h2 className="font-display text-2xl font-bold text-foreground">شركة مَراسي للمقاولات</h2>
             <p className="text-sm text-muted-foreground">الرقم الضريبي: 300012345678903</p>
             <p className="text-sm text-muted-foreground">الرياض، المملكة العربية السعودية</p>
             <p className="text-sm text-muted-foreground">contact@marasi.sa</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid gap-12 py-12 md:grid-cols-2 print:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">فاتورة إلى:</h3>
            <p className="font-display text-xl font-bold text-foreground">{order.customerName}</p>
            <p className="text-muted-foreground">{order.companyName}</p>
            {order.vatNumber && <p className="text-sm text-muted-foreground">الرقم الضريبي: {order.vatNumber}</p>}
            <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
          </div>
          <div className="md:text-left print:text-left">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">حالة الدفع:</h3>
            <p className={order.status === 'completed' ? 'font-bold text-green-600' : 'font-bold text-amber-600'}>
              {order.status === 'completed' ? 'تم السداد' : 'بانتظار السداد'}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">طريقة الدفع: {order.paymentMethod}</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-right">
            <thead className="bg-muted/50 text-sm font-bold text-muted-foreground">
              <tr>
                <th className="px-6 py-4">الخدمة / الباقة</th>
                <th className="px-6 py-4">الكمية</th>
                <th className="px-6 py-4">سعر الوحدة</th>
                <th className="px-6 py-4">المجموع</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {order.items.map((item: any, i: number) => (
                <tr key={i}>
                  <td className="px-6 py-4 font-bold text-foreground">{item.productName}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">{formatPrice(item.unitPrice)}</td>
                  <td className="px-6 py-4 font-bold">{formatPrice(item.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-start py-12">
          <div className="w-full max-w-xs space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">المجموع الفرعي</span>
              <span className="font-bold text-foreground">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">ضريبة القيمة المضافة (15%)</span>
              <span className="font-bold text-foreground">{formatPrice(order.vatAmount)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-lg font-bold">
              <span className="text-foreground">الإجمالي النهائي</span>
              <span className="text-primary">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border pt-12 text-center text-xs text-muted-foreground">
          <p>هذه الفاتورة ناتجة آلياً ولا تحتاج إلى ختم أو توقيع.</p>
          <p className="mt-1">حقوق الطبع محفوظة © {new Date().getFullYear()} لشركة مَراسي للمقاولات.</p>
        </div>

        {/* Print Button - hidden on print */}
        <div className="fixed bottom-8 left-8 print:hidden">
           <Button onClick={() => window.print()} size="lg" className="rounded-full shadow-2xl gap-2">
              <Printer className="h-4 w-4" />
              طباعة الفاتورة
           </Button>
        </div>
      </div>
    </div>
  )
}
