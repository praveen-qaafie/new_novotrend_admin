import { useQuery } from "@tanstack/react-query";
import { getAdminAllPermission, getAdminStaffList } from "./employee.service";

export const useAdminStaffListQuery = () => {
  return useQuery({
    queryKey: ["admin-staff-list"],
    queryFn: getAdminStaffList,
  });
};

export const useAdminPermissionListQuery = () => {
  return useQuery({
    queryKey: ["admin-permission-list"],
    queryFn: getAdminAllPermission,
  });
};
