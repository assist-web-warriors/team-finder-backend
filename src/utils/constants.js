const roles = {
  employee: 'Employee',
  admin: 'Organization Administrator',
  proj_manager: 'Project Manager',
  dep_manager: 'Department Manager',
};

const actionEndpoints = {
  createProject: '/create-project',
  updateProject: '/update-project',
  assignSkill: '/assign-skill',
  assignRole: '/assign-role',
  createDepartment: '/create-department',
  updateDepartment: '/update-department',
  register: '/signup',
  getOrganizationMembers: '/organization-members',
};

const roleAvailableActions = {
  [roles.admin]: {
    [actionEndpoints.assignRole]: true,
    [actionEndpoints.createDepartment]: true,
    [actionEndpoints.getOrganizationMembers]: true,
  },

  [roles.proj_manager]: {
    [actionEndpoints.updateProject]: true,
  },

  [roles.dep_manager]: {
    [actionEndpoints.updateDepartment]: true,
    [actionEndpoints.assignSkill]: true,
  },

  [roles.employee]: {
    [actionEndpoints.assignSkill]: true,
    [actionEndpoints.register]: true,
  },
};

module.exports = { roles, roleAvailableActions };
