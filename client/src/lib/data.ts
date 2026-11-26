import { Product, Category, Banner, ServiceItem, PartnerReview, KeyClient, AboutContent, SocialMediaLinks, SEOMetadata, PopupSettings, FAQItem } from '@/types';

export const atsOfficialLogo = "https://atsenergybd.com/wp-content/uploads/2025/09/PHOTO-2026-11-04-12-23-02.jpg";

export const initialBanners: Banner[] = [];

export const fallbackCategories: Category[] = [
  {
    id: "cat_lighting",
    name: "Lighting Solutions",
    slug: "lighting-solutions",
    image: "https://atsenergybd.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-11-at-13.44.35.jpeg",
    banner: "https://atsenergybd.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-07-at-17.26.36-2-768x305.jpeg",
    description: "ATS AC LED Bulbs (5W to 22W), Emergency LED 12W, and durable Batten / Pendent Holders.",
    subcategories: ["AC LED Bulbs", "Emergency LED", "Batten Holders"],
    subCategoriesList: [
      {
        id: "sub_ac_led",
        name: "AC LED Bulbs",
        slug: "ac-led-bulbs",
        subSubCategories: [
          { id: "subsub_5w_12w", name: "Standard 5W to 12W Bulbs", slug: "standard-5w-12w" },
          { id: "subsub_15w_22w", name: "Heavy Wattage 15W to 22W", slug: "heavy-wattage-15w-22w" }
        ]
      },
      {
        id: "sub_emergency",
        name: "Emergency LED",
        slug: "emergency-led",
        subSubCategories: [
          { id: "subsub_rechargeable", name: "Rechargeable Auto Backup 12W", slug: "rechargeable-auto-12w" }
        ]
      },
      {
        id: "sub_holders",
        name: "Batten & Decorative Holders",
        slug: "batten-decorative-holders",
        subSubCategories: [
          { id: "subsub_ceramic", name: "Heat Resistant Ceramic Core", slug: "ceramic-core" }
        ]
      }
    ]
  },
  {
    id: "cat_accessories",
    name: "Electrical Accessories",
    slug: "electrical-accessories",
    image: "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.19.jpeg",
    banner: "https://atsenergybd.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-07-at-17.26.36-3-768x305.jpeg",
    description: "Gang switches, Piano switch sockets, Circuit breakers, Main switches, Cut-outs, Change overs, Calling bells, Push switches.",
    subcategories: ["Gang Switches", "Piano Switch Sockets", "Circuit Breakers (MCB)"],
    subCategoriesList: [
      {
        id: "sub_gang_switches",
        name: "Gang Switches",
        slug: "gang-switches",
        subSubCategories: [
          { id: "subsub_1_2_gang", name: "1 to 2 Gang Plates", slug: "1-2-gang" },
          { id: "subsub_3_4_gang", name: "3 to 4 Gang Plates", slug: "3-4-gang" }
        ]
      },
      {
        id: "sub_breakers",
        name: "Circuit Breakers (MCB)",
        slug: "circuit-breakers",
        subSubCategories: [
          { id: "subsub_sp_mcb", name: "Single Pole (1P) MCB", slug: "1p-mcb" },
          { id: "subsub_dp_mcb", name: "Double Pole (2P) MCB", slug: "2p-mcb" }
        ]
      },
      {
        id: "sub_piano_sockets",
        name: "Piano Switch Sockets",
        slug: "piano-switch-sockets",
        subSubCategories: [
          { id: "subsub_multi_socket", name: "Multi-Pin Power Socket", slug: "multi-pin-power-socket" }
        ]
      }
    ]
  },
  {
    id: "cat_cables",
    name: "Wiring, Cables & PVC",
    slug: "wiring-cables",
    image: "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.18.jpeg",
    banner: "https://atsenergybd.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-07-at-17.26.37-1-768x305.jpeg",
    description: "ATS Electric Cables (1.0 RM to 2.5 RM), Copper wires, SDB/MDB boards, PVC pipes, channels, boards, royal plugs, screws.",
    subcategories: ["Electric Cables", "PVC Pipes & Channels", "Distribution Boards"],
    subCategoriesList: [
      {
        id: "sub_elec_cables",
        name: "Electric Cables",
        slug: "electric-cables",
        subSubCategories: [
          { id: "subsub_1_5_rm", name: "1.0 RM to 1.5 RM House Wiring", slug: "1-0-1-5-rm" },
          { id: "subsub_2_5_rm", name: "2.5 RM Heavy Duty Copper", slug: "2-5-rm" }
        ]
      },
      {
        id: "sub_pvc",
        name: "PVC Pipes & Channels",
        slug: "pvc-pipes-channels",
        subSubCategories: [
          { id: "subsub_pvc_channels", name: "Conduit Fittings & Bends", slug: "conduit-fittings" }
        ]
      }
    ]
  },
  {
    id: "cat_solar",
    name: "Solar Systems",
    slug: "solar-energy-systems",
    image: "https://atsenergybd.com/wp-content/uploads/2026/11/Solar-Adpter-1-copy.jpg",
    banner: "https://atsenergybd.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-07-at-17.26.36-3-768x305.jpeg",
    description: "Solar panels, 10AH & 20/30Ah auto charge controllers, and 30-watt Solar Adapters.",
    subcategories: ["Solar Panels", "Solar Auto Charge Controllers", "Solar Adapters"],
    subCategoriesList: [
      {
        id: "sub_solar_controllers",
        name: "Solar Auto Charge Controllers",
        slug: "solar-auto-charge-controllers",
        subSubCategories: [
          { id: "subsub_10ah_30ah", name: "10Ah - 30Ah LCD PWM Controllers", slug: "10ah-30ah-pwm" }
        ]
      },
      {
        id: "sub_solar_panels",
        name: "Monocrystalline Solar Panels",
        slug: "monocrystalline-solar-panels",
        subSubCategories: [
          { id: "subsub_pv_modules", name: "Grade A Photovoltaic Modules", slug: "pv-modules" }
        ]
      }
    ]
  },
  {
    id: "cat_fans",
    name: "Ceiling & Exhaust Fans",
    slug: "ceiling-exhaust-fans",
    image: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=80",
    banner: "https://atsenergybd.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-07-at-17.26.36-2-768x305.jpeg",
    description: "High speed energy-efficient ceiling fans, ventilation exhaust fans, and cooling solutions for home and industry.",
    subcategories: ["Ceiling Fans", "Exhaust Fans", "Wall Mounted Fans"],
    subCategoriesList: [
      {
        id: "sub_ceiling_fans",
        name: "Energy Saving Ceiling Fans",
        slug: "ceiling-fans",
        subSubCategories: [
          { id: "subsub_56_inch", name: "56-inch Aerodynamic Blades", slug: "56-inch-fans" },
          { id: "subsub_bldc_fans", name: "BLDC Low-Wattage Motors", slug: "bldc-motors" }
        ]
      },
      {
        id: "sub_exhaust_fans",
        name: "Ventilation Exhaust Fans",
        slug: "exhaust-fans",
        subSubCategories: [
          { id: "subsub_kitchen_bath", name: "Kitchen & Bathroom Louver Series", slug: "kitchen-bath-fans" }
        ]
      }
    ]
  },
  {
    id: "cat_distribution",
    name: "Distribution Boards & Panels",
    slug: "distribution-boards",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    banner: "https://atsenergybd.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-07-at-17.26.37-1-768x305.jpeg",
    description: "Heavy-duty SDB, MDB, change-over switches, industrial busbar chambers and breaker control enclosures.",
    subcategories: ["Main Distribution Boards", "Sub Distribution Boards", "Changeover Switches"],
    subCategoriesList: [
      {
        id: "sub_sdb_mdb",
        name: "MDB & SDB Enclosures",
        slug: "mdb-sdb-enclosures",
        subSubCategories: [
          { id: "subsub_flush_surface", name: "Flush & Surface Mount Boxes", slug: "flush-surface-boxes" }
        ]
      },
      {
        id: "sub_changeover",
        name: "Manual & Auto Changeover",
        slug: "changeover-switches",
        subSubCategories: [
          { id: "subsub_63a_100a", name: "63A - 100A Heavy Duty Cut-Outs", slug: "63a-100a-changeover" }
        ]
      }
    ]
  },
  {
    id: "cat_power_backup",
    name: "IPS & Power Backup",
    slug: "ips-power-backup",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80",
    banner: "https://atsenergybd.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-07-at-17.26.36-3-768x305.jpeg",
    description: "Pure sine wave IPS/UPS inverters, tubular battery solutions and uninterrupted residential power supplies.",
    subcategories: ["Pure Sine Wave IPS", "Tubular Batteries", "Online UPS"],
    subCategoriesList: [
      {
        id: "sub_sine_wave_ips",
        name: "Pure Sine Wave Inverters",
        slug: "pure-sine-wave-ips",
        subSubCategories: [
          { id: "subsub_800va_1200va", name: "800VA - 1200VA Home Series", slug: "800va-1200va" }
        ]
      },
      {
        id: "sub_batteries",
        name: "Deep Cycle Tubular Batteries",
        slug: "tubular-batteries",
        subSubCategories: [
          { id: "subsub_150ah_200ah", name: "150Ah - 200Ah Long Backup", slug: "150ah-200ah" }
        ]
      }
    ]
  }
];

