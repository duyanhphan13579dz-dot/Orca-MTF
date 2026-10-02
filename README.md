# ORCA-MTF (Orca Multi-Timeframe Financials)

> **Vietnamese-market-first financial intelligence & multi-timeframe analytics platform with real-time data, deterministic quantitative pipelines, SMC/ICT money-flow engine, and native Cloudflare Pages deployment.**

ORCA-MTF là nền tảng phân tích tài chính thời gian thực và đa khung thời gian (Multi-Timeframe), lấy **thị trường chứng khoán Việt Nam** làm trọng tâm, tích hợp các module tài sản toàn cầu (Crypto spot/futures, Forex, Commodities) và trợ lý AI nghiên cứu.

Dự án được cấu hình sẵn sàng triển khai trên **Cloudflare Pages / Workers Edge Runtime** (thay thế Vercel), mang lại tốc độ truy cập cực nhanh qua mạng lưới CDN toàn cầu của Cloudflare.

---

## 🌟 Điểm nổi bật của Orca-MTF

### 1. Phân tích Đa Khung Thời Gian (Multi-Timeframe / MTF) & SMC/ICT Engine
- **MTF Bias Panel**: Đánh giá xu hướng đồng thuận đa khung thời gian (M15, H1, H4, D1, W1).
- **ICT / SMC / VSA Engine v2**:
  - Tự động nhận diện cấu trúc thị trường: BOS (Break of Structure), CHOCH (Change of Character).
  - Vùng mất cân bằng cung cầu FVG (Fair Value Gap) và vòng đời lấp Gap.
  - Khối lệnh Order Block (OB), Mitigation và vùng OTE (Optimal Trade Entry 0.62 - 0.79 Fibonacci).
  - VSA (Volume Spread Analysis): Volume vs Effort-Result, CLV (Close Location Value) & Order Flow signals.

### 2. Cổ phiếu Việt Nam — Trung tâm sản phẩm
- **Dashboard thời gian thực**: VN-Index, VN30, HNX-Index, UPCoM, độ rộng thị trường (Market Breadth), Heatmap ngành nghề.
- **Dữ liệu chuyên sâu**: Khớp lệnh thời gian thực, sổ lệnh (Order Book), dòng tiền khối ngoại (Foreign Flow), tự doanh.
- **Hệ thống Screener chuyên nghiệp**:
  - Bộ lọc Định giá cơ bản (Valuation multiples, P/E, P/B, EV/EBITDA).
  - Bộ lọc CANSLIM & Mark Minervini Trend Template.
  - Bộ lọc Phân kỳ kỹ thuật (RSI/MACD Divergence), Sóng Elliott & Wyckoff Method.
  - Bộ lọc Mô hình Nến Nhật tự động (Engulfing, Pinbar, Morning Star...).

### 3. Pipeline Định giá Doanh nghiệp Chuẩn xác (Deterministic Valuation)
- **Phase 1 — Market Multiples**: P/E, P/B, P/S, EV/EBITDA so sánh lịch sử và ngành.
- **Phase 2 — Dòng tiền & TTM**: FCF, FCFF, FCFE, EV/FCFF từ báo cáo tài chính liên tiếp.
- **Phase 3 — DCF Mô phỏng 3 kịch bản**: Bear / Base / Bull, tính WACC, Terminal Value & Sensitivity Matrix.
- **Phase 4 — Bổ trợ**: Residual Income, DDM, NAV/SOTP cho doanh nghiệp tài chính/bất động sản.
- **Phase 5/6 — Tổng hợp & Audit rủi ro**: Fair value tổng hợp, độ tin cậy dữ liệu (Confidence Score) và nguồn gốc số liệu minh bạch.

### 4. Tài sản Toàn cầu & Vĩ mô
- **Crypto Spot & Futures**: Binance REST & WebSocket, Order book, Liquidation map, Funding rate, Open Interest.
- **Forex & Tỷ giá liên ngân hàng**: Tỷ giá USD/VND, EUR/VND, vàng/ngoại tệ, dữ liệu tham chiếu từ ECB và Frankfurter.
- **Hàng hóa (Commodities)**: Giá dầu thô Brent/WTI, vàng SJC/thế giới, thép, cao su, phân bón qua Vietnambiz và thị trường quốc tế.
- **Tin tức & AI Research**: Tổng hợp tin tài chính CafeF, VnExpress, Vietstock, BBC, Reuters với gắn thẻ ticker tự động.

---

## ☁️ Cấu hình Triển khai Cloudflare Pages (Thay thế Vercel)

Dự án đã loại bỏ cấu hình Vercel cũ và thay thế toàn diện bằng kiến trúc Cloudflare Pages:

- **`wrangler.toml` & `wrangler.jsonc`**: Thiết lập Cloudflare Pages project, compatibility flags `nodejs_compat`, biến môi trường.
- **`public/_headers`**: Tối ưu bảo mật (HSTS, CSP, X-Frame-Options) và cache tài nguyên tĩnh trên Cloudflare Edge CDN.
- **`public/_routes.json`**: Định tuyến Edge Functions tối ưu.
- **`.github/workflows/deploy-cloudflare.yml`**: Tự động hóa CI/CD khi push code lên GitHub `main`.
- **`CLOUDFLARE_DEPLOYMENT.md`**: Hướng dẫn chi tiết từng bước thiết lập trên Cloudflare Dashboard hoặc CLI.

### Lệnh Build & Deploy cho Cloudflare:
```bash
# Cài đặt dependencies
npm install

# Build cho Cloudflare Pages (sử dụng @cloudflare/next-on-pages)
npm run build:cloudflare

# Deploy trực tiếp bằng Wrangler CLI
npm run deploy:cloudflare

# Chạy bản thử nghiệm Cloudflare Pages tại máy cục bộ
npm run preview:cloudflare
```

---

## 💻 Chạy cục bộ (Local Development)

```bash
# Chạy dev server tại cổng 3000
npm run dev

# Kiểm tra typecheck
npm run typecheck

# Build kiểm tra ứng dụng
npm run build
```

---

## 🛠️ Đẩy lên GitHub với tên Orca-MTF

Để tạo repository mới trên GitHub của bạn:

```bash
# Khởi tạo repository git (nếu chưa có)
git init
git add .
git commit -m "feat: initialize Orca-MTF platform with Cloudflare Pages deployment"

# Đổi tên branch thành main
git branch -M main

# Liên kết với repository GitHub của bạn
git remote add origin https://github.com/<your-username>/Orca-MTF.git

# Đẩy code lên GitHub
git push -u origin main
```

---

## 📜 Giấy phép
Mã nguồn phát triển dựa trên chuẩn mở tài chính định lượng.
