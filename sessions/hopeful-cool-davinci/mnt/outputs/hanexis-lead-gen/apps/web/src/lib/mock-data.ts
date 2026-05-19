export const mockKpis = {
  leads: 1247,
  messagesSent: 3892,
  replies: 612,
  conversions: 84,
  replyRate: 15.7,
  conversionRate: 6.7,
};

export const mockLeads = [
  { id: "1", fullName: "Sarah Chen", email: "sarah@acme.com", company: "Acme Corp", title: "VP Marketing", platform: "LINKEDIN", status: "NEW", tags: ["SaaS", "B2B"], score: 87, updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: "2", fullName: "Marcus Johnson", email: "marcus@loop.io", company: "Loop Studios", title: "CTO", platform: "LINKEDIN", status: "CONTACTED", tags: ["Tech"], score: 72, updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: "3", fullName: "Priya Patel", email: "priya@northstar.health", company: "Northstar Health", title: "Head of Growth", platform: "INSTAGRAM", status: "REPLIED", tags: ["Healthcare"], score: 91, updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: "4", fullName: "Diego Alvarez", email: "diego@vela.co", company: "Vela Logistics", title: "CEO", platform: "LINKEDIN", status: "QUALIFIED", tags: ["Logistics"], score: 95, updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
  { id: "5", fullName: "Hana Yamamoto", email: "hana@studio-mori.jp", company: "Studio Mori", title: "Creative Director", platform: "INSTAGRAM", status: "CONVERTED", tags: ["Design"], score: 98, updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: "6", fullName: "Liam O'Brien", email: "liam@crestpath.io", company: "Crestpath", title: "Head of Sales", platform: "LINKEDIN", status: "NEW", tags: ["FinTech"], score: 68, updatedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
  { id: "7", fullName: "Nadia Karimov", email: "nadia@meridian.eu", company: "Meridian EU", title: "VP Product", platform: "LINKEDIN", status: "CONTACTED", tags: ["SaaS"], score: 81, updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() },
  { id: "8", fullName: "Tomás Ribeiro", email: "tomas@fluxo.br", company: "Fluxo", title: "Founder", platform: "INSTAGRAM", status: "REPLIED", tags: ["Agency"], score: 76, updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() },
];

export const mockTimeseries = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  return {
    date: d.toISOString().split("T")[0],
    leads: Math.floor(20 + Math.random() * 60 + i * 1.5),
    messages: Math.floor(40 + Math.random() * 100 + i * 2),
    replies: Math.floor(5 + Math.random() * 20 + i * 0.5),
  };
});

export const mockFunnel = [
  { status: "NEW", count: 1247, color: "#a1a1aa" },
  { status: "CONTACTED", count: 892, color: "#71717a" },
  { status: "REPLIED", count: 612, color: "#52525b" },
  { status: "QUALIFIED", count: 234, color: "#f5a623" },
  { status: "CONVERTED", count: 84, color: "#d98c0a" },
];

export const mockPlatformBreakdown = [
  { platform: "LINKEDIN", count: 842, color: "#0a66c2" },
  { platform: "INSTAGRAM", count: 405, color: "#e1306c" },
];

export const mockMessages = [
  { id: "m1", leadName: "Sarah Chen", kind: "CONNECTION", status: "PENDING_APPROVAL", body: "Hi Sarah — saw your post on Acme's new launch strategy. The way you tied positioning to retention metrics really stood out. Curious how you're thinking about Q3?", createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: "m2", leadName: "Marcus Johnson", kind: "FOLLOW_UP", status: "APPROVED", body: "Marcus, following up on my note last week about Loop's deployment pipeline. Happy to share the case study from a similar team if useful.", createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: "m3", leadName: "Priya Patel", kind: "SALES_PITCH", status: "SENT", body: "Priya — given Northstar's growth this year, a 15-min walkthrough of how teams like yours cut outreach time by 40% might be worth it. Open this Thursday?", createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
];

export const mockContent = [
  { id: "c1", kind: "POST", title: "5 lessons from scaling outbound to 10k leads/mo", status: "DRAFT", platform: "LINKEDIN", scheduledAt: null, updatedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
  { id: "c2", kind: "VIDEO_SCRIPT", title: "Why personalization > automation", status: "APPROVED", platform: "LINKEDIN", scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString(), updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() },
  { id: "c3", kind: "POST", title: "Case study: How Hana Yamamoto closed 12 retainers in 60 days", status: "SCHEDULED", platform: "INSTAGRAM", scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: "c4", kind: "JOB_POST", title: "Hiring: Growth Marketer", status: "PUBLISHED", platform: "LINKEDIN", scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() },
];

export const mockConversations = [
  { id: "cv1", leadName: "Priya Patel", company: "Northstar Health", platform: "INSTAGRAM", lastMessage: "Thanks for the context — could we hop on a quick call Thursday?", unread: 2, lastMessageAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: "cv2", leadName: "Marcus Johnson", company: "Loop Studios", platform: "LINKEDIN", lastMessage: "Interesting. Send the case study and I'll review.", unread: 0, lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: "cv3", leadName: "Tomás Ribeiro", company: "Fluxo", platform: "INSTAGRAM", lastMessage: "Hey! Not the right time but check back in Q3.", unread: 0, lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() },
  { id: "cv4", leadName: "Sarah Chen", company: "Acme Corp", platform: "LINKEDIN", lastMessage: "Curious — what's your typical client tenure?", unread: 1, lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString() },
];

export const mockActivities = [
  { id: "a1", type: "MESSAGE_REPLIED", text: "Priya Patel replied to your follow-up", time: "5m ago" },
  { id: "a2", type: "LEAD_CREATED", text: "12 new leads imported from LinkedIn", time: "1h ago" },
  { id: "a3", type: "CONTENT_PUBLISHED", text: "Post 'Hiring: Growth Marketer' went live", time: "3h ago" },
  { id: "a4", type: "CAMPAIGN_STARTED", text: "Campaign 'Q2 SaaS Outreach' is now active", time: "5h ago" },
  { id: "a5", type: "MESSAGE_SENT", text: "AI sent 47 follow-ups overnight", time: "9h ago" },
];