export const fallbackProducts: Product[] = [
  // 1. Electric Cable
  {
    name: "ATS Electric Cable (1.0 RM to 2.5 RM)",
    slug: "ats-electric-cable",
    category: "Wiring, Cables & PVC",
    subcategory: "Electric Cables",
    shortDescription: "High-grade 99.99% pure annealed copper electrical wiring cable with fire retardant PVC insulation.",
    description: "ATS Electric Cables are manufactured for high conductivity and low resistance. Designed with standard BDS 900 compliance, ensuring safety from short circuits and overloading across homes and industries.",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.18.jpeg",
    gallery: [
      "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.18.jpeg"
    ],
    attributes: [
      { key: "Sizes Available", value: "1.0 RM, 1.3 RM, 1.5 RM, 2.0 RM, 2.5 RM" },
      { key: "Conductor", value: "99.99% Pure Electrolytic Copper" },
      { key: "Insulation", value: "Flame Retardant PVC (FR-PVC)" },
      { key: "Voltage Grade", value: "450/750V" },
      { key: "Standard", value: "BSTI Certified, BDS 900" },
      { key: "Warranty", value: "Official Company Warranty" }
    ],
    features: [
      "Low electrical resistance and minimal voltage drop",
      "High temperature fire-retardant outer sheath",
      "Anti-termite and anti-rodent PVC jacket",
      "Tested for commercial & residential installations"
    ],
    applications: ["House wiring", "Commercial project distribution", "Industrial panels"],
    featured: true,
    isAvailable: true
  },
  // 2. Gang Switches
  {
    name: "ATS Gang Switches",
    slug: "ats-gang-switches",
    category: "Electrical Accessories",
    subcategory: "Gang Switches",
    shortDescription: "Sleek and modern gang switches with silver alloy contact points and fireproof housing.",
    description: "ATS Gang Switches are engineered for smooth click operations, aesthetic wall integration, and long-lasting electrical reliability. Compatible with standard flush boxes.",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.19.jpeg",
    gallery: [
      "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.19.jpeg"
    ],
    attributes: [
      { key: "Configuration", value: "1 Gang, 2 Gang, 3 Gang, 4 Gang" },
      { key: "Current Rating", value: "10AX 250V AC" },
      { key: "Housing Material", value: "Fireproof Polycarbonate (PC)" },
      { key: "Contact", value: "Silver Alloy Contact Points" },
      { key: "Click Lifespan", value: "40,000+ Cycles" }
    ],
    features: [
      "Minimalist slim profile design",
      "High flame-retardant material",
      "Easy screw clip installation",
      "Shockproof and child-safe"
    ],
    applications: ["Apartments", "Commercial offices", "Hotels"],
    featured: true,
    isAvailable: true
  },
  // 3. Piano Switch Sockets
  {
    name: "ATS Piano Switch & Sockets",
    slug: "ats-piano-switch-sockets",
    category: "Electrical Accessories",
    subcategory: "Piano Switch Sockets",
    shortDescription: "Classic heavy-duty piano switches and multi-pin power sockets for reliable daily switching.",
    description: "ATS Piano switches and sockets are built for robust switching operations. Featuring heavy brass terminals and high-durability internal springs.",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.19-1.jpeg",
    gallery: [
      "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.19-1.jpeg"
    ],
    attributes: [
      { key: "Type", value: "Piano 1-Way Switch / 2-Pin & Multi Socket" },
      { key: "Terminal Material", value: "Heavy Solid Brass" },
      { key: "Voltage Rating", value: "250V AC, 6A / 10A" },
      { key: "Mounting", value: "Standard wooden & PVC piano boards" }
    ],
    features: [
      "Reinforced heavy spring action",
      "High spark resistance",
      "Smooth tactile feedback"
    ],
    applications: ["Residential homes", "Retail shops", "Workshops"],
    featured: true,
    isAvailable: true
  },
  // 4. Circuit Breakers (MCB)
  {
    name: "ATS Circuit Breakers (MCB)",
    slug: "ats-circuit-breakers",
    category: "Electrical Accessories",
    subcategory: "Circuit Breakers",
    shortDescription: "Precision miniature circuit breakers (MCB) for short-circuit and overload protection.",
    description: "ATS MCBs safeguard electrical networks by instantly interrupting abnormal fault currents. Built with bi-metal thermal trip and magnetic short-circuit coils.",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.19-2.jpeg",
    gallery: [
      "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.19-2.jpeg"
    ],
    attributes: [
      { key: "Poles", value: "Single Pole (1P) / Double Pole (2P)" },
      { key: "Current Rating", value: "6A, 10A, 16A, 20A, 32A, 40A, 63A" },
      { key: "Breaking Capacity", value: "6kA / 10kA" },
      { key: "Standard", value: "IEC 60898-1 Certified" }
    ],
    features: [
      "Quick arc extinguishing mechanism",
      "Visual ON/OFF trip indicator",
      "DIN Rail standard mounting"
    ],
    applications: ["Main distribution boards", "SDB boxes", "Appliance protection"],
    featured: true,
    isAvailable: true
  },
  // 5. Main Switches
  {
    name: "ATS Main Switches",
    slug: "ats-main-switches",
    category: "Electrical Accessories",
    subcategory: "Main Switches",
    shortDescription: "Heavy iron-clad main switch gear for primary power disconnection and meter isolation.",
    description: "ATS Main Switches offer positive power isolation for entire electrical installations. Equipped with ceramic fuse bases and quick-break mechanisms.",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.20.jpeg",
    gallery: [],
    attributes: [
      { key: "Rating", value: "32A, 63A, 100A Double / Triple Pole" },
      { key: "Enclosure", value: "Powder Coated Sheet Steel / Heavy Bakelite" },
      { key: "Voltage", value: "240V / 415V AC" }
    ],
    features: [
      "Quick break contacts prevents continuous arcing",
      "Robust heavy handle with lockout provision",
      "Ceramic insulation blocks"
    ],
    applications: ["Building mains", "Substations", "Industrial entrances"],
    featured: false,
    isAvailable: true
  },
  // 6. Cut-Outs
  {
    name: "ATS Cut-Outs",
    slug: "ats-cut-outs",
    category: "Electrical Accessories",
    subcategory: "Cut-Outs",
    shortDescription: "Porcelain & heavy bakelite electrical service cut-outs with high rupturing fuse wire slots.",
    description: "ATS Cut-Outs protect primary supply lines against sudden current surges. Made with vitrified porcelain bodies capable of handling high thermal loads.",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.20-1.jpeg",
    gallery: [],
    attributes: [
      { key: "Current Rating", value: "16A, 32A, 64A, 100A" },
      { key: "Body Material", value: "Heavy Vitrified Porcelain / Bakelite" },
      { key: "Terminal", value: "Brass terminal blocks" }
    ],
    features: ["Flame and arc resistant", "Standard fuse carrier fittings"],
    applications: ["Service entrances", "Distribution feeder pillars"],
    featured: false,
    isAvailable: true
  },
  // 7. Change Overs
  {
    name: "ATS Change Overs",
    slug: "ats-change-overs",
    category: "Electrical Accessories",
    subcategory: "Change Overs",
    shortDescription: "Manual change over switch for seamless switching between Grid Power and Generator/Solar.",
    description: "ATS Changeover switches allow safe transfer between multiple power sources (e.g. DESCO/DPDC grid and Generator/IPS).",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.21.jpeg",
    gallery: [],
    attributes: [
      { key: "Poles", value: "2 Pole / 4 Pole" },
      { key: "Rated Current", value: "32A, 63A, 100A" },
      { key: "Operation", value: "Center-OFF (Source 1 - OFF - Source 2)" }
    ],
    features: ["Zero risk of source cross-connection", "Heavy brass knife contacts"],
    applications: ["Generator backup transfer", "Solar/Grid transfer"],
    featured: false,
    isAvailable: true
  },
  // 8. Copper Wires
  {
    name: "ATS 100% Pure Copper Wires",
    slug: "ats-copper-wires",
    category: "Wiring, Cables & PVC",
    subcategory: "Copper Wires",
    shortDescription: "High-purity solid and stranded copper conductor wire for grounding and internal panel wiring.",
    description: "ATS Copper Wires are drawn from 99.99% pure grade A copper cathode to achieve maximum electrical conductivity and minimum thermal expansion.",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.21-1.jpeg",
    gallery: [],
    attributes: [
      { key: "Conductor Purity", value: "99.99% Electrolytic Copper" },
      { key: "Gauge / Sizes", value: "Various standard gauge options" },
      { key: "Tensile Strength", value: "Annealed for flexibility" }
    ],
    features: ["Exceptional conductivity", "Corrosion resistant", "Easy to bend and terminate"],
    applications: ["Earthing / Grounding", "Motor windings", "Control panels"],
    featured: false,
    isAvailable: true
  },
  // 9. SDB & MDB Boards
  {
    name: "ATS SDB & MDB Distribution Boards",
    slug: "ats-sdb-mdb-boards",
    category: "Wiring, Cables & PVC",
    subcategory: "SDB & MDB Boards",
    shortDescription: "Heavy-gauge powder coated metal distribution boxes for MCB and electrical control.",
    description: "ATS Sub Distribution Boards (SDB) and Main Distribution Boards (MDB) are designed with ample wiring space, standard neutral/earth bars, and sleek acrylic/metal doors.",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.22.jpeg",
    gallery: [
      "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.22-1.jpeg"
    ],
    attributes: [
      { key: "Ways Available", value: "2-4 Way, 6-8 Way, 10-12 Way, 16+ Way" },
      { key: "Mounting", value: "Surface & Flush Mountable" },
      { key: "Protection", value: "IP40 rated protection" }
    ],
    features: ["Electro-galvanized sheet metal", "Rust resistant powder coating", "Pre-fitted DIN rails"],
    applications: ["Residential flats", "Offices", "Industrial buildings"],
    featured: false,
    isAvailable: true
  },
  // 10. Calling Bells
  {
    name: "ATS Ding Dong & Melody Calling Bells",
    slug: "ats-calling-bells",
    category: "Electrical Accessories",
    subcategory: "Calling Bells",
    shortDescription: "Pleasant tone electronic doorbells designed with energy saving low-draw solenoids.",
    description: "ATS Calling Bells deliver clear, melodic acoustic alerts for modern entryways. Built with heat-resistant plastic and long-life electronic chimes.",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.23.jpeg",
    gallery: [],
    attributes: [
      { key: "Chime Type", value: "Ding-Dong / Multi-tone Melody" },
      { key: "Operating Voltage", value: "220V - 240V AC" },
      { key: "Sound Level", value: "85 dB Clear Tone" }
    ],
    features: ["Low power consumption", "Contemporary aesthetic casing"],
    applications: ["Homes, Apartments, Office doors"],
    featured: false,
    isAvailable: true
  },
  // 11. Push Switches
  {
    name: "ATS Push Switches",
    slug: "ats-push-switches",
    category: "Electrical Accessories",
    subcategory: "Push Switches",
    shortDescription: "Momentary push button switches for calling bells, pump controllers, and industrial triggers.",
    description: "ATS Push switches provide instant contact closing on press. Built with phosphor bronze return springs.",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.23-1.jpeg",
    gallery: [],
    attributes: [
      { key: "Operation", value: "Momentary Spring Return" },
      { key: "Rating", value: "6A / 10A 250V AC" }
    ],
    features: ["High return spring durability", "Clear bell icon imprint"],
    applications: ["Calling bells", "Motor start circuits"],
    featured: false,
    isAvailable: true
  },
  // 12. Bottom / Batten Holders
  {
    name: "ATS Bottom / Batten Holders",
    slug: "ats-bottom-holders",
    category: "Lighting Solutions",
    subcategory: "Batten Holders",
    shortDescription: "Ceramic interior heat-resistant batten and pendant lamp holders for B22/E27 bulbs.",
    description: "ATS Holders are manufactured using flame-retardant exterior plastic and pure brass terminals with vitrified ceramic inserts to prevent melting under continuous bulb heat.",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.24.jpeg",
    gallery: [],
    attributes: [
      { key: "Base Type", value: "B22 (Pin) / E27 (Screw)" },
      { key: "Interior", value: "Ceramic core with brass plunger" },
      { key: "Max Temp", value: "Up to 180°C" }
    ],
    features: ["No melting or yellowing", "Heavy spring pressure for firm grip"],
    applications: ["Wall and ceiling lighting"],
    featured: true,
    isAvailable: true
  },
  // 13. Ceiling Roses
  {
    name: "ATS Ceiling Roses",
    slug: "ats-ceiling-roses",
    category: "Electrical Accessories",
    subcategory: "Ceiling Roses",
    shortDescription: "3-plate wiring ceiling roses with brass terminal blocks for ceiling fans and hanging lights.",
    description: "ATS Ceiling Roses provide safe transition from concealed ceiling conduit to hanging fixtures and fans.",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.24-1.jpeg",
    gallery: [],
    attributes: [
      { key: "Plates", value: "3-Terminal Heavy Brass" },
      { key: "Rating", value: "6A 250V AC" }
    ],
    features: ["Flame retardant casing", "Ample wiring conduit knockouts"],
    applications: ["Ceiling fans, chandeliers, pendant lamps"],
    featured: false,
    isAvailable: true
  },
  // 14. PVC Pipes, Channels & Fittings
  {
    name: "ATS PVC Pipes & Fittings",
    slug: "ats-pvc-pipe-fittings",
    category: "Wiring, Cables & PVC",
    subcategory: "PVC Pipe Fittings",
    shortDescription: "Heavy-wall electrical conduit PVC pipes, elbows, circular boxes, and bends.",
    description: "ATS PVC conduit fittings ensure smooth cable pulling and high mechanical impact protection for electrical conduit installations.",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.25.jpeg",
    gallery: [
      "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.26.jpeg",
      "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.26-1.jpeg"
    ],
    attributes: [
      { key: "Sizes", value: "1/2 inch, 3/4 inch, 1 inch" },
      { key: "Material", value: "Unplasticized PVC (uPVC)" },
      { key: "Property", value: "Self-extinguishing fire retardant" }
    ],
    features: ["High pressure resistance", "Smooth inner wall for friction-free cable routing"],
    applications: ["Concealed wall wiring", "Slab conduit casting"],
    featured: false,
    isAvailable: true
  },
  // 15. Royal Plugs & Screws
  {
    name: "ATS Royal Plugs & Hardware Screws",
    slug: "ats-royal-plugs-screws",
    category: "Wiring, Cables & PVC",
    subcategory: "Royal Plugs & Screws",
    shortDescription: "Virgin nylon wall anchor royal plugs and zinc-plated anti-corrosion screws.",
    description: "ATS Royal plugs and screws provide strong, reliable masonry grip for mounting switch boards, lighting channels, and electrical boxes.",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.26-2.jpeg",
    gallery: [
      "https://atsenergybd.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-28-at-18.43.27.jpeg"
    ],
    attributes: [
      { key: "Sizes", value: "1 inch, 1.25 inch, 1.5 inch, 2 inch" },
      { key: "Material", value: "High elasticity Nylon + Zinc steel" }
    ],
    features: ["Non-cracking anchor ribs", "High pull-out resistance"],
    applications: ["Wall mounting of switch boards & fixtures"],
    featured: false,
    isAvailable: true
  },
  // 16. ATS AC LED Bulbs (5W to 22W)
  {
    name: "ATS AC LED Bulb (5W to 22W)",
    slug: "ats-ac-led-bulb",
    category: "Lighting Solutions",
    subcategory: "AC LED 5W to 22W",
    shortDescription: "Official ATS high lumen energy saving AC LED bulbs available from 5W, 12W, 15W, 18W up to 22W.",
    description: "The signature ATS AC LED series delivers bright, flicker-free lighting with up to 85% energy savings. Manufactured with high-efficiency drivers and surge protection to survive Bangladeshi voltage fluctuations.",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-11-at-13.44.35.jpeg",
    gallery: [
      "https://atsenergybd.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-11-at-13.44.35.jpeg",
      "https://atsenergybd.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-11-at-13.44.34.jpeg",
      "https://atsenergybd.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-11-at-13.44.34-1.jpeg"
    ],
    attributes: [
      { key: "Wattages Available", value: "5W, 7W, 9W, 12W, 15W, 18W, 20W, 22W" },
      { key: "Base Type", value: "B22 (Pin) / E27 (Screw)" },
      { key: "Input Voltage", value: "AC 160V - 260V 50Hz" },
      { key: "Luminous Efficacy", value: "100 lm/Watt" },
      { key: "Color Temp", value: "6500K Daylight" },
      { key: "Warranty", value: "1 Year Official Replacement" }
    ],
    features: [
      "85% Energy Saving",
      "Surge Protected Driver",
      "Eco-friendly, zero mercury"
    ],
    applications: ["Homes, Showrooms, Corporate Offices, Factories"],
    featured: true,
    isAvailable: true
  },
  // 17. ATS Emergency LED 12W
  {
    name: "ATS Emergency LED Light 12W",
    slug: "ats-emergency-led-light-12w",
    category: "Lighting Solutions",
    subcategory: "ATS Emergency LED 12W",
    shortDescription: "Rechargeable intelligent emergency LED bulb with built-in Lithium battery and 4 hours backup.",
    description: "Automatic load shedding backup light. Charges while normal power is ON, and turns ON automatically the instant electricity cuts off.",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-11-at-13.44.21.jpeg",
    gallery: [
      "https://atsenergybd.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-11-at-13.44.21.jpeg"
    ],
    attributes: [
      { key: "Wattage", value: "12 Watt" },
      { key: "Battery", value: "High Grade Lithium-ion Battery" },
      { key: "Backup Time", value: "3.5 to 4 Hours" },
      { key: "Charging", value: "Automatic on standard B22/E27 line" },
      { key: "Warranty", value: "1 Year Company Warranty" }
    ],
    features: ["Instant auto-on on load shedding", "Touch activate sensor", "Overcharge protection"],
    applications: ["Homes, Shops, Clinics, Emergency exits"],
    featured: true,
    isAvailable: true
  },
  // 18. ATS Solar Systems (Panels, Controllers & 30W Adapter)
  {
    name: "ATS Solar Systems (Panels, Auto Controllers & Adapters)",
    slug: "ats-solar-energy-systems",
    category: "Solar Systems",
    subcategory: "Solar Panels & Controllers",
    shortDescription: "High-efficiency solar panels, 10AH / 20-30Ah auto charge controllers, and 30-watt Solar Adapters.",
    description: "ATS Energy Solution provides end-to-end solar kits including monocrystalline panels, intelligent digital charge controllers, and solar DC adapters.",
    mainImage: "https://atsenergybd.com/wp-content/uploads/2026/11/Solar-Adpter-1-copy.jpg",
    gallery: [
      "https://atsenergybd.com/wp-content/uploads/2026/11/Solar-Adpter-1-copy.jpg",
      "https://atsenergybd.com/wp-content/uploads/2026/11/Untitled-design.jpg"
    ],
    attributes: [
      { key: "Solar Adapter", value: "30-Watt High Efficiency Adapter" },
      { key: "Charge Controller", value: "10AH, 20Ah, 30Ah Auto Recognition (12V/24V)" },
      { key: "Panels", value: "Grade A Monocrystalline Solar PV Modules" },
      { key: "Warranty", value: "Long-term performance warranty" }
    ],
    features: ["High solar conversion efficiency", "Overcharge and reverse polarity protection"],
    applications: ["Rooftop solar", "Resort setups", "Rural SHS installations"],
    featured: true,
    isAvailable: true
  }
];

