// const mockPoints = [
//   {
//     id: 1,
//     name: "Rose Fashion",
//     type: "Shopping",
//     macro: "Fashion",
//     tags: ["Eco-Friendly", "Trendy"],
//     lat: 31.4260,
//     lng: 73.0916,
//     description: "Trendy boutique offering eco-friendly fashion items.",
//     openingHours: "10:00 AM – 8:00 PM",
//     distance: "500m",
//     images: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPI8sJXdMfEbDdn3Ql-v3gJ_ygGJn9WSXjQA&s",
//       "https://thumbs.dreamstime.com/b/illustration-sustainable-fashion-boutique-eco-friendly-clothing-collection-display-modern-retail-environmentally-conscious-385625561.jpg",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIhYDsZCOJPYaXIaVnMqJGqRaU3clMUL0PWND4eAJmcHV9eurwopGhaClDvjJKweIYO6Y&usqp=CAU"
//     ]
//   },
//   {
//     id: 2,
//     name: "City Café",
//     type: "Cafe",
//     macro: "Food",
//     tags: ["Organic", "Vegan"],
//     lat: 40.7128, // Updated
//     lng: 11.2558, // Updated
//     description: "Cozy cafe serving organic coffee and snacks.",
//     openingHours: "8:00 AM – 10:00 PM",
//     distance: "300m",
//     images: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOHzlDDdrPWFYnAkPi-b5pave3q832tRFdXw&s",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6CCej3a60AYxvcE0DTxH1eMn2eQTFKTtfHV-q0IyuB-EJil7IvgF04Wiv0fS6JScBVS4&usqp=CAU",
//       "https://assets.simpleviewinc.com/grandrapidsdamsub/image/upload/c_limit,h_1200,q_75,w_1200/v1/cms_resources/clients/grandrapids/20230207_Madcap_Coffee_007_e5a1df09-5404-407f-b6d8-529bbbfe9d0e.jpg"
//     ]
//   },
//   {
//     id: 3,
//     name: "Art Gallery X",
//     type: "Gallery",
//     macro: "Tours",
//     tags: ["Modern", "Local Artists"],
//     lat: 43.7696, // Updated
//     lng: 74.0060, // Updated
//     description: "Modern art exhibits from local and international artists.",
//     openingHours: "11:00 AM – 6:00 PM",
//     distance: "450m",
//     images: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQULP0HgJnIwPDrJIIGlkg88fN6X35y7JUjjg&s",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfnZ6YXCi2oGsaQXCaFf1Um3gL6ebYJ22BSkJEtRFlmG9T-IqUxjjm6weIzMxCjsTCG-c&usqp=CAU",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdE9FZQl1eb_mtCUY77CLap4emLfCpmRBYcA&s"
//     ]
//   },
//   {
//     id: 4,
//     name: "Tech Gear Store",
//     type: "Shopping",
//     macro: "Electronics",
//     tags: ["Affordable", "Latest Tech"],
//     lat: 28.6442,
//     lng: 77.2162,
//     description: "Electronics and gadgets at affordable prices.",
//     openingHours: "9:00 AM – 9:00 PM",
//     distance: "550m",
//     images: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSawCDA8onBXVxhwZzKDvV-YBLIdRFPjSv64g&s",
//       "https://blog.bikroy.com/en/wp-content/uploads/2025/01/electric-gadget-for-home.jpg",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPaHomziwnjzWd5uJUohq_pipg0clkV7n3_BLSf1YH62TtgsmIH-4h6qZVB4p1WoQn85Y&usqp=CAU"
//     ]
//   },
//   {
//     id: 5,
//     name: "Vintage Café",
//     type: "Cafe",
//     macro: "Food",
//     tags: ["Books", "Jazz", "Retro"],
//     lat: 48.8566,
//     lng: 2.3522,
//     description: "Retro cafe with books, board games, and jazz music.",
//     openingHours: "9:30 AM – 11:00 PM",
//     distance: "350m",
//     images: [
//       "https://b.zmtcdn.com/data/pictures/3/18410973/547f43653922cce125439627e8ea62a9.jpg?fit=around|960:500&crop=960:500;*,*",
//       "https://i.ytimg.com/vi/JRUIAx1Srts/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDzUjC823edILbaLKne2ooVWV39DQ",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6UNQN3Hub-wjCfDUnWhmBfVp5sODPuEzPhQ&s"
//     ]
//   },
//   {
//     id: 6,
//     name: "Club Infinity",
//     type: "Nightlife",
//     macro: "Nightlife",
//     tags: ["Live Music", "Dance", "Bar"],
//     lat: 40.7128,
//     lng: -74.0060,
//     description: "Energetic nightclub with live music and themed parties.",
//     openingHours: "8:00 PM – 3:00 AM",
//     distance: "800m",
//     images: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSroZNPGemRusc-WINZOxuavRqDTQPDWSTYlGV_IA_LSMJm_DS5ZzbN6_QFqrsHGdxI2uw&usqp=CAU",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhmSg3NWRYo76RxRUo97Ex6aZzVC5bGzZeT0tAxwt5HoJPc0QXZZiOqfo4C0819GZuCM&usqp=CAU",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM6Fiqq8PtuuGDi_5OKtXzSnnlwUkoPCbXdg&s"
//     ]
//   },
//   {
//     id: 7,
//     name: "Green Bites",
//     type: "Restaurant",
//     macro: "Food",
//     tags: ["Vegan", "Organic", "Healthy"],
//     lat: 34.0522,
//     lng: -118.2437,
//     description: "Vegan-friendly restaurant focused on fresh, organic meals.",
//     openingHours: "11:00 AM – 10:00 PM",
//     distance: "600m",
//     images: [
//       "https://media-cdn.tripadvisor.com/media/photo-s/14/0e/14/b5/green-bites-dumpling.jpg",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7_cFkbI9jMOt1HDBgz3ZGOIIbC6qfkRp1qOzTg-o6ep3i9iUeFtKhLImUklqr1apfhP0&usqp=CAU",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKaO9HOIJSvAIeB61cAdLN3Ve1oQvwvqLo9w&s",

