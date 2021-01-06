export type AnonymousUser = {
  status: "Anonymous"
}
export type NormalUser = {
  status: "Authenticated",
  username: string,
}
export type AdminUser = {
  status: "Admin",
  username: string
}
export type StaffUser = {
  status: "Staff",
  username: string
}

export type AuthenticatedUser = NormalUser | AdminUser | StaffUser
export type User = AnonymousUser | AuthenticatedUser