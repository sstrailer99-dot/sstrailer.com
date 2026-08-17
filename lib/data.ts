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
    slug: "skeleton-trailer",
    title: "Skeleton Trailer",
    short: "Skeleton / skeletal trailers for container and chassis haulage.",
    desc: "Skeleton trailers manufactured by SS Trailers in Dubai for container and chassis transport. Open steel frame design with twist-lock positions, strong main beams and practical axle layouts for UAE and GCC logistics fleets.",
    capacity: "Container / chassis haulage",
    features: [
      "Open skeletal steel frame",
      "Twist-lock container positions",
      "Reinforced main beams",
      "Built for UAE & GCC fleet duty",
    ],
    image: "/products/skeleton-trailer.png",
    gallery: [
      "/products/skeleton-trailer.png",
      "/gallery/skeleton-trailer/skeleton-01.jpg",
      "/gallery/skeleton-trailer/skeleton-02.jpg",
      "/gallery/skeleton-trailer/skeleton-03.jpg",
      "/gallery/skeleton-trailer/skeleton-04.jpg",
      "/gallery/skeleton-trailer/skeleton-05.jpg",
      "/gallery/skeleton-trailer/skeleton-06.jpg",
      "/gallery/skeleton-trailer/skeleton-07.jpg",
      "/gallery/skeleton-trailer/skeleton-08.jpg",
      "/gallery/skeleton-trailer/skeleton-09.jpg",
      "/gallery/skeleton-trailer/skeleton-10.jpg",
    ],
  },
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
    image: "/products/flat-bed-trailer-thumb.png",
    gallery: [
      "/products/flat-bed-trailer-thumb.png",
      "/gallery/flat-bed-trailer/flatbed-01.jpg",
      "/gallery/flat-bed-trailer/flatbed-02.jpg",
      "/gallery/flat-bed-trailer/flatbed-03.jpg",
      "/gallery/flat-bed-trailer/flatbed-04.jpg",
      "/gallery/flat-bed-trailer/flatbed-05.jpg",
      "/gallery/flat-bed-trailer/flatbed-06.jpg",
      "/gallery/flat-bed-trailer/flatbed-07.jpg",
      "/gallery/flat-bed-trailer/flatbed-08.jpg",
      "/gallery/flat-bed-trailer/flatbed-09.jpg",
      "/gallery/flat-bed-trailer/flatbed-10.jpg",
      "/gallery/flat-bed-trailer/flatbed-11.jpg",
      "/gallery/flat-bed-trailer/flatbed-12.jpg",
      "/gallery/flat-bed-trailer/flatbed-13.jpg",
      "/gallery/flat-bed-trailer/flatbed-14.jpg",
      "/gallery/flat-bed-trailer/flatbed-15.jpg",
      "/gallery/flat-bed-trailer/flatbed-16.jpg",
      "/gallery/flat-bed-trailer/flatbed-17.jpg",
      "/gallery/flat-bed-trailer/flatbed-18.jpg",
      "/gallery/flat-bed-trailer/flatbed-19.jpg",
      "/gallery/flat-bed-trailer/flatbed-20.jpg",
      "/gallery/flat-bed-trailer/flatbed-21.jpg",
      "/gallery/flat-bed-trailer/flatbed-22.jpg",
      "/gallery/flat-bed-trailer/flatbed-23.jpg",
      "/gallery/flat-bed-trailer/flatbed-24.jpg",
      "/gallery/flat-bed-trailer/flatbed-25.jpg",
      "/gallery/flat-bed-trailer/flatbed-26.png",
      "/gallery/flat-bed-trailer/flatbed-27.png",
      "/gallery/flat-bed-trailer/flatbed-28.png",
      "/gallery/flat-bed-trailer/flatbed-29.png",
      "/gallery/flat-bed-trailer/flatbed-30.png",
      "/gallery/flat-bed-trailer/flatbed-31.png",
    ],
  },
  {
    slug: "connector-trailer",
    title: "Dolly / Connector Trailer",
    short: "Converter dolly / connector units for linked haulage setups.",
    desc: "Dolly and connector trailers manufactured by SS Trailers in Dubai for specialised tandem haulage. Engineered fifth-wheel and drawbar details for reliable connection between units.",
    capacity: "Connector · Linked haulage",
    features: [
      "Fifth-wheel coupling setup",
      "Drawbar / hitch connection",
      "Air and electrical couplings",
      "Heavy-duty chassis fabrication",
    ],
    image: "/products/connector-trailer-thumb.png",
    gallery: [
      "/products/connector-trailer-thumb.png",
      "/gallery/connector-trailer/connector-01.jpg",
      "/gallery/connector-trailer/connector-02.jpg",
      "/gallery/connector-trailer/connector-03.jpg",
      "/gallery/connector-trailer/connector-04.jpg",
      "/gallery/connector-trailer/connector-05.jpg",
      "/gallery/connector-trailer/connector-06.jpg",
    ],
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
    image: "/products/box-trailer-thumb.png",
    gallery: [
      "/products/box-trailer-thumb.png",
      "/gallery/box-trailer/box-01.jpg",
      "/gallery/box-trailer/box-02.jpg",
      "/gallery/box-trailer/box-03.jpg",
      "/gallery/box-trailer/box-04.jpg",
      "/gallery/box-trailer/box-06.jpg",
      "/products/box-trailer.png",
      "/products/box-trailer-photo.png",
    ],
  },
  {
    slug: "diesel-tanker",
    title: "Diesel Tanker",
    short: "Fuel and liquid tankers for commercial distribution fleets.",
    desc: "Diesel tankers manufactured by SS Trailers in Dubai for fuel and petroleum product transport. Fabricated tank bodies with safety railings, side protection and durable finishing for UAE and GCC fleets.",
    capacity: "Fuel / liquid transport",
    features: [
      "Cylindrical tank fabrication",
      "Top walkway / safety railing",
      "Side under-run protection",
      "Fleet paint & branding ready",
    ],
    image: "/products/diesel-tanker-thumb-v2.png",
    gallery: [
      "/gallery/diesel-tanker/tanker-01.png",
      "/gallery/diesel-tanker/tanker-02.png",
      "/gallery/diesel-tanker/tanker-03.png",
      "/gallery/diesel-tanker/tanker-04.png",
    ],
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
    image: "/products/curtain-trailer-thumb.png",
    gallery: [
      "/gallery/curtain-trailer/curtain-01.png",
      "/gallery/curtain-trailer/curtain-02.png",
      "/gallery/curtain-trailer/curtain-03.png",
      "/gallery/curtain-trailer/curtain-04.png",
      "/gallery/curtain-trailer/curtain-05.png",
      "/gallery/curtain-trailer/curtain-06.png",
    ],
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
    image: "/products/extendable-trailer-thumb.png",
    gallery: [
      "/products/extendable-trailer-thumb.png",
      "/gallery/extendable-trailer/extendable-02.png",
      "/gallery/extendable-trailer/extendable-03.png",
      "/products/extendable-trailer.png",
      "/products/extendable-trailer-photo.png",
    ],
  },
  {
    slug: "low-bed-trailer",
    title: "Lowbed Heavy Duty Trailer",
    short: "Lowbed heavy duty trailers for machinery and oversized equipment.",
    desc: "Lowbed heavy duty trailers manufactured by SS Trailers in Dubai for excavators, generators and oversized machinery. Drop-deck design for lower loading height, reinforced decks and multi-axle options.",
    capacity: "Low deck · Heavy duty",
    features: [
      "Drop-deck / low bed platform",
      "Lower loading height",
      "Reinforced beams for heavy plant",
      "Multi-axle options available",
    ],
    image: "/products/low-bed-trailer-thumb-v2.png",
    gallery: [
      "/products/low-bed-trailer-thumb-v2.png",
      "/gallery/low-bed-trailer/lowbed-01.png",
      "/gallery/low-bed-trailer/lowbed-02.png",
      "/gallery/low-bed-trailer/lowbed-03.png",
      "/gallery/low-bed-trailer/lowbed-05.png",
      "/gallery/low-bed-trailer/lowbed-06.png",
      "/gallery/low-bed-trailer/lowbed-07.png",
      "/gallery/low-bed-trailer/lowbed-08.png",
      "/products/low-bed-trailer-photo.png",
    ],
  },
  {
    slug: "three-axles-block-heavy-duty-trailer",
    title: "Three Axles Block Heavy Duty Trailer",
    short: "Three-axle block heavy duty trailers with mesh side panels.",
    desc: "Three axles block heavy duty trailers manufactured by SS Trailers in Dubai for block, aggregate and industrial haulage. Reinforced chassis, mesh side containment and durable finishing for UAE and GCC fleets.",
    capacity: "Three axle · Block / heavy duty",
    features: [
      "Three-axle heavy-duty running gear",
      "Mesh block side panels",
      "Reinforced deck for industrial loads",
      "UAE road lighting & reflectors",
    ],
    image: "/products/three-axles-block-heavy-duty-thumb.png",
    gallery: [
      "/products/three-axles-block-heavy-duty-thumb.png",
      "/gallery/three-axles-block-heavy-duty/block-hd-01.png",
      "/gallery/three-axles-block-heavy-duty/block-hd-02.png",
      "/gallery/three-axles-block-heavy-duty/block-hd-03.png",
      "/gallery/three-axles-block-heavy-duty/block-hd-04.png",
      "/gallery/three-axles-block-heavy-duty/block-hd-05.png",
      "/products/three-axles-block-heavy-duty-trailer.png",
    ],
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
    image: "/products/sand-trailer-thumb-v3.png",
    gallery: [
      "/products/sand-trailer-thumb-v3.png",
      "/gallery/sand-trailer/sand-02.png",
      "/gallery/sand-trailer/sand-03.png",
      "/gallery/sand-trailer/sand-04.png",
      "/gallery/sand-trailer/sand-05.png",
      "/gallery/sand-trailer/sand-06.png",
      "/gallery/sand-trailer/sand-07.png",
      "/products/sand-trailers.png",
      "/products/sand-trailer-photo.png",
    ],
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
    image: "/products/a-frame-trailer-thumb-v2.png",
    gallery: [
      "/products/a-frame-trailer-thumb-v2.png",
      "/gallery/a-frame-trailer/aframe-01.png",
      "/gallery/a-frame-trailer/aframe-02.png",
      "/gallery/a-frame-trailer/aframe-03.png",
      "/gallery/a-frame-trailer/aframe-04.png",
      "/gallery/a-frame-trailer/aframe-05.png",
      "/products/a-frame-trailer.png",
      "/products/a-frame-trailer-photo.png",
    ],
  },
  {
    slug: "tipper-truck",
    title: "Tipper Truck",
    short: "Tipper / dump trailers and bodies for bulk material haulage.",
    desc: "Tipper trucks and dump bodies manufactured by SS Trailers in Dubai for sand, aggregates and bulk site materials. Reinforced steel bodies, hydraulic tipping systems and durable finishing for UAE construction and haulage fleets.",
    capacity: "Tipper / bulk haulage",
    features: [
      "Hydraulic tipping system",
      "Reinforced dump body",
      "Multi-axle chassis options",
      "Built for sand & aggregates",
    ],
    image: "/products/tipper-truck-thumb.png",
    gallery: [
      "/products/tipper-truck-thumb.png",
      "/gallery/tipper-truck/tipper-02.png",
      "/gallery/tipper-truck/tipper-03.png",
      "/gallery/tipper-truck/tipper-04.png",
      "/gallery/tipper-truck/tipper-01.png",
    ],
  },
  {
    slug: "waste-water-tanker",
    title: "Waste Water Tanker",
    short: "Waste water tankers for municipal and industrial liquid transfer.",
    desc: "Waste water tankers manufactured by SS Trailers in Dubai for municipal, industrial and site liquid transfer operations. Cylindrical tank bodies with rear access, discharge valves and durable finishing for UAE fleet duty.",
    capacity: "Waste water / liquid transfer",
    features: [
      "Cylindrical tank fabrication",
      "Rear ladder & discharge valve",
      "Heavy-duty tank mounting",
      "Built for municipal & industrial use",
    ],
    image: "/products/waste-water-tanker-thumb.png",
    gallery: [
      "/products/waste-water-tanker-thumb.png",
      "/gallery/waste-water-tanker/waste-water-01.png",
    ],
  },
];

