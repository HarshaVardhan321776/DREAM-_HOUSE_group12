// import house images
import House1 from './assets/img/houses/house1.png';
import House2 from './assets/img/houses/house2.png';
import House3 from './assets/img/houses/house3.png';
import House4 from './assets/img/houses/house4.png';
import House5 from './assets/img/houses/house5.png';
import House6 from './assets/img/houses/house6.png';
import House7 from './assets/img/houses/house7.png';
import House8 from './assets/img/houses/house8.png';
import House9 from './assets/img/houses/house9.png';
import House10 from './assets/img/houses/house10.png';
import House11 from './assets/img/houses/house11.png';
import House12 from './assets/img/houses/house12.png';
// import house large images
import House1Lg from './assets/img/houses/house1lg.png';
import House2Lg from './assets/img/houses/house2lg.png';
import House3Lg from './assets/img/houses/house3lg.png';
import House4Lg from './assets/img/houses/house4lg.png';
import House5Lg from './assets/img/houses/house5lg.png';
import House6Lg from './assets/img/houses/house6lg.png';
import House7Lg from './assets/img/houses/house7lg.png';
import House8Lg from './assets/img/houses/house8lg.png';
import House9Lg from './assets/img/houses/house9lg.png';
import House10Lg from './assets/img/houses/house10lg.png';
import House11Lg from './assets/img/houses/house11lg.png';
import House12Lg from './assets/img/houses/house12lg.png';

// import apartments images
import Apartment1 from './assets/img/apartments/a1.png';
import Apartment2 from './assets/img/apartments/a2.png';
import Apartment3 from './assets/img/apartments/a3.png';
import Apartment4 from './assets/img/apartments/a4.png';
import Apartment5 from './assets/img/apartments/a5.png';
import Apartment6 from './assets/img/apartments/a6.png';
// import apartments large images
import Apartment1Lg from './assets/img/apartments/a1lg.png';
import Apartment2Lg from './assets/img/apartments/a2lg.png';
import Apartment3Lg from './assets/img/apartments/a3lg.png';
import Apartment4Lg from './assets/img/apartments/a4lg.png';
import Apartment5Lg from './assets/img/apartments/a5lg.png';
import Apartment6Lg from './assets/img/apartments/a6lg.png';

// import agents images
import Agent1 from './assets/img/agents/agent1.png';
import Agent2 from './assets/img/agents/agent2.png';
import Agent3 from './assets/img/agents/agent3.png';
import Agent4 from './assets/img/agents/agent4.png';
import Agent5 from './assets/img/agents/agent5.png';
import Agent6 from './assets/img/agents/agent6.png';
import Agent7 from './assets/img/agents/agent7.png';
import Agent8 from './assets/img/agents/agent8.png';
import Agent9 from './assets/img/agents/agent9.png';
import Agent10 from './assets/img/agents/agent10.png';
import Agent11 from './assets/img/agents/agent11.png';
import Agent12 from './assets/img/agents/agent12.png';

