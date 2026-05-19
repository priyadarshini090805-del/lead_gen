// Shared types between web and api
export type LeadStatus = "NEW" | "CONTACTED" | "REPLIED" | "QUALIFIED" | "CONVERTED" | "LOST";
export type Platform = "LINKEDIN" | "INSTAGRAM";
export type MessageKind = "CONNECTION" | "FOLLOW_UP" | "SALES_PITCH";
export type ContentKind = "POST" | "POSTER" | "VIDEO_SCRIPT" | "JOB_POST";
export type UserRole = "ADMIN" | "MANAGER" | "AGENT";

export interface Lead {
  id: string;
  fullName: string;
  email?: string;
  company?: string;
  title?: string;
  platform: Platform;
  profileUrl?: string;
  tags: string[];
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AIMessageRequest {
  leadId: string;
  kind: MessageKind;
  tone?: "PROFESSIONAL" | "CASUAL" | "FRIENDLY";
  context?: string;
}

export interface AIMessageResponse {
  message: string;
  tokensUsed: number;
  model: string;
}

export interface DashboardKpis {
  leads: number;
  messagesSent: number;
  replies: number;
  conversions: number;
  replyRate: number;
  conversionRate: number;
}
