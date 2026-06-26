import ProjectClient from "@/components/standalone/ProjectClient";
import { getDictionary } from "@/localization/locales";

interface PageProps {
  params: Promise<{
    lang: string;
    projectName: string;
  }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { projectName } = await params;
  
  const dict = await getDictionary();

  return <ProjectClient dict={dict} projectName={projectName} />;
}