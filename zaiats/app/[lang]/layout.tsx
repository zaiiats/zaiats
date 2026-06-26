import Frame from "@/components/containers/Frame";
import MainContent from "@/components/containers/MainContent";
import { SUPPORTED_LANGUAGES } from "@/constants";
import { ReactNode } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    return null;
  }

  console.log("ПОТОЧНА МОВА:", lang);

  return (
    <div className="w-full">
      <Frame />
      <MainContent>{children}</MainContent>
    </div>
  );
}
