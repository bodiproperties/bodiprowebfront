// BodiHR-аас ирж, /api/careers route-оор цэвэрлэгдсэн зарын хэлбэр.
// Route handler болон client component хоёулаа энэ type-ийг ашиглана.

export interface CareerJob {
  id: string;
  title: string;
  company: string;
  location: string;
  direction: string;
  profession: string;
  salary: string;
  schedule: string;
  deadline: string | null;
  createdAt: string;
  responsibilitiesHtml: string;
  requirementsHtml: string;
  additionalInfoHtml: string;
  applyUrl: string;
}

export interface CareersResponse {
  jobs: CareerJob[];
  error?: string;
}