import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("seller/login", "routes/seller/login.tsx"),
    route("partner/login", "routes/partner/login.tsx"),
    route("forgot-password", "routes/forgot-password.tsx"),
    route("/dashboard", "routes/dashboard.tsx")
] satisfies RouteConfig;
