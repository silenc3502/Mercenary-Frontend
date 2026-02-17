"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext"; // 실제 프로젝트 구조에 맞게 경로 조정

export default function SignupPage() {
    const router = useRouter();
    const { refresh } = useAuth();

    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState("");

    // 페이지 로드 시 사용자 상태 확인
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/authentication/status`,
                    {
                        credentials: "include",
                    }
                );

                if (!res.ok) {
                    setError("사용자 상태 확인 실패");
                    setLoading(false);
                    return;
                }

                const data = await res.json();

                if (!data.is_temp_user) {
                    // 이미 정회원이면 메인 페이지로 이동
                    router.replace("/");
                } else {
                    // 임시 사용자 정보 세팅
                    setNickname(data.nickname);
                    setEmail(data.email);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setError("서버와 통신 중 오류 발생");
                setLoading(false);
            }
        };

        fetchStatus();
    }, [router]);

    const handleSignup = async () => {
        if (!nickname.trim()) {
            setError("닉네임을 입력해주세요.");
            return;
        }

        setSubmitLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/sign-up`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,          // temp 세션에서 받아온 값
                        nickname,       // 사용자가 입력
                        login_type: "KAKAO",
                    }),
                }
            );

            if (!res.ok) {
                const data = await res.json();
                setError(data.detail || "회원가입 실패");
                setSubmitLoading(false);
                return;
            }

            // tempToken 삭제 (클라이언트 쿠키)
            document.cookie = "tempToken=; path=/; max-age=0;";

            // AuthContext 상태 갱신 (즉시 로그인 반영)
            await refresh();

            // 메인 페이지로 이동
            router.replace("/");
        } catch (err) {
            console.error(err);
            setError("서버와 통신 중 오류 발생");
            setSubmitLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6 min-h-screen flex justify-center items-center">
                <p>로딩 중...</p>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen flex flex-col items-center bg-white text-black">
            <h1 className="text-2xl font-bold mb-6">회원가입</h1>

            {error && (
                <p className="mb-4 text-red-500 font-medium">{error}</p>
            )}

            <div className="w-full max-w-md flex flex-col gap-4">
                <div>
                    <label className="block mb-1 font-medium">이메일</label>
                    <input
                        type="text"
                        value={email}
                        readOnly
                        className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">닉네임</label>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>

                <button
                    onClick={handleSignup}
                    disabled={submitLoading || !nickname.trim()}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {submitLoading ? "신청 중..." : "신청하기"}
                </button>
            </div>
        </div>
    );
}
