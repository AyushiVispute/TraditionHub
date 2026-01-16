import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    // ✅ Custom validation
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
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ Save auth info
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // ✅ Redirect
      if (data.role === "admin") {
        navigate("/explore");
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

        {/* Role Switch */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setRole("user")}
            className={`w-1/2 py-2 rounded ${
              role === "user" ? "bg-saffron text-white" : "bg-gray-100"
            }`}
          >
            User
          </button>

          <button
            onClick={() => setRole("admin")}
            className={`w-1/2 py-2 rounded ${
              role === "admin" ? "bg-indigo text-white" : "bg-gray-100"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Email */}
        <input
          type="text"   // 👈 changed from email
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 w-full rounded mb-3"
        />

        {/* Password with Show/Hide */}
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

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-saffron text-white py-3 rounded hover:opacity-90"
        >
          Login as {role}
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
