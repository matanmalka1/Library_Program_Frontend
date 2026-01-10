import { normalizeUser, normalizeRole } from "./shared/normalize";
import { BaseService } from "./BaseService";
import { updateUserRoleRequest } from "./shared/userRole";

class UsersServiceClass extends BaseService {
  constructor() {
    super();
    this.roleIdByName = new Map();
  }

  getUsers() {
    return this.handleGetList("/users", {
      dataKey: "users",
      normalize: (user) =>
        normalizeUser(user, {
          normalizeRole,
          roleIdByName: this.roleIdByName,
        }),
      fallback: "Unable to load users.",
    });
  }

  createUser(payload) {
    return this.handlePost("/users", payload, {
      normalize: (data) =>
        normalizeUser(data?.user, {
          normalizeRole,
          roleIdByName: this.roleIdByName,
        }),
      fallback: "Unable to create user.",
    });
  }

  getUserById(userId) {
    return this.handleGet(`/users/${userId}`, {
      normalize: (data) =>
        normalizeUser(data?.user, {
          normalizeRole,
          roleIdByName: this.roleIdByName,
        }),
      fallback: "Unable to load user.",
    });
  }

  deleteUser(userId) {
    return this.handleDelete(`/users/${userId}`, {
      fallback: "Unable to delete user.",
    });
  }

  updateProfile(userId, payload) {
    return this.handlePut(`/users/${userId}`, payload, {
      normalize: (data) =>
        normalizeUser(data?.user, {
          normalizeRole,
          roleIdByName: this.roleIdByName,
        }),
      fallback: "Unable to update profile.",
    });
  }

  updateUserRole(userId, roleName) {
    return updateUserRoleRequest({
      service: this,
      userId,
      role: roleName,
      roleIdByName: this.roleIdByName,
      missingRoleMessage: "Role mapping not found.",
      normalizeRoleInput: false,
    });
  }
}

export const usersService = new UsersServiceClass();
