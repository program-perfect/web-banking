"use client"

import { MousePointer2, Palette, Sparkles, Type, UserRound, Zap, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppPreferences } from "@/components/banking/app-preferences"
import { PixelButton, PixelCard, PixelInput, PixelLoader, PixelSkeleton, PixelStatus } from "@/components/banking/pixel-ui"

const motionItems = [
  { id: "full", labelRu: "Полная анимация", labelEn: "Full motion", detailRu: "Все переходы, салюты, glow и number-flow", detailEn: "All transitions, bursts, glow and number-flow" },
  { id: "balanced", labelRu: "Сбалансированно", labelEn: "Balanced", detailRu: "Мягкие переходы без лишнего шума", detailEn: "Soft transitions without extra noise" },
  { id: "reduced", labelRu: "Минимально", labelEn: "Reduced", detailRu: "Почти без движения для спокойного режима", detailEn: "Almost no motion for calmer viewing" },
] as const

const themes = [
  { id: "light", labelRu: "Светлая", labelEn: "Light", detailRu: "Основная палитра проекта", detailEn: "Project default palette" },
  { id: "dark", labelRu: "Тёмная", labelEn: "Dark", detailRu: "Высокий контраст", detailEn: "High contrast" },
  { id: "system", labelRu: "Системная", labelEn: "System", detailRu: "Следовать устройству", detailEn: "Follow device" },
] as const

const cursors = [
  { id: "pixel", labelRu: "Пиксельный macOS", labelEn: "Pixel macOS", detailRu: "Плавный кастомный курсор", detailEn: "Smooth custom pointer" },
  { id: "large", labelRu: "Крупный пиксельный", labelEn: "Large pixel", detailRu: "Лучше для демо и записи экрана", detailEn: "Better for demo screens" },
  { id: "minimal", labelRu: "Быстрый минимальный", labelEn: "Fast minimal", detailRu: "Меньше инерции", detailEn: "Less cursor inertia" },
  { id: "native", labelRu: "Системный", labelEn: "Native", detailRu: "Обычный курсор браузера", detailEn: "Browser default cursor" },
] as const

const locales = [
  { id: "ru", label: "Русский", detail: "Основной язык интерфейса" },
  { id: "en", label: "English", detail: "English UI copy" },
] as const