export const fallbackServices: ServiceItem[] = [
  {
    id: "srv_wholesale",
    title: "Wholesale & Dealership Business",
    description: "Special tier pricing, dedicated stock allocation, marketing materials, and full distributor support for hardware shops and retail dealers across Bangladesh.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80",
    link: "/contact"
  },
  {
    id: "srv_commercial",
    title: "Commercial & Industrial Project Engineering",
    description: "Direct project supply of BDS certified pure copper cables, sub-distribution boards, industrial MCB circuit breakers, and lighting layouts for towers and factories.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    link: "/contact"
  },
  {
    id: "srv_solar",
    title: "Solar Energy Setup & Consultation",
    description: "Complete off-grid and hybrid solar installations, auto charge controllers (10A-30A), monocrystalline panels, and eco-friendly clean energy infrastructure.",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80",
    link: "/contact"
  },
  {
    id: "srv_oem",
    title: "OEM & Custom Electrical Manufacturing",
    description: "Contract manufacturing of premium gang switch designs, LED drivers, PVC conduit fittings, and specialized electrical hardware under your private brand label.",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80",
    link: "/contact"
  }
];

export const fallbackPartnerReviews: PartnerReview[] = [
  {
    id: "review_1",
    author: "Aziz Electric",
    designation: "Sandwip, Chattagram",
    quote: "“ATS all products quality is excellent and reliable for our projects. Our customer and me satisfied.”",
    image: "https://atsenergybd.com/wp-content/uploads/2026/11/PHOTO-2026-11-04-13-58-39.jpg",
    rating: 5
  },
  {
    id: "review_2",
    author: "Bashkhali Enterprise",
    designation: "Bashkhali, Chattagram",
    quote: "“Best solar solutions products and excellent customer support across regular dealership shipments.”",
    rating: 5
  },
  {
    id: "review_3",
    author: "Sonar Bangla Resorts",
    designation: "Gorai Road, Thakurgaon",
    quote: "“I recently installed a 5kW solar system in my resort. Outstanding performance, top products and technical support.”",
    image: "https://atsenergybd.com/wp-content/uploads/2026/11/PHOTO-2026-11-04-14-16-19.jpg",
    rating: 5
  },
  {
    id: "review_4",
    author: "Master Electric",
    designation: "Satkania, Chattagram",
    quote: "“Their product build quality is truly excellent and warranty replacement process is fast and reliable.”",
    rating: 5
  }
];

