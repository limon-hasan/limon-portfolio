export { cn } from "cn"

const numberWords = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
]

/** Sentence-cased word for a small count, e.g. 8 -> "Eight". */
export function numberToWord(value: number): string {
  return numberWords[value] ?? String(value)
}
