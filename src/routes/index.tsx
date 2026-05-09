import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Apple,
  Smartphone,
  Monitor,
  Tv,
  Shield,
  Zap,
  Globe2,
  Lock,
  Check,
  KeyRound,
  ArrowRight,
} from "lucide-react";
import logo from "@/assets/happ-logo.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Happ — Free Key & Cross-Platform Proxy Utility" },
      {
        name: "description",
        content:
          "Get your free Happ access key. Fast, secure, cross-platform proxy utility built on Xray. Download for iOS, Android, Windows, macOS, Linux & TV.",
      },
    ],
  }),
});

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Введите корректный email" })
  .max(255);

type Platform = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  links: { label: string; href: string }[];
};

const platforms: Platform[] = [
  {
    name: "iOS",
    icon: Apple,
    links: [
      { label: "App Store Global", href: "https://apps.apple.com/app/happ-proxy-utility/id6504287215" },
      { label: "TestFlight", href: "https://testflight.apple.com/join/lerJpu0c" },
    ],
  },
  {
    name: "Android",
    icon: Smartphone,
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.happproxy" },
      { label: "Download APK", href: "https://github.com/Happ-proxy/happ-android/releases/latest" },
    ],
  },
  {
    name: "Desktop",
    icon: Monitor,
    links: [
      { label: "Windows x64", href: "https://github.com/Happ-proxy/happ-desktop/releases/latest" },
      { label: "macOS", href: "https://github.com/Happ-proxy/happ-desktop/releases/latest" },
      { label: "Linux", href: "https://github.com/Happ-proxy/happ-desktop/releases/latest" },
    ],
  },
  {
    name: "TV",
    icon: Tv,
    links: [
      { label: "Android TV", href: "https://play.google.com/store/apps/details?id=com.happproxy" },
      { label: "Apple TV", href: "https://apps.apple.com/app/happ-proxy-utility/id6504287215" },
    ],
  },
];

function Index() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [issuedKey, setIssuedKey] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const rand = (n: number) =>
        Array.from({ length: n }, () =>
          "ABCDEFGHJKLMNPQRSTUVWXYZ23456789".charAt(Math.floor(Math.random() * 32)),
        ).join("");
      const key = `HAPP-${rand(4)}-${rand(4)}-${rand(4)}-${rand(4)}`;
      setIssuedKey(key);
      setLoading(false);
      toast.success("Ключ отправлен на вашу почту");
    }, 900);
  };

  return (
    <div className="min-h-screen">
      <Toaster richColors position="top-center" />

      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="Happ" width={32} height={32} className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-tight">Happ</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition-colors">Возможности</a>
          <a href="#download" className="hover:text-foreground transition-colors">Скачать</a>
          <a href="#key" className="hover:text-foreground transition-colors">Бесплатный ключ</a>
        </nav>
        <a href="#key">
          <Button size="sm" className="rounded-full">
            Получить ключ <ArrowRight className="ml-1" />
          </Button>
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-20 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
          <span className="inline-block h-2 w-2 rounded-full bg-primary" />
          Built on the powerful Xray core
        </div>
        <h1 className="mx-auto max-w-3xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          Забирай ключ-подписку <span className="gradient-text">бесплатно</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Happ — кроссплатформенная proxy-утилита нового поколения. Получите бесплатный
          ключ доступа и скачайте приложение для своего устройства.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#key">
            <Button size="lg" className="h-14 rounded-full px-10 text-lg font-semibold shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40">
              <KeyRound className="size-5" /> Бесплатный ключ
            </Button>
          </a>
          <a href="#download">
            <Button size="lg" variant="outline" className="h-14 rounded-full px-10 text-lg font-semibold border-2 transition-all duration-300 hover:scale-105 hover:bg-primary/10">
              Скачать приложение
            </Button>
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { icon: Zap, title: "Молниеносная скорость", text: "Современные протоколы и оптимизированный Xray-core." },
            { icon: Lock, title: "Полная приватность", text: "Никаких логов. Ваши данные остаются на устройстве." },
            { icon: Globe2, title: "Любая платформа", text: "iOS, Android, Windows, macOS, Linux, Android/Apple TV." },
            { icon: Shield, title: "Гибкая маршрутизация", text: "Тонкая настройка правил для каждого приложения." },
          ].map((f) => (
            <div key={f.title} className="glass-card rounded-2xl p-6">
              <f.icon className="mb-4 size-6 text-primary" />
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Free Key */}
      <section id="key" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="glass-card relative mx-auto max-w-3xl overflow-hidden rounded-3xl p-8 md:p-12">
          <div className="absolute -right-20 -top-20 size-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative">
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
              <KeyRound className="size-4" /> Free access
            </div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Получите бесплатный ключ для Happ
            </h2>
            <p className="mt-3 text-muted-foreground">
              Введите email — мы пришлём персональный ключ доступа. Без спама,
              без скрытых платежей.
            </p>

            {issuedKey ? (
              <div className="mt-8 rounded-2xl border bg-background/60 p-6">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Check className="size-4" /> Ваш ключ готов
                </div>
                <code className="mt-3 block break-all rounded-lg bg-foreground/5 px-4 py-3 font-mono text-base">
                  {issuedKey}
                </code>
                <p className="mt-3 text-xs text-muted-foreground">
                  Копия отправлена на {email}. Откройте Happ и вставьте ключ в настройках подписки.
                </p>
                <Button
                  className="mt-4 rounded-full"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(issuedKey);
                    toast.success("Скопировано");
                  }}
                >
                  Копировать ключ
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  className="h-14 flex-1 rounded-full border-2 border-input/40 bg-background/80 px-6 text-lg shadow-inner focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="h-14 rounded-full px-10 text-lg font-semibold shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40"
                >
                  {loading ? "Генерация…" : "Получить ключ"}
                </Button>
              </form>
            )}

            <ul className="mt-6 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
              {["Мгновенная выдача", "Работает на всех платформах", "100% бесплатно"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="size-4 text-primary" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Download */}
      <section id="download" className="mx-auto max-w-6xl px-6 pb-32">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Скачайте Happ для своего устройства
          </h2>
          <p className="mt-3 text-muted-foreground">
            Доступно на всех основных платформах.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {platforms.map((p) => (
            <div key={p.name} className="glass-card flex flex-col rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <p.icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold">{p.name}</h3>
              </div>
              <div className="mt-auto flex flex-col gap-2">
                {p.links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-between rounded-xl">
                      {l.label} <ArrowRight className="size-4" />
                    </Button>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" width={20} height={20} className="h-5 w-5" />
            <span>© {new Date().getFullYear()} Happ. Все права защищены.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contacts</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
