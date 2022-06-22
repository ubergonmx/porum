function discussion(id, title, author, tag, date, content, comments_num, commenters, comments){
    return {
        id: id,
        title: title,
        author: author,
        tag: tag,
        date: date,
        content: content,
        comments_num: comments_num,
        commenters: commenters,
        comments: comments
    }
}

function user(username, imgSrc, profile, comments, bio){
    return {
        username: username,
        imgSrc: imgSrc,
        profile: profile,
        comments: comments,
        bio: bio
    }
}

function comment(discussion, content, date){
    return{
        discussion: discussion,
        content: content,
        date: date
    }
}

function tag(name, color){
    return {
        name: name,
        color: color
    }
}

function notification (type, commenter){
    return {
        type: type,
        commenter: commenter,
    };
}

export const tags = [
    new tag("FAQ's", "orange"), 
    new tag("Off-Topic Chatter", "green"), 
    new tag("Feedback", "purple"), 
    new tag("Member Spotlight", "red"), 
    new tag("Introductions", "blue"), 
    new tag("Announcements", "pink"), 
    new tag("Showcase", "gray"), 
    new tag("Jobs", "brown"),
];



//discussion is used as string for now
var comments = [
    // Disc 1
    new comment(
        "discussion1.html#comment1",
        "Hi, welcome! Yes, there are many subs where people share info/advice/opinions etc. Having said that, you might not be able to post or comment right away due to being new. Id suggest you take a look around and find some subs that interest you, then you can see what their posting requirements (if any) might be. There's also a list of new Porum friendly subs in the links Automod gave. If you need anything else, just let us know",
        new Date(2022, 4, 1)
    ),
    new comment(
        "discussion1.html#comment2",
        "Hi and welcome! Porum is more than a q&a site, but not quite social media. On top of that, different cultures exist on different subs. I highly recommend reading the rules of a sub and get a feeling for the way posts go there before posting. The info available about this sub is very helpful and I always suggest people take the time to read it. It probably depends on the sub, but you might have more fun watching the posts for subjects you have expertise in rather than posting randomly about your skills that might not even be seen by the people who most want to know.",
        new Date(2022, 4, 2)
    ),
    new comment(
        "discussion1.html#comment3",
        "Congrats! Now let’s share some content on Porum! Have fun out there!",
        new Date(2022, 4, 2)
    ),
    new comment(
        "discussion1.html#comment4",
        "Welcome and yeah for pushing a new learning, because it's about porum band learning. First things first , read r/newtoPorum. (Sorry I haven't learn to link in yet). Then reread my best advice plus be kind, nice or funny.",
        new Date(2022, 4, 5)
    ),
    new comment(
        "discussion1.html#comment5",
        "Welcome to Porum! Porum isn't like other social media. People don't share personal stuff here that much, it's a place where anonymity is valued. You can still make friends here, but the content is the focus.",
        new Date(2022, 4, 5)
    ),
    // Disc 2
    new comment(
        "discussion2.html#comment6",
        "I work for the Infectious Disease Bureau at the Boston Public Health Commission. This post is outstanding. Like...whoa. (bowing my head)",
        new Date(2022, 4, 13)
    ),
    new comment(
        "discussion2.html#comment7",
        "I’m supposed to get on an airplane next week with my toddler with 0 safety measures in place this is insane.",
        new Date(2022, 4, 14)
    ),
    new comment(
        "discussion2.html#comment8",
        "Please do what you need to do to protect yourselves. CDC in the U.S. seems to be the only one ignoring the link between child hepatitis cases and SARS2. Other countries have recognized the possible link and are leaning in that direction. We are not in a good spot right now as far as transparency goes.",
        new Date(2022, 4, 14)
    ),
    // Disc 3
    new comment(
        "discussion3.html#comment9",
        "As a general rule, you can apply for a visa from a country where you a resident, and it need not be your country of citizenship.",
        new Date(2020, 4, 13)
    ),
    new comment(
        "discussion3.html#comment10",
        "It really just depends on the rules of your home country. Depending on your visa, and how long it's valid sometimes 2 months before it expires (minimum) you would be able to go to the Swiss embassy or consulate in France and apply for your visa there, because technically at the moment you're considered a resident of France (like I said depending on your visa and how long you've been there) . I would check on the Swiss site and maybe contact the Japanese embassy in France to ask.",
        new Date(2020, 7, 20)
    ),
    new comment(
        "discussion3.html#comment11",
        "You can apply from the country you are living in. I am a Russian living in UAE and every time I had to travel I applied from the consulate here. Everything was ok. No problem at all.",
        new Date(2020, 9, 23)
    ),
    new comment(
        "discussion3.html#comment12",
        "Hi! Here’s a  useful link . Found them recently. Not sure if they all info but world map visa think is very much up to date: https://www.holidayhare.com/travel-visa-checker",
        new Date(2021, 1, 2)
    ),
    new comment(
        "discussion3.html#comment13",
        "Hey there, from my experience you are allowed to apply from the country you are residing in. I often apply from the embassy here in Vietnam and everything works as it should.",
        new Date(2021, 1, 4)
    ),
    // Disc 4
    new comment(
        "discussion4.html#comment14",
        "Good Day! Can you send detailed information about the listing in my inbox?",
        new Date(2022, 4, 15)
    ),
    new comment(
        "discussion4.html#comment15",
        "Hello! I've sent you a DM to inquire about more details :)",
        new Date(2022, 4, 16)
    ),
    new comment(
        "discussion4.html#comment16",
        "Trying to find out more about this listing. Sent you a dm!",
        new Date(2022, 4, 16)
    ),
    new comment(
        "discussion4.html#comment17",
        "Hi! Can you DM me?",
        new Date(2022, 4, 17)
    ),
    // Disc 5
    new comment(
        "discussion5.html#comment18",
        "This is a good stop for breakfast, lunch, or dinner at this long-time Manila restaurant established in 1936. We went on a Saturday morning, and I think because it is well-known, large seating, and popular, it's difficult for service staff to keep up. Be prepared for a little arm-waving, but I think it's still well worth your while to come to this comfortable spot. For me, it was nice to see all the lola and lolo out to enjoy foods with their family. I like to come here again next time I am in Manila.",
        new Date(2022, 4, 25)
    ),
    new comment(
        "discussion5.html#comment19",
        "Food is great but service is very slow, been eating here for decades. the chicken barbecue is the best so is the halo-halo but it takes a long time for them to serve your order or bus your table. they're very busy but the inefficient staff is not helping at all.",
        new Date(2022, 4, 25)
    ),
    new comment(
        "discussion5.html#comment20",
        "Food is delicious and the prices are reasonable. Many varieties of food you can find there, and the best thing is it is open for 24 hours.",
        new Date(2022, 4, 26)
    ),
    new comment(
        "discussion5.html#comment21",
        "Good food if you are on a budget but want to try some authentic Filipino food. They also deliver, which is nice.",
        new Date(2022, 4, 27)
    ),
    new comment(
        "discussion5.html#comment22",
        "I'm always craving for Aristocrat boneless chicken barbeque and everytime I get the chance to dine at Aristocrat, it never fails to please my palate. And for a change, I tried their Kare Kare, it was cooked like what we have at home on special occasions",
        new Date(2022, 4, 27)
    ),
];