export const industries: Industry[] = [
  {
    slug: "transport-logistics",
    title: "Transport & Logistics",
    short: "Curtain, box and flatbed trailers for fleet operators.",
    desc: "We support transport and logistics companies with curtain, box and flatbed trailers built for high-utilisation fleets across Dubai and the GCC.",
    solutions: [
      "Side Curtain Trailer",
      "Box Trailer",
      "Flatbed Trailer",
      "Skeleton Trailer",
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
      "Three Axles Block Heavy Duty Trailer",
      "Lowbed Heavy Duty Trailer",
      "Tipper Truck",
    ],
    image: "/images/construction.jpg",
  },
  {
    slug: "oil-gas",
    title: "Oil & Gas",
    short: "Tankers and specialised heavy trailer fabrication.",
    desc: "Oil and fuel operators need reliable tankers and heavy platforms. We manufacture tank trailers and robust multi-axle builds for industrial fleets.",
    solutions: ["Diesel Tanker", "Waste Water Tanker", "Three Axles Block Heavy Duty Trailer", "Extendable Trailer"],
    image: "/products/diesel-tanker.png",
  },
  {
    slug: "municipality-waste-management",
    title: "Municipality & Waste Management",
    short: "Durable trailers and bodies for municipal and waste operations.",
    desc: "Municipal and waste management fleets need robust platforms for collection, transfer and public works. We fabricate practical trailers and truck bodies for continuous duty across UAE cities and industrial zones.",
    solutions: [
      "Box Trailer",
      "Three Axles Block Heavy Duty Trailer",
      "Flatbed Trailer",
      "Sand Trailer",
      "Waste Water Tanker",
    ],
    image: "/products/box-trailer-thumb.png",
  },
  {
    slug: "process-storage-industry",
    title: "Process & Storage Industry",
    short: "Tankers and specialised trailers for process and storage sites.",
    desc: "Process plants and storage operators require reliable tankers and heavy platforms for bulk liquids and materials. We manufacture tankers and multi-axle builds suited to industrial site logistics.",
    solutions: ["Diesel Tanker", "Box Trailer", "Three Axles Block Heavy Duty Trailer", "Skeleton Trailer"],
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
      "Lowbed Heavy Duty Trailer",
      "Dolly / Connector Trailer",
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
  { label: "Skeleton Trailer", href: "/products?type=skeleton", slugs: ["skeleton-trailer"] },
  { label: "Flatbed Trailer", href: "/products?type=flatbed", slugs: ["flat-bed-trailer"] },
  { label: "Dolly / Connector Trailer", href: "/products?type=connector", slugs: ["connector-trailer"] },
  { label: "Box Trailer", href: "/products?type=box", slugs: ["box-trailer"] },
  { label: "Diesel Tanker", href: "/products?type=tanker", slugs: ["diesel-tanker"] },
  { label: "Side Curtain Trailer", href: "/products?type=curtain", slugs: ["curtain-trailer"] },
  { label: "Extendable Trailer", href: "/products?type=extendable", slugs: ["extendable-trailer"] },
  { label: "Lowbed Heavy Duty Trailer", href: "/products?type=lowbed", slugs: ["low-bed-trailer"] },
  { label: "Three Axles Block Heavy Duty Trailer", href: "/products?type=block-heavy-duty", slugs: ["three-axles-block-heavy-duty-trailer"] },
  { label: "Sand Trailer", href: "/products?type=sand", slugs: ["sand-trailers"] },
  { label: "A-Frame Trailer", href: "/products?type=a-frame", slugs: ["a-frame-trailer"] },
  { label: "Tipper Truck", href: "/products?type=tipper", slugs: ["tipper-truck"] },
  { label: "Waste Water Tanker", href: "/products?type=waste-water", slugs: ["waste-water-tanker"] },
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
    title: "Diesel Tanker",
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
    title: "Lowbed Heavy Duty Trailer",
    tagline: "Built for Heavy Machinery",
    capacity: "Low deck · Heavy duty",
  },
] as const;

