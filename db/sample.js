import mongoose from "mongoose";
import Discussion from './models/Discussion.js';
import User from './models/User.js';
import Comment from "./models/Comment.js";
import { tags } from './data.js';

export function generateData(){
    const initialUsers = [
        new User({
            username: "harry31",
            password: "jigglejiggle",
            firstname: "Harry",
            lastname: "Higgins",
            email: "harryhiggins@gmail.com",
            bio: "Hi I’m Harry Higgins I have been a freelancer since 2019 and I enjoy my profession.",
            birthday: new Date(2001, 2, 27),
            phoneNumber: "09618294256",
            profileImg: "images/users/user1.jpg",
            coverImg: "images/users/cover1.jpg",
        }),
        new User({
            username: "sebby",
            password: "123456",
            firstname: "Ken",
            lastname: "Vitug",
            email: "ken.vitug@gmail.com",
            bio: "Hey there, I’m Ken Vitug! I have a passion for cooking and currently I have my own food blog.",
            birthday: new Date(2001, 4, 3),
            phoneNumber: "09663398043",
            profileImg: "images/users/userDefault.jpg",
            coverImg: "images/users/cover2.jpg",
        }),
        new User({
            username: "ackerman",
            password: "diego123",
            firstname: "Rory",
            lastname: "Lorelai",
            email: "lorelairory@yahoo.com",
            bio: "Hi! I am Rory Lorelai. I was born and raised in Thailand. I enjoy my neighborhood and I am a housewife with 2 loving children.",
            birthday: new Date(2001, 8, 12),
            phoneNumber: "09564328971",
            profileImg: "images/users/user10.jpg",
            coverImg: "images/users/cover3.jpg",
        }),
        new User({
            username: "rena",
            password: "glasc123",
            firstname: "Renata",
            lastname: "Glasc",
            email: "renataglasc2@yahoo.com",
            bio: "Hi, my name is Renata Glasc, I am currently a senior student at Moscow State University taking up a major in Civil Engineering. I can’t wait to finally graduate and apply for the best company here in Moscow.",
            birthday: new Date(2000, 0, 23),
            phoneNumber: "09562135684",
            profileImg: "images/users/user6.jpg",
            coverImg: "images/users/cover4.jpg",
        }),
        new User({
            username: "ferrari_von",
            password: "ferrarilover",
            firstname: "Von",
            lastname: "Miller",
            email: "ferrarmiller@gmail.com",
            bio: "Hi, my name is Von Miller. I am a car enthusiast and Ferrari is one of my favorite car brands. I currently own 4 Ferrari gallardo.",
            birthday: new Date(1998, 7, 25),
            phoneNumber: "09355688953",
            profileImg: "images/users/user8.jpg",
            coverImg: "images/users/cover5.jpg",
        }),
    ];

    const initialDiscussions = [
        new Discussion({
            title: "Hi All, new to Porum here, and have a question",
            content: "Hi Guys, first of all I hope you all are ok. I have a question on how to use reddit, is it just like an Q&A platform as that seems from outside, or is info sharing also allowed and appreciated without someone asking? I am an experienced software dev, also I know a few tricks on garden agriculture, also I'm into automated systems from auto watering solutions to drones... (also that's a shame but I have an interest in international politics.) I hope I can share and also find quality information over here. Kind regards.",
            tag: {
                name: "Introductions",
                color: "blue",
            }
        }),
        new Discussion({
            title: "May 12th, 2022 COVID-19 update: 6,523 new cases, 18 new deaths, 728 hospitalized, 230 for COVID.",
            content: "6,523 confirmed and probable cases, with 5,576 positives from 70,283 tests. Of the 728 hospitalized, 230 are for COVID, 66 in the ICU, 27 Intubated, and 484 vaccinated Cases, test positivity rate, and wasterwater viral loads at winter 2020-2, and winter 2021-22 levels. Incidental COVID hospitalizations set to soon surpass Alpha/Delta levels later this week. Primary COVID hospitalizations, ICU, and intubations slightly above summer 2020 and summer 2021 levels, but below Alpha/Delta levels. No new wastewater report today, yet. Data note: With an increase in antigen at home testing, statewide probable and confirmed cases are added up and aggregated together.",
            tag: {
                name: "Announcements",
                color: "pink",
            }
        }),
        new Discussion({
            title: "Is it possible to apply for a Swiss student visa from a country outside of your home country?",
            content: "I am Japanese, currently living in France under a student visa. I will be studying in Geneva from September and need to apply for a Swiss student visa, and am wondering if I can do so from Paris, or if it is mandatory that I apply from my home country of Japan ? I sent an email to the Swiss embassy in Paris but as I expected it’s taking a while to get a response.",
            tag: {
                name: "FAQ's",
                color: "orange",
            }
        }),
        new Discussion({
            title: "Sales Person - $20/hr",
            content: "We are urgently looking for a part-time Sales Person for B2B Inside Sales. This will be a work-from-home opportunity. You would need to get on video calls or phone calls with our clients and guide them regarding the services we are offering, trying your best to crack a deal with them. We are looking for someone who is expressive and holds excellent communication skills. Also, we are looking for a US-based salesperson since you will be required to deal with our US-based clients. Pay: $20/hr For this profile, you would need a Laptop/computer, cellphone, and stable internet.",
            tag: {
                name: "Jobs",
                color: "brown",
            }
        }),
        new Discussion({
            title: "Review of the Aristocrat Restaurant",
            content: "The food is sumptuous, good servings and it’s been Aristocrat since I was a child. The Java rice was a bit dry and no flavour at all... that was a let down. Other than that, everything was a delightful gastronomical experience. As with other restaurants in the Phils, it was noisy and you have to line up for a number to get seats!",
            tag: {
                name: "Feedback",
                color: "purple",
            }
        }),
    ];

    const initialComments = [
        new Comment({
            content: "This is a good stop for breakfast, lunch, or dinner at this long-time Manila restaurant established in 1936. We went on a Saturday morning, and I think because it is well-known, large seating, and popular, it's difficult for service staff to keep up. Be prepared for a little arm-waving, but I think it's still well worth your while to come to this comfortable spot. For me, it was nice to see all the lola and lolo out to enjoy foods with their family. I like to come here again next time I am in Manila.",
        }),
        new Comment({
            content: "Food is great but service is very slow, been eating here for decades. the chicken barbecue is the best so is the halo-halo but it takes a long time for them to serve your order or bus your table. they're very busy but the inefficient staff is not helping at all.",
        }),
        new Comment({
            content: "Food is delicious and the prices are reasonable. Many varieties of food you can find there, and the best thing is it is open for 24 hours.",
        }),
        new Comment({
            content: "Good food if you are on a budget but want to try some authentic Filipino food. They also deliver, which is nice.",
        }),
        new Comment({
            content: "I'm always craving for Aristocrat boneless chicken barbeque and everytime I get the chance to dine at Aristocrat, it never fails to please my palate. And for a change, I tried their Kare Kare, it was cooked like what we have at home on special occasions",
        }),
    ];

    var sampleUsers = [];
    
    for(var user of initialUsers){
        sampleUsers.push(user.save());
    }
    

    for(var user of sampleUsers){

    }
}