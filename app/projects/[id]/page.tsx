import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/projects-api";
import { ProjectDetailPanel } from "@/components/molecules/ProjectDetailPanel";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const [item, list] = await Promise.all([getProject(id), getProjects()]);
  if (!item) notFound();

  // "Дараагийн төсөл"-ийг client талд сонгосон хэлээр нь шүүж олно
  return <ProjectDetailPanel item={item} list={list} />;
}