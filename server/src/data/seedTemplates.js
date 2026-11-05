import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATEGORIES = [
  'Clothing & Fashion',
  'Jewellery',
  'Restaurants & Food',
  'Electronics',
  'Grocery Stores',
  'Sweets & Bakery',
  'Real Estate',
  'Beauty & Wellness',
  'General Business',
  'Personal Greetings'
];

const FORMATS = [
  { name: 'Instagram Square', width: 1080, height: 1080, ratio: '1:1' },
  { name: 'Instagram Portrait', width: 1080, height: 1350, ratio: '4:5' },
  { name: 'Instagram Story', width: 1080, height: 1920, ratio: '9:16' },
  { name: 'WhatsApp Square', width: 1080, height: 1080, ratio: '1:1' },
  { name: 'WhatsApp Portrait', width: 1080, height: 1350, ratio: '4:5' }
];

const COLOR_THEMES = [
  {
    name: 'Royal Navy & Liquid Gold',
    bgStart: '#080d1e',
    bgEnd: '#04060c',
    primary: '#F5B942',
    secondary: '#FF7043',
    accent: '#FFF176',
    border: 'rgba(245, 185, 66, 0.4)',
    badgeBg: '#D97706',
    textColor: '#FFFFFF',
    tagColor: '#FDE68A'
  },
  {
    name: 'Crimson Silk & Pure Gold',
    bgStart: '#2A080C',
    bgEnd: '#130305',
    primary: '#FFD700',
    secondary: '#E11D48',
    accent: '#FFA000',
    border: 'rgba(255, 215, 0, 0.45)',
    badgeBg: '#9F1239',
    textColor: '#FFFBF0',
    tagColor: '#FFE082'
  },
  {
    name: 'Obsidian & Warm Diya Glow',
    bgStart: '#141419',
    bgEnd: '#09090D',
    primary: '#F59E0B',
    secondary: '#F97316',
    accent: '#FDE047',
    border: 'rgba(255, 255, 255, 0.15)',
    badgeBg: '#EA580C',
    textColor: '#FFFFFF',
    tagColor: '#FBBF24'
  },
  {
    name: 'Imperial Emerald & Champagne',
    bgStart: '#041F17',
    bgEnd: '#020C09',
    primary: '#E2C275',
    secondary: '#10B981',
    accent: '#FDF6B2',
    border: 'rgba(226, 194, 117, 0.35)',
    badgeBg: '#047857',
    textColor: '#FFFFFF',
    tagColor: '#A7F3D0'
  },
  {
    name: 'Mystic Plum & Festive Sparkle',
    bgStart: '#260B2B',
    bgEnd: '#0E0411',
    primary: '#F472B6',
    secondary: '#EAB308',
    accent: '#FCE7F3',
    border: 'rgba(244, 114, 182, 0.35)',
    badgeBg: '#86198F',
    textColor: '#FFFFFF',
    tagColor: '#FBCFE8'
  },
  {
    name: 'Marigold Festive Dhamaka',
    bgStart: '#301205',
    bgEnd: '#120701',
    primary: '#FBBF24',
    secondary: '#EF4444',
    accent: '#F97316',
    border: 'rgba(251, 191, 36, 0.45)',
    badgeBg: '#DC2626',
    textColor: '#FFFBEB',
    tagColor: '#FEF08A'
  },
  {
    name: 'Liquid Glass Luxury',
    bgStart: '#0F172A',
    bgEnd: '#020617',
    primary: '#38BDF8',
    secondary: '#F59E0B',
    accent: '#BAE6FD',
    border: 'rgba(255, 255, 255, 0.2)',
    badgeBg: '#0284C7',
    textColor: '#F8FAFC',
    tagColor: '#E0F2FE'
  }
];