export const fallbackFAQs: FAQItem[] = [
  {
    id: "faq_1",
    question: "HOW DOES SOLAR ENERGY & HYBRID INVERTER WORK?",
    answer: "Solar photovoltaic panels capture sunlight and convert it into DC electricity. The hybrid inverter converts this DC into standard AC 220V power for your appliances, factory machinery, or battery storage backup system."
  },
  {
    id: "faq_2",
    question: "IS SOLAR ENERGY & ATS INDUSTRIAL WIRING WORTH IT?",
    answer: "Yes, investing in pure copper cables and commercial solar setups slashes monthly national grid electricity bills by up to 60-70% with long-term 25-year panel performance warranties and zero downtime."
  },
  {
    id: "faq_3",
    question: "HOW LONG DOES COMMERCIAL INSTALLATION TAKE?",
    answer: "Typical commercial rooftop and industrial electrical distribution setups take between 3 to 10 working days, depending on system kilowatt capacity and site wiring readiness."
  },
  {
    id: "faq_4",
    question: "DO ATS SOLAR PANELS WORK ON CLOUDY DAYS?",
    answer: "Yes. ATS Monocrystalline Grade-A photovoltaic panels are engineered with high low-light sensitivity to generate steady voltage even during overcast monsoon skies."
  },
  {
    id: "faq_5",
    question: "HOW MUCH MAINTENANCE IS NEEDED?",
    answer: "Solar systems and industrial electrical fittings require very minimal upkeep. Routine periodic surface cleaning with water every few weeks ensures 100% peak generation efficiency."
  },
  {
    id: "faq_6",
    question: "CAN SOLAR POWER MY ENTIRE FACTORY OR BUILDING?",
    answer: "Absolutely. With appropriately engineered solar panel arrays, hybrid inverter banks, and battery storage capacities, ATS Energy Solution can power 100% of your factory or building requirements."
  }
];

