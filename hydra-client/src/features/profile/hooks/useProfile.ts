// features/profile/hooks/useProfile.ts
import { useState, useEffect } from "react";
import { socketService } from "@/shared/lib/websocket/socket-service";

export function useProfile() {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // ۱. ثبت شنونده برای دریافت بروزرسانی‌های پروفایل از سوکت
    const unsubProfileUpdate = socketService.on("Profile", (data) => {
      console.log(data);
      setProfileData(data);
      setLoading(false);
    });

    socketService.send({ type: "GetProfile" });

    return () => {
      unsubProfileUpdate();
    };
  }, []);

  // اکشن نمونه: آپدیت نام کاربری
  const updateProfile = (newUsername: string) => {
    socketService.send({
      type: "ProfileUpdated",
      data: { username: newUsername },
    });
  };

  return { profileData, loading, updateProfile };
}
