export interface ProjectDetail {
  client: string
  area: string
  status: string
  services: string[]
}

export interface Project {
  id: number
  title: string
  type: string
  category: string
  location: string
  year: string
  image: string
  gallery: string[]
  description: string
  longDescription: string
  detail: ProjectDetail
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'National Central Park',
    type: 'RESIDENTIAL',
    category: 'Interior',
    location: 'ULAANBAATAR, MONGOLIA',
    year: '2024',
    image: '/images/projects/parkscreen.jpg',
    gallery: [
      '/images/projects/park1.jpg',
      '/images/projects/park2.jpg',
      '/images/projects/park3.jpg',
      '/images/projects/park4.jpg',
      '/images/projects/park5.jpg',
    ],
    description:
      'A private residence set into a forested hillside outside Oslo, framing views of the valley through cantilevered volumes.',
    longDescription:
      'A private residence set into a forested hillside outside Oslo. The structure responds to the dramatic topography through a series of cantilevered volumes that frame views of the valley below. Raw concrete, oak, and expansive glazing define an interior of quiet complexity. Each room is oriented to capture a specific quality of northern light, while a central hearth anchors the open living spaces around a single sculptural mass.',
    detail: {
      client: 'Private',
      area: '420 m²',
      status: 'Completed',
      services: ['Architecture', 'Interior', 'Landscape'],
    },
  },
  {
    id: 2,
    title: 'Embassy Residence',
    type: 'CULTURAL',
    category: 'Apartment',
    location: 'ULAANBAATAR, MONGOLIA',
    year: '2023',
    image: '/images/projects/embascreen.jpg',
    gallery: [
      '/images/projects/emba1.jpg',
      '/images/projects/emba2.jpg',
      '/images/projects/emba3.jpg',
      '/images/projects/emba4.jpg',
    ],
    description:
      'A public pavilion built from locally-sourced cross-laminated timber, blurring the line between landscape and architecture.',
    longDescription:
      'A public pavilion and event space for the city of Lund, constructed from locally-sourced cross-laminated timber. The pavilion functions as a covered outdoor room, blurring the boundary between landscape and architecture through its translucent polycarbonate roof. The structure can be fully opened to the surrounding park in summer and sealed against the elements in winter, allowing year-round civic use.',
    detail: {
      client: 'City of Lund',
      area: '680 m²',
      status: 'Completed',
      services: ['Architecture', 'Structure', 'Lighting'],
    },
  },
  {
    id: 3,
    title: 'National Cancer Center-2',
    type: 'COMMERCIAL',
    category: 'Office',
    location: 'ULAANBAATAR, MONGOLIA',
    year: '2023',
    image: '/images/projects/hav1.png',
    gallery: [
      '/images/projects/hav2.png',
      '/images/projects/hav3.png',
      '/images/projects/hav4.png',
      '/images/projects/hav5.png',
    ],
    description:
      'A mixed-use tower in central Helsinki whose stepped profile creates a series of public terraces above the harbour.',
    longDescription:
      "A mixed-use commercial tower in central Helsinki that challenges the city's traditional block structure. The tower's stepped profile creates a series of public terraces at multiple levels, offering views across the harbour and integrating the building into the urban fabric. A double-skin glass facade moderates the extreme Nordic climate while flooding the workspaces with daylight throughout the long winter months.",
    detail: {
      client: 'Aalto Group',
      area: '14,200 m²',
      status: 'Completed',
      services: ['Architecture', 'Urban Design', 'Facade'],
    },
  },
  {
    id: 4,
    title: 'Black Rock Resort',
    type: 'CULTURAL',
    category: 'Garden',
    location: 'HUVSGUL, MONGOLIA',
    year: '2022',
    image: '/images/projects/bscreen.png',
    gallery: [
      '/images/projects/b1.png',
      '/images/projects/b2.png',
      '/images/projects/b3.png',
    ],
    description:
      'A cinema, gallery, and rehearsal complex woven into a former industrial warehouse in Copenhagen.',
    longDescription:
      'Named in honour of the legendary filmmaker, the Bergman Cultural Centre houses cinema, gallery, and rehearsal spaces within a former industrial warehouse. The intervention preserves the raw character of the existing structure while weaving in new elements of light, warmth, and transparency. Original brickwork and steel trusses are left exposed, set against insertions of warm timber and brass that guide visitors through the building.',
    detail: {
      client: 'Bergman Foundation',
      area: '3,900 m²',
      status: 'Completed',
      services: ['Architecture', 'Adaptive Reuse', 'Acoustics'],
    },
  },
]
