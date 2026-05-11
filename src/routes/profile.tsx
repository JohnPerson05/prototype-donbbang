import { createFileRoute } from "@tanstack/react-router";
import { Bell, Check, MessageSquare, Pencil, Plus, Shield, Swords, Target, Trash2, User } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({
    meta: [
      { title: "My Page — DONBBANG" },
      { name: "description", content: "Your profile, stats, and match history." },
    ],
  }),
});

const myGames = [
  { game: "League of Legends (LOL)", nickname: "GAMER01", tier: "Emerald IV", record: "128W 74L", winRate: "62.6%", verified: true, date: "2024.05.14" },
  { game: "Valorant (VALORANT)", nickname: "GAMER01#KR1", tier: "Diamond 2", record: "88W 52L", winRate: "62.9%", verified: true, date: "2024.05.10" },
  { game: "Battlegrounds (PUBG)", nickname: "GAMER01", tier: "Platinum I", record: "56W 34L", winRate: "62.2%", verified: false },
];

const recentMatches = [
  { result: "승리", a: "게이머킹", b: "배틀마스터" },
  { result: "패배", a: "프로게이머", b: "No.1유저" },
  { result: "승리", a: "전설의검", b: "최강자" },
  { result: "승리", a: "게이머왕", b: "게임좋아" },
  { result: "패배", a: "고수유저", b: "배틀마스터" },
];