export const fallbackKeyClients: KeyClient[] = [
  {
    id: "client_1",
    name: "Partner Client 1",
    logo: "https://atsenergybd.com/wp-content/uploads/2025/09/Screenshot_1209.png"
  },
  {
    id: "client_2",
    name: "Partner Client 2",
    logo: "https://atsenergybd.com/wp-content/uploads/2025/09/Screenshot_1207.png"
  },
  {
    id: "client_3",
    name: "Partner Client 3",
    logo: "https://atsenergybd.com/wp-content/uploads/2025/09/Screenshot_1206.png"
  },
  {
    id: "client_4",
    name: "Partner Client 4",
    logo: "https://atsenergybd.com/wp-content/uploads/2025/09/Screenshot_1204.png"
  },
  {
    id: "client_5",
    name: "Partner Client 5",
    logo: "https://atsenergybd.com/wp-content/uploads/2025/09/Screenshot_1199.png"
  },
  {
    id: "client_6",
    name: "Partner Client 6",
    logo: "https://atsenergybd.com/wp-content/uploads/2025/09/Screenshot_1198.png"
  },
  {
    id: "client_7",
    name: "Partner Client 7",
    logo: "https://atsenergybd.com/wp-content/uploads/2025/09/Screenshot_1197.png"
  },
  {
    id: "client_8",
    name: "Partner Client 8",
    logo: "https://atsenergybd.com/wp-content/uploads/2025/09/Screenshot_1196.png"
  }
];

