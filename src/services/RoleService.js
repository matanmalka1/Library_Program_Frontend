import { BaseService } from "./BaseService";
import { updateUserRoleRequest } from "./shared/userRole";

class RoleServiceClass extends BaseService {
  constructor() {
    super();
    this.roleIdByName = new Map();
  }

  updateUserRole(userId, role) {
    return updateUserRoleRequest({
      service: this,
      userId,
      role,
      roleIdByName: this.roleIdByName,
      missingRoleMessage: "Role not available.",
      normalizeRoleInput: true,
    });
  }

  setRoleIdByName(map) {
    this.roleIdByName = map;
  }
}

export const roleService = new RoleServiceClass();
