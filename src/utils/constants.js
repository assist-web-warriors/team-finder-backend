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
  createDepartment: '/',
  getDepartments: '/all',
  register: '/signup',
  getOrganizationMembers: '/organization-members', //user
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
    [actionEndpoints.getDepartments]: true,
    [actionEndpoints.assignSkill]: true,
  },

  [roles.employee]: {
    [actionEndpoints.assignSkill]: true,
    [actionEndpoints.register]: true,
  },
};

module.exports = { roles, roleAvailableActions, rolesArray };
