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
    title: 'Nordheim Residence',
    type: 'RESIDENTIAL',
    category: 'Interior',
    location: 'OSLO, NORWAY',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=900&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=900&fit=crop',
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
    title: 'The Lund Pavilion',
    type: 'CULTURAL',
    category: 'Apartment',
    location: 'LUND, SWEDEN',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=900&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=900&fit=crop',
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
    title: 'Aalto Commercial Tower',
    type: 'COMMERCIAL',
    category: 'Office',
    location: 'HELSINKI, FINLAND',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=900&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=1200&h=900&fit=crop',
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
    title: 'Bergman Cultural Centre',
    type: 'CULTURAL',
    category: 'Garden',
    location: 'COPENHAGEN, DENMARK',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=900&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=1200&h=900&fit=crop',
      'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1200&h=900&fit=crop',
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
