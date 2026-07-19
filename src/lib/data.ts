// Temporary in-memory data so public pages can be built and previewed
// before the MongoDB models + API routes exist. Shape mirrors the
// Mongoose schemas in the implementation plan (Artist, Artwork,
// OutreachPost, Event) so swapping this for real `fetch`/DB calls
// later is a drop-in replacement.

import { SAMPLE_IMAGES_FOR_ARTIST, SAMPLE_IMAGES_FOR_GALERY } from "@/constants/mockData";

export type Artist = {
  slug: string;
  name: string;
  artStyle: string;
  medium: string;
  bio: string;
  palette: PigmentKey;
  social: { instagram?: string; facebook?: string; website?: string };
  /** Path to a background-removed portrait PNG, e.g. "/images/artists/mira-santos.png".
   *  Produced by `npm run images:process`. Falls back to AbstractArt if unset
   *  or the file doesn't exist yet. */
  portraitSrc: string;
};

export type ArtworkStatus = "Available" | "Reserved" | "Sold" | "Not for Sale";

export type Artwork = {
  id: string;
  slug: string;

  title: string;
  artistSlug: string;

  imageUrl: string;

  medium: string;
  category: string;
  tags: string[];

  description: string;

  year: string;
  dimensions?: string;

  palette: PigmentKey;

  status: ArtworkStatus;
  price?: number;
  currency?: string;

  isFeatured?: boolean;

  createdAt: string;
  updatedAt?: string;
};

export type OutreachPost = {
  slug: string;
  title: string;
  type: "Outreach" | "Workshop" | "Exhibition" | "Donation" | "Community";
  date: string;
  excerpt: string;
  body: string[];
  palette: PigmentKey;
};

export type Event = {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: "Upcoming" | "Past";
  palette: PigmentKey;
};

export type PigmentKey = "coral" | "ochre" | "teal" | "violet";

export const pigments: Record<PigmentKey, string> = {
  coral: "var(--coral)",
  ochre: "var(--ochre)",
  teal: "var(--teal)",
  violet: "var(--violet)",
};

export const artists: Artist[] = [
  {
    slug: "mira-santos",
    name: "Mira Santos",
    artStyle: "Figurative Expressionism",
    medium: "Oil on canvas",
    bio: "Mira builds portraits in loose, weather-worn brushwork, drawn to the faces of market vendors and jeepney drivers around Batangas. She joined Chroma Garcia in 2021 and now co-leads the weekend youth workshops.",
    palette: "coral",
    portraitSrc: SAMPLE_IMAGES_FOR_ARTIST[0],
    social: { instagram: "#", website: "#" },
  },
  {
    slug: "elias-cruz",
    name: "Elias Cruz",
    artStyle: "Geometric Abstraction",
    medium: "Acrylic, mixed media",
    bio: "Elias translates city skylines into interlocking planes of color. His outreach murals now cover three barangay basketball courts in Batangas.",
    palette: "ochre",
    portraitSrc: SAMPLE_IMAGES_FOR_ARTIST[1],
    social: { instagram: "#", facebook: "#" },
  },
  {
    slug: "dahlia-reyes",
    name: "Dahlia Reyes",
    artStyle: "Botanical Realism",
    medium: "Watercolor",
    bio: "Dahlia paints native Philippine flora in fine, patient detail, and runs the group's plant-dye workshops for the tree-planting outreach program.",
    palette: "teal",
    portraitSrc: SAMPLE_IMAGES_FOR_ARTIST[2],
    social: { website: "#" },
  },
  {
    slug: "noel-garcia",
    name: "Noel Garcia",
    artStyle: "Surrealist Ink",
    medium: "Ink and gouache",
    bio: "Noel is one of the group's founding members. His dreamlike ink pieces have anchored every Chroma Garcia charity auction since 2019.",
    palette: "violet",
    portraitSrc: SAMPLE_IMAGES_FOR_ARTIST[3],
    social: { instagram: "#", facebook: "#", website: "#" },
},
];

