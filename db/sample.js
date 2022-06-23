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
            coverImg: "images/users/coverDefault.jpg",
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
            coverImg: "images/users/coverDefault.jpg",
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
            coverImg: "images/users/coverDefault.jpg",
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
            coverImg: "images/users/coverDefault.jpg",
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
            coverImg: "images/users/coverDefault.jpg",
        }),
    ];

    const initialDiscussions = [
        {
            user: 3,
            title: "Hi All, new to Porum here, and have a question",
            content: "Hi Guys, first of all I hope you all are ok. I have a question on how to use reddit, is it just like an Q&A platform as that seems from outside, or is info sharing also allowed and appreciated without someone asking? I am an experienced software dev, also I know a few tricks on garden agriculture, also I'm into automated systems from auto watering solutions to drones... (also that's a shame but I have an interest in international politics.) I hope I can share and also find quality information over here. Kind regards.",
            tag: {
                name: "Introductions",
                color: "blue",
            }
        },
        {
            user: 0,
            title: "May 12th, 2022 COVID-19 update: 6,523 new cases, 18 new deaths, 728 hospitalized, 230 for COVID.",
            content: "6,523 confirmed and probable cases, with 5,576 positives from 70,283 tests. Of the 728 hospitalized, 230 are for COVID, 66 in the ICU, 27 Intubated, and 484 vaccinated Cases, test positivity rate, and wasterwater viral loads at winter 2020-2, and winter 2021-22 levels. Incidental COVID hospitalizations set to soon surpass Alpha/Delta levels later this week. Primary COVID hospitalizations, ICU, and intubations slightly above summer 2020 and summer 2021 levels, but below Alpha/Delta levels. No new wastewater report today, yet. Data note: With an increase in antigen at home testing, statewide probable and confirmed cases are added up and aggregated together.",
            tag: {
                name: "Announcements",
                color: "pink",
            }
        },
        {
            user: 1,
            title: "Is it possible to apply for a Swiss student visa from a country outside of your home country?",
            content: "I am Japanese, currently living in France under a student visa. I will be studying in Geneva from September and need to apply for a Swiss student visa, and am wondering if I can do so from Paris, or if it is mandatory that I apply from my home country of Japan ? I sent an email to the Swiss embassy in Paris but as I expected it’s taking a while to get a response.",
            tag: {
                name: "FAQ's",
                color: "orange",
            }
        },
        {
            user: 4,
            title: "Sales Person - $20/hr",
            content: "We are urgently looking for a part-time Sales Person for B2B Inside Sales. This will be a work-from-home opportunity. You would need to get on video calls or phone calls with our clients and guide them regarding the services we are offering, trying your best to crack a deal with them. We are looking for someone who is expressive and holds excellent communication skills. Also, we are looking for a US-based salesperson since you will be required to deal with our US-based clients. Pay: $20/hr For this profile, you would need a Laptop/computer, cellphone, and stable internet.",
            tag: {
                name: "Jobs",
                color: "brown",
            }
        },
        {
            user: 3,
            title: "Review of the Aristocrat Restaurant",
            content: "The food is sumptuous, good servings and it’s been Aristocrat since I was a child. The Java rice was a bit dry and no flavour at all... that was a let down. Other than that, everything was a delightful gastronomical experience. As with other restaurants in the Phils, it was noisy and you have to line up for a number to get seats!",
            tag: {
                name: "Feedback",
                color: "purple",
            }
        },
    ];

    
    const initialComments1 = [
        {
            user: 1,
            content: "Hi, welcome! Yes, there are many subs where people share info/advice/opinions etc. Having said that, you might not be able to post/comment right away due to being new. I'd suggest you take a look around and find some subs that interest you, then you can see what their posting requirements (if any) might be. There's also a list of new Porum friendly subs in the links Automod gave. If you need anything else, just let us know :)",
        },
        {
            user: 4,
            content: "Hi and welcome! Porum is more than a q&a site, but not quite social media. On top of that, different cultures exist on different subs. I highly recommend reading the rules of a sub and get a feeling for the way posts go there before posting. The info available about this sub is very helpful and I always suggest people take the time to read it. It probably depends on the sub, but you might have more fun watching the posts for subjects you have expertise in rather than posting randomly about your skills that might not even be seen by the people who most want to know. Have fun out there!",
        },
        {
            user: 3,
            content: "Congrats! Now let’s share some content on Porum! Have fun out there!",
        },
        {
            user: 0,
            content: "Thanks for all the helpful comments guys!",
        },
        {
            user: 2,
            content: "Welcome to Porum! Porum isn't like other social media. People don't share personal stuff here that much, it's a place where anonymity is valued. You can still make friends here, but the content is the focus.",
        },
    ];

    const initialComments2 = [
        {
            user: 1,
            content: "I work for the Infectious Disease Bureau at the Boston Public Health Commissions in case any of you are wondering :)",
        },
        {
            user: 2,
            content: "I’m supposed to get on an airplane next week with my toddler with 0 safety measures in place this is insane.",
        },
        {
            user: 4,
            content: "Please do what you need to do to protect yourselves. CDC in the U.S. seems to be the only one ignoring the link between child hepatitis cases and SARS2. Other countries have recognized the possible link and are leaning in that direction. We are not in a good spot right now as far as transparency goes.",
        },
        {
            user: 3,
            content: "Unfortunately, a lot of people violate COVID regulations in our country. :((",
        },
        {
            user: 0,
            content: "I really hope they would start offering free and accessible COVID testing.",
        },
    ];

    const initialComments3 = [
        {
            user: 0,
            content: "As a general rule, you can apply for a visa from a country where you a resident, and it need not be your country of citizenship.",
        },
        {
            user: 2,
            content: "It really just depends on the rules of your home country. Depending on your visa, and how long it's valid sometimes 2 months before it expires (minimum) you would be able to go to the Swiss embassy or consulate in France and apply for your visa there, because technically at the moment you're considered a resident of France (like I said depending on your visa and how long you've been there) . I would check on the Swiss site and maybe contact the Japanese embassy in France to ask.",
        },
        {
            user: 1,
            content: "You can apply from the country you are living in. I am a Russian living in UAE and every time I had to travel I applied from the consulate here. Everything was ok. No problem at all.",
        },
        {
            user: 3,
            content: "Hi! Here’s a  useful link . Found them recently. Not sure if they all info but world map visa think is very much up to date:  https://www.holidayhare.com/travel-visa-checker",
        },
        {
            user: 4,
            content: "Thanks for all your helpful comments! Really appreciate it.",
        },
    ];

    const initialComments4 = [
        {
            user: 1,
            content: "Good Day! Can you send detailed information about the listing in my inbox?",
        },
        {
            user: 3,
            content: "Update: Preferably looking for someone who knows how to use Excel also. Thanks.",
        },
        {
            user: 4,
            content: "Trying to find out more about this listing. Sent you a dm!",
        },
        {
            user: 2,
            content: "Hi! Can you DM me",
        },
        {
            user: 0,
            content: "That sounds like a good opportunity!",
        },
    ];

    const initialComments5 = [
        {
            user: 2,
            content: "This is a good stop for breakfast, lunch, or dinner at this long-time Manila restaurant established in 1936. We went on a Saturday morning, and I think because it is well-known, large seating, and popular, it's difficult for service staff to keep up. Be prepared for a little arm-waving, but I think it's still well worth your while to come to this comfortable spot. For me, it was nice to see all the lola and lolo out to enjoy foods with their family. I like to come here again next time I am in Manila.",
        },
        {
            user: 4,
            content: "Food is great but service is very slow, been eating here for decades. the chicken barbecue is the best so is the halo-halo but it takes a long time for them to serve your order or bus your table. they're very busy but the inefficient staff is not helping at all.",
        },
        {
            user: 3,
            content: "Food is delicious and the prices are reasonable. Many varieties of food you can find there, and the best thing is it is open for 24 hours.",
        },
        {
            user: 0,
            content: "Good food if you are on a budget but want to try some authentic Filipino food. They also deliver, which is nice.",
        },
        {
            user: 1,
            content: "I'm always craving for Aristocrat boneless chicken barbeque and everytime I get the chance to dine at Aristocrat, it never fails to please my palate. And for a change, I tried their Kare Kare, it was cooked like what we have at home on special occasions",
        },
    ];

    var sampleUsers = [];
    
    for(var user of initialUsers){
        sampleUsers.push(user.save());
    }
    
    var sampleDiscussions = [];
    var counter = 0;
    for(var user of sampleUsers){
        initialDiscussions[counter].userId = user._id;
        sampleDiscussions.push(new Discussion(initialDiscussions[counter++]).save());
    }

    
}