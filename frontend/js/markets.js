const markets = [
    {
        name: "Shenzhen Electronics Market",
        country: "China",
        city: "Shenzhen",
        category: "Electronics",
        latitude: 22.543096,
        longitude: 114.057865,
        description: "Large electronics market in China"
    },
    {
        name: "Istanbul Textile Market",
        country: "Turkey",
        city: "Istanbul",
        category: "Textile",
        latitude: 41.0082,
        longitude: 28.9784,
        description: "Popular textile wholesale market"
    },
    {
        name: "Almaty Food Market",
        country: "Kazakhstan",
        city: "Almaty",
        category: "Food",
        latitude: 43.2389,
        longitude: 76.8897,
        description: "Large food distribution market"
    }
];

markets.forEach(market => {

    L.marker([
        market.latitude,
        market.longitude
    ])
    .addTo(map)
    .bindPopup(`
        <h3>${market.name}</h3>
        <p><b>Country:</b> ${market.country}</p>
        <p><b>City:</b> ${market.city}</p>
        <p><b>Category:</b> ${market.category}</p>
        <p>${market.description}</p>
    `);

});