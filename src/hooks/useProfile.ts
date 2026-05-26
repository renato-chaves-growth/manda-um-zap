import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export interface Profile {
  id: string;
  full_name: string | null;
  whatsapp: string | null;
  business_name: string | null;
  city: string | null;
  instagram: string | null;
  bio: string | null;
  margin: string | null;
  schedule: {
    days: Record<string, boolean>;
    startTime: string;
    endTime: string;
  } | null;
  whatsapp_instance: string | null;  // Z-API instanceId
  whatsapp_token: string | null;     // Z-API instanceToken
  plan: string;
  plan_status: string;
  role: string;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setProfile(data as Profile);
        setLoading(false);
      });
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error("Not authenticated") };
    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);
    if (!error) setProfile((prev) => prev ? { ...prev, ...updates } : prev);
    return { error };
  };

  return { profile, loading, updateProfile };
}
