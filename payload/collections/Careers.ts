import type { CollectionConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

export const Careers: CollectionConfig = {
  slug: "careers",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "department", "location", "type", "isOpen"],
    group: "المحتوى",
  },
  labels: {
    singular: { ar: "وظيفة", en: "Job" },
    plural: { ar: "الوظائف", en: "Careers" },
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true, localized: true, label: { ar: "المسمى الوظيفي", en: "Job Title" } },
    { name: "slug", type: "text", required: true, unique: true, label: { ar: "المعرّف", en: "Slug" } },
    {
      name: "department",
      type: "select",
      label: { ar: "القسم", en: "Department" },
      options: [
        { label: { ar: "الاستشارات", en: "Consulting" }, value: "consulting" },
        { label: { ar: "التمويل", en: "Finance" }, value: "finance" },
        { label: { ar: "التقنية", en: "Technology" }, value: "tech" },
        { label: { ar: "التسويق", en: "Marketing" }, value: "marketing" },
        { label: { ar: "العمليات", en: "Operations" }, value: "operations" },
      ],
    },
    { name: "location", type: "text", localized: true, label: { ar: "الموقع", en: "Location" } },
    {
      name: "type",
      type: "select",
      label: { ar: "نوع الدوام", en: "Type" },
      options: [
        { label: { ar: "دوام كامل", en: "Full-time" }, value: "fulltime" },
        { label: { ar: "دوام جزئي", en: "Part-time" }, value: "parttime" },
        { label: { ar: "عن بعد", en: "Remote" }, value: "remote" },
        { label: { ar: "مشروع", en: "Contract" }, value: "contract" },
      ],
      defaultValue: "fulltime",
    },
    { name: "experience", type: "text", localized: true, label: { ar: "سنوات الخبرة", en: "Experience" } },
    {
      name: "description",
      type: "richText",
      localized: true,
      editor: lexicalEditor({}),
      label: { ar: "الوصف الوظيفي", en: "Description" },
    },
    {
      name: "requirements",
      type: "array",
      localized: true,
      label: { ar: "المتطلبات", en: "Requirements" },
      fields: [{ name: "item", type: "text", required: true }],
    },
    {
      name: "responsibilities",
      type: "array",
      localized: true,
      label: { ar: "المسؤوليات", en: "Responsibilities" },
      fields: [{ name: "item", type: "text", required: true }],
    },
    { name: "isOpen", type: "checkbox", defaultValue: true, label: { ar: "متاحة للتقديم", en: "Open" } },
    { name: "closesAt", type: "date", label: { ar: "آخر موعد للتقديم", en: "Closes At" } },
  ],
}
