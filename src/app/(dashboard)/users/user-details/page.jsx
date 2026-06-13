"use client";

import UserTabs from "@/components/features/users/tabs/UserTabs";
import UserHeader from "@/components/features/users/user-details/UserHeader";
import UserInfoCard from "@/components/features/users/user-details/UserInfoCard";

export default function UserDetailPage() {
  return (
    <div className="space-y-6">
      {/* TOP HEADER */}
      <UserHeader />

      {/* STATUS STRIP */}
      {/* <UserStatusBar /> */}

      <UserInfoCard />

      {/* USER TABS */}
      <UserTabs />
    </div>
  );
}
