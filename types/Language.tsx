export const languages = ["en", "es"] as const

export type Language = typeof languages[number]

export const isLanguage = (value: any): value is Language  => {
  if (typeof value !== "string") return false
  if (value === "en") return true
  else if (value === "es") return true
  return false
}
