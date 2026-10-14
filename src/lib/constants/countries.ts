export const countries = [
  { code: "US", name: "United States" },
  { code: "GH", name: "Ghana" },
  { code: "GB", name: "United Kingdom" },
  { code: "NG", name: "Nigeria" },
  { code: "KE", name: "Kenya" },
  { code: "ZA", name: "South Africa" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
] as const;

export const countryName = (code: string) => countries.find((c) => c.code === code)?.name ?? code;