export function PreferencesPanel() {
  const prefs = useAppPreferences()
  const activeMotion = motionItems.find((item) => item.id === prefs.motionLevel)
  const activeTheme = themes.find((item) => item.id === prefs.themeMode)
  const activeCursor = cursors.find((item) => item.id === prefs.cursorStyle)

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <PixelCard className="lg:col-span-2 pixel-gradient" eyebrow={prefs.t("Центр управления", "Control center")} title={prefs.t("Настройки приложения", "App preferences")} action={<PixelStatus tone="success">{prefs.t("Сохраняется локально", "Local save")}</PixelStatus>}>
        <div className="grid gap-4 md:grid-cols-3">
          <PreviewTile icon={UserRound} label={prefs.t("Имя", "Name")} value={prefs.profileName} />
          <PreviewTile icon={Sparkles} label={prefs.t("Анимации", "Motion")} value={prefs.t(activeMotion?.labelRu ?? "Полная", activeMotion?.labelEn ?? "Full")} />
          <PreviewTile icon={MousePointer2} label={prefs.t("Курсор", "Cursor")} value={prefs.t(activeCursor?.labelRu ?? "Пиксель", activeCursor?.labelEn ?? "Pixel")} />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_240px]">
          <label className="block border-2 border-foreground bg-secondary p-4 pixel-shadow-sm">
            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-muted-foreground">
              <UserRound className="h-4 w-4 text-primary" />
              {prefs.t("Имя профиля", "Profile name")}
            </span>
            <PixelInput value={prefs.profileName} onChange={(event) => prefs.setPreference("profileName", event.target.value || "Алекс")} className="mt-3 h-12 text-lg font-black" />
            <p className="mt-2 text-xs text-muted-foreground">{prefs.t("Имя сразу появляется в верхней панели и демо-экранах.", "The name appears in the topbar and demo screens immediately.")}</p>
          </label>

          <div className="border-2 border-foreground bg-card p-4 pixel-shadow-sm">
            <p className="font-pixel text-[9px] uppercase tracking-wider text-muted-foreground">{prefs.t("Превью загрузки", "Loader preview")}</p>
            <div className="mt-4 flex justify-center">
              <PixelLoader variant={prefs.motionLevel === "reduced" ? "dots" : "orbit"} label={prefs.t("Интерфейс", "Interface")} />
            </div>
          </div>
        </div>
      </PixelCard>

      <PixelCard title={prefs.t("Локализация", "Localization")} eyebrow="i18n">
        <div className="space-y-3">
          {locales.map((option) => (
            <SelectRow key={option.id} label={option.label} detail={option.detail} active={prefs.locale === option.id} onSelect={() => prefs.setPreference("locale", option.id)} />
          ))}
        </div>
      </PixelCard>

      <PixelCard className="lg:col-span-2" title={prefs.t("Настройки анимаций", "Animation settings")} eyebrow="Motion">
        <div className="grid gap-3 md:grid-cols-3">
          {motionItems.map((option) => (
            <SelectCard
              key={option.id}
              icon={Zap}
              label={prefs.t(option.labelRu, option.labelEn)}
              detail={prefs.t(option.detailRu, option.detailEn)}
              active={prefs.motionLevel === option.id}
              onSelect={() => prefs.setPreference("motionLevel", option.id)}
            />
          ))}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <ToggleCard label={prefs.t("Glow-эффекты", "Glow effects")} detail={prefs.t("Подсветка в neo-brutal рамках", "Glow inside the neo-brutal system")} checked={prefs.glowEnabled} onToggle={() => prefs.setPreference("glowEnabled", !prefs.glowEnabled)} />
          <ToggleCard label={prefs.t("Пиксельные градиенты", "Pixel gradients")} detail={prefs.t("Псевдо-шейдер без смены палитры", "Shader-like gradients without palette changes")} checked={prefs.pixelGradients} onToggle={() => prefs.setPreference("pixelGradients", !prefs.pixelGradients)} />
          <ToggleCard label={prefs.t("Звуки UI", "UI sounds")} detail={prefs.t("Заготовка для будущих звуков", "Prepared for future sound effects")} checked={prefs.soundEffects} onToggle={() => prefs.setPreference("soundEffects", !prefs.soundEffects)} />
        </div>
      </PixelCard>

      <PixelCard title={prefs.t("Курсор", "Cursor")} eyebrow="Pointer">
        <div className="space-y-3">
          {cursors.map((option) => (
            <SelectRow
              key={option.id}
              label={prefs.t(option.labelRu, option.labelEn)}
              detail={prefs.t(option.detailRu, option.detailEn)}
              active={prefs.cursorStyle === option.id}
              onSelect={() => prefs.setPreference("cursorStyle", option.id)}
            />
          ))}
          <ToggleCard label={prefs.t("Свечение курсора", "Cursor glow")} detail={prefs.t("Пульс на hover и ожидании", "Pulse on hover and wait")} checked={prefs.cursorGlow} onToggle={() => prefs.setPreference("cursorGlow", !prefs.cursorGlow)} />
        </div>
      </PixelCard>

      <PixelCard className="lg:col-span-3" title={prefs.t("Тема", "Theme")} eyebrow="Appearance">
        <div className="grid gap-3 md:grid-cols-3">
          {themes.map((option) => (
            <SelectCard
              key={option.id}
              icon={Palette}
              label={prefs.t(option.labelRu, option.labelEn)}
              detail={prefs.t(option.detailRu, option.detailEn)}
              active={prefs.themeMode === option.id}
              onSelect={() => prefs.setPreference("themeMode", option.id)}
            />
          ))}
        </div>
      </PixelCard>

      <PixelCard className="lg:col-span-3" title={prefs.t("Скелетоны и типографика", "Skeletons and typography")} eyebrow="Preview" action={<PixelButton onClick={prefs.resetPreferences}>{prefs.t("Сбросить", "Reset")}</PixelButton>}>
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_220px]">
          <div className="space-y-3 border-2 border-foreground bg-secondary p-4">
            <PixelSkeleton className="h-8" />
            <PixelSkeleton className="h-24" />
            <PixelSkeleton className="h-8 w-2/3" />
          </div>
          <div className="border-2 border-foreground bg-card p-4">
            <p className="text-3xl font-black tracking-tight text-foreground">{prefs.t("Читаемый пиксельный шрифт", "Readable pixel font")}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{prefs.t("Везде используется моноширинный читаемый pixel-like стиль; декоративный font-pixel остаётся только для коротких меток.", "A readable mono pixel-like style is used globally; decorative pixel font stays for short labels.")}</p>
          </div>
          <PixelLoader variant="card" label={prefs.t("Скелетон", "Skeleton")} />
        </div>
      </PixelCard>
    </div>
  )
}