export const fallbackAboutContent: AboutContent = {
  tagline: "Who we are >",
  title: "ABOUT US",
  aboutText: "ATS Energy Solution is a trusted Manufacturer and supplier of premium electrical and solar products in Bangladesh. We provide high-quality lighting solutions, electrical accessories, durable cables, and advanced solar systems for residential, commercial, and industrial use.",
  image: "https://atsenergybd.com/wp-content/uploads/elementor/thumbs/PHOTO-2026-11-04-12-03-12-rvuhbsabuhte5d5zw4f7uijeo5iukh2iblz1bfskdo.jpg",
  visionTitle: "Our Vision",
  visionText: "To expand our presence worldwide and build long-term business relationships based on trust, quality, and customer satisfaction.",
  missionTitle: "Our Mission",
  missionText: "With a commitment to quality, reliability, and customer satisfaction, ATS Company continues to support modern infrastructure with innovative and energy-efficient products.",
  statHappyCustomers: "50000+",
  statSuccessfulProjects: "50+",
  statDealersPartners: "150+",
  statCustomerSupport: "24h",
  valuesList: [
    "Integrity and transparency",
    "Customer-focused service",
    "Innovation and quality",
    "Strong global partnerships"
  ],
  whyChooseUsList: [
    "High-quality and certified products",
    "Competitive wholesale pricing",
    "Global sourcing and supply",
    "Fast and secure delivery",
    "Customized solutions and OEM services",
    "Professional and experienced team"
  ],
  servicesIncludeList: [
    "Global sourcing",
    "OEM and private labeling",
    "Bulk and wholesale supply",
    "International shipping",
    "Quality inspection",
    "Logistics and documentation"
  ],
  rightChoiceSubtitle: "WHY WE'RE",
  rightChoiceTitle: "THE RIGHT CHOICE",
  rightChoiceCards: [
    {
      id: "choice_1",
      title: "Dealer & Wholesale Support",
      description: "Special pricing and support for dealers, contractors, and retailers.",
      icon: "handshake"
    },
    {
      id: "choice_2",
      title: "Electrical Project Support",
      description: "Complete support for electrical and solar project requirements.",
      icon: "users"
    },
    {
      id: "choice_3",
      title: "Solar Consultation",
      description: "Professional consultation for solar setup and energy-saving solutions.",
      icon: "sun"
    }
  ]
};

