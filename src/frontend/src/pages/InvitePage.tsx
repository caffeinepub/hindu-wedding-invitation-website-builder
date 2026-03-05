import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import type { InviteRecord } from "../backend";
import InviteMetaTags from "../components/invitation/InviteMetaTags";
import { useGetInvite } from "../hooks/useQueries";
import { TemplateComponents } from "../lib/templateRegistry";

function TemplateRenderer({ invite }: { invite: InviteRecord }) {
  const loader =
    TemplateComponents[invite.templateId] ??
    TemplateComponents["royal-rajasthani"];
  const TemplateComponent = lazy(loader);
  const variant = (invite.themeVariant === "dark" ? "dark" : "light") as
    | "light"
    | "dark";

  return (
    <Suspense fallback={<InviteLoadingSkeleton />}>
      <TemplateComponent invite={invite} variant={variant} />
    </Suspense>
  );
}

function InviteLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-deepMaroon flex flex-col items-center justify-center gap-6 p-8">
      <div className="text-4xl animate-pulse">🪷</div>
      <Skeleton className="h-12 w-64 bg-white/10 rounded-xl" />
      <Skeleton className="h-6 w-48 bg-white/5 rounded-lg" />
      <div className="flex gap-4 mt-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="w-16 h-16 bg-white/10 rounded-xl" />
        ))}
      </div>
      <p className="text-ivory/30 font-garamond text-sm mt-2 animate-pulse">
        Loading your invitation…
      </p>
    </div>
  );
}

export default function InvitePage() {
  const { id } = useParams({ from: "/invite/$id" });
  const { data: invite, isLoading, error } = useGetInvite(id);

  if (isLoading) {
    return <InviteLoadingSkeleton />;
  }

  if (error || !invite) {
    return (
      <div className="min-h-screen bg-deepMaroon flex flex-col items-center justify-center text-center px-6">
        <div className="text-6xl mb-6">🪷</div>
        <h1 className="text-3xl font-cormorant font-bold text-gold mb-3">
          Invitation Not Found
        </h1>
        <p className="font-garamond text-ivory/60 mb-8">
          This invitation may have been removed or the link is incorrect.
        </p>
        <a
          href="/"
          className="px-8 py-3 rounded-full font-cormorant font-semibold text-deepMaroon transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #D4AF37, #F4A832)" }}
        >
          Create Your Own Invitation
        </a>
      </div>
    );
  }

  return (
    <>
      <InviteMetaTags invite={invite} />
      <TemplateRenderer invite={invite} />
    </>
  );
}
