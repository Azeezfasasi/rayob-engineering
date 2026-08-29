"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  Copy,
  Check,
  Eye,
  EyeOff,
  RefreshCw,
  ArrowLeft,
  Loader2,
  KeyRound,
  Mail,
} from "lucide-react";

function secureRandomInt(max) {
  const arr = new Uint32Array(1);
  window.crypto.getRandomValues(arr);
  return arr[0] % max;
}

function generatePassword(length = 14) {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghijkmnpqrstuvwxyz";
  const digits = "23456789";
  const symbols = "!@#$%^&*-_=+?";
  const all = upper + lower + digits + symbols;

  const required = [
    upper[secureRandomInt(upper.length)],
    lower[secureRandomInt(lower.length)],
    digits[secureRandomInt(digits.length)],
    symbols[secureRandomInt(symbols.length)],
  ];

  const rest = Array.from({ length: length - required.length }, () => all[secureRandomInt(all.length)]);

  const chars = [...required, ...rest];
  for (let i = chars.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

function initials(user) {
  return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
}

export default function ChangeUserPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { token } = useAuth();
  const preselectedId = searchParams.get("userId");

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingSelected, setLoadingSelected] = useState(!!preselectedId);

  const [mode, setMode] = useState("generate");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Load the user list for the picker
  useEffect(() => {
    async function loadUsers() {
      setLoadingUsers(true);
      try {
        const res = await fetch("/api/users?limit=200", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(Array.isArray(data.users) ? data.users : []);
      } catch (err) {
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    }
    if (token && !selectedUser) loadUsers();
  }, [token, selectedUser]);

  // Load a preselected user from the URL (e.g. linked from All Users)
  useEffect(() => {
    async function loadPreselected() {
      try {
        const res = await fetch(`/api/users/${preselectedId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setSelectedUser(data.user);
      } finally {
        setLoadingSelected(false);
      }
    }
    if (preselectedId && token) loadPreselected();
  }, [preselectedId, token]);

  // Seed a fresh generated password whenever a new user is selected
  useEffect(() => {
    if (selectedUser) {
      setPassword(generatePassword());
      setMode("generate");
      setResult(null);
      setError("");
      setCopied(false);
    }
  }, [selectedUser]);

  const filteredUsers = users.filter((u) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  function handleRegenerate() {
    setPassword(generatePassword());
    setCopied(false);
  }

  async function handleCopy(text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError("Could not copy to clipboard");
    }
  }

  function handleChangeUser() {
    setSelectedUser(null);
    setResult(null);
    setError("");
    setPassword("");
    router.replace("/dashboard/change-user-password");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/users/${selectedUser._id}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword: password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setResult({ password: data.temporaryPassword || password, emailSent: data.emailSent });
      } else {
        setError(data.message || "Failed to change password");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Change User Password</h1>
          <p className="mt-2 text-gray-600">
            Set a new password for a user. It will be emailed to them automatically.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          {loadingSelected ? (
            <div className="flex items-center justify-center py-16 text-gray-500 gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading user...
            </div>
          ) : !selectedUser ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select a user</label>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or email..."
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none"
                />
              </div>

              <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {loadingUsers ? (
                  <div className="p-6 text-center text-gray-500 flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading users...
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">No users found.</div>
                ) : (
                  filteredUsers.map((u) => (
                    <button
                      key={u._id}
                      type="button"
                      onClick={() => setSelectedUser(u)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 shrink-0 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-semibold text-sm">
                          {initials(u)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {u.firstName} {u.lastName}
                          </p>
                          <p className="text-sm text-gray-500 truncate">{u.email}</p>
                        </div>
                      </div>
                      <span className="shrink-0 capitalize text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                        {u.role}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div>
              {/* Selected user card */}
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 shrink-0 rounded-full bg-blue-900 text-white flex items-center justify-center font-semibold text-lg">
                    {initials(selectedUser)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{selectedUser.email}</p>
                  </div>
                </div>
                <span className="shrink-0 capitalize text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-800">
                  {selectedUser.role}
                </span>
              </div>

              <button
                type="button"
                onClick={handleChangeUser}
                className="text-sm text-blue-900 hover:underline mb-6 inline-flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Choose a different user
              </button>

              {result ? (
                <div className="rounded-lg border border-green-200 bg-green-50 p-5">
                  <div className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                    <Check className="w-5 h-5" /> Password changed successfully
                  </div>
                  <p className="text-sm text-green-700 mb-4">
                    {result.emailSent
                      ? `An email with the new password has been sent to ${selectedUser.email}.`
                      : "The password was changed, but the notification email could not be sent — please share the password with the user securely."}
                  </p>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    New Password
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white border border-gray-300 rounded-md px-3 py-2 font-mono text-sm tracking-wide text-gray-900 overflow-x-auto">
                      {result.password}
                    </code>
                    <button
                      type="button"
                      onClick={() => handleCopy(result.password)}
                      className="shrink-0 inline-flex items-center gap-1.5 bg-blue-900 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 cursor-pointer"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
                    <button
                      type="button"
                      onClick={() => {
                        setMode("generate");
                        setPassword(generatePassword());
                      }}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                        mode === "generate" ? "bg-white shadow-sm text-blue-900" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Generate Secure Password
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMode("manual");
                        setPassword("");
                      }}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                        mode === "manual" ? "bg-white shadow-sm text-blue-900" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Enter Custom Password
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          readOnly={mode === "generate"}
                          className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-md font-mono tracking-wide focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none"
                          placeholder="Enter a new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {mode === "generate" && (
                        <button
                          type="button"
                          onClick={handleRegenerate}
                          title="Regenerate"
                          className="shrink-0 p-2.5 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                        >
                          <RefreshCw className="w-5 h-5 text-gray-600" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleCopy(password)}
                        disabled={!password}
                        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">
                      Minimum 8 characters. The user will receive this password by email.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">{error}</div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-blue-900 bg-blue-50 border border-blue-100 rounded-md px-3 py-2">
                    <Mail className="w-4 h-4 shrink-0" />
                    This new password will automatically be emailed to <strong>&nbsp;{selectedUser.email}</strong>.
                  </div>

                  <button
                    type="submit"
                    disabled={saving || !password}
                    className="w-full bg-blue-900 text-white font-medium py-2.5 rounded-md hover:bg-blue-800 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Changing Password...
                      </>
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4" /> Change Password &amp; Notify User
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
