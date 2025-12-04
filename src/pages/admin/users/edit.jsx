import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showUsers, updateUsers } from "../../../_services/users";

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await showUsers(id);
        setUser({
          name: data.name,
          email: data.email,
          role: data.role,
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUsers(id, user);
      alert("User updated successfully!");
      navigate("/admin/users");
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Update failed. Please try again.");
    }
  };

  if (loading) return <p>Loading user data...</p>;

  return (
    <section className="p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow dark:bg-gray-800">
        <h1 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Edit User</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input type="text" name="name" value={user.name} onChange={handleChange} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
              <select name="role" value={user.role} onChange={handleChange} className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                <option value="">-- Select Role --</option>
                <option value="admin">Admin</option>
                <option value="kasir">Kasir</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={() => navigate("/admin/users")} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 dark:bg-indigo-600 dark:hover:bg-indigo-700">
              Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
