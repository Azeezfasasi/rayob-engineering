
"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { Commet } from "react-loading-indicators";

const PAGE_SIZE = 10;

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { token } = useAuth();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: PAGE_SIZE,
        ...(search && { search }),
        ...(role && { role }),
        ...(status && { isActive: status }),
      });
      const res = await fetch(`/api/users?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(data.users || []);
      setTotal(data.total || 0);
      setLoading(false);
    }
    fetchUsers();
  }, [search, role, status, page, token]);

  function handleEdit(user) {
    // TODO: Open edit modal
    alert(`Edit user: ${user.email}`);
  }
  function handleDelete(user) {
    // TODO: Confirm and delete user
    alert(`Delete user: ${user.email}`);
  }
  function handleChangeRole(user) {
    // TODO: Open change role modal
    alert(`Change role for: ${user.email}`);
  }
  function handleChangeStatus(user) {
    // TODO: Toggle status
    alert(`Change status for: ${user.email}`);
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Redirect to login if not authenticated
    React.useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.replace("/login");
      }
    }, [isAuthenticated, loading, router]);
  
    if (loading) {
      return <div className="flex items-center justify-center h-screen"><Commet color="#32cd32" size="medium" text="" textColor="" /></div>;
    }
    if (!isAuthenticated) {
      return null;
    }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg" suppressHydrationWarning={true}>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="border px-3 py-2 rounded-lg w-64"
        />
        <select value={role} onChange={e => { setRole(e.target.value); setPage(1); }} className="border px-3 py-2 rounded-lg">
          <option value="">All Roles</option>
          <option value="client">Client</option>
          <option value="admin">Admin</option>
          <option value="staff-member">Staff Member</option>
        </select>
        <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} className="border px-3 py-2 rounded-lg">
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse border-b">
                  <td className="px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </td>
                </tr>
              ))
            ) : users.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-6">No users found.</td></tr>
            ) : (
              users.map(user => (
                <tr key={user._id} className="border-b">
                  <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button onClick={() => handleEdit(user)} className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs">Edit</button>
                    <button onClick={() => handleDelete(user)} className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs">Delete</button>
                    <button onClick={() => handleChangeRole(user)} className="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-xs">Change Role</button>
                    <button onClick={() => handleChangeStatus(user)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs">Change Status</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-6">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded border bg-gray-100 disabled:opacity-50"
        >Prev</button>
        <span className="px-2">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded border bg-gray-100 disabled:opacity-50"
        >Next</button>
      </div>
    </div>
  );
}
