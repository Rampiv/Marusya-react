import type { Profile } from "@models/Profile"

export const GetName = (profile: Profile | null): string => {
  if (profile) {
    return `${profile.name.charAt(0).toUpperCase()}${profile.name.slice(1)}`
  }
  return 'Войти'
}