export const artworks: Artwork[] = [
  {
    id: "aw-01",
    slug: "vendor-at-dusk",
    title: "Vendor at Dusk",
    artistSlug: "mira-santos",
    imageUrl: SAMPLE_IMAGES_FOR_GALERY[0],
    medium: "Oil on Canvas",
    category: "Portrait",
    tags: ["portrait", "market", "batangas"],
    description:
      "A portrait celebrating the resilience and warmth of local market vendors at sunset.",
    year: "2024",
    dimensions: "24 × 36 in",
    palette: "coral",
    status: "Available",
    price: 45000,
    currency: "PHP",
    isFeatured: true,
    createdAt: "2024-03-12T08:00:00.000Z",
  },
  {
    id: "aw-02",
    slug: "jeepney-hour",
    title: "Jeepney Hour",
    artistSlug: "mira-santos",
    imageUrl: SAMPLE_IMAGES_FOR_GALERY[1],
    medium: "Oil on Canvas",
    category: "Portrait",
    tags: ["jeepney", "urban", "portrait"],
    description:
      "Capturing the familiar rhythm of commuters during the evening rush.",
    year: "2023",
    dimensions: "20 × 30 in",
    palette: "coral",
    status: "Sold",
    price: 38000,
    currency: "PHP",
    createdAt: "2023-10-18T10:00:00.000Z",
  },
  {
    id: "aw-03",
    slug: "tondo-grid-i",
    title: "Tondo Grid I",
    artistSlug: "elias-cruz",
    imageUrl: SAMPLE_IMAGES_FOR_GALERY[2],
    medium: "Acrylic",
    category: "Abstract",
    tags: ["abstract", "geometry", "city"],
    description:
      "A geometric abstraction inspired by the layered patterns of urban neighborhoods.",
    year: "2024",
    dimensions: "30 × 30 in",
    palette: "ochre",
    status: "Reserved",
    price: 32000,
    currency: "PHP",
    isFeatured: true,
    createdAt: "2024-01-28T09:00:00.000Z",
  },
  {
    id: "aw-04",
    slug: "rooftop-interval",
    title: "Rooftop Interval",
    artistSlug: "elias-cruz",
    imageUrl: SAMPLE_IMAGES_FOR_GALERY[3],
    medium: "Mixed Media",
    category: "Abstract",
    tags: ["mixed media", "cityscape"],
    description:
      "Layered textures reflecting the rooftops and intersections of Batangas City.",
    year: "2022",
    dimensions: "24 × 24 in",
    palette: "ochre",
    status: "Not for Sale",
    currency: "PHP",
    createdAt: "2022-07-14T13:00:00.000Z",
  },
  {
    id: "aw-05",
    slug: "sampaguita-study",
    title: "Sampaguita Study",
    artistSlug: "dahlia-reyes",
    imageUrl: SAMPLE_IMAGES_FOR_GALERY[4],
    medium: "Watercolor",
    category: "Botanical",
    tags: ["flowers", "botanical", "watercolor"],
    description:
      "A delicate watercolor study of the Philippine national flower.",
    year: "2024",
    dimensions: "16 × 20 in",
    palette: "teal",
    status: "Available",
    price: 18000,
    currency: "PHP",
    createdAt: "2024-05-02T11:00:00.000Z",
  },
  {
    id: "aw-06",
    slug: "banaba-in-bloom",
    title: "Banaba in Bloom",
    artistSlug: "dahlia-reyes",
    imageUrl: SAMPLE_IMAGES_FOR_GALERY[5],
    medium: "Watercolor",
    category: "Botanical",
    tags: ["trees", "nature", "watercolor"],
    description:
      "A vibrant botanical illustration showcasing the Banaba tree in full bloom.",
    year: "2023",
    dimensions: "18 × 24 in",
    palette: "teal",
    status: "Sold",
    price: 22000,
    currency: "PHP",
    createdAt: "2023-09-08T15:00:00.000Z",
  },
  {
    id: "aw-07",
    slug: "the-long-sleep",
    title: "The Long Sleep",
    artistSlug: "noel-garcia",
    imageUrl: SAMPLE_IMAGES_FOR_GALERY[6],
    medium: "Ink and Gouache",
    category: "Surrealist",
    tags: ["surreal", "ink", "dream"],
    description: "A surreal composition exploring memory, dreams, and silence.",
    year: "2021",
    dimensions: "22 × 30 in",
    palette: "violet",
    status: "Not for Sale",
    currency: "PHP",
    isFeatured: true,
    createdAt: "2021-11-03T08:30:00.000Z",
  },
  {
    id: "aw-08",
    slug: "auction-piece-no-5",
    title: "Auction Piece No. 5",
    artistSlug: "noel-garcia",
    imageUrl: SAMPLE_IMAGES_FOR_GALERY[7],
    medium: "Ink",
    category: "Surrealist",
    tags: ["charity", "auction", "ink"],
    description:
      "Created exclusively for the annual Chroma Garcia charity auction.",
    year: "2024",
    dimensions: "20 × 28 in",
    palette: "violet",
    status: "Available",
    price: 38000,
    currency: "PHP",
    createdAt: "2024-08-10T14:00:00.000Z",
  },
];

