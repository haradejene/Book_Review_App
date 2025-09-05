export function getApiBase(): string {
  const basePath = process.env.NEXT_PUBLIC_API_BASE_PATH || "";
  return basePath.replace(/\/$/, "");
}

export function apiUrl(path: string): string {
  const base = getApiBase();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export function requireAuth(navigate: (path: string) => void): string | null {
  const token = getAuthToken();
  if (!token) {
    navigate("/auth/login");
    return null;
  }
  return token;
}

export async function authFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const token = getAuthToken();
  const headers = new Headers(init.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-Type", headers.get("Content-Type") || "application/json");
  return fetch(input, { ...init, headers });
}

export async function addBookToDefaultShelf(bookId: number): Promise<void> {
  // 1) fetch shelves
  const shelvesRes = await authFetch(apiUrl("/api/shelves"), { method: "GET" });
  if (shelvesRes.status === 401) throw new Error("Unauthorized");
  const shelves: Array<{ id: number; name: string }> = await shelvesRes.json();
  let shelfId: number | null = null;

  // Prefer shelf named "My Shelf" else first shelf
  const myShelf = Array.isArray(shelves) ? shelves.find((s) => s.name === "My Shelf") : null;
  if (myShelf) {
    shelfId = myShelf.id;
  } else if (Array.isArray(shelves) && shelves.length > 0) {
    shelfId = shelves[0].id;
  }

  // 2) create default shelf if none
  if (!shelfId) {
    const createRes = await authFetch(apiUrl("/api/shelves"), {
      method: "POST",
      body: JSON.stringify({ name: "My Shelf", description: "Default shelf" })
    });
    if (!createRes.ok) throw new Error("Failed to create shelf");
    const created = await createRes.json();
    shelfId = created.id;
  }

  // 3) add book to shelf
  const addRes = await authFetch(apiUrl("/api/shelves"), {
    method: "POST",
    body: JSON.stringify({ action: "addBook", shelfId, bookId })
  });
  if (!addRes.ok) throw new Error("Failed to add book to shelf");
}


