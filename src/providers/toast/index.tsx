"use client";

import { CheckCircle, Info, XCircle } from "lucide-react";
import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

type ToastVariant = "success" | "error" | "info";

type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  durationMs?: number;
};

type ToastItem = {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  durationMs: number;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION_MS: Record<ToastVariant, number> = {
  success: 3500,
  error: 5000,
  info: 2000,
};

const MAX_TOASTS = 4;

export const ToastProvider = ({ children }: React.PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counterRef = useRef(0);
  const timeoutMapRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    const timeout = timeoutMapRef.current.get(id);
    if (timeout) clearTimeout(timeout);
    timeoutMapRef.current.delete(id);
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (input: ToastInput) => {
      counterRef.current += 1;
      const variant: ToastVariant = input.variant ?? "info";
      const durationMs = input.durationMs ?? DEFAULT_DURATION_MS[variant];
      const id = `${Date.now()}-${counterRef.current}`;

      const item: ToastItem = {
        id,
        title: input.title,
        description: input.description,
        variant,
        durationMs,
      };

      setToasts((prev) => [...prev.slice(-(MAX_TOASTS - 1)), item]);

      const timeout = setTimeout(() => dismiss(id), durationMs);
      timeoutMapRef.current.set(id, timeout);
    },
    [dismiss],
  );

  const value = useMemo<ToastContextValue>(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[9999] flex w-[min(92vw,420px)] flex-col gap-3">
        {toasts.map((t) => {
          const styles =
            t.variant === "success"
              ? "border-green-200 bg-green-50/95 text-green-900"
              : t.variant === "error"
                ? "border-red-200 bg-red-50/95 text-red-900"
                : "border-slate-200 bg-white/95 text-slate-900";

          const Icon = t.variant === "success" ? CheckCircle : t.variant === "error" ? XCircle : Info;

          return (
            <div
              key={t.id}
              className={`pointer-events-auto rounded-lg border px-4 py-3 shadow-[0px_12px_30px_rgba(0,0,0,0.12)] backdrop-blur ${styles}`}
            >
              <div className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold leading-snug">{t.title}</p>
                  {t.description ? (
                    <p className="mt-1 text-[13px] leading-snug opacity-80">{t.description}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(t.id)}
                  className="rounded-md px-2 py-1 text-[14px] leading-none opacity-60 hover:opacity-100"
                  aria-label="Dismiss notification"
                >
                  ×
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

