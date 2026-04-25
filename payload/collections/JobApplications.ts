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
    { name: "applicantName", type: "text", required: true, label: { ar: "الاسم", en: "Name" } },
    { name: "email", type: "email", required: true, label: { ar: "البريد الإلكتروني", en: "Email" } },
    { name: "phone", type: "text", label: { ar: "الهاتف", en: "Phone" } },
    {
      name: "job",
      type: "relationship",
      relationTo: "careers",
      label: { ar: "الوظيفة", en: "Job" },
    },
    { name: "resume", type: "upload", relationTo: "media", label: { ar: "السيرة الذاتية", en: "Resume" } },
    { name: "coverLetter", type: "textarea", label: { ar: "خطاب التقديم", en: "Cover Letter" } },
    { name: "linkedin", type: "text", label: "LinkedIn" },
    { name: "portfolioUrl", type: "text", label: { ar: "رابط أعمال", en: "Portfolio URL" } },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      label: { ar: "الحالة", en: "Status" },
      options: [
        { label: { ar: "جديد", en: "New" }, value: "new" },
        { label: { ar: "قيد المراجعة", en: "Reviewing" }, value: "reviewing" },
        { label: { ar: "مقابلة", en: "Interview" }, value: "interview" },
        { label: { ar: "عرض", en: "Offer" }, value: "offer" },
        { label: { ar: "مرفوض", en: "Rejected" }, value: "rejected" },
        { label: { ar: "تم التعيين", en: "Hired" }, value: "hired" },
      ],
    },
  ],
}