const CATEGORY_TEMPLATES = {
  'Clothing & Fashion': [
    { title: 'Royal Ethnic Grand Diwali Sale', sub: 'Exclusive Silk Sarees, Sherwanis & Lehengas', discount: 'FLAT 50% OFF', price: 'Starts ₹999', cta: 'SHOP FESTIVE LOOKS' },
    { title: 'Diwali Festive Couture Collection', sub: 'Designer Kurtas, Indo-Western & Bridal Wear', discount: 'UP TO 40% OFF', price: 'New Arrivals 2026', cta: 'EXPLORE CATALOG' },
    { title: 'Festive Glamour Fashion Carnival', sub: 'Handcrafted Fabrics & Royal Embroidery', discount: 'BUY 1 GET 1 FREE', price: 'Limited Festive Stock', cta: 'VISIT STORE TODAY' },
    { title: 'Traditional Silk & Zari Fest', sub: 'Pure Banarasi & Kanjivaram Collection', discount: 'FLAT 35% OFF', price: 'Free Gift on ₹2999+', cta: 'CLAIM OFFER' },
    { title: 'Men\'s Festive Royal Attire', sub: 'Tailored Bandhgalas, Kurtas & Nehru Jackets', discount: 'FLAT 30% OFF', price: 'Festive Combo Deals', cta: 'UPGRADE YOUR WARDROBE' },
    { title: 'Kids Diwali Dhamaka Outfits', sub: 'Comfortable, Colorful & Festive Dresses', discount: 'FLAT 45% OFF', price: 'Combos from ₹499', cta: 'SHOP FOR KIDS' },
    { title: 'Midnight Diwali Sparkle Wardrobe', sub: 'Velvet, Sequin & Festive Party Ensembles', discount: 'UP TO 60% OFF', price: 'Doorstep Delivery', cta: 'ORDER NOW' },
    { title: 'Festive Footwear & Accessories', sub: 'Handmade Juttis, Mojaris & Embellished Clutches', discount: 'FLAT 25% OFF', price: 'Starting ₹349', cta: 'GRAB DEALS' },
    { title: 'Contemporary Festive Fusion', sub: 'Modern Silhouettes with Indian Heritage Vibes', discount: 'FLAT 40% OFF', price: 'Curated Designer Cuts', cta: 'VIEW LOOKBOOK' },
    { title: 'Diwali Mega Fashion Clearance', sub: 'Entire Festive Wardrobe on Massive Sale', discount: 'UP TO 70% OFF', price: 'Last 3 Days Only', cta: 'RUSH TO STORE' },
    { title: 'Celebrity Festive Style Edition', sub: 'Get the Red-Carpet Diwali Glow in Luxury Silk', discount: '30% OFF ALL ORDERS', price: 'Premium Designer Line', cta: 'RESERVE NOW' }
  ],
  'Jewellery': [
    { title: 'Shubh Deepawali Diamond & Gold Fest', sub: 'Zero Making Charges on All Gold & Diamond Ornaments', discount: '100% OFF MAKING CHARGES', price: 'BIS Hallmarked Gold', cta: 'BOOK APPOINTMENT' },
    { title: 'Dhanteras Shubh Mahurat Jewels', sub: 'Traditional Polki, Kundan & Temple Jewellery', discount: 'FLAT 25% OFF DIAMONDS', price: 'Gold Coin Free on ₹50k', cta: 'VISIT SHOWROOM' },
    { title: 'Royal Antique Temple Jewellery', sub: 'Heirloom Masterpieces Blessed for the Season', discount: 'SPECIAL FESTIVE RATES', price: 'Certified Purity', cta: 'DISCOVER HEIRLOOMS' },
    { title: 'Pure Silver Lakshmi & Ganesha Coins', sub: '999 Pure Silver Idols, Coins & Utensils for Puja', discount: 'FLAT 15% OFF SILVER', price: 'Starting ₹499', cta: 'BUY AUSPICIOUS GIFTS' },
    { title: 'Diwali Solitaire & Engagement Special', sub: 'IGI Certified Natural & Lab-Grown Diamonds', discount: 'SAVE UP TO ₹50,000', price: 'Lifetime Exchange', cta: 'EXPLORE RINGS' },
    { title: 'Festive Jadau & Meenakari Treasures', sub: 'Handcrafted Heritage Sets for Deepawali Nights', discount: 'FLAT 20% OFF', price: 'Bespoke Craftsmanship', cta: 'SCHEDULE A VIEWING' },
    { title: 'Modern Everyday Fine Gold & Rose Gold', sub: 'Lightweight 18k Chains, Pendants & Bangles', discount: 'FLAT ₹1,000 OFF', price: 'Modern Minimalist', cta: 'SHOP ONLINE' },
    { title: 'Precious Gemstones & Navratna Sets', sub: 'Astrological Emeralds, Rubies & Sapphires', discount: 'FLAT 30% OFF', price: 'Certified Natural Gems', cta: 'CONSULT GEMOLOGIST' },
    { title: 'Grand Festive Mangalsutra & Bangle Mela', sub: 'Over 500 New Designs for the Auspicious Season', discount: 'NO WASTAGE ON GOLD', price: 'Transparent Pricing', cta: 'EXPLORE DESIGNS' },
    { title: 'Shimmering Silver Puja Thali Sets', sub: 'Exquisite Pure Silver Puja Accessories & Diyas', discount: '20% OFF ALL PUJA SETS', price: 'Gift Box Included', cta: 'ORDER THALI SET' },
    { title: 'Dhanteras Lucky Gold Pass', sub: 'Pre-book Gold Today at Guaranteed Lowest Prices', discount: 'LOCKED PRICE GUARANTEE', price: 'Zero Risk Booking', cta: 'LOCK YOUR RATE' }
  ],
  'Restaurants & Food': [
    { title: 'Grand Diwali Royal Feast Buffet', sub: 'Unlimited Festive Thali with 30+ Delicacies', discount: 'FLAT 25% OFF GROUP BILL', price: 'Special Thali ₹799', cta: 'RESERVE TABLE' },
    { title: 'Festive Family Dinner Gala', sub: 'Celebrate Deepawali with Royal Mughlai & Indian Flavors', discount: 'KIDS DINE FREE', price: 'Live Sitar & Ambiance', cta: 'BOOK YOUR SEATS' },
    { title: 'Diwali Gourmet Corporate Lunch Boxes', sub: 'Customized Festive Thali Deliveries for Your Team', discount: '15% OFF BULK ORDERS', price: 'Starting ₹299/Box', cta: 'GET CORPORATE QUOTE' },
    { title: 'Festive Biryani & Kebab Dhamaka', sub: 'Slow Cooked Dum Biryani & Charcoal Grilled Kebabs', discount: 'FREE SWEET BOX ON ORDERS', price: 'Order on Zomato/Swiggy', cta: 'ORDER ONLINE' },
    { title: 'Diwali Special Street Food Mela', sub: 'Chaats, Chole Bhature, Pav Bhaji & Hot Jalebis', discount: 'FLAT 20% OFF', price: 'Authentic Desi Flavors', cta: 'JOIN THE MELA' },
    { title: 'Candlelight Festive Rooftop Soiree', sub: 'Stunning Skyline Views, Handcrafted Mocktails & Cuisine', discount: 'COMPLIMENTARY DESSERT', price: 'Romantic Ambiance', cta: 'BOOK ROOFTOP' },
    { title: 'Festive Brunch & Live Mithai Counter', sub: 'Grand Sunday Diwali Spread for Family & Friends', discount: 'EARLY BIRD 20% OFF', price: '12 PM - 4 PM', cta: 'RESERVE BRUNCH' },
    { title: 'Diwali Night Chef\'s Tasting Menu', sub: '7-Course Contemporary Indian Culinary Journey', discount: 'LIMITED 40 SEATS', price: 'Curated by Master Chef', cta: 'BOOK EXPERIENCE' },
    { title: 'Traditional South Indian Festive Sadhya', sub: 'Served on Banana Leaf with 21 Pure Vegetarian Dishes', discount: 'FLAT 15% OFF', price: 'Pure Ghee Delights', cta: 'PRE-BOOK SADHYA' },
    { title: 'Diwali Party Catering at Your Home', sub: 'Live Counters, Barbecue, Starters & Complete Setup', discount: 'COMPLIMENTARY MOCKTAIL BAR', price: 'Minimum 20 Guests', cta: 'CALL FOR CATERING' }
  ],
  'Electronics': [
    { title: 'Diwali Mega Tech Dhamaka', sub: 'Smartphones, 4K Smart TVs, Laptops & Home Audio', discount: 'UP TO 65% OFF', price: 'No Cost EMI from ₹999/mo', cta: 'GRAB TECH DEALS' },
    { title: 'Smart Home & Big Screen Fest', sub: 'Upgrade to OLED TVs, Soundbars & Smart Lighting', discount: 'FREE SOUNDBAR ON OLED TVs', price: 'Instant Bank Cashback 10%', cta: 'SHOP SMART HOME' },
    { title: 'Flagship Smartphones Diwali Sale', sub: 'Latest 5G Phones with Exchange Bonus up to ₹10,000', discount: 'EXTRA ₹8,000 EXCHANGE BONUS', price: '0 Down Payment', cta: 'UPGRADE PHONE' },
    { title: 'Laptops & Workstation Festive Bonanza', sub: 'High Performance Gaming & Productivity Laptops', discount: 'FREE ACCESSORY KIT ₹4,999', price: '2 Year Extended Warranty', cta: 'EXPLORE LAPTOPS' },
    { title: 'Kitchen Appliances Diwali Upgrade', sub: 'Air Fryers, Microwaves, Food Processors & Coffee Makers', discount: 'FLAT 40% OFF', price: 'Starting ₹1,499', cta: 'UPGRADE KITCHEN' },
    { title: 'Refrigerators & Washing Machines Mela', sub: 'Energy Efficient Inverter Appliances with 10Y Warranty', discount: 'UP TO 50% OFF + EXCHANGE', price: 'Free Installation', cta: 'ORDER HOME APPLIANCES' },
    { title: 'Wireless Audio & Smartwatches Extravaganza', sub: 'ANC Earbuds, Bluetooth Speakers & Fitness Bands', discount: 'STARTING AT ₹999', price: 'Top Brands Guaranteed', cta: 'SHOP WEARABLES' },
    { title: 'Gaming Consoles & Accessories Fest', sub: 'PS5, Xbox, VR Headsets & Festive Game Bundles', discount: 'FLAT 20% OFF BUNDLES', price: 'Limited Festive Stock', cta: 'LEVEL UP NOW' },
    { title: 'Air Purifiers for Clean Diwali Air', sub: 'HEPA True Filtration Smart Purifiers for Healthy Living', discount: 'FLAT 35% OFF', price: 'Breathe Pure at Home', cta: 'BUY AIR PURIFIER' },
    { title: 'Home Theater & Surround Sound Experience', sub: 'Dolby Atmos Soundbars & Subwoofers for Diwali Cinema', discount: 'SAVE UP TO ₹15,000', price: 'Free Demo at Home', cta: 'HEAR THE POWER' }
  ],
  'Grocery Stores': [
    { title: 'Diwali Shubh Rasoi Mega Mart', sub: 'Pure Ghee, Dry Fruits, Basmati Rice & Festive Spices', discount: 'FLAT 30% OFF ESSENTIALS', price: 'Cashback on ₹1500+ cart', cta: 'STATION YOUR PANTRY' },
    { title: 'Premium Royal Dry Fruit Gift Hampers', sub: 'Cashews, Almonds, Pistachios, Kishmish & Walnuts', discount: 'BUY 2 HAMPERS GET 1 FREE', price: 'Luxury Wooden Box Packs', cta: 'ORDER HAMPERS' },
    { title: 'Festive Oil, Atta & Sugar Wholesale Deal', sub: 'Stock up for Sweet-Making with Super Saver Rates', discount: 'BULK SAVINGS UP TO 40%', price: 'Daily Fresh Stock', cta: 'SHOP BULK DEALS' },
    { title: 'Diwali Puja Samagri All-in-One Kit', sub: 'Includes Gangajal, Roli, Akshat, Kapoor, Janeu & Diyas', discount: 'COMPLETE KIT AT ₹299', price: '100% Pure & Vedic', cta: 'BUY PUJA KIT' },
    { title: 'Organic & Farm Fresh Harvest Fest', sub: 'Organic Jaggery, Cold-Pressed Oils & Heritage Grains', discount: 'FLAT 20% OFF', price: 'Naturally Sourced', cta: 'CHOOSE ORGANIC' },
    { title: 'Exotic Chocolates & Gourmet Treats', sub: 'Imported Festive Confectionery, Cookies & Snacks', discount: 'FLAT 25% OFF', price: 'Festive Tins Available', cta: 'INDULGE SWEETLY' },
    { title: 'Sparkling Household Cleaning Fest', sub: 'Deep Cleaning Supplies, Detergents & Home Fragrances', discount: 'BUY 1 GET 1 FREE', price: 'Get Ready for Diwali', cta: 'CLEAN YOUR HOME' },
    { title: 'Festive Beverage & Mocktail Syrups', sub: 'Artisanal Sharbat, Rose Syrup, Badam Thandai & Juices', discount: 'FLAT 35% OFF', price: 'Family Packs Available', cta: 'REFRESH GUESTS' },
    { title: 'Diwali Snack & Namkeen Bonanza', sub: 'Crunchy Chakli, Bhujia, Mathri & Kaju Mixtures', discount: 'FLAT 25% OFF', price: 'Freshly Packaged', cta: 'SHOP NAMKEEN' },
    { title: 'Midnight Quick Grocery Delivery', sub: 'Forgotten something for Diwali? Delivered in 15 Minutes!', discount: 'FREE EXPRESS DELIVERY', price: 'Use Code: DIWALIQUICK', cta: 'ORDER IN 15 MINS' }
  ],
  'Sweets & Bakery': [
    { title: 'Pure Desi Ghee Festive Mithai', sub: 'Kaju Katli, Motichoor Ladoo, Peda & Gulab Jamun', discount: 'FRESH BATCHES DAILY', price: 'Pre-book Sweet Boxes', cta: 'ORDER MITHAI' },
    { title: 'Artisanal Fusion Diwali Chocolates', sub: 'Paan Truffles, Saffron Bonbons & Roasted Almond Rocks', discount: 'FLAT 20% OFF GIFT BOXES', price: 'Customized Logo Engraving', cta: 'CUSTOMIZE BOX' },
    { title: 'Royal Dry Fruit Mithai Collection', sub: 'Sugar-Free Anjeer Barfi, Kaju Roll & Pistachio Delight', discount: '100% NATURAL SWEETNESS', price: 'Diabetic Friendly Options', cta: 'ORDER HEALTHY SWEETS' },
    { title: 'Festive Gourmet Bakery Treats', sub: 'Rasmalai Cake, Gulab Jamun Cheesecake & Pistachio Tarts', discount: 'FLAT 15% OFF CAKES', price: 'Pre-order for Diwali Eve', cta: 'EXPLORE BAKERY' },
    { title: 'Corporate Mithai & Hamper Express', sub: 'Custom Branded Sweet Boxes for Employees & Clients', discount: 'UP TO 30% ON 50+ BOXES', price: 'Pan-India Corporate Dispatch', cta: 'REQUEST CATALOG' },
    { title: 'Crispy Saffron Jalebi & Rabri Special', sub: 'Hot, Syrupy Jalebis Made Fresh in Desi Ghee', discount: 'BUY 500g GET 250g FREE', price: 'Special Evening Counter', cta: 'TASTE TRADITION' },
    { title: 'Traditional Bengali Festive Sweets', sub: 'Authentic Sondesh, Rasgulla, Cham Cham & Mishti Doi', discount: 'FLAT 20% OFF', price: 'Freshly Flown Daily', cta: 'INDULGE NOW' },
    { title: 'Diwali Macarons & Tea Cake Hampers', sub: 'Cardamom Scented Macarons, Spiced Carrot Tea Cakes', discount: 'LIMITED FESTIVE EDITION', price: 'Gift-Ready Ribbon Boxes', cta: 'ORDER MACARONS' },
    { title: 'Shahi Soan Papdi & Dry Sweets Mela', sub: 'Flaky Almond Soan Papdi & Rich Besan Ladoos', discount: 'SPECIAL MULTI-PACK SAVINGS', price: 'Long Shelf Life', cta: 'SHOP MULTI-PACKS' },
    { title: 'Bespoke Golden Mithai Box', sub: 'Gilded with 24k Edible Gold Foil & Saffron Infusion', discount: 'ULTRA LUXURY EDITION', price: 'Limited 100 Boxes Only', cta: 'RESERVE LUXURY BOX' }
  ],
  'Real Estate': [
    { title: 'Diwali Shubh Muhurat Home Fest', sub: 'Luxury 2 & 3 BHK Living with Panoramic City Views', discount: 'ZERO STAMP DUTY + FREE GOLD COIN', price: 'Homes starting ₹59 Lakhs', cta: 'BOOK SITE VISIT' },
    { title: 'Grand Festive Villa Bonanza', sub: 'Exclusive Gated Community Villas with Private Garden', discount: 'SAVE UP TO ₹15 LAKHS', price: 'Ready to Move In', cta: 'DOWNLOAD BROCHURE' },
    { title: 'Dhanteras Commercial Office Spaces', sub: 'High ROI Grade-A Corporate Suites in Prime Hub', discount: 'GUARANTEED 9% RENTAL YIELD', price: 'Flexible Payment Plans', cta: 'EXPLORE INVESTMENTS' },
    { title: 'Penthouse Living Above the Clouds', sub: 'Duplex Sky Mansions with Private Plunge Pool & Deck', discount: 'COMPLIMENTARY MODULAR INTERIORS', price: 'Ultra-Luxury Enclave', cta: 'SCHEDULE PRIVATE TOUR' },
    { title: 'Affordable Festive Dream Homes', sub: 'Modern High-Rise Living with 40+ Lifestyle Amenities', discount: 'NO EMI TILL POSSESSION', price: 'Starting ₹32 Lakhs', cta: 'CHECK ELIGIBILITY' },
    { title: 'Eco-Living Smart Green Residences', sub: 'Solar Powered, Rainwater Harvested Resort-Style Living', discount: 'SPECIAL DIWALI PRICING', price: '80% Open Green Spaces', cta: 'VIEW MASTERPLAN' },
    { title: 'Prime Residential Plots on Golden Highway', sub: 'Clear Title Gated Land with Immediate Registry', discount: 'GOLD COIN ON EVERY BOOKING', price: 'Plots from ₹18 Lakhs', cta: 'RESERVE YOUR PLOT' },
    { title: 'Smart Studio Apartments for Gen-Z', sub: 'Fully Furnished Co-Living Studios Near IT Corridors', discount: 'ASSURED RENTAL FROM DAY 1', price: 'Starting ₹24 Lakhs', cta: 'EXPLORE HIGH YIELD' },
    { title: 'Diwali Home Buyer Cashback Dhamaka', sub: 'Book during Diwali Week & Win a Brand New Car', discount: 'LUCKY DRAW CAR VOUCHER', price: 'Exclusive Festive Offer', cta: 'ENTER LUCKY DRAW' },
    { title: 'Lakefront Royal Residences', sub: 'Wake up to Serene Water Views Every Morning', discount: 'ZERO PROCESSING FEE ON LOANS', price: 'Exclusive 4 BHK Mansions', cta: 'VISIT SHOW APARTMENT' }
  ],
  'Beauty & Wellness': [
    { title: 'Diwali Glowing Radiance Spa Package', sub: 'Gold Facial, Ayurvedic Abhyanga & Rose Body Polish', discount: 'FLAT 40% OFF FESTIVE PACKAGES', price: 'Glow this Deepawali', cta: 'BOOK SPA SESSION' },
    { title: 'Festive Hair Makeover & Keratin Fest', sub: 'Balayage, Botox Treatment, Global Color & Styling', discount: 'FLAT 30% OFF ALL SERVICES', price: 'Top Stylists on Board', cta: 'BOOK MAKEOVER' },
    { title: 'Bridal & Festive Makeup Masterclass', sub: 'Get Camera-Ready with Celebrity HD Airbrush Makeup', discount: 'PRE-BOOK & SAVE 25%', price: 'Complete Bridal Glow', cta: 'RESERVE YOUR DATE' },
    { title: 'Organic Ayurvedic Skincare Gift Sets', sub: 'Kumkumadi Oil, Ubtan Body Scrub & 24k Gold Serum', discount: 'BUY 2 PRODUCTS GET 1 FREE', price: '100% Chemical-Free', cta: 'SHOP AYURVEDA' },
    { title: 'Men\'s Festive Grooming & Hair Spa', sub: 'Beard Sculpting, Charcoal Facial & Relaxing Massage', discount: 'COMBO AT JUST ₹999', price: 'Step Out Looking Sharp', cta: 'BOOK GROOMING' },
    { title: 'Diwali Wellness Detox & Yoga Retreat', sub: 'Rejuvenate Your Mind, Body & Spirit Post Festivities', discount: 'EARLY BIRD 20% DISCOUNT', price: 'Weekend Healing Camp', cta: 'JOIN RETREAT' },
    { title: 'Laser Skin Glow & Anti-Ageing Clinic', sub: 'Advanced US-FDA Approved Skin Brightening Sessions', discount: 'FIRST TRIAL SESSION AT 50% OFF', price: 'Dermatologist Directed', cta: 'BOOK CONSULTATION' },
    { title: 'Festive Nail Art & Gel Extensions Mela', sub: 'Glittery Festive Tips, 3D Stones & Chrome Gel Polish', discount: 'FLAT 35% OFF NAILS', price: 'Designs that Match Your Silk', cta: 'GET YOUR NAILS DONE' },
    { title: 'Herbal Mehendi & Henna Art Sessions', sub: 'Traditional Rajasthani & Arabic Bridal Henna Designs', discount: 'COMPLIMENTARY FAMILY HANDS', price: 'Organic Dark Stain Henna', cta: 'BOOK MEHENDI ARTIST' },
    { title: 'Aromatherapy & Essential Oil Diffuser Sets', sub: 'Festive Home Scents of Jasmine, Sandalwood & Marigold', discount: 'FLAT 30% OFF', price: 'Transform Home Ambiance', cta: 'SHOP SCENTS' }
  ],
  'General Business': [
    { title: 'Corporate Diwali Gifting Catalog 2026', sub: 'Custom Eco-Hampers, Tech Merch, Pens & Leather Goods', discount: 'UP TO 35% ON BULK INVOICES', price: 'Free Custom Brand Engraving', cta: 'GET CATALOG' },
    { title: 'Diwali B2B Digital Marketing Dhamaka', sub: 'SEO, Google Ads & Social Media Campaigns for Festive Boost', discount: '30% BONUS AD CREDITS', price: 'Multiply Your Festive Sales', cta: 'SCALE YOUR SALES' },
    { title: 'Printing & Packaging Festive Express', sub: 'Custom Sweets Boxes, Shopping Bags & Gold Foil Tags', discount: 'FLAT 20% OFF FIRST ORDER', price: 'Super-Fast 48h Turnaround', cta: 'GET SAMPLES' },
    { title: 'Festive Business Loan & Capital Boost', sub: 'Zero Collateral Working Capital Loans for Diwali Inventory', discount: 'SPECIAL 8.99% INTEREST RATE', price: 'Instant Disbursal in 24h', cta: 'APPLY NOW' },
    { title: 'Event Production & Diwali Light Decor', sub: 'Turnkey Lighting, Sound, Stage & Floral Installations', discount: '15% OFF CORPORATE DIWALI NIGHTS', price: 'Professional Management', cta: 'GET EVENT QUOTE' },
    { title: 'Commercial Cleaning & Office Deep Sanitization', sub: 'Prepare Your Workspace for Shubh Deepawali Puja', discount: 'FLAT 25% OFF WEEKEND SLOTS', price: 'Certified Cleaning Crew', cta: 'SCHEDULE CLEANING' },
    { title: 'Fleet Logistics & Express Courier Dispatch', sub: 'Same-Day Gift Deliveries Across the Entire Metropolis', discount: 'FLAT RATE ₹49 PER PARCEL', price: 'Real-time GPS Tracking', cta: 'BOOK PICKUP' },
    { title: 'Accounting, GST & Year-End Tax Consultation', sub: 'Shubh Muhurat Financial Advisory for Growing Enterprises', discount: 'FREE 1-HOUR CONSULTATION', price: 'Certified CAs on Call', cta: 'CONSULT EXPERTS' },
    { title: 'Custom Branded Silver & Brass Mementos', sub: 'Commemorative Coins, Trophies & Festive Plaques', discount: 'NO SETUP CHARGES', price: 'Precision Laser Etching', cta: 'REQUEST MOCKUP' },
    { title: 'Staff Festive Uniforms & T-Shirts', sub: 'Embroidered Festive Kurtas & Polos for Your Entire Team', discount: 'FLAT 30% OFF ON 25+ UNITS', price: 'Premium Cotton Blend', cta: 'ORDER UNIFORMS' }
  ],
  'Personal Greetings': [
    { title: 'Shubh Deepawali Auspicious Blessings', sub: 'May the Divine Lights of Diwali Bring Endless Joy & Health', discount: 'FROM OUR FAMILY TO YOURS', price: 'Warm Festive Greetings', cta: 'SEND BLESSINGS' },
    { title: 'Warm Festive Greetings & Prosperity', sub: 'Wishing You and Your Loved Ones a Season of Abundant Light', discount: 'PEACE, WEALTH & HARMONY', price: 'Happy Diwali 2026', cta: 'SHARE WISHES' },
    { title: 'Divine Maha Lakshmi & Ganesha Kripa', sub: 'May Goddess Lakshmi Shower Her Choicest Auspicious Wealth', discount: 'AUSPICIOUS CELEBRATIONS', price: 'Shubh Deepawali', cta: 'SHARE GREETING' },
    { title: 'Joy, Sparklers & Sweet Beginnings', sub: 'Let Every Diya Fill Your Heart with Laughter and Love', discount: 'CELEBRATE TOGETHER', price: 'Festival of Lights', cta: 'SHARE WITH FAMILY' },
    { title: 'Sacred Rangoli & Glowing Hearts', sub: 'Spreading Warmth, Happiness and Good Tidings This Season', discount: 'SEASON OF GRATITUDE', price: 'Happy Deepawali', cta: 'SEND FESTIVE LOVE' },
    { title: 'Festival of Lights Family Celebration', sub: 'Creating Cherished Festive Memories that Last a Lifetime', discount: 'BLESSED HOLIDAY', price: 'Peace & Good Health', cta: 'FORWARD GREETING' },
    { title: 'Dhanteras Shubh Wealth & Prosperity', sub: 'May This Auspicious Day Mark the Start of Golden Success', discount: 'SHUBH DHANTERAS', price: 'Good Fortune Always', cta: 'SHARE PROSPERITY' },
    { title: 'Govardhan Puja & Bhai Dooj Love', sub: 'Honoring Sacred Traditions, Sibling Bonds and Community', discount: 'HAPPY BHAI DOOJ', price: 'Festive Togetherness', cta: 'SHARE TRADITION' },
    { title: 'Sparkle, Shine & Spread Kind Light', sub: 'Be the Reason Someone Smiles and Celebrates This Diwali', discount: 'SPREAD LIGHT & HOPE', price: 'Kindness in Action', cta: 'SPREAD JOY' },
    { title: 'Green & Eco-Friendly Diwali Greetings', sub: 'Celebrate with Lights, Smiles and a Greener Planet for All', discount: 'SAFE & CLEAN DIWALI', price: 'Nature First Celebration', cta: 'SHARE ECO WISHES' }
  ]
};

