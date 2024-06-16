export type Theme = 'light' | 'dark'
export type SelectedTheme = Theme | null

export interface ThemeItem {
  title: string
  value: SelectedTheme
  icon: string
}
