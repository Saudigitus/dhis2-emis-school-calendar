// month and week day names follow the user's language
export function getLocale(language?: string): string {
    const locale = (language || "en").replace(/_/g, "-");
    try {
        return Intl.DateTimeFormat.supportedLocalesOf(locale).length ? locale : "en-US";
    } catch {
        return "en-US";
    }
}
