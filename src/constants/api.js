export const BASE_URL = 'https://notfounders-001-site1.anytempurl.com/api/';


export const allRooms = [
    {
        id: 6,
        name: 'Deluxe Ocean View',
        price: 450,
        originalPrice: 500, // Added
        rating: 4.9,
        reviews: 210, // Added
        type: 'popular',
        location: 'Beach Front',
        description: 'Experience breathtaking ocean views from your private balcony',
        amenities: ['Free WiFi', 'Pool Access', 'Breakfast Included', 'Air Conditioning', 'Parking', 'Restaurant'], // Updated
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        available: true, // Added
        discount: 10, // Added
        size: '40 m²', // Added
        guests: 2 // Added
    },
    {
        id: 7,
        name: 'Executive Suite',
        price: 380,
        originalPrice: 450, // Added
        rating: 4.7,
        reviews: 155, // Added
        type: 'popular',
        location: 'City View',
        description: 'Spacious suite with premium amenities and panoramic city views',
        amenities: ['Free WiFi', 'Executive Lounge', '24/7 Concierge', 'Smart TV', 'Parking', 'Restaurant'], // Updated
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        available: true, // Added
        discount: 15, // Added
        size: '55 m²', // Added
        guests: 4 // Added
    },
    {
        id: 8,
        name: 'Comfort Double',
        price: 220,
        originalPrice: 250, // Added
        rating: 4.5,
        reviews: 300, // Added
        type: 'comfort',
        location: 'Garden Wing',
        description: 'Cozy double room with all essential amenities for a comfortable stay',
        amenities: ['Free WiFi', 'Coffee Maker', 'Work Desk', 'Restaurant'], // Updated
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        available: false, // Added
        discount: 0, // Added
        size: '30 m²', // Added
        guests: 2 // Added
    },
    {
        id: 9,
        name: 'Standard Room',
        price: 180,
        originalPrice: 200, // Added
        rating: 4.2,
        reviews: 450, // Added
        type: 'standard',
        location: 'Main Building',
        description: 'Simple yet comfortable accommodation with all basic necessities',
        amenities: ['Free WiFi', 'Daily Cleaning'], // Updated
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        available: true, // Added
        discount: 10, // Added
        size: '25 m²', // Added
        guests: 2 // Added
    },
    {
        id: 10,
        name: 'Luxury Penthouse',
        price: 650,
        originalPrice: 700, // Added
        rating: 4.9,
        reviews: 98, // Added
        type: 'luxury',
        location: 'Top Floor',
        description: 'Ultimate luxury with private terrace, jacuzzi and butler service',
        amenities: ['Free WiFi', 'Private Pool', 'Minibar', 'Smart TV', '24/7 Butler', 'Parking', 'Restaurant'], // Updated
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        available: true, // Added
        discount: 7, // Added
        size: '80 m²', // Added
        guests: 6 // Added
    },
    {
        id: 6,
        name: 'Family Suite',
        price: 320,
        originalPrice: 350, // Added
        rating: 4.6,
        reviews: 180, // Added
        type: 'family',
        location: 'Garden Wing',
        description: 'Spacious accommodation perfect for families with children',
        amenities: ['Free WiFi', 'Extra Beds', 'Children Menu', 'Play Area', 'Parking', 'Restaurant'], // Updated
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        available: true, // Added
        discount: 8, // Added
        size: '60 m²', // Added
        guests: 5 // Added
    }
];