//     ]
//   },
//   {
//     id: 8,
//     name: "City Tour Bus",
//     type: "Tour",
//     macro: "Tours",
//     tags: ["City Tour", "Sightseeing", "Guided"],
//     lat: 51.5074,
//     lng: -0.1278,
//     description: "Hop-on-hop-off city sightseeing bus covering all major attractions.",
//     openingHours: "9:00 AM – 7:00 PM",
//     distance: "900m",
//     images: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfnMpF0h5L_-YwQohYzrThfwr94USyfGnovA&s",
//       "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/70/80/1f.jpg",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKUGyj7AbDNaITQTZfe7s4G9dEnUihBeKhJA&s"
//     ]
//   },
//   {
//     id: 9,
//     name: "Luxe Spa Center",
//     type: "Wellness",
//     macro: "Health",
//     tags: ["Massage", "Skincare", "Relax"],
//     lat: 37.7749,
//     lng: -122.4194,
//     description: "Luxury spa center offering massages, facials, and relaxation rooms.",
//     openingHours: "10:00 AM – 9:00 PM",
//     distance: "700m",
//     images: [
//       "https://avatars.mds.yandex.net/get-altay/13590061/2a0000019253f046ae314eeddbf16763d961/L_height",
//       "https://content.jdmagicbox.com/comp/service_catalogue/spas-attr-only-male-masseurs-available-spa13334-8-250.jpg",
//       "https://avatars.mds.yandex.net/get-altay/13929277/2a0000019253f045e6ce8090b617a5152b1c/L_height"
//     ]
//   },
//   {
//     id: 10,
//     name: "BookNest Library",
//     type: "Library",
//     macro: "Education",
//     tags: ["Books", "Quiet", "Study"],
//     lat: 41.8781,
//     lng: -87.6298,
//     description: "Peaceful public library with a huge collection and study areas.",
//     openingHours: "8:00 AM – 6:00 PM",
//     distance: "200m",
//     images: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROOeRxL1BGubDQrw9XRm6tdDFSH3ZAYKVaCw&s",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjKafW4kS6T7qrxtn1bzUsILLde_EynPcJEYjwR-IoQDw5doHjwtsA2i34xRIbsv5Irgs&usqp=CAU",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRonrOfrU0GngLWFF8phEo1UPesMefV9meQeA&s"
//     ]
//   }
// ];

// export default mockPoints;









