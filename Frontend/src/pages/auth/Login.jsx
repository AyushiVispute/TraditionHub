import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleUI, setRoleUI] = useState("user"); // UI only
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // 🔥 FIXED
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save auth info
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Redirect (backend decides role)
      if (data.role === "admin") {
        navigate("/admin/add-place");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-indigo text-center mb-6">
          Login
        </h1>

        {/* Role Switch (UI only) */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setRoleUI("user")}
            className={`w-1/2 py-2 rounded border transition ${
              roleUI === "user"
                ? "bg-saffron text-white border-saffron"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            User
          </button>

          <button
            type="button"
            onClick={() => setRoleUI("admin")}
            className={`w-1/2 py-2 rounded border transition ${
              roleUI === "admin"
                ? "bg-indigo text-white border-indigo"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 w-full rounded mb-3"
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 w-full rounded pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-sm text-indigo"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-saffron text-white py-3 rounded hover:opacity-90"
        >
          Login
        </button>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo font-semibold">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