/** Trailer photo gallery grouped by product category */
export const galleryCategories = products.map((p) => ({
  slug: p.slug,
  title: p.title,
  photos: p.gallery.map((src, i) => ({
    src,
    alt: `${p.title} — photo ${i + 1}`,
  })),
}));

export function getGalleryCategories(category?: string) {
  if (!category) return galleryCategories;
  const match = galleryCategories.filter((c) => c.slug === category);
  return match.length ? match : galleryCategories;
}

export const company = {
  name: "Shahid Mehmood Salamat Auto General Repairing Co LLC",
  shortName: "SS Trailers",
  slogan: "Strength That Moves Your Business",
  logo: "/brand/logo-nav-v2.png",
  tagline: "Strength That Moves Your Business",
  description:
    "UAE’s trusted SS trailer & truck body builder — custom food-grade tankers, reefers, flatbeds & tippers. 304/316L stainless, CNC-fabricated, ADR-certified. Fast delivery across Dubai, Abu Dhabi & GCC.",
  about: {
    intro:
      "SS Trailers is a Dubai-based trailer and truck body manufacturer serving transport, construction, fuel distribution and industrial fleets across the UAE and GCC. From our workshop in Ras Al Khor Industrial Area 2, we design, fabricate and deliver custom-built trailers that meet real operating conditions on Gulf roads and job sites.",
    story:
      "With more than a decade of hands-on experience in steel fabrication and heavy transport equipment, our team combines practical engineering with disciplined workshop standards. Every build — from flatbeds and curtain sides to tankers, low beds and specialised chassis — is planned around capacity, durability and ease of maintenance so fleets stay productive longer.",
    range:
      "Our manufacturing range includes flatbed, heavy duty, sand, A-frame, extendable, low bed, box, side curtain, connector, skeleton, tanker, tipper and waste water tanker trailers. Units can be specified with reinforced beams, safety lighting, reflective markings and finishes suited to UAE and GCC regulations.",
    commitment:
      "We work closely with fleet owners, logistics companies and contractors from enquiry through quotation, fabrication and delivery. Clear communication, honest timelines and consistent build quality are how we earn long-term trust — Strength That Moves Your Business.",
  },
  vision:
    "To be the preferred trailer and truck body manufacturer in the UAE and GCC — recognised for strength, reliability and practical innovation that keeps businesses moving.",
  mission:
    "To design and manufacture durable, specification-driven trailers and truck bodies using quality materials, skilled fabrication and on-time delivery — supporting customers with solutions built for real fleet demands across Dubai, Abu Dhabi and the wider region.",
  highlights: [
    "304 / 316L stainless",
    "CNC-fabricated",
    "ADR-certified",
    "Fast delivery · Dubai, Abu Dhabi & GCC",
  ],
  phone: "+971 54 512 9979",
  phoneHref: "tel:+971545129979",
  email: "info@sstrailers.net",
  emailHref: "mailto:info@sstrailers.net",
  whatsapp: "https://wa.me/971545129979",
  address:
    "Office 43-44, Near Al Town Roundabout, Industrial Area 2, Ras Al Khor, Dubai, UAE",
  established: "2024",
  stats: {
    happyClients: "1200+",
    projectsCompleted: "650+",
    yearsExperience: "10+",
  },
  founder: {
    name: "Shahid",
    title: "Founder",
    photo: "/team/founder-shahid.jpg",
    message:
      "When I founded SS Trailers, my goal was simple — build trailers that fleets across the UAE and GCC can trust every day. From our workshop in Ras Al Khor, Dubai, we focus on strong fabrication, practical design, and on-time delivery. Strength That Moves Your Business is not just our slogan; it is the standard we hold every unit to. Thank you for trusting us with your transport needs — we look forward to building for you.",
  },
};
