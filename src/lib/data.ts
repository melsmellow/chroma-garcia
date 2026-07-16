// Temporary in-memory data so public pages can be built and previewed
// before the MongoDB models + API routes exist. Shape mirrors the
// Mongoose schemas in the implementation plan (Artist, Artwork,
// OutreachPost, Event) so swapping this for real `fetch`/DB calls
// later is a drop-in replacement.

export type Artist = {
  slug: string;
  name: string;
  artStyle: string;
  medium: string;
  bio: string;
  palette: PigmentKey;
  social: { instagram?: string; facebook?: string; website?: string };
};

export type Artwork = {
  id: string;
  title: string;
  artistSlug: string;
  medium: string;
  category: string;
  year: string;
  palette: PigmentKey;
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
    bio: "Mira builds portraits in loose, weather-worn brushwork, drawn to the faces of market vendors and jeepney drivers around Taguig. She joined Chroma Garcia in 2021 and now co-leads the weekend youth workshops.",
    palette: "coral",
    social: { instagram: "#", website: "#" },
  },
  {
    slug: "elias-cruz",
    name: "Elias Cruz",
    artStyle: "Geometric Abstraction",
    medium: "Acrylic, mixed media",
    bio: "Elias translates city skylines into interlocking planes of color. His outreach murals now cover three barangay basketball courts in Metro Manila.",
    palette: "ochre",
    social: { instagram: "#", facebook: "#" },
  },
  {
    slug: "dahlia-reyes",
    name: "Dahlia Reyes",
    artStyle: "Botanical Realism",
    medium: "Watercolor",
    bio: "Dahlia paints native Philippine flora in fine, patient detail, and runs the group's plant-dye workshops for the tree-planting outreach program.",
    palette: "teal",
    social: { website: "#" },
  },
  {
    slug: "noel-garcia",
    name: "Noel Garcia",
    artStyle: "Surrealist Ink",
    medium: "Ink and gouache",
    bio: "Noel is one of the group's founding members. His dreamlike ink pieces have anchored every Chroma Garcia charity auction since 2019.",
    palette: "violet",
    social: { instagram: "#", facebook: "#", website: "#" },
  },
];

export const artworks: Artwork[] = [
  { id: "aw-01", title: "Vendor at Dusk", artistSlug: "mira-santos", medium: "Oil on canvas", category: "Portrait", year: "2024", palette: "coral" },
  { id: "aw-02", title: "Jeepney Hour", artistSlug: "mira-santos", medium: "Oil on canvas", category: "Portrait", year: "2023", palette: "coral" },
  { id: "aw-03", title: "Tondo Grid I", artistSlug: "elias-cruz", medium: "Acrylic", category: "Abstract", year: "2024", palette: "ochre" },
  { id: "aw-04", title: "Rooftop Interval", artistSlug: "elias-cruz", medium: "Mixed media", category: "Abstract", year: "2022", palette: "ochre" },
  { id: "aw-05", title: "Sampaguita Study", artistSlug: "dahlia-reyes", medium: "Watercolor", category: "Botanical", year: "2024", palette: "teal" },
  { id: "aw-06", title: "Banaba in Bloom", artistSlug: "dahlia-reyes", medium: "Watercolor", category: "Botanical", year: "2023", palette: "teal" },
  { id: "aw-07", title: "The Long Sleep", artistSlug: "noel-garcia", medium: "Ink and gouache", category: "Surrealist", year: "2021", palette: "violet" },
  { id: "aw-08", title: "Auction Piece No. 5", artistSlug: "noel-garcia", medium: "Ink", category: "Surrealist", year: "2024", palette: "violet" },
];

export const outreachPosts: OutreachPost[] = [
  {
    slug: "barangay-mural-project",
    title: "Three Courts, Three Murals: The Barangay Mural Project Wraps",
    type: "Community",
    date: "2026-06-14",
    excerpt: "Elias Cruz and eight volunteers finished the final basketball-court mural in Barangay Hulo this month, closing out a project that started in January.",
    body: [
      "What began as a single wall in January turned into a three-court circuit across Metro Manila, painted almost entirely by volunteer members and neighborhood teenagers.",
      "Materials were funded by the proceeds of last year's charity auction, and each mural now doubles as a shaded gathering spot during the day.",
    ],
    palette: "ochre",
  },
  {
    slug: "watercolor-workshop-series",
    title: "Free Watercolor Workshops Return This August",
    type: "Workshop",
    date: "2026-07-02",
    excerpt: "Dahlia Reyes is running four Saturday sessions on plant-based pigment and watercolor basics, open to anyone aged 12 and up.",
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
    excerpt: "Forty pieces went under the hammer this year, with every peso routed directly to art-supply scholarships for public high school students.",
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
    excerpt: "All four core members showed new work exploring how Metro Manila's color changes block by block.",
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
    location: "Chroma Garcia Studio, Taguig",
    description: "A hands-on session for beginners covering pigment, water ratio, and wet-on-wet technique. Led by Dahlia Reyes.",
    status: "Upcoming",
    palette: "teal",
  },
  {
    slug: "tree-planting-day",
    title: "Community Tree Planting Day",
    date: "2026-08-22",
    time: "6:30 AM – 10:00 AM",
    location: "La Mesa Watershed",
    description: "Partnering with a local environmental group to plant native species. Sketchbooks welcome.",
    status: "Upcoming",
    palette: "teal",
  },
  {
    slug: "charity-auction-2026",
    title: "Charity Auction 2026",
    date: "2026-11-14",
    time: "6:00 PM – 9:00 PM",
    location: "Partner Gallery, Makati",
    description: "The group's biggest fundraiser of the year, benefiting the art-supply scholarship fund.",
    status: "Upcoming",
    palette: "violet",
  },
  {
    slug: "art-exhibit-spring-2026",
    title: "Palette of the City — Group Exhibit",
    date: "2026-03-22",
    time: "All day",
    location: "Partner Gallery Space",
    description: "A two-week group show exploring color across Metro Manila.",
    status: "Past",
    palette: "coral",
  },
];

export const officers = [
  { name: "Noel Garcia", role: "Founder & President", palette: "violet" as PigmentKey },
  { name: "Mira Santos", role: "Vice President, Outreach", palette: "coral" as PigmentKey },
  { name: "Elias Cruz", role: "Head of Community Projects", palette: "ochre" as PigmentKey },
  { name: "Dahlia Reyes", role: "Workshop Director", palette: "teal" as PigmentKey },
];

export const partners = [
  "Taguig Youth Arts Council",
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