function Profile() {
  return (
    <Shell>
      <div className="grid grid-cols-[1fr_320px] gap-4">
        <div className="space-y-4">
          {/* Profile header card */}
          <div className="panel p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-primary/30 to-secondary border-2 border-primary flex items-center justify-center shadow-[var(--shadow-neon)]">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display font-black text-[22px] tracking-tight">게이머01</h2>
                    <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    Lv. 5 <span className="text-foreground ml-1">Exp. 76%</span>
                  </div>
                  <div className="w-[200px] h-1 rounded-full bg-secondary mt-1.5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-[oklch(0.78_0.18_35)]" style={{ width: "76%" }} />
                  </div>
                  <div className="text-[10.5px] text-muted-foreground mt-2">
                    회원 가입일: <span className="text-foreground">2024.05.20</span>
                    <span className="ml-3">마지막 접속: </span>
                    <span className="text-foreground">2024.05.15 23:45</span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="h-8 px-3 border-border bg-secondary/40 text-[11px] font-semibold"
              >
                정보 수정
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <StatBox icon={Swords} label="총 매치 참여" value="128" suffix="회" />
              <StatBox icon={Target} label="승리 횟수" value="76" suffix="회" color="text-primary" />
              <StatBox icon="P" label="승률" value="59.4" suffix="%" color="text-primary" />
            </div>

            <div className="grid grid-cols-6 gap-1 mt-4 pt-4 border-t border-border">
              {[
                { icon: User, label: "내 정보", active: true },
                { icon: Swords, label: "매치 내역" },
                { icon: "P", label: "포인트 내역" },
                { icon: MessageSquare, label: "쪽지함" },
                { icon: Bell, label: "알림 내역" },
                { icon: Shield, label: "차단 관리" },
              ].map((t, i) => (
                <button
                  key={i}
                  className={`flex flex-col items-center gap-1 py-2 rounded transition ${
                    t.active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {typeof t.icon === "string" ? (
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-display font-bold text-[10px] ${t.active ? "bg-primary text-primary-foreground" : "bg-secondary border border-border"}`}>
                      {t.icon}
                    </span>
                  ) : (
                    <t.icon className="w-4 h-4" />
                  )}
                  <span className="text-[11px] font-semibold">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* My games */}
          <div className="panel p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-[13px]">내가 하는 게임</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  매치를 더 정확하게 매칭하기 위해 정보를 등록해주세요!
                </p>
              </div>
              <Button className="btn-neon border-0 h-8 px-3 text-[11px] font-semibold gap-1">
                <Plus className="w-3 h-3" /> 게임 추가
              </Button>
            </div>
            <table className="w-full text-[12px]">
              <thead>
                <tr className="text-[10.5px] uppercase tracking-wide text-muted-foreground border-b border-border">
                  <th className="text-left py-2">게임</th>
                  <th className="text-left py-2">닉네임</th>
                  <th className="text-left py-2">티어 / 랭크</th>
                  <th className="text-left py-2">전적 (승/패)</th>
                  <th className="text-left py-2">승률</th>
                  <th className="text-left py-2">인증 여부</th>
                  <th className="text-right py-2">관리</th>
                </tr>
              </thead>
              <tbody>
                {myGames.map((g, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2.5 font-semibold">{g.game}</td>
                    <td className="py-2.5">{g.nickname}</td>
                    <td className="py-2.5 font-semibold">{g.tier}</td>
                    <td className="py-2.5">{g.record}</td>
                    <td className="py-2.5 text-primary font-bold">{g.winRate}</td>
                    <td className="py-2.5">
                      {g.verified ? (
                        <div>
                          <span className="inline-flex items-center gap-1 text-[10.5px] text-success font-semibold">
                            <Check className="w-3 h-3" /> 인증 완료
                          </span>
                          <div className="text-[10px] text-muted-foreground mt-0.5">(인증일: {g.date})</div>
                        </div>
                      ) : (
                        <div>
                          <span className="text-[10.5px] text-muted-foreground">미인증</span>
                          <button className="block mt-0.5 text-[10px] text-primary font-semibold hover:underline">
                            인증하기
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 text-right">
                      <button className="text-muted-foreground hover:text-foreground mr-2">
                        <Pencil className="w-3 h-3 inline" /> <span className="text-[10.5px]">수정</span>
                      </button>
                      <button className="text-muted-foreground hover:text-primary">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[10.5px] text-muted-foreground mt-2">인증 완료된 계정은 다른 유저에게 공개됩니다.</p>
          </div>

          {/* Contact / ID verification */}
          <div className="panel p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-[13px]">연락처 / 아이디 인증</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  실제 본인 아이디 인증을 완료하면 다른 유저가 신뢰할 수 있습니다.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_220px] gap-4">
              <div className="space-y-2">
                {[
                  { label: "텔레그램 아이디", id: "@gamer01", date: "2024.05.14" },
                  { label: "디스코드 아이디", id: "gamer01#1234", date: "2024.05.14" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-md bg-secondary/30 border border-border">
                    <div className="flex items-center gap-3">
                      <span className="text-[11.5px] font-semibold w-[88px]">{c.label}</span>
                      <span className="text-[12px]">{c.id}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="inline-flex items-center gap-1 text-[10.5px] text-success font-semibold">
                          <Check className="w-3 h-3" /> 인증 완료
                        </span>
                        <div className="text-[10px] text-muted-foreground">(인증일: {c.date})</div>
                      </div>
                      <button className="h-7 px-2 rounded bg-secondary border border-border text-[10.5px] font-semibold hover:bg-accent">
                        수정
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="panel p-3 text-[11px]">
                <div className="font-bold mb-1.5">인증 방법</div>
                <ol className="space-y-1 text-muted-foreground list-decimal list-inside">
                  <li>인증하기 버튼 클릭</li>
                  <li>안내에 따라 본인 계정으로 인증 진행</li>
                  <li>관리자 확인 후 인증 완료</li>
                  <li>인증은 24시간 이내로 처리됩니다.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Recent activity summary */}
          <div className="panel p-4">
            <h3 className="font-bold text-[13px] mb-3">최근 활동 요약</h3>
            <div className="grid grid-cols-4 gap-3 text-[11.5px]">
              <div className="flex items-center gap-2">
                <Swords className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-[10.5px] text-muted-foreground">최근 매치 참여</div>
                  <div className="font-semibold">2024.05.15</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-gold" />
                <div>
                  <div className="text-[10.5px] text-muted-foreground">최근 승리</div>
                  <div className="font-semibold">2024.05.14</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Pencil className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-[10.5px] text-muted-foreground">작성한 게시글</div>
                  <div className="font-semibold">23 개</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-[10.5px] text-muted-foreground">작성한 댓글</div>
                  <div className="font-semibold">87 개</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div className="space-y-4">
          <div className="panel p-4">
            <div className="text-[11px] font-bold tracking-wider text-muted-foreground mb-3">내 등급</div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[oklch(0.5_0.2_25)] to-[oklch(0.25_0.1_25)] border-2 border-primary flex items-center justify-center shadow-[var(--shadow-neon)] relative">
                <Shield className="w-10 h-10 text-primary" />
                <span className="absolute text-[28px] font-display font-black text-primary-foreground drop-shadow-lg">B</span>
              </div>
              <div className="font-display font-black text-[16px] mt-2">브론즈 I</div>
              <div className="text-[11px] text-muted-foreground mt-2">1200 / 1500 RP</div>
              <div className="w-full h-1 bg-secondary rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-[oklch(0.78_0.18_35)]" style={{ width: "80%" }} />
              </div>
              <div className="text-[10.5px] text-muted-foreground mt-1.5">다음 등급까지 300 RP</div>
            </div>
          </div>

          <div className="panel p-4">
            <div className="flex items-center justify-between mb-2.5">
              <div className="text-[11px] font-bold tracking-wider">내가 참여한 매치</div>
              <a className="text-[10.5px] text-muted-foreground hover:text-foreground">더보기 &gt;</a>
            </div>
            <div className="space-y-2">
              {recentMatches.map((m, i) => (
                <div key={i} className="flex items-center justify-between text-[11.5px]">
                  <span className="text-muted-foreground text-[10.5px]">VS</span>
                  <span className="flex-1 px-2 truncate">
                    {m.a} VS {m.b}
                  </span>
                  <span className={`font-bold ${m.result === "승리" ? "text-success" : "text-primary"}`}>
                    {m.result}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[11px] font-bold tracking-wider">포인트 요약</div>
              <a className="text-[10.5px] text-muted-foreground hover:text-foreground">더보기 &gt;</a>
            </div>
            <div className="space-y-2 text-[12px]">
              <div className="flex justify-between">
                <span className="text-muted-foreground">보유 중 포인트</span>
                <span className="font-display font-bold text-primary">350,000 P</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">충전한 포인트</span>
                <span className="font-semibold">1,250,000 P</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">사용한 포인트</span>
                <span className="text-primary font-semibold">-900,000 P</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">환전한 포인트</span>
                <span className="text-primary font-semibold">-300,000 P</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function StatBox({
  icon,
  label,
  value,
  suffix,
  color,
}: {
  icon: React.ElementType | string;
  label: string;
  value: string;
  suffix?: string;
  color?: string;
}) {
  return (
    <div className="panel p-3">
      <div className="flex items-center gap-2">
        {typeof icon === "string" ? (
          <span className="w-6 h-6 rounded-full bg-secondary border border-border flex items-center justify-center text-[11px] font-bold">
            {icon}
          </span>
        ) : (
          <icon className="w-4 h-4 text-muted-foreground" />
        )}
        <span className="text-[10.5px] text-muted-foreground">{label}</span>
      </div>
      <div className="mt-1.5 font-display">
        <span className={`font-black text-[22px] ${color || ""}`}>{value}</span>
        {suffix && <span className="text-[12px] text-muted-foreground ml-1">{suffix}</span>}
      </div>
    </div>
  );
}
