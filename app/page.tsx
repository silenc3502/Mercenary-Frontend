import GtmButton from "@/components/GtmButton";
import Image from "next/image";
import SpaPageView from "@/components/SpaPageView";

export default function Home() {
    const funnelSteps = [
        {
            title: "1. 저장소 Clone",
            description: "GitHub에서 Backend 저장소를 clone하고 환경을 설정합니다.",
            links: [
                { text: "GitHub 저장소 clone 하기", url: "https://www.notion.so/GitHub-clone-30a694fe059580c48f5cd268e9f86e57?pvs=21" },
            ],
        },
        {
            title: "2. 코드 & 백로그 분석",
            description: "작성된 코드와 백로그를 분석하여 전체 구조와 도메인을 이해합니다.",
            links: [
                { text: "Mercenary Backend 백로그", url: "https://www.notion.so/Mercenary-Backend-306694fe05958006a7aff260254e6402?pvs=21" },
            ],
        },
        {
            title: "3. 세부 도메인의 행위 맥락 분석하기",
            description: "",
            links: [
                { text: "🔎오늘의 실습 - Cart 맥락 분석하기", url: "https://www.notion.so/Cart-302694fe05958031a532d85d19ecc1b3?pvs=21" },
                { text: "🔎오늘의 실습 - Backlog 자동 작성 프로그램의 맥락 분석", url: "https://www.notion.so/Backlog-303694fe0595804191dcc6c835d3759a?pvs=21" },
                { text: "🔎오늘의 실습 - Cart 요청 / 응답 맥락 전체 분석하기", url: "https://www.notion.so/Cart-303694fe0595800b8c8fc0304f6122ce?pvs=21" },
            ],
        },
        {
            title: "4. Board 도메인 해석해서 프로젝트에 맞게 구성",
            description: "위를 토대로 이것 저것 바꿔 보면서 실험",
            links: [
                { text: "Board 도메인 해석", url: "https://www.notion.so/Board-30a694fe0595805f8559f0008922d6e8?pvs=21" },
            ],
        },
        {
            title: "5. 가설 및 인프라 작업 진행",
            description: "꽤 연습을 많이 했고 다들 어느 정도 하고 있는 것으로 보임",
            links: [
                { text: "오늘의 기분 백로그 Success Criteria와 Todo 작성하기", url: "https://www.notion.so/Success-Criteria-Todo-303694fe0595800db7dace83ff8e5e34?pvs=21" },
                { text: "뭐 먹어? Success Criteria / Todo 작성하기", url: "https://www.notion.so/Success-Criteria-Todo-304694fe05958075ad2dd42140e6f22c?pvs=21" },
                { text: "다음을 추상화하면? (Backlog 작성 시 Success Criteria 단순화)", url: "https://www.notion.so/Backlog-Success-Criteria-305694fe05958058ac75d5a7fdad338d?pvs=21" },
                { text: "오늘 수업 Success Criteria와 Todo 작성하기", url: "https://www.notion.so/Success-Criteria-Todo-305694fe05958084a8e6e1e0f5435c04?pvs=21" },
            ],
        },
    ];

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={100}
                    height={20}
                    priority
                />

                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        Backend 학습 퍼널
                    </h1>
                    <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        Backend 프로젝트를 단계별로 따라가며 학습하고 실습하세요.
                    </p>
                </div>

                {/* Funnel Steps */}
                <div className="mt-10 w-full flex flex-col gap-6">
                    {funnelSteps.map((step, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col gap-2 p-4 border rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                        >
                            <h2 className="text-xl font-semibold text-black dark:text-zinc-50">{step.title}</h2>
                            {step.description && (
                                <p className="text-zinc-600 dark:text-zinc-400">{step.description}</p>
                            )}
                            {step.links && step.links.length > 0 && (
                                <ul className="ml-4 list-disc text-zinc-600 dark:text-zinc-400">
                                    {step.links.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline hover:text-blue-600 dark:hover:text-blue-400"
                                            >
                                                {link.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                {/* SPA page_view 이벤트(Client Component) */}
                <SpaPageView />

                {/* GA4 이벤트 전송 버튼(Client Component) */}
                <div className="flex flex-col gap-4 mt-8">
                    <GtmButton />
                </div>
            </main>
        </div>
    );
}