var users = [
    new user("harry31", "images/users/user1.jpg", "user1.html",[comments[11]], "Hi I’m Harry Higgins I have been a freelancer since 2019 and I enjoy my profession."),    
    new user("i_am_john", "images/users/user2.jpg", "user2.html", [comments[5], comments[13],], "Hey there! I’m John Patterson, I have a passion for cooking and currently I have my own food blog."),    
    new user("matt5", "images/users/user3.jpg", "user3.html", [comments[0], comments[12], comments[17]], "Hello, My name is Matthew Wright. I am graduate in business management major and I currently work as a CEO of my company in Dallas."),    
    new user("sukisekine", "images/users/user4.jpg", "user4.html", [comments[8], comments[14]], " Hi! I am Suki Sekine. I was born and raised in Thailand. I enjoy my neighborhood and I am a housewife with 2 loving children." ),    
    new user("real_sarah", "images/users/user5.jpg", "user5.html", [comments[1], comments[7], comments[18]], "Hey! Welcome to my profile, I’m the real Sarah Li. I live in China where I have similar names here in my town that’s why my name is very common. I have 3 dogs and 2 cats. I am an animal lover!"),    
    new user("rena", "images/users/user6.jpg", "user6.html", [comments[2], comments[9]], "Hi, my name is Renata Glasc, I am currently a senior student at Moscow State University taking up a major in Civil Engineering. I can’t wait to finally graduate and apply for the best company here in Moscow."),    
    new user("shirley.mood", "images/users/user7.jpg", "user7.html", [comments[3], comments[21]], "Hello there! I’m Shirley Cobb. I work as a nurse at UCLA Medical Center since 2010 and I love my job especially taking care of our patients."),    
    new user("ferrari_von", "images/users/user8.jpg", "user8.html", [comments[6], comments[15], comments[19]], "Hi, my name is Von Miller. I am a car enthusiast and Ferrari is one of my favorite car brands. I currently own 4 Ferrari gallardo."),    
    new user("dimbutcher", "images/users/user9.jpg", "user9.html", [comments[16], comments[20]], "Hey! I’m Dimitri Howard. I'm currently taking up Computer Science at the University of Toronto."),   
    new user("designer1", "images/users/user10.jpg", "user10.html", [comments[4], comments[10]], "Hi there! My name is Matylda Patterson I am a fashion designer at Versace. Donatella Versace is a good friend of mine."),
];

