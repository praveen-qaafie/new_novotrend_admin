"use client";

import { authenticator } from "@otplib/preset-default";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useAuthMutation } from "@/services/auth/auth.mutation";

export default function AucationCode() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [authSecret, setAuthSecret] = useState("");
  const [qrSecret, setQrSecret] = useState("");
  const [staffUsername, setStaffUsername] = useState("");
  const [qrCode, setQrCode] = useState("");

  const { register, handleSubmit } = useForm();
  const { mutate, isPending } = useAuthMutation();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedAuthSecret = localStorage.getItem("auth_secret");
    const username = localStorage.getItem("staff_username");
    if (!savedToken) {
      router.replace("/login");
      return;
    }
    setToken(savedToken);
    setAuthSecret(savedAuthSecret || "");
    setStaffUsername(username || "");
    const generateQr = async () => {
      if (savedAuthSecret === "0") {
        const secret = authenticator.generateSecret();
        setQrSecret(secret);
        localStorage.setItem("qr_secret", secret);
        const otpUrl = authenticator.keyuri(username || "admin", "Novotrend", secret);
        const qr = await QRCode.toDataURL(otpUrl);
        setQrCode(qr);
      }
    };
    generateQr();
  }, [router]);
  const showQr = authSecret === "0";
  const onSubmit = values => {
    const payload = {
      token,
      authcode: values.code,
    };
    // only first time login
    if (showQr) {
      payload.secret = qrSecret;
    }
    console.log("VERIFY PAYLOAD:", payload);
    mutate(payload, {
      onSuccess: () => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.removeItem("qr_secret");
        localStorage.removeItem("qr_code");
        router.replace("/");
      },
      onError: error => {
        console.log(error);
      },
    });
  };
  if (!token) return null;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020817]">
      <div className="absolute inset-0">
        <Image src="/forex.jpg" alt="Background" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      </div>
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl">
          <div className="mb-8 text-center">
            <Image
              src="/QAAFIE2-white.png"
              alt="Logo"
              width={170}
              height={50}
              className="mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold text-white">Authentication Code</h1>
            <p className="mt-3 text-sm text-slate-400">Enter verification code</p>
          </div>
          {showQr && (
            <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-5">
              <h3 className="mb-4 text-center text-sm font-semibold text-white">
                Scan QR Using Authenticator App
              </h3>
              {qrCode ? (
                <div className="flex justify-center">
                  <Image
                    src={qrCode}
                    alt="QR Code"
                    width={220}
                    height={220}
                    className="rounded-2xl bg-white p-3"
                  />
                </div>
              ) : (
                <div className="rounded-xl bg-yellow-500/10 p-4 text-center text-yellow-200">
                  Generating QR...
                </div>
              )}
              {/* <div className="mt-5">
                <p className="mb-2 text-center text-xs text-slate-400">Secret Key</p>
                <div className="break-all rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-center text-sm text-white">
                  {qrSecret}
                </div>
              </div> */}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              maxLength={6}
              {...register("code")}
              placeholder="••••••"
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-center text-2xl tracking-[10px] text-white"
            />
            <button
              type="submit"
              disabled={isPending}
              className="h-14 w-full rounded-2xl bg-primary text-white"
            >
              {isPending ? "Verifying..." : "Verify & Continue"}
            </button>
            <Link href="/login" className="block text-center text-primary">
              Back to Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