// Generates Fabric.js objects for a given template configuration
function generateCanvasObjects(tpl, theme, format) {
  const w = format.width;
  const h = format.height;

  const objects = [];

  // 1. Background gradient rect
  objects.push({
    type: 'rect',
    id: 'bg-rect',
    left: 0,
    top: 0,
    width: w,
    height: h,
    fill: theme.bgStart,
    selectable: false,
    evented: false,
    strokeWidth: 0
  });

  // 2. Subtle ambient glow circle (diya ambient lighting)
  objects.push({
    type: 'circle',
    id: 'ambient-glow-1',
    left: w * 0.5,
    top: h * 0.35,
    radius: w * 0.38,
    originX: 'center',
    originY: 'center',
    fill: 'rgba(245, 185, 66, 0.08)',
    selectable: false,
    evented: false
  });

  // 3. Ornate Double Golden Border
  const pad = 40;
  objects.push({
    type: 'rect',
    id: 'frame-outer',
    left: pad,
    top: pad,
    width: w - (pad * 2),
    height: h - (pad * 2),
    fill: 'transparent',
    stroke: theme.border,
    strokeWidth: 2,
    rx: 16,
    ry: 16,
    selectable: false,
    evented: false
  });

  objects.push({
    type: 'rect',
    id: 'frame-inner',
    left: pad + 12,
    top: pad + 12,
    width: w - (pad * 2) - 24,
    height: h - (pad * 2) - 24,
    fill: 'transparent',
    stroke: 'rgba(245, 185, 66, 0.2)',
    strokeWidth: 1,
    strokeDashArray: [8, 6],
    rx: 12,
    ry: 12,
    selectable: false,
    evented: false
  });

  // 4. Decorative Mandala / Festive Top Ornament
  objects.push({
    type: 'circle',
    id: 'mandala-core',
    left: w * 0.5,
    top: 90,
    radius: 32,
    originX: 'center',
    originY: 'center',
    fill: 'rgba(245, 185, 66, 0.15)',
    stroke: theme.primary,
    strokeWidth: 1.5,
    selectable: true
  });

  objects.push({
    type: 'text',
    id: 'festive-icon',
    text: '✨  🪔  ✨',
    left: w * 0.5,
    top: 90,
    originX: 'center',
    originY: 'center',
    fontSize: 28,
    fill: theme.primary,
    selectable: true
  });

  // 5. Brand Name / Header Tag
  objects.push({
    type: 'text',
    id: 'brand-name',
    editableKey: 'brandName',
    text: 'YOUR BRAND NAME',
    left: w * 0.5,
    top: 145,
    originX: 'center',
    originY: 'center',
    fontFamily: 'Montserrat',
    fontSize: 20,
    fontWeight: '700',
    charSpacing: 300,
    fill: theme.tagColor || '#FDE68A',
    selectable: true
  });

  // 6. Main Headline (Title)
  const isTall = h > 1400;
  const headlineTop = isTall ? 320 : 250;
  objects.push({
    type: 'textbox',
    id: 'headline',
    editableKey: 'headline',
    text: tpl.title.toUpperCase(),
    left: w * 0.5,
    top: headlineTop,
    originX: 'center',
    originY: 'center',
    width: w - 160,
    textAlign: 'center',
    fontFamily: 'Playfair Display',
    fontSize: isTall ? 58 : 46,
    fontWeight: '800',
    lineHeight: 1.2,
    fill: theme.textColor,
    selectable: true,
    shadow: {
      color: 'rgba(0, 0, 0, 0.7)',
      blur: 15,
      offsetX: 0,
      offsetY: 4
    }
  });

  // 7. Subheadline
  const subTop = headlineTop + (isTall ? 140 : 110);
  objects.push({
    type: 'textbox',
    id: 'subheadline',
    editableKey: 'subheadline',
    text: tpl.sub,
    left: w * 0.5,
    top: subTop,
    originX: 'center',
    originY: 'center',
    width: w - 220,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontSize: 24,
    fontWeight: '400',
    fill: '#D1D5DB',
    selectable: true
  });

  // 8. Discount / Offer Badge
  const badgeTop = subTop + (isTall ? 140 : 105);
  objects.push({
    type: 'rect',
    id: 'discount-badge-bg',
    left: w * 0.5,
    top: badgeTop,
    originX: 'center',
    originY: 'center',
    width: 320,
    height: 64,
    rx: 32,
    ry: 32,
    fill: theme.badgeBg,
    stroke: theme.primary,
    strokeWidth: 2,
    selectable: true,
    shadow: {
      color: 'rgba(245, 185, 66, 0.35)',
      blur: 20,
      offsetX: 0,
      offsetY: 0
    }
  });

  objects.push({
    type: 'text',
    id: 'discount-text',
    editableKey: 'discount',
    text: tpl.discount,
    left: w * 0.5,
    top: badgeTop,
    originX: 'center',
    originY: 'center',
    fontFamily: 'Montserrat',
    fontSize: 26,
    fontWeight: '800',
    charSpacing: 100,
    fill: '#FFFFFF',
    selectable: true
  });

  // 9. Central Visual / Placeholder Frame (e.g. for user's product or celebratory Diya)
  const productBoxTop = badgeTop + (isTall ? 280 : 210);
  const boxHeight = isTall ? 440 : 230;

  objects.push({
    type: 'rect',
    id: 'product-placeholder-border',
    left: w * 0.5,
    top: productBoxTop,
    originX: 'center',
    originY: 'center',
    width: w - 280,
    height: boxHeight,
    rx: 20,
    ry: 20,
    fill: 'rgba(255, 255, 255, 0.04)',
    stroke: 'rgba(245, 185, 66, 0.4)',
    strokeWidth: 1.5,
    selectable: true
  });

  objects.push({
    type: 'text',
    id: 'price-tag',
    editableKey: 'price',
    text: tpl.price,
    left: w * 0.5,
    top: productBoxTop - 15,
    originX: 'center',
    originY: 'center',
    fontFamily: 'Cinzel',
    fontSize: 32,
    fontWeight: '700',
    fill: theme.primary,
    selectable: true
  });

  objects.push({
    type: 'text',
    id: 'product-hint',
    text: '✦  CLICK TO INSERT PRODUCT PHOTO OR LOGO  ✦',
    left: w * 0.5,
    top: productBoxTop + 35,
    originX: 'center',
    originY: 'center',
    fontFamily: 'Outfit',
    fontSize: 16,
    charSpacing: 120,
    fill: 'rgba(255, 255, 255, 0.45)',
    selectable: true
  });

  // 10. Call-to-action button
  const ctaTop = isTall ? (h - 220) : (h - 150);
  objects.push({
    type: 'rect',
    id: 'cta-bg',
    left: w * 0.5,
    top: ctaTop,
    originX: 'center',
    originY: 'center',
    width: 300,
    height: 54,
    rx: 27,
    ry: 27,
    fill: theme.primary,
    selectable: true,
    shadow: {
      color: 'rgba(245, 185, 66, 0.4)',
      blur: 25,
      offsetX: 0,
      offsetY: 2
    }
  });

  objects.push({
    type: 'text',
    id: 'cta-text',
    editableKey: 'cta',
    text: tpl.cta,
    left: w * 0.5,
    top: ctaTop,
    originX: 'center',
    originY: 'center',
    fontFamily: 'Outfit',
    fontSize: 19,
    fontWeight: '700',
    charSpacing: 150,
    fill: '#0A0C14',
    selectable: true
  });

  // 11. Footer / Contact bar
  const footerTop = isTall ? (h - 90) : (h - 65);
  objects.push({
    type: 'text',
    id: 'contact-info',
    editableKey: 'contact',
    text: '📞 +91 98765 43210  •  🌐 www.yourbrand.com  •  📍 Main Market Road',
    left: w * 0.5,
    top: footerTop,
    originX: 'center',
    originY: 'center',
    fontFamily: 'Outfit',
    fontSize: 17,
    fontWeight: '400',
    fill: '#9CA3AF',
    selectable: true
  });

  return objects;
}

