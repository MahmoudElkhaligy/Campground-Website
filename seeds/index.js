//this file is for seeding database
const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});
const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)]
};

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const randomplace = sample(cities)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            // Your User ID
            author: '66cec62c12ad80f3c452aa99',
            location: `${randomplace.city}, ${randomplace.state}`,
            description: 'A place to relax from the world and have the best of your time in the best camps in the US',
            price: price,
            geometry: {
                type: 'Point',
                coordinates: [
                    randomplace.longitude,
                    randomplace.latitude
                ]
            },
            images: [
                {
                    url: '/imgs/campPhoto2.jpg',
                    filename: 'YelpCamp/rex071akfitrghfxfppb',
                },
                {
                    url: '/imgs/campPhoto1.jpg',
                    filename: 'YelpCamp/wfq6xvzo3lvld5bpmghp',
                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});