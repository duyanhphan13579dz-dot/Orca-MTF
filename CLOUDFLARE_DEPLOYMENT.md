# Hướng dẫn Triển khai Orca-MTF lên Cloudflare Pages

Dự án **Orca-MTF** được cấu hình tối ưu để thay thế Vercel bằng **Cloudflare Pages**, tận dụng mạng lưới toàn cầu 330+ thành phố của Cloudflare với độ trễ siêu thấp và khả năng scale tự động.

---

## 🚀 Cách 1: Triển khai trực tiếp qua Cloudflare Dashboard (Khuyên dùng)

1. Đẩy dự án **Orca-MTF** lên tài khoản GitHub của bạn:
   ```bash
   git remote add origin https://github.com/<tai-khoan-cua-ban>/Orca-MTF.git
   git branch -M main
   git push -u origin main
   ```

2. Đăng nhập vào [Cloudflare Dashboard](https://dash.cloudflare.com/) và chọn:
   **Compute (Workers & Pages)** > **Create application** > Tab **Pages** > **Connect to Git**.

3. Chọn repository `Orca-MTF`.

4. Cấu hình Build settings trong Cloudflare:
   - **Project name**: `orca-mtf`
   - **Production branch**: `main`
   - **Framework preset**: `Next.js` (hoặc `None`)
   - **Build command**:
     ```bash
     npx @cloudflare/next-on-pages
     ```
   - **Build output directory**:
     ```
     .vercel/output/static
     ```

5. Cấu hình Biến môi trường (Environment variables) trong Cloudflare Dashboard:
   - `NODE_VERSION`: `22` hoặc `20`
   - `NEXT_TELEMETRY_DISABLED`: `1`
   - `DATABASE_URL`: URL PostgreSQL (Neon, Supabase hoặc Cloudflare Hyperdrive nếu dùng database)
   - `REDIS_URL`: URL Redis / Upstash (nếu dùng Redis caching phân tán)
   - `GEMINI_API_KEY`: API Key AI Studio / Google Gemini (nếu dùng AI Assistant)

6. Thêm **Compatibility Flag**:
   - Vào **Settings** > **Functions** > **Compatibility flags**.
   - Thêm cờ: `nodejs_compat`.

7. Bấm **Save and Deploy**. Cloudflare sẽ tự động build và cung cấp domain miễn phí dạng `orca-mtf.pages.dev`.

---

## 🛠️ Cách 2: Triển khai bằng Wrangler CLI

1. Cài đặt và đăng nhập Wrangler:
   ```bash
   npx wrangler login
   ```

2. Build ứng dụng cho Cloudflare Pages:
   ```bash
   npm run build:cloudflare
   ```
   *(Lệnh này chạy `npx @cloudflare/next-on-pages` để chuyển đổi Next.js build sang chuẩn Cloudflare edge runtime).*

3. Deploy lên Cloudflare Pages:
   ```bash
   npm run deploy:cloudflare
   ```
   hoặc:
   ```bash
   npx wrangler pages deploy .vercel/output/static --project-name=orca-mtf
   ```

---

## 🤖 Cách 3: CI/CD tự động bằng GitHub Actions

Dự án đã tích hợp sẵn file `.github/workflows/deploy-cloudflare.yml`. Khi bạn push code lên branch `main`, GitHub Actions sẽ tự động build và deploy lên Cloudflare.

Cần thêm 2 Secrets trong **GitHub Repository** > **Settings** > **Secrets and variables** > **Actions**:
1. `CLOUDFLARE_API_TOKEN`: Tạo tại Cloudflare Dashboard > My Profile > API Tokens (quyền Cloudflare Pages: Edit).
2. `CLOUDFLARE_ACCOUNT_ID`: Lấy trong trang Dashboard tổng quan của Cloudflare (phía sidebar bên phải).

---

## 📁 Các file cấu hình Cloudflare trong dự án

| File | Mô tả |
| --- | --- |
| `wrangler.toml` | File cấu hình Cloudflare Pages, compatibility_flags `nodejs_compat`, output dir |
| `wrangler.jsonc` | Cấu hình Cloudflare hiện đại (JSON with Comments) |
| `public/_headers` | Tối ưu bảo mật (HSTS, CSP, X-Frame-Options) và cache tài nguyên tĩnh trên Cloudflare Edge |
| `public/_routes.json` | Phân luồng Edge Functions và Static Assets trên Cloudflare CDN |
| `.github/workflows/deploy-cloudflare.yml` | Pipeline CI/CD tự động hóa qua GitHub Actions |

---

## ⚠️ Khắc phục lỗi: `It looks like you've run a Workers-specific command in a Pages project`

Nếu bạn gặp lỗi này trong nhật ký build của Cloudflare:
```
✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
  For Pages, please run `wrangler pages deploy` instead.
```

### Nguyên nhân:
Dự án được cấu hình là **Cloudflare Pages** (sử dụng `@cloudflare/next-on-pages` và output `.vercel/output/static`). Tuy nhiên, trong cấu hình build trên Cloudflare Dashboard:
1. Bạn đã tạo project dưới mục **Workers** thay vì **Pages**, hoặc
2. Bạn đã đặt **Deploy command** là `npx wrangler deploy` (lệnh dành riêng cho Workers, không áp dụng cho Pages).
3. **Build command** đang là `npm run build` thay vì `npm run build:cloudflare`.

### Cách sửa:

#### Lựa chọn 1 (Khuyên dùng): Tạo đúng dưới mục Cloudflare Pages
1. Vào **Cloudflare Dashboard** > **Workers & Pages** > **Create application** > Chọn tab **Pages** (không chọn Workers) > **Connect to Git**.
2. Chọn repository `Orca-MTF`.
3. Cấu hình:
   - **Framework preset**: `Next.js`
   - **Build command**: `npx @cloudflare/next-on-pages` (hoặc `npm run build:cloudflare`)
   - **Build output directory**: `.vercel/output/static`
   *(Ở tab Pages, Cloudflare tự động deploy thư mục build mà không cần lệnh deploy riêng).*

#### Lựa chọn 2: Nếu giữ nguyên project hiện tại trong Cloudflare Dashboard
Vào **Settings** > **Builds & deployments** > **Build configuration**:
- **Build command**:
  ```bash
  npm run build:cloudflare
  ```
- **Deploy command**:
  ```bash
  npx wrangler pages deploy .vercel/output/static --project-name=orca-mtf
  ```
  *(hoặc `npm run deploy`)*
- **Build output directory**:
  ```bash
  .vercel/output/static
  ```
- Lưu lại và bấm **Retry deployment** hoặc push commit mới.

