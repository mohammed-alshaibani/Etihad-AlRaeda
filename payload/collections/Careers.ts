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
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: { ar: "تفاصيل الوظيفة", en: "Job Details" },
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              localized: true,
              label: { ar: "المسمى الوظيفي", en: "Job Title" },
            },
            {
              type: "row",
              fields: [
                {
                  name: "department",
                  type: "select",
                  label: { ar: "القسم", en: "Department" },
                  admin: { width: "50%" },
                  options: [
                    { label: { ar: "الاستشارات", en: "Consulting" }, value: "consulting" },
                    { label: { ar: "التمويل", en: "Finance" }, value: "finance" },
                    { label: { ar: "التقنية", en: "Technology" }, value: "tech" },
                    { label: { ar: "التسويق", en: "Marketing" }, value: "marketing" },
                    { label: { ar: "العمليات", en: "Operations" }, value: "operations" },
                  ],
                },
                {
                  name: "type",
                  type: "select",
                  label: { ar: "نوع الدوام", en: "Employment Type" },
                  admin: { width: "50%" },
                  options: [
                    { label: { ar: "دوام كامل", en: "Full-time" }, value: "fulltime" },
                    { label: { ar: "دوام جزئي", en: "Part-time" }, value: "parttime" },
                    { label: { ar: "عن بعد", en: "Remote" }, value: "remote" },
                    { label: { ar: "مشروع", en: "Contract" }, value: "contract" },
                  ],
                  defaultValue: "fulltime",
                },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "location", type: "text", localized: true, label: { ar: "الموقع", en: "Location" }, admin: { width: "50%" } },
                { name: "experience", type: "text", localized: true, label: { ar: "سنوات الخبرة", en: "Experience Level" }, admin: { width: "50%" } },
              ],
            },
            {
              name: "description",
              type: "richText",
              localized: true,
              editor: lexicalEditor({}),
              label: { ar: "الوصف الوظيفي", en: "Job Description" },
            },
          ],
        },
        {
          label: { ar: "المتطلبات والمسؤوليات", en: "Requirements" },
          fields: [
            {
              name: "requirements",
              type: "array",
              localized: true,
              label: { ar: "متطلبات الوظيفة", en: "Requirements" },
              admin: { initCollapsed: true },
              fields: [{ name: "item", type: "text", required: true, label: { ar: "البند", en: "Requirement" } }],
            },
            {
              name: "responsibilities",
              type: "array",
              localized: true,
              label: { ar: "المسؤوليات الأساسية", en: "Responsibilities" },
              admin: { initCollapsed: true },
              fields: [{ name: "item", type: "text", required: true, label: { ar: "البند", en: "Responsibility" } }],
            },
          ],
        },
        {
          label: { ar: "الإعدادات", en: "Settings" },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "slug",
                  type: "text",
                  required: true,
                  unique: true,
                  label: { ar: "المعرّف", en: "Slug" },
                  admin: { width: "50%" },
                },
                {
                  name: "closesAt",
                  type: "date",
                  label: { ar: "تاريخ الإغلاق", en: "Closing Date" },
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "isOpen",
              type: "checkbox",
              defaultValue: true,
              label: { ar: "استقبال طلبات التقديم", en: "Active / Open for Applications" },
              admin: { style: { marginTop: "20px" } },
            },
          ],
        },
      ],
    },
  ],
}
