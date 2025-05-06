import { RoleMask } from "@/constants/role";

export const getRoleList = (role: number | undefined): RoleType[] => {
  if (!role) return [];
  const roleList: RoleType[] = [];
  for (const [r, m] of Object.entries(RoleMask)) {
    if (role & m) {
      roleList.push(r as RoleType);
    }
  }
  return roleList;
};
