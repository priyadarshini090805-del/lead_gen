import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  NEW: "chip-grey",
  CONTACTED: "chip-blue",
  REPLIED: "chip-purple",
  QUALIFIED: "chip-amber",
  CONVERTED: "chip-green",
  LOST: "chip-grey",
  DRAFT: "chip-grey",
  PENDING_APPROVAL: "chip-amber",
  APPROVED: "chip-blue",
  SCHEDULED: "chip-purple",
  SENT: "chip-green",
  PUBLISHED: "chip-green",
  FAILED: "chip-grey",
};

export function StatusChip({ status, className }: { status: string; className?: string }) {
  return <span className={cn(styles[status] ?? "chip-grey", className)}>{status.replace("_", " ").toLowerCase()}</span>;
}
