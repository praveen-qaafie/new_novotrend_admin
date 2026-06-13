"use client";

import { useAuth } from "@/context/AuthContext";
import { useAdminPermissionListQuery } from "@/services/employeemanage/employee.query";
import { useMemo } from "react";

export const usePermissions = () => {
  const { user } = useAuth();

  const { data, isLoading } = useAdminPermissionListQuery();

  const adminPermissionIds = (user?.permission || []).map(String);

  const allowedPermissions = useMemo(() => {
    const permissions = data?.response || [];

    return permissions
      .filter(item => adminPermissionIds.includes(String(item.id)))
      .map(item => item.name);
  }, [data, adminPermissionIds]);

  const hasPermission = permissionName => {
    return allowedPermissions.includes(permissionName);
  };

  return {
    hasPermission,
    allowedPermissions,
    isLoading,
  };
};