export const fallbackSocialMedia: SocialMediaLinks = {
  facebook: "https://www.facebook.com/share/1BUjcTEdv2/",
  whatsapp: "https://wa.me/8801848160565",
  instagram: "https://instagram.com/atsenergybd",
  youtube: "https://youtube.com/@atsenergybd",
  linkedin: "https://linkedin.com/company/atsenergybd",
  twitter: "https://x.com/atsenergybd"
};

export const fallbackSEO: SEOMetadata = {
  metaTitle: "ATS ENERGY SOLUTIONS | Industrial Electrical & Solar Technology Bangladesh",
  metaDescription: "ATS Energy Solution is a verified Manufacturer and supplier of premium electrical and solar products in Bangladesh including AC/Emergency LED lights, switches, pure copper cables, and solar arrays.",
  metaKeywords: "ATS Energy, ATS Energy Solution, electrical manufacturer Bangladesh, LED light supplier Dhaka, Gang switch, pure copper cable BDS 900, solar auto charge controller, MCB circuit breakers",
  ogImage: "https://atsenergybd.com/wp-content/uploads/2025/09/PHOTO-2026-11-04-12-23-02.jpg",
  canonicalUrl: "https://atsenergybd.com",
  author: "ATS Energy Solutions",
  googleSiteVerification: "google-site-verification-code-sample"
};