var discussions = [
    new discussion("discussion1.html",
        "Hi All, new to Porum here, and have a question",
        users[0],
        tags[4],
        new Date(2022, 4, 1),
        "Hi Guys, first of all I hope you all are ok. I have a question on how to use reddit, is it just like an Q&A platform as that seems from outside, or is info sharing also allowed and appreciated without someone asking? I am an experienced software dev, also I know a few tricks on garden agriculture, also I'm into automated systems from auto watering solutions to drones... (also that's a shame but I have an interest in international politics.) I hope I can share and also find quality information over here. Kind regards.",
        5,
        [users[2], users[4], users[5], users[6], users[9]],
        [comments[0], comments[1],comments[2],comments[3],comments[4]]
    ),
    new discussion("discussion2.html",
        "May 12th, 2022 COVID-19 update: 6,523 new cases, 18 new deaths, 728 hospitalized, 230 for COVID.",
        users[6],
        tags[5],
        new Date(2022, 4, 13),
        "6,523 confirmed and probable cases, with 5,576 positives from 70,283 tests. Of the 728 hospitalized, 230 are for COVID, 66 in the ICU, 27 Intubated, and 484 vaccinated Cases, test positivity rate, and wasterwater viral loads at winter 2020-2, and winter 2021-22 levels. Incidental COVID hospitalizations set to soon surpass Alpha/Delta levels later this week. Primary COVID hospitalizations, ICU, and intubations slightly above summer 2020 and summer 2021 levels, but below Alpha/Delta levels. No new wastewater report today, yet. Data note: With an increase in antigen at home testing, statewide probable and confirmed cases are added up and aggregated together.",
        3,
        [users[1], users[7], users[4]],
        [comments[5], comments[6],comments[7]]
    ),
    new discussion("discussion3.html",
        "Is it possible to apply for a Swiss student visa from a country outside of your home country?",
        users[8],
        tags[0],
        new Date(2020, 4, 17),
        "I am Japanese, currently living in France under a student visa. I will be studying in Geneva from September and need to apply for a Swiss student visa, and am wondering if I can do so from Paris, or if it is mandatory that I apply from my home country of Japan ? I sent an email to the Swiss embassy in Paris but as I expected it’s taking a while to get a response.",
        5,
        [users[3], users[5], users[9], users[0], users[2]],
        [comments[8], comments[9],comments[10],comments[11],comments[12]]
    ),
    new discussion("discussion4.html",
        "Sales Person - $20/hr",
        users[9],
        tags[7],
        new Date(2022, 4, 15),
        "We are urgently looking for a part-time Sales Person for B2B Inside Sales. This will be a work-from-home opportunity. You would need to get on video calls or phone calls with our clients and guide them regarding the services we are offering, trying your best to crack a deal with them. We are looking for someone who is expressive and holds excellent communication skills. Also, we are looking for a US-based salesperson since you will be required to deal with our US-based clients. Pay: $20/hr For this profile, you would need a Laptop/computer, cellphone, and stable internet.",
        4,
        [users[1], users[3], users[7], users[8]],
        [comments[13], comments[14],comments[15],comments[16]]
    ),
    new discussion("discussion5.html",
        "Review of the Aristocrat Restaurant",
        users[1],
        tags[2],
        new Date(2022, 4, 25),
        "The food is sumptuous, good servings and it’s been Aristocrat since I was a child. The Java rice was a bit dry and no flavour at all... that was a let down. Other than that, everything was a delightful gastronomical experience. As with other restaurants in the Phils, it was noisy and you have to line up for a number to get seats!",
        5,
        [users[2], users[4], users[7], users[8], users[6]],
        [comments[17], comments[18],comments[19],comments[20], comments[21]]
    ),   
];

var notifications = [
    new notification("discussion", users[2]),
    new notification("discussion", users[4]),
    new notification("discussion", users[5]),
    new notification("discussion", users[6]),
    new notification("discussion", users[9]),
]