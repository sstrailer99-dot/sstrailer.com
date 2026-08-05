export type Product = {
  slug: string;
  title: string;
  short: string;
  desc: string;
  capacity: string;
  features: string[];
  image: string;
  gallery: string[];
};

export type Industry = {
  slug: string;
  title: string;
  short: string;
  desc: string;
  solutions: string[];
  image: string;
};

/** Client manufacturing range — products with shared photos */
export const products: Product[] = [
  {
    slug: "flat-bed-trailer",
    title: "Flatbed Trailer",
    short: "Multi-purpose flatbed trailers for steel, machinery and general cargo.",
    desc: "Flatbed trailers manufactured by SS Trailers in Dubai for everyday freight — steel, machinery, pallets and general cargo. Strong main beams and practical deck layouts for UAE logistics.",
    capacity: "General cargo flatbed",
    features: [
      "Reinforced main beams",
      "Practical deck layout",
      "Stake / twist lock options",
      "Durable paint systems",
    ],
    image: "/products/flat-bed-trailer.png",
    gallery: ["/products/flat-bed-trailer.png"],
  },
  {
    slug: "heavy-duty-trailer",
    title: "Heavy Duty Trailer",
    short: "Heavy-duty multi-axle trailers for oversized and industrial loads.",
    desc: "Heavy duty trailers manufactured by SS Trailers in Dubai for continuous construction and freight work. Reinforced decks, multi-axle running gear and durable finishing for UAE and GCC haulage.",
    capacity: "Multi-axle · Heavy duty",
    features: [
      "Heavy-duty running gear",
      "Reinforced deck for industrial loads",
      "Built for oversized cargo",
      "UAE road lighting & reflectors",
    ],
    image: "/products/heavy-duty-trailer.png",
    gallery: ["/products/heavy-duty-trailer.png"],
  },
  {
    slug: "side-body-trailer",
    title: "Side Body Trailer",
    short: "Side body / dropside trailers with rigid side panels.",
    desc: "Side body trailers manufactured by SS Trailers in Dubai with high rigid side walls for secure cargo containment. Panelled side bodies, matching rear tailgate and full safety lighting for general freight.",
    capacity: "Rigid side body",
    features: [
      "High rigid side body panels",
      "Matching rear tailgate",
      "Heavy-duty running gear",
      "Safety lighting & reflectors",
    ],
    image: "/products/side-body-trailer-photo.png",
    gallery: ["/products/side-body-trailer-photo.png"],
  },
  {
    slug: "sand-trailers",
    title: "Sand Trailer",
    short: "Sand trailers for desert and construction haulage.",
    desc: "Sand trailers manufactured by SS Trailers in Dubai for desert and construction haulage. Hopper and sand-ready builds with durable finishing for UAE site and road duty.",
    capacity: "Sand / bulk haulage",
    features: [
      "Built for sand and aggregates",
      "Durable body fabrication",
      "Desert-ready configuration",
      "Safety markings & lighting",
    ],
    image: "/products/sand-trailers.png",
    gallery: ["/products/sand-trailers.png", "/products/sand-trailer-photo.png"],
  },
  {
    slug: "a-frame-trailer",
    title: "A-Frame Trailer",
    short: "A-frame trailers for glass, stone and slab transport.",
    desc: "A-frame trailers manufactured by SS Trailers in Dubai for transporting glass sheets, stone slabs and flat panel materials. Tall A-frame structure and reinforced chassis for specialised loads.",
    capacity: "A-frame · Glass / slab",
    features: [
      "Tall A-frame structure",
      "Built for glass, stone and panels",
      "Reinforced chassis",
      "Safety lighting & reflectors",
    ],
    image: "/products/a-frame-trailer.png",
    gallery: ["/products/a-frame-trailer.png", "/products/a-frame-trailer-photo.png"],
  },
  {
    slug: "extendable-trailer",
    title: "Extendable Trailer",
    short: "Extendable trailers with telescopic deck for long cargo.",
    desc: "Extendable trailers manufactured by SS Trailers in Dubai for pipes, steel beams, poles and oversized loads. Telescopic chassis sections adjust deck length for UAE and GCC haulage.",
    capacity: "Variable length · Telescopic deck",
    features: [
      "Telescopic / extendable chassis",
      "Adjustable deck length",
      "Heavy-duty steel frame",
      "Solid front bulkhead options",
    ],
    image: "/products/extendable-trailer.png",
    gallery: [
      "/products/extendable-trailer.png",
      "/products/extendable-trailer-photo.png",
    ],
  },
  {
    slug: "low-bed-trailer",
    title: "Low Bed Trailer",
    short: "Low bed trailers for heavy machinery and oversized equipment.",
    desc: "Low bed trailers manufactured by SS Trailers in Dubai for excavators, generators and oversized machinery. Drop-deck design for lower loading height and multi-axle options.",
    capacity: "Low deck · Heavy machinery",
    features: [
      "Drop-deck / low bed platform",
      "Lower loading height",
      "Reinforced beams for heavy plant",
      "Multi-axle options available",
    ],
    image: "/products/low-bed-trailer-photo.png",
    gallery: ["/products/low-bed-trailer-photo.png"],
  },
  {
    slug: "box-trailer",
    title: "Box Trailer",
    short: "Weather-protected box trailers for secure freight.",
    desc: "Box trailers manufactured by SS Trailers in Dubai for secure, weather-protected freight. Solid cargo enclosure and durable finishing for logistics fleets across the UAE and GCC.",
    capacity: "Weather-protected freight",
    features: [
      "Fully enclosed cargo body",
      "Weather-protected sides",
      "Heavy-duty running gear",
      "Reflective safety markings",
    ],
    image: "/products/box-trailer.png",
    gallery: ["/products/box-trailer.png", "/products/box-trailer-photo.png"],
  },
  {
    slug: "curtain-trailer",
    title: "Side Curtain Trailer",
    short: "Side curtain trailers for fast loading and weather-protected freight.",
    desc: "Side curtain trailers manufactured by SS Trailers in Dubai for logistics fleets that need quick side access with weather protection. Tensioned curtain sides and reflective chassis markings for UAE road duty.",
    capacity: "Side curtain · Fast loading",
    features: [
      "Tensioned fabric side curtains",
      "Fast forklift side loading",
      "Weather-protected cargo area",
      "Reflective safety tape",
    ],
    image: "/products/side-curtain-trailer-photo.png",
    gallery: [
      "/products/side-curtain-trailer-photo.png",
      "/products/side-curtain-trailer.png",
    ],
  },
  {
    slug: "flexy-trailer",
    title: "Flexy Trailer",
    short: "Flexible multi-purpose chassis for adaptable freight programmes.",
    desc: "Flexy trailers manufactured by SS Trailers in Dubai for fleets that need adaptable chassis configurations. Practical platforms for mixed cargo across logistics and industrial routes.",
    capacity: "Multi-purpose · Flexible layout",
    features: [
      "Adaptable chassis layout",
      "Suitable for mixed freight",
      "Strong steel fabrication",
      "Custom options on request",
    ],
    image: "/products/flexy-trailer-photo.png",
    gallery: ["/products/flexy-trailer-photo.png"],
  },
  {
    slug: "connector-trailer",
    title: "Connector Trailer",
    short: "Converter dolly / connector units for linked haulage setups.",
    desc: "Connector trailers (converter dollies) manufactured by SS Trailers in Dubai for specialised tandem haulage. Engineered fifth-wheel and drawbar details for reliable connection between units.",
    capacity: "Connector · Linked haulage",
    features: [
      "Fifth-wheel coupling setup",
      "Drawbar / hitch connection",
      "Air and electrical couplings",
      "Heavy-duty chassis fabrication",
    ],
    image: "/products/connector-trailer-photo.png",
    gallery: ["/products/connector-trailer-photo.png"],
  },
  {
    slug: "diesel-tanker",
    title: "Tanker",
    short: "Fuel and liquid tankers for commercial distribution fleets.",
    desc: "Tankers manufactured by SS Trailers in Dubai for fuel and petroleum product transport. Fabricated tank bodies with safety railings, side protection and durable finishing for UAE and GCC fleets.",
    capacity: "Fuel / liquid transport",
    features: [
      "Cylindrical tank fabrication",
      "Top walkway / safety railing",
      "Side under-run protection",
      "Fleet paint & branding ready",
    ],
    image: "/products/diesel-tanker.png",
    gallery: ["/products/diesel-tanker.png", "/products/tanker-photo.png"],
  },
];

