import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Locale = "en" | "ko";

export type Match = {
  id: string;
  game: string;
  title: string;
  tag: string;
  host: string;
  rank: string;
  winRate: string;
  stake: string;
  mode: string;
  format: string;
  players: string;
  status: "Recruiting" | "Waiting" | "In Progress" | "Finished";
  code: string;
};

export type CommunityPost = {
  id: number;
  category: "Notice" | "Event" | "Free" | "Info" | "Recruit";
  title: string;
  author: string;
  comments: number;
  views: number;
  date: string;
  badge?: "NEW" | "HOT" | "PIN";
};

export type RecruitPost = {
  id: string;
  game: string;
  category: "LOOKING_FOR_TEAM" | "RECRUITING";
  tier: string;
  title: string;
  author: string;
  time: string;
  roles: string[];
  members: string;
  status: "RECRUITING" | "LOOKING_FOR_TEAM";
};

export type User = {
  name: string;
  level: number;
  exp: number;
  points: number;
  eventGauge: number;
  wins: number;
  losses: number;
  totalMatches: number;
  joinedAt: string;
};

type State = {
  locale: Locale;
  setLocale: (l: Locale) => void;

  isAuthed: boolean;
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
  addPoints: (n: number) => void;
  addExp: (n: number) => void;

  matches: Match[];
  addMatch: (m: Match) => void;
  joinMatch: (id: string) => void;

  posts: CommunityPost[];
  addPost: (p: CommunityPost) => void;

  recruits: RecruitPost[];
  addRecruit: (r: RecruitPost) => void;
};

const initialMatches: Match[] = [
  { id: "20240525-001", game: "OVERWATCH 2", title: "1v1 Duel", tag: "Ranked", host: "Gamer01", rank: "Emerald 3 (Lv. 245)", winRate: "68% (45W 31L)", stake: "15,000P", mode: "1 : 1", format: "Solo", players: "1 / 2", status: "Recruiting", code: "OW1A2B" },
  { id: "20240525-002", game: "LEAGUE OF LEGENDS", title: "5v5 Team Ranked", tag: "Team", host: "ProGamer", rank: "Diamond 1 (75 LP)", winRate: "54% (64W 54L)", stake: "50,000P", mode: "5 : 5", format: "Team", players: "3 / 10", status: "Waiting", code: "LOL5V5" },
  { id: "20240525-003", game: "PUBG BATTLEGROUNDS", title: "Squad Battle!", tag: "Squad", host: "ProGamer", rank: "Platinum 1 (Lv. 62)", winRate: "62% (128W 83L)", stake: "20,000P", mode: "4 : 4", format: "Squad", players: "4 / 4", status: "In Progress", code: "PUBGSQ" },
  { id: "20240525-004", game: "TEKKEN 8", title: "Ranked Match Gathering", tag: "1v1", host: "TekkenMaster", rank: "Rage (Lv. 28)", winRate: "71% (25W 20L)", stake: "30,000P", mode: "1 : 1", format: "Solo", players: "1 / 2", status: "Recruiting", code: "TK8RNK" },
  { id: "20240525-005", game: "STARCRAFT II", title: "StarCraft II High Ladder", tag: "Solo", host: "ProGamer", rank: "Master 1 (MMR 5421)", winRate: "60% (90W 18L)", stake: "15,000P", mode: "1 : 1", format: "Solo", players: "1 / 2", status: "Finished", code: "SC2HIL" },
];

const initialPosts: CommunityPost[] = [
  { id: 0, category: "Notice", title: "Community Rules and Guidelines (Mandatory)", author: "Admin", comments: 0, views: 12345, date: "2026.02.17", badge: "PIN" },
  { id: 1, category: "Event", title: "Community Activation Event Guide", author: "Admin", comments: 12, views: 8742, date: "2026.02.16", badge: "NEW" },
  { id: 6902, category: "Free", title: "Today's match was insane ㅋㅋ", author: "GAMER01", comments: 23, views: 456, date: "04.27", badge: "NEW" },
  { id: 6901, category: "Free", title: "Recruiting! Master+ only", author: "System", comments: 15, views: 398, date: "04.27" },
  { id: 6900, category: "Free", title: "Is this cheating or lag?", author: "BattleMaster", comments: 31, views: 612, date: "04.27", badge: "NEW" },
  { id: 6899, category: "Free", title: "What plans do you have for this weekend?", author: "No.1Player", comments: 45, views: 785, date: "04.26" },
  { id: 6898, category: "Free", title: "Patch notes are summarized after the update", author: "ProGamer", comments: 12, views: 534, date: "04.26" },
  { id: 6897, category: "Free", title: "The ranking system needs some improvement ㅠㅠ", author: "GAMER01", comments: 8, views: 312, date: "04.26" },
  { id: 6896, category: "Free", title: "Anyone up for a casual game together?", author: "GameAddict", comments: 6, views: 298, date: "04.25" },
  { id: 6895, category: "Free", title: "10,000P stake match, who's in?", author: "ChoiGamer", comments: 19, views: 923, date: "04.25", badge: "HOT" },
];

