const roles = {
  employee: 'Employee',
  admin: 'Organization Administrator',
  proj_manager: 'Project Manager',
  dep_manager: 'Department Manager',
};

const rolesArray = Object.values(roles);

const actionEndpoints = {
  // TODO: refactor access to routes
  createProject: '/create-project',
  updateProject: '/update-project',
  assignSkill: '/assign-skill',
  assignRole: '/assign-role',
  // <------------------->
  getDepartment: '/one',
  getDepartments: '/all',
  createDepartment: '/create',
  updateDepartment: '/update',
  deleteDepartment: '/delete',
  getOrganizationMembers: '/organization-members',
  getDepartmentManagers: '/department-managers',
};

const roleAvailableActions = {
  [roles.admin]: {
    [actionEndpoints.assignRole]: true,
    [actionEndpoints.createDepartment]: true,
    [actionEndpoints.updateDepartment]: true,
    [actionEndpoints.deleteDepartment]: true,
    [actionEndpoints.getOrganizationMembers]: true,
  },

  [roles.proj_manager]: {
    [actionEndpoints.updateProject]: true,
  },

  [roles.dep_manager]: {
    [actionEndpoints.assignSkill]: true,
    [actionEndpoints.getDepartment]: true,
    [actionEndpoints.getDepartments]: true,
    [actionEndpoints.getDepartmentManagers]: true,
  },

  [roles.employee]: {
    [actionEndpoints.assignSkill]: true,
  },
};

module.exports = { roles, roleAvailableActions, rolesArray };
