export type User = {
  name: string
  email: string
  password: string
  role: string
}

export function registerUser(user: User) {
  const users = JSON.parse(localStorage.getItem("users") || "[]") as User[]
  users.push(user)
  localStorage.setItem("users", JSON.stringify(users))
}

export function loginUser(email: string, password: string): User | null {
  const users = JSON.parse(localStorage.getItem("users") || "[]") as User[]
  const found = users.find(u => u.email === email && u.password === password)
  if (found) {
    localStorage.setItem("currentUser", JSON.stringify(found))
    return found
  }
  return null
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem("currentUser")
  return user ? JSON.parse(user) : null
}

export function getAllUsers(): User[] {
  return JSON.parse(localStorage.getItem("users") || "[]") as User[]
}

export function logoutUser() {
  localStorage.removeItem("currentUser")
}
