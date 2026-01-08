import { useEffect, useState } from "react";
import { usersService } from "../../services/UsersService";
import { useAuth } from "../../context/auth/AuthContext";
import { AdminUsersPanel } from "./AdminUsersPanel";
import { AdminLayout } from "./AdminLayout";

export const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [roleChanges, setRoleChanges] = useState({});
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await usersService.getUsers();
      setUsers(data);
    } catch {}
  };

  const handleRoleChange = (userId, role) => {
    setRoleChanges((prev) => ({ ...prev, [userId]: role }));
  };

  const handleSaveRole = async (userId) => {
    const role = roleChanges[userId];
    if (!role) return;
    try {
      await usersService.updateUserRole(userId, role);
      setRoleChanges((prev) => {
        const next = { ...prev };
        delete next[userId];
        return next;
      });
      fetchUsers();
    } catch {}
  };

  return (
    <AdminLayout activeTab="users">
      <AdminUsersPanel
        users={users}
        currentUserId={currentUser?.id}
        roleChanges={roleChanges}
        onRoleChange={handleRoleChange}
        onSaveRole={handleSaveRole}
      />
    </AdminLayout>
  );
};