const mockPoints = [
  // {
  //   id: 1,
  //   name: "Rose Fashion",
  //   type: "Clothing",
  //   macro: "Shopping",
  //   category: "Boutique",
  //   tags: ["Local", "Trendy"],
  //   price: "$$",
  //   lat: 31.4260,
  //   lng: 73.0916,
  //   description: "Trendy boutique offering eco-friendly fashion items.",
  //   openingHours: "10:00 AM – 8:00 PM",
  //   distance: "500m",
  //   images: [
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPI8sJXdMfEbDdn3Ql-v3gJ_ygGJn9WSXjQA&s",
  //     "https://thumbs.dreamstime.com/b/illustration-sustainable-fashion-boutique-eco-friendly-clothing-collection-display-modern-retail-environmentally-conscious-385625561.jpg",
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIhYDsZCOJPYaXIaVnMqJGqRaU3clMUL0PWND4eAJmcHV9eurwopGhaClDvjJKweIYO6Y&usqp=CAU"
  //   ]
  // },
  {
    id: 2,
    name: "City Café",
    type: "Cafe",
    macro: "Food & Drink",
    category: "Cafe",
    cuisine: "American",
    tags: ["Vegan", "Popular"],
    price: "$",
    lat: 40.7128,
    lng: 11.2558,
    description: "Cozy cafe serving organic coffee and snacks.",
    openingHours: "8:00 AM – 10:00 PM",
    distance: "300m",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOHzlDDdrPWFYnAkPi-b5pave3q832tRFdXw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6CCej3a60AYxvcE0DTxH1eMn2eQTFKTtfHV-q0IyuB-EJil7IvgF04Wiv0fS6JScBVS4&usqp=CAU",
      "https://assets.simpleviewinc.com/grandrapidsdamsub/image/upload/c_limit,h_1200,q_75,w_1200/v1/cms_resources/clients/grandrapids/20230207_Madcap_Coffee_007_e5a1df09-5404-407f-b6d8-529bbbfe9d0e.jpg"
    ]
  },
  {
    id: 3,
    name: "Art Gallery X",
    type: "Gallery",
    macro: "Culture & Sights",
    category: "Gallery",
    genre: ["Modern Architecture", "Art"],
    tags: ["Architecture", "Local"],
    price: "$$",
    lat: 43.7696,
    lng: 74.0060,
    description: "Modern art exhibits from local and international artists.",
    openingHours: "11:00 AM – 6:00 PM",
    distance: "450m",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQULP0HgJnIwPDrJIIGlkg88fN6X35y7JUjjg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfnZ6YXCi2oGsaQXCaFf1Um3gL6ebYJ22BSkJEtRFlmG9T-IqUxjjm6weIzMxCjsTCG-c&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdE9FZQl1eb_mtCUY77CLap4emLfCpmRBYcA&s"
    ]
  },
  {
    id: 4,
    name: "Tech Gear Store",
    type: "Electronics",
    macro: "Shopping",
    category: "Souvenir Shop",
    tags: ["Discounted", "Latest Tech"],
    price: "$",
    lat: 28.6442,
    lng: 77.2162,
    description: "Electronics and gadgets at affordable prices.",
    openingHours: "9:00 AM – 9:00 PM",
    distance: "550m",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSawCDA8onBXVxhwZzKDvV-YBLIdRFPjSv64g&s",
      "https://blog.bikroy.com/en/wp-content/uploads/2025/01/electric-gadget-for-home.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPaHomziwnjzWd5uJUohq_pipg0clkV7n3_BLSf1YH62TtgsmIH-4h6qZVB4p1WoQn85Y&usqp=CAU"
    ]
  },
  {
    id: 5,
    name: "Vintage Café",
    type: "Cafe",
    macro: "Food & Drink",
    category: "Cafe",
    cuisine: "American",
    tags: ["Retro", "Family Friendly"],
    price: "$$",
    lat: 48.8566,
    lng: 2.3522,
    description: "Retro cafe with books, board games, and jazz music.",
    openingHours: "9:30 AM – 11:00 PM",
    distance: "350m",
    images: [
      "https://b.zmtcdn.com/data/pictures/3/18410973/547f43653922cce125439627e8ea62a9.jpg?fit=around|960:500&crop=960:500;*,*",
      "https://i.ytimg.com/vi/JRUIAx1Srts/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDzUjC823edILbaLKne2ooVWV39DQ",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6UNQN3Hub-wjCfDUnWhmBfVp5sODPuEzPhQ&s"
    ]
  },
  {
    id: 6,
    name: "Club Infinity",
    type: "Lounge",
    macro: "Nightlife",
    category: "Club",
    tags: ["Live Music", "Dance Floor", "Cocktails"],
    price: "$$$",
    lat: 40.7128,
    lng: -74.0060,
    description: "Energetic nightclub with live music and themed parties.",
    openingHours: "8:00 PM – 3:00 AM",
    distance: "800m",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSroZNPGemRusc-WINZOxuavRqDTQPDWSTYlGV_IA_LSMJm_DS5ZzbN6_QFqrsHGdxI2uw&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhmSg3NWRYo76RxRUo97Ex6aZzVC5bGzZeT0tAxwt5HoJPc0QXZZiOqfo4C0819GZuCM&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM6Fiqq8PtuuGDi_5OKtXzSnnlwUkoPCbXdg&s"
    ]
  },
  {
    id: 7,
    name: "Green Bites",
    type: "Restaurant",
    macro: "Food & Drink",
    category: "Restaurant",
    cuisine: "Asian",
    tags: ["Vegan", "Organic", "Healthy"],
    price: "$$",
    lat: 34.0522,
    lng: -118.2437,
    description: "Vegan-friendly restaurant focused on fresh, organic meals.",
    openingHours: "11:00 AM – 10:00 PM",
    distance: "600m",
    images: [
      "https://media-cdn.tripadvisor.com/media/photo-s/14/0e/14/b5/green-bites-dumpling.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7_cFkbI9jMOt1HDBgz3ZGOIIbC6qfkRp1qOzTg-o6ep3i9iUeFtKhLImUklqr1apfhP0&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKaO9HOIJSvAIeB61cAdLN3Ve1oQvwvqLo9w&s",

    ]
  },
  {
    id: 8,
    name: "City Tour Bus",
    type: "Tour",
    macro: "Culture & Sights",
    category: "Historic Site",
    genre: ["History", "Religious"],
    tags: ["Sightseeing", "Guided"],
    price: "$$",
    lat: 51.5074,
    lng: -0.1278,
    description: "Hop-on-hop-off city sightseeing bus covering all major attractions.",
    openingHours: "9:00 AM – 7:00 PM",
    distance: "900m",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfnMpF0h5L_-YwQohYzrThfwr94USyfGnovA&s",
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/70/80/1f.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKUGyj7AbDNaITQTZfe7s4G9dEnUihBeKhJA&s"
    ]
  },
  {
    id: 9,
    name: "Luxe Spa Center",
    type: "Spa",
    macro: "Activity & Wellness",
    category: "Spa",
    tags: ["Relaxation", "Mindfulness"],
    price: "$$$",
    lat: 37.7749,
    lng: -122.4194,
    description: "Luxury spa center offering massages, facials, and relaxation rooms.",
    openingHours: "10:00 AM – 9:00 PM",
    distance: "700m",
    images: [
      "https://avatars.mds.yandex.net/get-altay/13590061/2a0000019253f046ae314eeddbf16763d961/L_height",
      "https://content.jdmagicbox.com/comp/service_catalogue/spas-attr-only-male-masseurs-available-spa13334-8-250.jpg",
      "https://avatars.mds.yandex.net/get-altay/13929277/2a0000019253f045e6ce8090b617a5152b1c/L_height"
    ]
  },
  {
    id: 10,
    name: "BookNest Library",
    type: "Library",
    macro: "Culture & Sights",
    category: "Museum",
    genre: ["Classic Cinema", "History"],
    tags: ["Historical", "Quiet"],
    price: "$",
    lat: 41.8781,
    lng: -87.6298,
    description: "Peaceful public library with a huge collection and study areas.",
    openingHours: "8:00 AM – 6:00 PM",
    distance: "200m",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROOeRxL1BGubDQrw9XRm6tdDFSH3ZAYKVaCw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjKafW4kS6T7qrxtn1bzUsILLde_EynPcJEYjwR-IoQDw5doHjwtsA2i34xRIbsv5Irgs&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRonrOfrU0GngLWFF8phEo1UPesMefV9meQeA&s"
    ]
  }
];


export default mockPoints;