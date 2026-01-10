import { normalizeUser, normalizeRole } from "./normalize";

export const updateUserRoleRequest = ({
  service,
  userId,
  role,
  roleIdByName,
  missingRoleMessage,
  normalizeRoleInput = true,
}) => {
  const normalizedRole = normalizeRoleInput ? normalizeRole(role) : role;
  const roleId = roleIdByName?.get(normalizedRole) || null;
  if (!roleId) {
    return Promise.reject(new Error(missingRoleMessage));
  }

  return service.handlePut(
    `/users/${userId}`,
    { roleId },
    {
      normalize: (data) =>
        normalizeUser(data?.user, {
          normalizeRole,
          roleIdByName,
        }),
      fallback: "Unable to update user role.",
    }
  );
};