export const outreachPosts: OutreachPost[] = [
  {
    slug: "barangay-mural-project",
    title: "Three Courts, Three Murals: The Barangay Mural Project Wraps",
    type: "Community",
    date: "2026-06-14",
    excerpt:
      "Elias Cruz and eight volunteers finished the final basketball-court mural in Barangay Hulo this month, closing out a project that started in January.",
    body: [
      "What began as a single wall in January turned into a three-court circuit across Batangas, painted almost entirely by volunteer members and neighborhood teenagers.",
      "Materials were funded by the proceeds of last year's charity auction, and each mural now doubles as a shaded gathering spot during the day.",
    ],
    palette: "ochre",
  },
  {
    slug: "watercolor-workshop-series",
    title: "Free Watercolor Workshops Return This August",
    type: "Workshop",
    date: "2026-07-02",
    excerpt:
      "Dahlia Reyes is running four Saturday sessions on plant-based pigment and watercolor basics, open to anyone aged 12 and up.",
    body: [
      "Each session covers a different stage: gathering and preparing natural dye material, mixing washes, wet-on-wet technique, and a final guided botanical study.",
      "Materials are provided. Sign-ups open two weeks before each session through the Contact page.",
    ],
    palette: "teal",
  },
  {
    slug: "annual-charity-auction-recap",
    title: "2025 Charity Auction Raised ₱480,000 for Local Scholarships",
    type: "Donation",
    date: "2025-12-10",
    excerpt:
      "Forty pieces went under the hammer this year, with every peso routed directly to art-supply scholarships for public high school students.",
    body: [
      "Noel Garcia's ink series led the night, and three new patrons joined the group's ongoing supporter circle.",
      "Scholarship recipients will be announced alongside the group's second-quarter update.",
    ],
    palette: "violet",
  },
  {
    slug: "spring-group-exhibit",
    title: "Spring Group Exhibit: 'Palette of the City'",
    type: "Exhibition",
    date: "2026-03-22",
    excerpt:
      "All four core members showed new work exploring how Batangas's color changes block by block.",
    body: [
      "The exhibit ran for two weeks at a partner gallery space and drew the group's largest opening-night crowd yet.",
      "A short catalog of the exhibited pieces is available on request.",
    ],
    palette: "coral",
  },
];

export const events: Event[] = [
  {
    slug: "painting-workshop-august",
    title: "Painting Workshop: Watercolor Basics",
    date: "2026-08-08",
    time: "9:00 AM – 12:00 PM",
    location: "Chroma Garcia Studio, Batangas",
    description:
      "A hands-on session for beginners covering pigment, water ratio, and wet-on-wet technique. Led by Dahlia Reyes.",
    status: "Upcoming",
    palette: "teal",
  },
  {
    slug: "tree-planting-day",
    title: "Community Tree Planting Day",
    date: "2026-08-22",
    time: "6:30 AM – 10:00 AM",
    location: "La Mesa Watershed",
    description:
      "Partnering with a local environmental group to plant native species. Sketchbooks welcome.",
    status: "Upcoming",
    palette: "teal",
  },
  {
    slug: "charity-auction-2026",
    title: "Charity Auction 2026",
    date: "2026-11-14",
    time: "6:00 PM – 9:00 PM",
    location: "Partner Gallery, Makati",
    description:
      "The group's biggest fundraiser of the year, benefiting the art-supply scholarship fund.",
    status: "Upcoming",
    palette: "violet",
  },
  {
    slug: "art-exhibit-spring-2026",
    title: "Palette of the City — Group Exhibit",
    date: "2026-03-22",
    time: "All day",
    location: "Partner Gallery Space",
    description: "A two-week group show exploring color across Batangas.",
    status: "Past",
    palette: "coral",
  },
];

export const officers = [
  {
    name: "Noel Garcia",
    role: "Founder & President",
    palette: "violet" as PigmentKey,
  },
  {
    name: "Mira Santos",
    role: "Vice President, Outreach",
    palette: "coral" as PigmentKey,
  },
  {
    name: "Elias Cruz",
    role: "Head of Community Projects",
    palette: "ochre" as PigmentKey,
  },
  {
    name: "Dahlia Reyes",
    role: "Workshop Director",
    palette: "teal" as PigmentKey,
  },
];

export const partners = [
  "Batangas Youth Arts Council",
  "Green Metro Initiative",
  "Partner Gallery Makati",
  "La Mesa Watershed Foundation",
];

export function getArtist(slug: string) {
  return artists.find((a) => a.slug === slug);
}
export function getArtworksByArtist(slug: string) {
  return artworks.filter((a) => a.artistSlug === slug);
}
export function getOutreachPost(slug: string) {
  return outreachPosts.find((p) => p.slug === slug);
}
export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}
