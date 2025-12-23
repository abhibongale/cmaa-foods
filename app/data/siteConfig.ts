// Site Configuration - Easy to update content
export const siteConfig = {
  // Banner Configuration
  banner: {
    location: "Kothrud",
    deliveryAreas: ["Wakad", "Baner", "Aundh"],
    showDate: true, // Set to false to hide date
  },

  // Header Configuration
  header: {
    logo: "PUNERI SNACKS & FARAL",
    navItems: [
      { label: "Savoury (Tikhat)", href: "/", active: true },
      { label: "Sweet (God)", href: "/sweet", active: false },
      { label: "Seasonal", href: "/seasonal", active: false },
    ],
  },

  // Hero Section
  hero: {
    headline: "Snap into Tradition.",
    description: "High resolution photograph breaking chakli with Besan and traditional spices. Hand-crafted in Kothrud with authentic recipes passed down through generations.",
    image: "/assets/chakali.png",
    imageAlt: "Chakli - Traditional Indian Snack",
  },

  // Faraal Box Builder Configuration
  faraalBox: {
    title: "Build Your Faraal Box",
    description: "Drag snacks into the box or click the + button.",
    maxCapacity: 4, // Maximum number of items in the box
    snacks: [
      {
        id: "1",
        name: "Yellow Chivda",
        price: 120,
        quantity: "1 kg",
        color: "bg-yellow-100",
        image: "/assets/chivda.jpg",
      },
      {
        id: "2",
        name: "Bhajani Chakli",
        price: 150,
        quantity: "1 kg",
        color: "bg-orange-100",
        image: "/assets/chakali.png",
      },
      {
        id: "3",
        name: "Shankar Pali",
        price: 100,
        quantity: "1 kg",
        color: "bg-red-50",
        image: "/assets/shankarpali.jpg",
      },
      {
        id: "4",
        name: "Besan Ladoo",
        price: 180,
        quantity: "1 kg",
        color: "bg-amber-100",
        image: "/assets/ladoo.jpg",
      },
      // Add more snacks here as needed
    ],
  },

  // Subscription Section
  subscription: {
    title: "THE PUNERI SNACK STASH",
    description: "Subscription to your favorite snack stash for regular deliveries.",
    options: [
      { label: "Bi-weekly", value: "biweekly" },
      { label: "Monthly", value: "monthly" },
    ],
    ctaText: "Subscribe Now",
  },

  // Featured Special
  featuredSpecial: {
    title: "FEATURED MONTHLY SPECIAL",
    badge: "Limited Time",
    name: "Makar Sankranti Til-Gul Ladoo",
    description: "Traditional sesame and jaggery ladoos, perfect for the harvest festival.",
    image: "/assets/ladoo.jpg",
    imageAlt: "Makar Sankranti Til-Gul Ladoo",
    // Update this monthly or as needed
    active: true,
  },

  // Ingredient Promise Section
  ingredientPromise: {
    active: true,
    title: "OUR INGREDIENT PROMISE",
    subtitle: "Slow ingredients for that homely taste.",
    imageSrc: "/assets/chakali.png",
    imageAlt: "Chakli with ingredient hotspots",
    hotspots: [
      {
        id: "besan",
        label: "Besan from Latur",
        description: "Premium gram flour sourced directly from Latur",
        top: "35%",
        left: "25%",
      },
      {
        id: "masala",
        label: "Home-ground Masala",
        description: "Freshly ground spices in our kitchen",
        top: "25%",
        left: "65%",
      },
      {
        id: "oil",
        label: "Pure Groundnut Oil",
        description: "100% pure groundnut oil for authentic taste",
        top: "60%",
        left: "50%",
      },
      // Add more hotspots as needed
    ],
  },

  // Why Puneri Section
  whyPuneri: {
    title: "WHY PUNERI?",
    features: [
      {
        icon: "ChefHat",
        title: "Hand-Fried in Kothrud",
        description: "Every batch is carefully hand-fried using traditional methods in our Kothrud kitchen.",
      },
      {
        icon: "Eye",
        title: "Ingredient Transparency",
        description: "Know exactly what goes into your snacks. We source the finest ingredients with full transparency.",
      },
      {
        icon: "BookOpen",
        title: "Traditional Recipes",
        description: "Authentic recipes passed down through generations, preserving the true Puneri taste.",
      },
    ],
  },

  // Info Cards Configuration - Add multiple cards as needed
  infoCards: [
    {
      title: "Handcrafted with Love",
      slogan: "Our Story",
      description: "Every snack is carefully prepared using traditional methods passed down through generations. We source the finest ingredients and hand-fry each batch in our Kothrud kitchen, ensuring authentic Puneri taste in every bite.",
      imageSrc: "/assets/chakali-homepage.png",
      imageAlt: "Handcrafted snacks",
      imagePosition: "right",
      backgroundColor: "bg-white",
      href: "/blog/our-story",
      clickable: true,
    },
    {
      title: "Fresh Daily, Delivered Fresh",
      slogan: "Our Promise",
      description: "We fry fresh batches every morning and deliver them the same day to your doorstep. No preservatives, no compromises—just pure, authentic flavors that remind you of home.",
      imageSrc: "/assets/chakali-homepage.png",
      imageAlt: "Fresh snacks delivery",
      imagePosition: "left",
      backgroundColor: "bg-amber-50",
      href: "/blog/fresh-daily",
      clickable: true,
    },
  ],

  // Blog Posts Configuration - Add new blog posts here
  blogPosts: [
    {
      slug: "our-story",
      title: "Handcrafted with Love",
      slogan: "Our Story",
      date: "2024-01-15",
      author: "Puneri Snacks Team",
      imageSrc: "/assets/chakali-homepage.png",
      imageAlt: "Handcrafted snacks",
      content: `
        <p>Every snack is carefully prepared using traditional methods passed down through generations. We source the finest ingredients and hand-fry each batch in our Kothrud kitchen, ensuring authentic Puneri taste in every bite.</p>
        
        <h2>The Beginning</h2>
        <p>Our journey started in the heart of Kothrud, where traditional recipes have been preserved for decades. We believe in the power of authentic flavors and the importance of handcrafted quality.</p>
        
        <h2>Our Process</h2>
        <p>Each morning, we carefully select the freshest ingredients. Our skilled artisans use age-old techniques to create snacks that bring back memories of home. No shortcuts, no compromises—just pure, authentic taste.</p>
        
        <h2>The Promise</h2>
        <p>We promise to deliver the same quality and taste that has made Puneri snacks famous. Every bite is a celebration of tradition, crafted with love and care.</p>
      `,
    },
    {
      slug: "fresh-daily",
      title: "Fresh Daily, Delivered Fresh",
      slogan: "Our Promise",
      date: "2024-01-20",
      author: "Puneri Snacks Team",
      imageSrc: "/assets/chakali-homepage.png",
      imageAlt: "Fresh snacks delivery",
      content: `
        <p>We fry fresh batches every morning and deliver them the same day to your doorstep. No preservatives, no compromises—just pure, authentic flavors that remind you of home.</p>
        
        <h2>Morning Ritual</h2>
        <p>Every day at dawn, our kitchen comes alive. Fresh ingredients are prepared, spices are ground, and the frying begins. By mid-morning, your favorite snacks are ready, still warm and crispy.</p>
        
        <h2>Same-Day Delivery</h2>
        <p>We understand that freshness matters. That's why we deliver our snacks on the same day they're made. From our kitchen to your door, ensuring you get the best taste experience.</p>
        
        <h2>No Preservatives</h2>
        <p>We believe in natural, wholesome ingredients. Our snacks contain no artificial preservatives, colors, or flavors. What you taste is pure, authentic, and made with care.</p>
      `,
    },
  ],

  // Footer Configuration
  footer: {
    socialMedia: {
      title: "Sign up on",
      links: [
        { name: "Facebook", icon: "Facebook", url: "#" },
        { name: "Instagram", icon: "Instagram", url: "#" },
        { name: "Youtube", icon: "Youtube", url: "#" },
      ],
    },
    newsletter: {
      title: "Newsletter",
      placeholder: "Enter your email",
    },
    contact: {
      title: "Contact",
      message: "Fresh batch fried this morning in Kothrud",
    },
    bottomBar: {
      message: "Fresh batch fried this morning in Kothrud • Delivering to Wakad, Baner, and Aundh",
    },
  },
};