export const housesData = [
  {
    id: 1,
    type: 'House',
    name: 'House 1',
    description:
      'Expansive six-bedroom retreat with open-plan living, double-height windows, and a chef-inspired kitchen that flows to a sunny patio. Perfect for households that entertain often, with quiet bedrooms tucked away upstairs for privacy.',
    image: House1,
    imageLg: House1Lg,
    country: 'United States',
    address: '15106 Hawthorne Blvd, Lawndale, CA 90260',
    bedrooms: '6',
    bathrooms: '3',
    surface: '4200 sq ft',
    year: '2016',
    price: '110000',
    agent: {
      image: Agent1,
      name: 'Patricia Tullert',
      phone: '0123 456 78910',
    },
  },
  {
    id: 2,
    type: 'House',
    name: 'House 2',
    description:
      'Contemporary two-story home featuring a welcoming foyer, formal dining room, and generous great room anchored by a stone fireplace. Oversized windows capture leafy neighborhood views throughout the day.',
    image: House2,
    imageLg: House2Lg,
    country: 'Canada',
    address: '213 King St W, Toronto, ON M5H 1K5',
    bedrooms: '6',
    bathrooms: '3',
    surface: '4200 sq ft',
    year: '2016',
    price: '140000',
    agent: {
      image: Agent2,
      name: 'Daryl Hawker',
      phone: '0123 456 78910',
    },
  },
  {
    id: 3,
    type: 'House',
    name: 'House 3',
    description:
      'Sunlit colonial with six spacious bedrooms, hardwood flooring, and a flexible office or playroom off the main hall. The rear deck overlooks a mature, tree-lined yard ideal for outdoor dinners.',
    image: House3,
    imageLg: House3Lg,
    country: 'United States',
    address: '4215 Duke St, Alexandria, VA 22304',
    bedrooms: '6',
    bathrooms: '3',
    surface: '4200 sq ft',
    year: '2016',
    price: '170000',
    agent: {
      image: Agent3,
      name: 'Amado Smith',
      phone: '0123 456 78910',
    },
  },
  {
    id: 4,
    type: 'House',
    name: 'House 4',
    description:
      'Elegant residence combining traditional craftsmanship with modern comforts, including a quartz island kitchen and tranquil primary suite. A finished basement offers extra lounge or gym space.',
    image: House4,
    imageLg: House4Lg,
    country: 'Canada',
    address: '1186 Homer St, Vancouver, BC V6B 2X6',
    bedrooms: '6',
    bathrooms: '3',
    surface: '4200 sq ft',
    year: '2016',
    price: '200000',
    agent: {
      image: Agent4,
      name: 'Kaitlyn Gonzalez',
      phone: '0123 456 78910',
    },
  },
  {
    id: 5,
    type: 'House',
    name: 'House 5',
    description:
      'Warm and inviting five-bedroom with soaring ceilings, skylights, and a central staircase that lends character the moment you enter. Covered front and back porches let you enjoy the outdoors year-round.',
    image: House5,
    imageLg: House5Lg,
    country: 'United States',
    address: '940 Wynnewood Rd, Ardmore, PA 19003',
    bedrooms: '5',
    bathrooms: '3',
    surface: '4200 sq ft',
    year: '2015',
    price: '210000',
    agent: {
      image: Agent5,
      name: 'Grover Robinson',
      phone: '0123 456 78910',
    },
  },
  {
    id: 6,
    type: 'House',
    name: 'House 6',
    description:
      'Statement-making smart home boasting 6,200 square feet of flexible living, dual living rooms, and a private wing for guests. Minutes from shopping yet tucked along a peaceful, established street.',
    image: House6,
    imageLg: House6Lg,
    country: 'Canada',
    address: '765 Rue Sherbrooke O, Montréal, QC H3A 1G1',
    bedrooms: '6',
    bathrooms: '3',
    surface: '6200 sq ft',
    year: '2014',
    price: '220000',
    agent: {
      image: Agent6,
      name: 'Karen Sorensen',
      phone: '0123 456 78910',
    },
  },
  {
    id: 7,
    type: 'Apartament',
    name: 'Apartament 1',
    description:
      'Bright two-bedroom apartment with open living/dining combo, updated appliances, and a cozy balcony for morning coffee. Ideal starter home close to neighborhood parks and transit.',
    image: Apartment1,
    imageLg: Apartment1Lg,
    country: 'Canada',
    address: '10220 102 Ave NW, Edmonton, AB T5J 0A5',
    bedrooms: '2',
    bathrooms: '1',
    surface: '1200 sq ft',
    year: '2012',
    price: '20000',
    agent: {
      image: Agent7,
      name: 'Jawhar Shamil Naser',
      phone: '0123 456 78910',
    },
  },
  {
    id: 8,
    type: 'Apartament',
    name: 'Apartament 2',
    description:
      'Corner-unit apartment flooded with natural light, showcasing a breakfast peninsula, ample storage, and sleek laminate floors. Residents enjoy quick access to cafés, schools, and weekend markets.',
    image: Apartment2,
    imageLg: Apartment2Lg,
    country: 'United States',
    address: '233 N 5th St, Philadelphia, PA 19106',
    bedrooms: '3',
    bathrooms: '1',
    surface: '1000 sq ft',
    year: '2011',
    price: '30000',
    agent: {
      image: Agent8,
      name: 'Juana Douglass',
      phone: '0123 456 78910',
    },
  },
  {
    id: 9,
    type: 'Apartament',
    name: 'Apartament 3',
    description:
      'Thoughtfully refreshed apartment with designer lighting, a spa-like bath, and a generous primary suite overlooking the courtyard. Move-in ready with neutral finishes to suit any style.',
    image: Apartment3,
    imageLg: Apartment3Lg,
    country: 'United States',
    address: '150 S Orlando Ave, Cocoa Beach, FL 32931',
    bedrooms: '2',
    bathrooms: '1',
    surface: '1100 sq ft',
    year: '2011',
    price: '40000',
    agent: {
      image: Agent9,
      name: 'Jerry Schenck',
      phone: '0123 456 78910',
    },
  },
  {
    id: 10,
    type: 'House',
    name: 'House 7',
    description:
      'Charming five-bedroom with a wraparound porch, airy loft, and remodeled kitchen featuring custom cabinetry. The fenced backyard and three-car garage make both playtime and storage effortless.',
    image: House7,
    imageLg: House7Lg,
    country: 'Canada',
    address: '6400 Boulevard Monk, Montréal, QC H4E 3H9',
    bedrooms: '5',
    bathrooms: '3',
    surface: '3200 sq ft',
    year: '2015',
    price: '117000',
    agent: {
      image: Agent10,
      name: 'Vera Levesque',
      phone: '0123 456 78910',
    },
  },
  {
    id: 11,
    type: 'House',
    name: 'House 8',
    description:
      'Modern farmhouse flair elevates this seven-bedroom property, complete with beamed ceilings, a dual-island kitchen, and oversized mudroom. Retreat outside to the professionally landscaped lawn.',
    image: House8,
    imageLg: House8Lg,
    country: 'Canada',
    address: '2086 West 4th Ave, Vancouver, BC V6J 1N4',
    bedrooms: '7',
    bathrooms: '2',
    surface: '2200 sq ft',
    year: '2019',
    price: '145000',
    agent: {
      image: Agent11,
      name: 'Sofia Gomes',
      phone: '0123 456 78910',
    },
  },
  {
    id: 12,
    type: 'House',
    name: 'House 9',
    description:
      'Four-bedroom sanctuary featuring flexible living zones, a serene primary bath with soaking tub, and an upstairs media nook. Minutes from downtown amenities yet set on a quiet cul-de-sac.',
    image: House9,
    imageLg: House9Lg,
    country: 'United States',
    address: '600 Holland Ln, Alexandria, VA 22314',
    bedrooms: '4',
    bathrooms: '4',
    surface: '4600 sq ft',
    year: '2015',
    price: '139000',
    agent: {
      image: Agent12,
      name: 'Raymond Hood',
      phone: '0123 456 78910',
    },
  },
  {
    id: 13,
    type: 'House',
    name: 'House 10',
    description:
      'Thoughtfully updated residence with fresh exterior styling, airy interiors, and an entertainer’s backyard with pergola. Secondary bedrooms share a remodeled bath with dual sinks.',
    image: House10,
    imageLg: House10Lg,
    country: 'Canada',
    address: '455 Front St E, Toronto, ON M5A 1G9',
    bedrooms: '5',
    bathrooms: '2',
    surface: '5200 sq ft',
    year: '2014',
    price: '180000',
    agent: {
      image: Agent1,
      name: 'Patricia Tullert',
      phone: '0123 456 78910',
    },
  },
  {
    id: 14,
    type: 'House',
    name: 'House 11',
    description:
      'Crisp five-bedroom home featuring clerestory windows, a private study, and generous pantry storage off the gourmet kitchen. Glide through sliding doors to a low-maintenance courtyard.',
    image: House11,
    imageLg: House11Lg,
    country: 'United States',
    address: '330 S York Rd, Hatboro, PA 19040',
    bedrooms: '5',
    bathrooms: '2',
    surface: '3200 sq ft',
    year: '2011',
    price: '213000',
    agent: {
      image: Agent2,
      name: 'Daryl Hawker',
      phone: '0123 456 78910',
    },
  },
  {
    id: 15,
    type: 'House',
    name: 'House 12',
    description:
      'Family-friendly layout with four bright bedrooms, wide hallways, and an upstairs loft for games or homework. The main suite enjoys backyard views and a generous walk-in closet.',
    image: House12,
    imageLg: House12Lg,
    country: 'Canada',
    address: '89 Churchill Dr, Winnipeg, MB R3L 1W3',
    bedrooms: '4',
    bathrooms: '3',
    surface: '5200 sq ft',
    year: '2013',
    price: '221000',
    agent: {
      image: Agent3,
      name: 'Amado Smith',
      phone: '0123 456 78910',
    },
  },
  {
    id: 16,
    type: 'Apartament',
    name: 'Apartament 16',
    description:
      'Top-floor apartment boasting vaulted ceilings, a breakfast banquette, and unobstructed skyline views. Climate control and upgraded insulation keep energy costs low year-round.',
    image: Apartment4,
    imageLg: Apartment4Lg,
    country: 'Canada',
    address: '1875 Bloor St W, Toronto, ON M6P 3K9',
    bedrooms: '2',
    bathrooms: '1',
    surface: '1300 sq ft',
    year: '2011',
    price: '21000',
    agent: {
      image: Agent4,
      name: 'Kaitlyn Gonzalez',
      phone: '0123 456 78910',
    },
  },
  {
    id: 17,
    type: 'Apartament',
    name: 'Apartament 17',
    description:
      'Stylish three-bedroom apartment anchored by a spacious living room, walk-in pantry, and dedicated laundry closet. Nearby bike trails and cafés make car-free living easy.',
    image: Apartment5,
    imageLg: Apartment5Lg,
    country: 'United States',
    address: '915 E Baltimore Pike, Kennett Square, PA 19348',
    bedrooms: '3',
    bathrooms: '1',
    surface: '1000 sq ft',
    year: '2012',
    price: '32000',
    agent: {
      image: Agent5,
      name: 'Grover Robinson',
      phone: '0123 456 78910',
    },
  },
  {
    id: 18,
    type: 'Apartament',
    name: 'Apartament 18',
    description:
      'Freshly painted apartment with generous closet space, updated fixtures, and an airy balcony facing evening sunsets. Quiet building with secure entry and assigned parking.',
    image: Apartment6,
    imageLg: Apartment6Lg,
    country: 'Canada',
    address: '120 Rue Peel, Montréal, QC H3C 0A7',
    bedrooms: '3',
    bathrooms: '1',
    surface: '1200 sq ft',
    year: '2010',
    price: '38000',
    agent: {
      image: Agent6,
      name: 'Karen Sorensen',
      phone: '0123 456 78910',
    },
  },
];
