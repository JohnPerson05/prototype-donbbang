export const liveChat = [
  { user: "System", time: "23:45", msg: "Anyone up for a match?" },
  { user: "BattleMaster", time: "23:45", msg: "I'm in! Let's do this!" },
  { user: "No.1Player", time: "23:46", msg: "What's the prize for winning?" },
  { user: "GameKing", time: "23:46", msg: "I made a 10,000P match. Anyone interested?" },
  { user: "ChoiGamer", time: "23:47", msg: "Count me in!" },
  { user: "ProGamer", time: "23:48", msg: "I've joined the match!" },
];

export const recentResults = [
  { result: "Win", a: "KillerPro", b: "1 : 0", delta: "+100,000" },
  { result: "Loss", a: "IronMan", b: "0 : 2", delta: "-100,000" },
  { result: "Win", a: "ShadowX", b: "2 : 1", delta: "+200,000" },
  { result: "Win", a: "SuperNova", b: "2 : 0", delta: "+150,000" },
];

export const announcements = [
  { tag: "Maintenance", title: "Server Maintenance Notice", date: "05-14" },
  { tag: "Event", title: "Family Day Event Notice", date: "05-10" },
  { tag: "Notice", title: "New Season 1 Update", date: "05-08" },
];

export const games = {
  Strategy: ["StarCraft Remastered", "StarCraft II", "DOTA 2", "Warcraft III"],
  Fighting: ["TEKKEN 8", "Street Fighter 6", "DNF Duel"],
  FPS: ["Sudden Attack", "Overwatch 2", "Valorant", "Counter Strike 2"],
};

export const profile = {
  name: "GAMER01",
  level: 5,
  exp: 76,
  points: "350,000P",
  myPage: "MY PAGE",
};

export const matchStatus = [
  { label: "Recruiting", count: 54, color: "text-success" },
  { label: "Waiting", count: 23, color: "text-gold" },
  { label: "In Progress", count: 31, color: "text-neon-blue" },
  { label: "Finished", count: 20, color: "text-muted-foreground" },
];

export const liveMatchRows = [
  {
    id: "20240525-001",
    game: "OVERWATCH 2",
    title: "1v1 Duel",
    tag: "Ranked",
    host: "Gamer01",
    rank: "Emerald 3 (Lv. 245)",
    winRate: "68% (45W 31L)",
    stake: "15,000P",
    mode: "1 : 1",
    format: "Solo",
    players: "1 / 2",
    status: "Recruiting",
  },
  {
    id: "20240525-002",
    game: "LEAGUE OF LEGENDS",
    title: "5v5 Team Ranked",
    tag: "Team",
    host: "ProGamer",
    rank: "Diamond 1 (75 LP)",
    winRate: "54% (64W 54L)",
    stake: "50,000P",
    mode: "5 : 5",
    format: "Team",
    players: "3 / 10",
    status: "Waiting",
  },
  {
    id: "20240525-003",
    game: "PUBG BATTLEGROUNDS",
    title: "Squad Battle!",
    tag: "Squad",
    host: "ProGamer",
    rank: "Platinum 1 (Lv. 62)",
    winRate: "62% (128W 83L)",
    stake: "20,000P",
    mode: "4 : 4",
    format: "Squad",
    players: "4 / 4",
    status: "In Progress",
  },
  {
    id: "20240525-004",
    game: "TEKKEN 8",
    title: "Ranked Match Gathering",
    tag: "1v1",
    host: "TekkenMaster",
    rank: "Rage (Lv. 28)",
    winRate: "71% (25W 20L)",
    stake: "30,000P",
    mode: "1 : 1",
    format: "Solo",
    players: "1 / 2",
    status: "Recruiting",
  },
  {
    id: "20240525-005",
    game: "STARCRAFT II",
    title: "StarCraft II High Ladder",
    tag: "Solo",
    host: "ProGamer",
    rank: "Master 1 (MMR 5421)",
    winRate: "60% (90W 18L)",
    stake: "15,000P",
    mode: "1 : 1",
    format: "Solo",
    players: "1 / 2",
    status: "Finished",
  },
  {
    id: "20240525-006",
    game: "TEKKEN 8",
    title: "Ranked Match Gathering",
    tag: "1v1",
    host: "ProGamer",
    rank: "Rage (Lv. 28)",
    winRate: "71% (25W 20L)",
    stake: "15,000P",
    mode: "1 : 1",
    format: "Solo",
    players: "1 / 2",
    status: "Recruiting",
  },
];

export const registrationGames = [
  "League of Legends",
  "PUBG Battlegrounds",
  "Valorant",
  "Overwatch 2",
  "Sudden Attack",
  "FIFA Online 4",
  "Lost Ark",
  "Dungeon & Fighter",
  "MapleStory",
  "Other Games",
];
