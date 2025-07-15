const mockPoints = [
    {
      id: 1,
      name: "Rose Fashion",
      type: "Shopping",
      lat: 28.6445,
      lng: 77.2166,
      description: "Trendy boutique offering eco-friendly fashion items.",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPI8sJXdMfEbDdn3Ql-v3gJ_ygGJn9WSXjQA&s",
        "https://thumbs.dreamstime.com/b/illustration-sustainable-fashion-boutique-eco-friendly-clothing-collection-display-modern-retail-environmentally-conscious-385625561.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIhYDsZCOJPYaXIaVnMqJGqRaU3clMUL0PWND4eAJmcHV9eurwopGhaClDvjJKweIYO6Y&usqp=CAU"
      ],
      openingHours: "10:00 AM – 8:00 PM",
      distance: "500m"
    },
    {
      id: 2,
      name: "City Café",
      type: "Cafe",
      lat: 28.6450,
      lng: 77.2170,
      description: "Cozy cafe serving organic coffee and snacks.",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOHzlDDdrPWFYnAkPi-b5pave3q832tRFdXw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6CCej3a60AYxvcE0DTxH1eMn2eQTFKTtfHV-q0IyuB-EJil7IvgF04Wiv0fS6JScBVS4&usqp=CAU",
        "https://assets.simpleviewinc.com/grandrapidsdamsub/image/upload/c_limit,h_1200,q_75,w_1200/v1/cms_resources/clients/grandrapids/20230207_Madcap_Coffee_007_e5a1df09-5404-407f-b6d8-529bbbfe9d0e.jpg"
      ],
      openingHours: "8:00 AM – 10:00 PM",
      distance: "300m"
    },
    {
      id: 3,
      name: "Art Gallery X",
      type: "Gallery",
      lat: 28.6452,
      lng: 77.2155,
      description: "Modern art exhibits from local and international artists.",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPI8sJXdMfEbDdn3Ql-v3gJ_ygGJn9WSXjQA&s",
        "https://thumbs.dreamstime.com/b/illustration-sustainable-fashion-boutique-eco-friendly-clothing-collection-display-modern-retail-environmentally-conscious-385625561.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIhYDsZCOJPYaXIaVnMqJGqRaU3clMUL0PWND4eAJmcHV9eurwopGhaClDvjJKweIYO6Y&usqp=CAU"
      ],
      openingHours: "11:00 AM – 6:00 PM",
      distance: "450m"
    },
    {
      id: 4,
      name: "Tech Gear Store",
      type: "Shopping",
      lat: 28.6442,
      lng: 77.2162,
      description: "Electronics and gadgets at affordable prices.",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSawCDA8onBXVxhwZzKDvV-YBLIdRFPjSv64g&s",
        "https://blog.bikroy.com/en/wp-content/uploads/2025/01/electric-gadget-for-home.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPaHomziwnjzWd5uJUohq_pipg0clkV7n3_BLSf1YH62TtgsmIH-4h6qZVB4p1WoQn85Y&usqp=CAU"
      ],
      openingHours: "9:00 AM – 9:00 PM",
      distance: "550m"
    },
    {
      id: 5,
      name: "Vintage Café",
      type: "Cafe",
      lat: 28.6447,
      lng: 77.2159,
      description: "Retro cafe with books, board games, and jazz music.",
      images: [
        "https://b.zmtcdn.com/data/pictures/3/18410973/547f43653922cce125439627e8ea62a9.jpg?fit=around|960:500&crop=960:500;*,*",
        "https://i.ytimg.com/vi/JRUIAx1Srts/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDzUjC823edILbaLKne2ooVWV39DQ",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6UNQN3Hub-wjCfDUnWhmBfVp5sODPuEzPhQ&s"
      ],
      openingHours: "9:30 AM – 11:00 PM",
      distance: "350m"
    }
  ];
  
  export default mockPoints;


// const mockPoints = [
//   {
//     id: 1,
//     name: "Rose Fashion",
//     type: "Shopping",
//     lat: 28.6445,
//     lng: 77.2166,
//     description: "Trendy boutique offering eco-friendly fashion items.",
//     images: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPI8sJXdMfEbDdn3Ql-v3gJ_ygGJn9WSXjQA&s",
//       "https://b.zmtcdn.com/data/pictures/3/18410973/547f43653922cce125439627e8ea62a9.jpg",
//       "https://source.unsplash.com/400x300/?fashion"
//     ],
//     openingHours: "10:00 AM – 8:00 PM",
//     distance: "500m"
//   },
//   {
//     id: 2,
//     name: "City Café",
//     type: "Cafe",
//     lat: 28.6450,
//     lng: 77.2170,
//     description: "Cozy cafe serving organic coffee and snacks.",
//     images: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvUh54fAj1xc5fP2Mis91zKdAKnP8ixiPkMA&s",
//       "https://source.unsplash.com/400x300/?coffee",
//       "https://source.unsplash.com/400x300/?cafe"
//     ],
//     openingHours: "8:00 AM – 10:00 PM",
//     distance: "300m"
//   },
// ];

// export default mockPoints;

  