const initialRecruits: RecruitPost[] = [
  { id: "r1", game: "OVERWATCH 2", category: "LOOKING_FOR_TEAM", tier: "RANKED", title: "Looking for competitive team (All roles)", author: "ProGamer · Tier 3", time: "Available: 8PM ~ 12AM", roles: ["Tank", "Healer", "Damage"], members: "1 / 3", status: "RECRUITING" },
  { id: "r2", game: "LEAGUE OF LEGENDS", category: "LOOKING_FOR_TEAM", tier: "RANKED", title: "Diamond team looking for members", author: "JungleKing · Tier: Diamond I", time: "Available: After 7PM", roles: ["Top", "Jungle", "Mid", "ADC", "Support"], members: "3 / 5", status: "LOOKING_FOR_TEAM" },
  { id: "r3", game: "VALORANT", category: "LOOKING_FOR_TEAM", tier: "SCRIM", title: "VALORANT competitive team (serious only)", author: "VALOMaster · Tier: VALORANT", time: "Available: Weekdays 6PM ~ 10PM", roles: ["Controller", "Initiator", "Duelist"], members: "2 / 5", status: "RECRUITING" },
  { id: "r4", game: "PUBG BATTLEGROUNDS", category: "LOOKING_FOR_TEAM", tier: "DAILY", title: "Looking for consistent squad", author: "ChickenWin · Tier: Platinum", time: "Available: Weekends", roles: ["Assault", "Support", "Sniper", "Recon"], members: "2 / 4", status: "RECRUITING" },
  { id: "r5", game: "STARCRAFT II", category: "LOOKING_FOR_TEAM", tier: "SCRIM", title: "Looking for SC2 team (Practice 3 times/week)", author: "StarPro · Tier: Master", time: "Available: After 7PM", roles: ["Terran", "Zerg", "Protoss"], members: "2 / 3", status: "LOOKING_FOR_TEAM" },
  { id: "r6", game: "TEKKEN 8", category: "RECRUITING", tier: "DAILY", title: "TEKKEN 8 team members wanted", author: "KingOfIron · Tier: Fujin", time: "Available: Anytime", roles: ["All Characters"], members: "1 / 4", status: "RECRUITING" },
];

export const useApp = create<State>()(
  persist(
    (set) => ({
      locale: "en",
      setLocale: (l) => set({ locale: l }),

      isAuthed: false,
      user: null,
      login: (name) =>
        set({
          isAuthed: true,
          user: {
            name: name || "GAMER01",
            level: 5,
            exp: 76,
            points: 350000,
            eventGauge: 42,
            wins: 76,
            losses: 52,
            totalMatches: 128,
            joinedAt: "2024.05.20",
          },
        }),
      logout: () => set({ isAuthed: false, user: null }),
      addPoints: (n) => set((s) => (s.user ? { user: { ...s.user, points: s.user.points + n } } : s)),
      addExp: (n) =>
        set((s) => {
          if (!s.user) return s;
          let exp = s.user.exp + n;
          let level = s.user.level;
          while (exp >= 100) {
            exp -= 100;
            level += 1;
          }
          return { user: { ...s.user, exp, level } };
        }),

      matches: initialMatches,
      addMatch: (m) => set((s) => ({ matches: [m, ...s.matches] })),
      joinMatch: (id) =>
        set((s) => ({
          matches: s.matches.map((m) => {
            if (m.id !== id) return m;
            const [cur, max] = m.players.split("/").map((x) => parseInt(x.trim(), 10));
            const next = Math.min(cur + 1, max);
            return { ...m, players: `${next} / ${max}`, status: next === max ? "Waiting" : m.status };
          }),
        })),

      posts: initialPosts,
      addPost: (p) => set((s) => ({ posts: [p, ...s.posts] })),

      recruits: initialRecruits,
      addRecruit: (r) => set((s) => ({ recruits: [r, ...s.recruits] })),
    }),
    { name: "donbbang-state-v2" },
  ),
);
