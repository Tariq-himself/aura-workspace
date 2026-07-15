const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string | null;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    employee_number: string | null;
    job_title: string | null;
    department: string | null;
  };
}

export interface AttendanceData {
  status: "absent" | "on_time" | "within_flex" | "late";
  check_in: string | null;
  check_out: string | null;
  expected_checkout: string | null;
  hours_worked: number;
  hours_target: number;
  progress_pct: number;
  can_checkout: boolean;
  branch: string | null;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const token = typeof window !== "undefined" ? localStorage.getItem("aura_token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  let data: ApiResponse<T> | null = null;

  try {
    data = await response.json();
  } catch {
    throw new ApiError("Invalid response from server", response.status);
  }

  if (!response.ok) {
    throw new ApiError(
      data?.message || `Request failed with status ${response.status}`,
      response.status,
    );
  }

  return data as ApiResponse<T>;
}

export const api = {
  login: (login: string, password: string) =>
    request<LoginResponse>("/login", {
      method: "POST",
      body: JSON.stringify({ login, password, device_name: "aura-workspace-web" }),
    }),

  logout: () =>
    request<null>("/logout", {
      method: "POST",
    }),

  getAttendanceToday: () => request<AttendanceData>("/attendance/today"),
};

export const auth = {
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("aura_token", token);
    }
  },

  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("aura_token");
    }
    return null;
  },

  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("aura_token");
    }
  },

  isAuthenticated: () => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("aura_token");
    }
    return false;
  },
};
