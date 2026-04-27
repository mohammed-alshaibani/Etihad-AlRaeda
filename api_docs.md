# Postman API Documentation — Payload CMS 3.x

This guide provides the exact configuration for testing the Etihad AlRaeda Payload API independently.

## 1. Authentication (Login)
**Method:** `POST`  
**Endpoint:** `{{BASE_URL}}/api/users/login`  
**Headers:**  
- `Content-Type: application/json`

**Body (JSON):**
```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```
> [!NOTE]
> Upon success, Payload returns a `token` and sets a `payload-token` cookie. Postman will automatically capture this if "Manage Cookies" is enabled.

---

## 2. Create Data (Standard Text)
**Method:** `POST`  
**Endpoint:** `{{BASE_URL}}/api/services` (Example collection)  
**Headers:**  
- `Content-Type: application/json`

**Body (JSON):**
```json
{
  "title": "New Consulting Service",
  "slug": "consulting-service",
  "shortDescription": "High-level technical consulting.",
  "_status": "published"
}
```

---

## 3. Upload Media (Multipart/Form-Data)
**Method:** `POST`  
**Endpoint:** `{{BASE_URL}}/api/media`  
**Headers:**  
- `Content-Type: multipart/form-data` (Postman sets this automatically when select `form-data` body)

**Body (form-data):**
- `file`: (Select file from your device)
- `alt`: "Description of the image"

> [!IMPORTANT]
> When uploading via `form-data` in Postman, ensure the key for the file is exactly `file`. Payload expects this by default for the `Media` collection.

---

## 4. Create Data with Media Relation
**Method:** `POST`  
**Endpoint:** `{{BASE_URL}}/api/services`  
**Headers:**  
- `Content-Type: application/json`

**Body (JSON):**
```json
{
  "title": "Service with Image",
  "coverImage": "MEDIA_ID_HERE",
  "_status": "published"
}
```
> [!TIP]
> First upload the file via the `/api/media` endpoint, capture the `"id"` from the response, and then use that ID in your relation field.

---

## 5. Update Data (Partial Update)
**Method:** `PATCH`  
**Endpoint:** `{{BASE_URL}}/api/{{COLLECTION}}/{{ID}}`  
**Headers:**  
- `Content-Type: application/json`

**Body (JSON):**
```json
{
  "title": "Updated Title Only"
}
```

---

## 6. Delete Data
**Method:** `DELETE`  
**Endpoint:** `{{BASE_URL}}/api/{{COLLECTION}}/{{ID}}`  

---

## 7. Logout
**Method:** `POST`  
**Endpoint:** `{{BASE_URL}}/api/users/logout`  
**Headers:**  
- `Content-Type: application/json`

**Body:** (Empty)