export const industries: Industry[] = [
  {
    slug: "transport-logistics",
    title: "Transport & Logistics",
    short: "Curtain, box, flatbed and flexy trailers for fleet operators.",
    desc: "We support transport and logistics companies with curtain, box, flatbed and flexy trailers built for high-utilisation fleets across Dubai and the GCC.",
    solutions: [
      "Side Curtain Trailer",
      "Box Trailer",
      "Flatbed Trailer",
      "Flexy Trailer",
    ],
    image: "/products/side-curtain-trailer-photo.png",
  },
  {
    slug: "construction",
    title: "Construction",
    short: "Sand, heavy-duty, low bed and flatbed builds for site materials.",
    desc: "Construction fleets rely on sand trailers, heavy-duty and low bed platforms for aggregates and equipment. We fabricate tough trailers for desert site conditions and daily loading cycles.",
    solutions: [
      "Sand Trailer",
      "Heavy Duty Trailer",
      "Low Bed Trailer",
      "Flatbed Trailer",
    ],
    image: "/images/construction.jpg",
  },
  {
    slug: "oil-gas",
    title: "Oil & Gas",
    short: "Tankers and specialised heavy trailer fabrication.",
    desc: "Oil and fuel operators need reliable tankers and heavy platforms. We manufacture tank trailers and robust multi-axle builds for industrial fleets.",
    solutions: ["Tanker", "Heavy Duty Trailer", "Extendable Trailer"],
    image: "/products/diesel-tanker.png",
  },
  {
    slug: "municipality-waste-management",
    title: "Municipality & Waste Management",
    short: "Durable trailers and bodies for municipal and waste operations.",
    desc: "Municipal and waste management fleets need robust platforms for collection, transfer and public works. We fabricate practical trailers and truck bodies for continuous duty across UAE cities and industrial zones.",
    solutions: [
      "Side Body Trailer",
      "Box Trailer",
      "Heavy Duty Trailer",
      "Flatbed Trailer",
    ],
    image: "/products/side-body-trailer-photo.png",
  },
  {
    slug: "process-storage-industry",
    title: "Process & Storage Industry",
    short: "Tankers and specialised trailers for process and storage sites.",
    desc: "Process plants and storage operators require reliable tankers and heavy platforms for bulk liquids and materials. We manufacture tankers and multi-axle builds suited to industrial site logistics.",
    solutions: ["Tanker", "Box Trailer", "Heavy Duty Trailer", "Flexy Trailer"],
    image: "/images/warehouse.jpg",
  },
  {
    slug: "special-equipment",
    title: "Special Equipment",
    short: "A-frame, extendable, low bed and connector fabrication.",
    desc: "When standard builds are not enough, we fabricate A-frame, extendable, low bed and connector units to your drawings and operational requirements.",
    solutions: [
      "A-Frame Trailer",
      "Extendable Trailer",
      "Low Bed Trailer",
      "Connector Trailer",
    ],
    image: "/images/automotive.jpg",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}

export const certificates = [
  {
    slug: "iso-9001-2015",
    title: "ISO 9001:2015",
    subtitle: "Quality Management System",
    issuer: "LEMS Certifications",
    number: "AE 10001457/01/Q",
    issued: "13 Apr 2026",
    expires: "12 Apr 2027",
    image: "/certificates/iso-9001-2015.png",
  },
  {
    slug: "iso-14001-2015",
    title: "ISO 14001:2015",
    subtitle: "Environmental Management System",
    issuer: "LEMS Certifications",
    number: "AE 10001457/02/E",
    issued: "13 Apr 2026",
    expires: "12 Apr 2027",
    image: "/certificates/iso-14001-2015.png",
  },
  {
    slug: "iso-45001-2018",
    title: "ISO 45001:2018",
    subtitle: "Occupational Health & Safety",
    issuer: "LEMS Certifications",
    number: "AE 10001457/03/H",
    issued: "13 Apr 2026",
    expires: "12 Apr 2027",
    image: "/certificates/iso-45001-2018.png",
  },
  {
    slug: "appreciation-uae-national-day",
    title: "Certificate of Appreciation",
    subtitle: "UAE National Day · Chamber of Commerce News",
    issuer: "Chamber of Commerce News in UAE and the World",
    number: "National Day 55 · 2026–2027",
    issued: "2026",
    expires: "—",
    image: "/certificates/appreciation-uae-national-day.png",
  },
] as const;

/** Mega-menu “By Type” groups */
export const productTypes = [
  { label: "Flatbed Trailer", href: "/products?type=flatbed", slugs: ["flat-bed-trailer"] },
  { label: "Heavy Duty Trailer", href: "/products?type=heavy-duty", slugs: ["heavy-duty-trailer"] },
  { label: "Side Body Trailer", href: "/products?type=side-body", slugs: ["side-body-trailer"] },
  { label: "Sand Trailer", href: "/products?type=sand", slugs: ["sand-trailers"] },
  { label: "A-Frame Trailer", href: "/products?type=a-frame", slugs: ["a-frame-trailer"] },
  { label: "Extendable Trailer", href: "/products?type=extendable", slugs: ["extendable-trailer"] },
  { label: "Low Bed Trailer", href: "/products?type=lowbed", slugs: ["low-bed-trailer"] },
  { label: "Box Trailer", href: "/products?type=box", slugs: ["box-trailer"] },
  { label: "Side Curtain Trailer", href: "/products?type=curtain", slugs: ["curtain-trailer"] },
  { label: "Flexy Trailer", href: "/products?type=flexy", slugs: ["flexy-trailer"] },
  { label: "Connector Trailer", href: "/products?type=connector", slugs: ["connector-trailer"] },
  { label: "Tanker", href: "/products?type=tanker", slugs: ["diesel-tanker"] },
] as const;

export function getProductsByType(type: string) {
  const group = productTypes.find((t) => t.href.endsWith(`type=${type}`));
  if (!group) return products;
  return products.filter((p) => (group.slugs as readonly string[]).includes(p.slug));
}

/** Featured slides in the Products mega-menu preview */
export const megaMenuFeatured = [
  {
    slug: "flat-bed-trailer",
    title: "Flatbed Trailer",
    tagline: "Hauling Heavy, Moving Swift",
    capacity: "General cargo flatbed",
  },
  {
    slug: "diesel-tanker",
    title: "Tanker",
    tagline: "Reliable Fuel Delivery, Anytime",
    capacity: "Fuel / liquid transport",
  },
  {
    slug: "curtain-trailer",
    title: "Side Curtain Trailer",
    tagline: "Fast Loading, Weather Protected",
    capacity: "Side curtain · Fast loading",
  },
  {
    slug: "low-bed-trailer",
    title: "Low Bed Trailer",
    tagline: "Built for Heavy Machinery",
    capacity: "Low deck · Heavy machinery",
  },
] as const;

/** Flat gallery feed from product + site images */
export const galleryItems = [
  ...products.map((p) => ({
    src: p.image,
    alt: p.title,
    title: p.title,
    href: `/products/${p.slug}`,
  })),
  {
    src: "/images/workshop.jpg",
    alt: "SMS Auto workshop",
    title: "Workshop",
    href: "/about",
  },
  {
    src: "/images/manufacturing.jpg",
    alt: "Manufacturing floor",
    title: "Manufacturing",
    href: "/process",
  },
  {
    src: "/images/fabrication.jpg",
    alt: "Fabrication work",
    title: "Fabrication",
    href: "/process",
  },
];

export const company = {
  name: "Shahid Mehmood Salamat Auto General Repairing Co LLC",
  shortName: "SS Trailers",
  slogan: "Strength That Moves Your Business",
  logo: "/brand/logo-nav.png",
  tagline: "Strength That Moves Your Business",
  description:
    "UAE’s trusted SS trailer & truck body builder — custom food-grade tankers, reefers, flatbeds & tippers. 304/316L stainless, CNC-fabricated, ADR-certified. Fast delivery across Dubai, Abu Dhabi & GCC.",
  highlights: [
    "304 / 316L stainless",
    "CNC-fabricated",
    "ADR-certified",
    "Fast delivery · Dubai, Abu Dhabi & GCC",
  ],
  phone: "+971 54 512 9979",
  phoneHref: "tel:+971545129979",
  whatsapp: "https://wa.me/971545129979",
  address:
    "Office 43-44, Near Al Town Roundabout, Industrial Area 2, Ras Al Khor, Dubai, UAE",
  established: "2024",
  founder: {
    name: "Shahid",
    title: "Founder",
    photo: "/team/founder-shahid.jpg",
    message:
      "When I founded SS Trailers, my goal was simple — build trailers that fleets across the UAE and GCC can trust every day. From our workshop in Ras Al Khor, Dubai, we focus on strong fabrication, practical design, and on-time delivery. Strength That Moves Your Business is not just our slogan; it is the standard we hold every unit to. Thank you for trusting us with your transport needs — we look forward to building for you.",
  },
};