// Generate the 100+ templates collection
function generateAllTemplates() {
  const templates = [];
  let counter = 1;

  for (const category of CATEGORIES) {
    const tplList = CATEGORY_TEMPLATES[category];
    
    tplList.forEach((tpl, idx) => {
      // Pick cycling format and theme to ensure high diversity
      const format = FORMATS[(counter + idx) % FORMATS.length];
      const theme = COLOR_THEMES[(counter * 3 + idx) % COLOR_THEMES.length];
      
      const id = `template-${String(counter).padStart(3, '0')}`;
      const isPopular = counter % 3 === 0 || counter <= 10;
      const isNew = counter % 4 === 0;

      const objects = generateCanvasObjects(tpl, theme, format);

      const templateEntry = {
        id,
        name: tpl.title,
        category,
        format: format.name,
        width: format.width,
        height: format.height,
        aspectRatio: format.ratio,
        tags: [
          category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'),
          format.name.toLowerCase().replace(/ /g, '-'),
          'diwali-2026',
          'festive-sale'
        ],
        isPopular,
        isNew,
        colors: {
          primary: theme.primary,
          secondary: theme.secondary,
          accent: theme.accent,
          bgStart: theme.bgStart,
          bgEnd: theme.bgEnd,
          badgeBg: theme.badgeBg,
          text: theme.textColor,
          tag: theme.tagColor
        },
        fonts: {
          headline: 'Playfair Display',
          subheadline: 'Outfit',
          body: 'Outfit',
          badge: 'Montserrat',
          accent: 'Cinzel'
        },
        editableFields: {
          brandName: 'YOUR BRAND NAME',
          headline: tpl.title.toUpperCase(),
          subheadline: tpl.sub,
          discount: tpl.discount,
          price: tpl.price,
          cta: tpl.cta,
          contact: '📞 +91 98765 43210  •  🌐 www.yourbrand.com'
        },
        canvasData: {
          version: '5.3.0',
          width: format.width,
          height: format.height,
          background: theme.bgStart,
          objects
        }
      };

      templates.push(templateEntry);
      counter++;
    });
  }

  return templates;
}

const templates = generateAllTemplates();
const outPath = path.join(__dirname, 'templates.json');
fs.writeFileSync(outPath, JSON.stringify(templates, null, 2), 'utf-8');
console.log(`Successfully generated and seeded ${templates.length} distinct Diwali templates to ${outPath}!`);
