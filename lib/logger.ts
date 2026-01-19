export function logInfo(message: string, meta?: Record<string, unknown>) {
  console.log(`[MediQuery] ${message}`, meta ?? "");
}

export function logError(message: string, error?: unknown) {
  console.error(`[MediQuery] ${message}`, error ?? "");
  if (process.env.SENTRY_DSN) {
    console.warn("Sentry DSN configured. Hook up Sentry SDK here.");
  }
}