export const fallbackLegalContent = {
  termsTitle: "Terms & Conditions",
  termsLastUpdated: "November 2026",
  termsContent: `Welcome to ATS Energy Solutions. By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions.

1. Product Information & Pricing
All product specifications, images, and descriptions published on this website are provided for informational and commercial procurement purposes. While we strive for absolute accuracy, specifications may change based on continuous engineering improvements. Official prices and dealership agreements will be confirmed via formal proforma invoice or contract.

2. Quality & Warranty
All ATS electrical cables, LED lighting solutions, gang switches, circuit breakers, and solar systems are manufactured under stringent quality control and tested in accordance with BSTI and BDS national standards. Product replacement warranty applies only against genuine manufacturing defects when installed according to recommended electrical guidelines.

3. Dealer & Wholesale Policies
Authorised dealers and distributors must adhere to the territorial agreements and minimum order quantity (MOQ) schedules established during distributor enrollment.

4. Intellectual Property
All logos, brand marks, packaging artwork, catalogs, and website content are the intellectual property of ATS Energy Solutions. Unauthorized copying or distribution without written consent is strictly prohibited.

5. Governing Law
Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Dhaka, Bangladesh.`,

  privacyTitle: "Privacy Policy",
  privacyLastUpdated: "November 2026",
  privacyContent: `At ATS Energy Solutions, we value your privacy and are committed to protecting the personal information of our clients, dealers, and site visitors.

1. Information We Collect
We collect information you voluntarily provide through our inquiry forms, dealer registration, or communication channels (such as WhatsApp, email, or telephone). This includes your name, business name, phone number, email address, and project requirements.

2. How We Use Your Information
Your details are strictly used to:
- Respond to inquiries and quotation requests.
- Provide dealership onboarding and product support.
- Communicate critical product updates and logistics notifications.
- Improve our website and service delivery standards.

3. Information Protection
We implement industry-standard security protocols to safeguard your personal data from unauthorized access, disclosure, or misuse. We never sell, lease, or distribute your private contact details to third-party marketing companies.

4. Contacting Us
If you have any questions regarding our Privacy Policy or your data, you can reach out directly to our management team via info@atsenergybd.com or +880 1848-160565.`
};

export const fallbackPopupSettings: PopupSettings = {
  isEnabled: true,
  type: 'form',
  formTitle: "GET A QUOTATION",
  formSubtitle: "Please fill up this form correctly, we will contact you as soon as possible",
  submitButtonText: "SEND",
  imageUrl: "https://atsenergybd.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-07-at-17.26.36-2-768x305.jpeg",
  imageLinkUrl: "/products"
};
