import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8088",
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let _toastError: ((msg: string) => void) | null = null;
export function setToastError(fn: (msg: string) => void) {
  _toastError = fn;
}

api.interceptors.response.use(
  (response) => {
    const body = response.data;
    if (body && typeof body === "object" && "success" in body) {
      if (body.success === false) {
        const err = new Error(body.message || "Request failed");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (err as any).apiError = true;
        return Promise.reject(err);
      }
      response.data = body.data;
    }
    return response;
  },
  (error) => {
    if (_toastError && error.message && !error.response) {
      _toastError("Network error. Please check your connection.");
    }
    if (
      error.response?.status === 401 &&
      !window.location.pathname.startsWith("/login")
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