function PreviewTile({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="border-2 border-foreground bg-card p-4 pixel-shadow-sm">
      <Icon className="h-5 w-5 text-primary" />
      <p className="mt-5 text-xs font-black uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-black text-foreground">{value}</p>
    </div>
  )
}

function ToggleCard({ label, detail, checked, onToggle }: { label: string; detail: string; checked: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="flex min-h-32 cursor-pointer flex-col justify-between border-2 border-foreground bg-card p-4 text-left transition-all hover:-translate-y-1 hover:pixel-shadow-sm" aria-pressed={checked}>
      <span>
        <span className="block text-sm font-black text-foreground">{label}</span>
        <span className="mt-1 block text-xs text-muted-foreground">{detail}</span>
      </span>
      <span className="mt-4 flex items-center justify-between gap-3">
        <PixelStatus tone={checked ? "success" : "warning"}>{checked ? "ON" : "OFF"}</PixelStatus>
        <span className={cn("h-7 w-12 rounded-full border-2 border-foreground p-1", checked ? "bg-primary" : "bg-secondary")}>
          <span className={cn("block h-full w-5 rounded-full border-2 border-foreground bg-card transition-transform", checked && "translate-x-4")} />
        </span>
      </span>
    </button>
  )
}

function SelectRow({ label, detail, active, onSelect }: { label: string; detail: string; active: boolean; onSelect: () => void }) {
  return (
    <button onClick={onSelect} className={cn("w-full cursor-pointer border-2 border-foreground p-3 text-left transition-all hover:-translate-y-0.5", active ? "bg-primary text-primary-foreground pixel-shadow-sm" : "bg-card text-foreground")} aria-pressed={active}>
      <span className="block text-sm font-black">{label}</span>
      <span className={cn("mt-1 block text-xs", active ? "text-primary-foreground/75" : "text-muted-foreground")}>{detail}</span>
    </button>
  )
}

function SelectCard({ icon: Icon, label, detail, active, onSelect }: { icon: LucideIcon; label: string; detail: string; active: boolean; onSelect: () => void }) {
  return (
    <button onClick={onSelect} className={cn("min-h-36 cursor-pointer border-2 border-foreground bg-card p-4 text-left transition-all hover:-translate-y-1 hover:pixel-shadow-sm", active && "bg-primary text-primary-foreground pixel-shadow-sm")} aria-pressed={active}>
      <Icon className="h-5 w-5" />
      <span className="mt-8 block text-sm font-black">{label}</span>
      <span className={cn("mt-1 block text-xs", active ? "text-primary-foreground/75" : "text-muted-foreground")}>{detail}</span>
    </button>
  )
}
