import { ProjectsList } from "@/components/molecules/ProjectsList";
import { getProjects } from "@/lib/projects-api";

export default async function ProjectsPage() {
  const items = await getProjects();
  return <ProjectsList items={items} />;
}