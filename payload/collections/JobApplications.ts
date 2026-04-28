import type { CollectionConfig } from "payload"

export const JobApplications: CollectionConfig = {
  slug: "job-applications",
  admin: {
    useAsTitle: "applicantName",
    defaultColumns: ["applicantName", "job", "status", "createdAt"],
    group: "الطلبات والعملاء المحتملون",
  },
  labels: {
    singular: { ar: "طلب توظيف", en: "Application" },
    plural: { ar: "طلبات التوظيف", en: "Job Applications" },
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: { ar: "بيانات المتقدم", en: "Applicant" },
          fields: [
            {
              type: "row",
              fields: [
                { name: "applicantName", type: "text", required: true, label: { ar: "اسم المتقدم", en: "Name" }, admin: { width: "50%" } },
                { name: "email", type: "email", required: true, label: { ar: "البريد الإلكتروني", en: "Email" }, admin: { width: "50%" } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "phone", type: "text", label: { ar: "رقم الجوال", en: "Phone" }, admin: { width: "50%" } },
                { name: "job", type: "relationship", relationTo: "careers", label: { ar: "الوظيفة المتقدم لها", en: "Applied Job" }, admin: { width: "50%" } },
              ],
            },
          ],
        },
        {
          label: { ar: "المستندات", en: "Documents" },
          fields: [
            { name: "resume", type: "upload", relationTo: "media", required: true, label: { ar: "السيرة الذاتية (PDF)", en: "Resume / CV" } },
            { name: "coverLetter", type: "textarea", label: { ar: "رسالة التقديم", en: "Cover Letter" } },
          ],
        },
        {
          label: { ar: "روابط وحالة الطلب", en: "Links & Status" },
          fields: [
            {
              type: "row",
              fields: [
                { name: "linkedin", type: "text", label: "LinkedIn Profile", admin: { width: "50%" } },
                { name: "portfolioUrl", type: "text", label: { ar: "رابط معرض الأعمال", en: "Portfolio URL" }, admin: { width: "50%" } },
              ],
            },
            {
              name: "status",
              type: "select",
              defaultValue: "new",
              label: { ar: "حالة الطلب", en: "Application Status" },
              options: [
                { label: { ar: "متقدم جديد", en: "New" }, value: "new" },
                { label: { ar: "قيد المراجعة", en: "Reviewing" }, value: "reviewing" },
                { label: { ar: "تم تحديد مقابلة", en: "Interview" }, value: "interview" },
                { label: { ar: "تم إرسال عرض", en: "Offer Extended" }, value: "offer" },
                { label: { ar: "مرفوض", en: "Rejected" }, value: "rejected" },
                { label: { ar: "تم التوظيف", en: "Hired" }, value: "hired" },
              ],
            },
          ],
        },
      ],
    },
  ],
}
