import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./motion.css";
import { AppShell } from "@/components/shell";
import { ClientProviders } from "@/components/client-providers";
import { SettingsProvider } from "@/lib/settings";

export const metadata: Metadata = {
  title: {
    default: "Orca-MTF — Nền tảng Phân tích Tài chính & Dữ liệu Thị trường",
    template: "%s | Orca-MTF",
  },
  description:
    "Nền tảng phân tích tài chính đa khung thời gian & thời gian thực — Cổ phiếu Việt Nam, tiền mã hóa, ngoại hối, hàng hóa, tin tức, báo cáo và trợ lý AI nghiên cứu.",
  icons: { icon: "/icon.png" },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Orca-MTF",
  },
  openGraph: {
    title: "Orca-MTF — Nền tảng Phân tích Tài chính & Dữ liệu Thị trường",
    description: "Nền tảng phân tích tài chính đa khung thời gian & thời gian thực cho thị trường Việt Nam.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orca-MTF — Nền tảng Phân tích Tài chính & Dữ liệu Thị trường",
    description: "Nền tảng phân tích tài chính đa khung thời gian & thời gian thực cho thị trường Việt Nam.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060d1d" },
    { media: "(prefers-color-scheme: light)", color: "#eef2f9" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" data-theme="navy" suppressHydrationWarning className="h-full">
      <body className="h-full overflow-hidden">
        <SettingsProvider>
          <ClientProviders>
            <AppShell>{children}</AppShell>
          </ClientProviders>
        </SettingsProvider>
      </body>
    </html>
  );
}
