"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { api, AttendanceData } from "@/lib/api";
import { useAuth } from "@/components/auth-provider";
import { GlassCard } from "@/components/glass-card";
import { gsap } from "gsap";
import { LogOut, Clock, Calendar, MapPin } from "lucide-react";

function formatTime(dateString: string | null) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDuration(hours: number) {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return `${wholeHours}h ${minutes}m`;
}

function statusLabel(status: AttendanceData["status"]) {
  switch (status) {
    case "on_time":
      return "On Time";
    case "within_flex":
      return "Within Flex";
    case "late":
      return "Late";
    default:
      return "Absent";
  }
}

function statusColor(status: AttendanceData["status"]) {
  switch (status) {
    case "on_time":
      return "bg-[#22C55E] text-white";
    case "within_flex":
      return "bg-[#F2A900] text-[#0A0A0A]";
    case "late":
      return "bg-[#EF4444] text-white";
    default:
      return "bg-[#A1A1AA] text-[#0A0A0A]";
  }
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [attendance, setAttendance] = useState<AttendanceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const load = async () => {
      try {
        const response = await api.getAttendanceToday();
        setAttendance(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load attendance");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!isLoading && containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      );
    }
  }, [isLoading]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Aura Workspace</h1>
            <p className="text-[#A1A1AA]">
              Welcome back, {user?.name || "Employee"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.1)] px-4 py-2 text-sm text-[#A1A1AA] transition-colors hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </header>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center text-[#A1A1AA]">
            Loading your attendance...
          </div>
        ) : error ? (
          <GlassCard>
            <div className="text-[#EF4444]">{error}</div>
          </GlassCard>
        ) : (
          <div ref={containerRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Status Card */}
            <GlassCard className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <span className="text-[#A1A1AA]">Today&apos;s Status</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
                    attendance?.status || "absent",
                  )}`}
                >
                  {statusLabel(attendance?.status || "absent")}
                </span>
              </div>
              <div className="mt-4 text-3xl font-bold text-white">
                {formatTime(attendance?.check_in || null)}
              </div>
              <div className="mt-1 text-sm text-[#A1A1AA]">Check-in time</div>
            </GlassCard>

            {/* Hours Worked Card */}
            <GlassCard>
              <div className="flex items-center gap-2 text-[#A1A1AA]">
                <Clock className="h-4 w-4" />
                <span>Hours Worked</span>
              </div>
              <div className="mt-4 text-3xl font-bold text-white">
                {formatDuration(attendance?.hours_worked || 0)}
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[rgba(255,255,255,0.1)]">
                <div
                  className="h-full rounded-full bg-[#F2A900] transition-all"
                  style={{ width: `${attendance?.progress_pct || 0}%` }}
                />
              </div>
              <div className="mt-2 text-sm text-[#A1A1AA]">
                Target: {attendance?.hours_target || 9} hours
              </div>
            </GlassCard>

            {/* Expected Checkout Card */}
            <GlassCard>
              <div className="flex items-center gap-2 text-[#A1A1AA]">
                <Calendar className="h-4 w-4" />
                <span>Expected Checkout</span>
              </div>
              <div className="mt-4 text-3xl font-bold text-white">
                {formatTime(attendance?.expected_checkout || null)}
              </div>
              {attendance?.can_checkout ? (
                <div className="mt-2 text-sm font-medium text-[#22C55E]">
                  You may check out now
                </div>
              ) : (
                <div className="mt-2 text-sm text-[#A1A1AA]">
                  Complete 9 hours before checking out
                </div>
              )}
            </GlassCard>

            {/* Branch Card */}
            <GlassCard>
              <div className="flex items-center gap-2 text-[#A1A1AA]">
                <MapPin className="h-4 w-4" />
                <span>Branch</span>
              </div>
              <div className="mt-4 text-2xl font-bold text-white">
                {attendance?.branch || user?.department || "—"}
              </div>
            </GlassCard>

            {/* Checkout Status Card */}
            <GlassCard className="sm:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[#A1A1AA]">Daily Progress</div>
                  <div className="mt-1 text-3xl font-bold text-white">
                    {attendance?.progress_pct || 0}%
                  </div>
                </div>
                <div
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    attendance?.can_checkout
                      ? "bg-[#22C55E] text-white"
                      : "bg-[#FC8310] text-[#0A0A0A]"
                  }`}
                >
                  {attendance?.can_checkout
                    ? "Daily target completed"
                    : "Working hours in progress"}
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </main>
  );
}
