import {User} from "./user.model";

let usersWithoutID = [
  {
    "name": "Maggie Johnson",
    "age": 27,
    "birthDate": new Date("1996-11-13T16:00:00.000Z"),
    "biography": "Passionate about art and design. Always looking for new inspiration and ways to express creativity."
  },
  {
    "name": "Simon Brown",
    "age": 43,
    "birthDate": new Date("1979-02-03T16:00:00.000Z"),
    "biography": "Lifelong learner and avid reader. Constantly seeking new knowledge and insights about the world."
  },
  {
    "name": "Natalie Clark",
    "age": 31,
    "birthDate": new Date("1991-06-25T16:00:00.000Z"),
    "biography": "Passionate traveler and explorer. Loves to experience new cultures and meet new people."
  },
  {
    "name": "Andrew Davis",
    "age": 38,
    "birthDate": new Date("1984-08-08T16:00:00.000Z"),
    "biography": "Enthusiastic sports fan and amateur athlete. Always up for a game of basketball or soccer."
  },
  {
    "name": "Jessica Martin",
    "age": 24,
    "birthDate": new Date("1998-04-17T16:00:00.000Z"),
    "biography": "Dedicated animal lover and volunteer. Believes in making a difference in the world, one paw at a time."
  },
  {
    "name": "Jack Wilson",
    "age": 29,
    "birthDate": new Date("1992-10-07T16:00:00.000Z"),
    "biography": "Aspiring chef and foodie. Always experimenting with new recipes and flavors in the kitchen."
  },
  {
    "name": "Ava Taylor",
    "age": 36,
    "birthDate": new Date("1987-12-22T16:00:00.000Z"),
    "biography": "Passionate about fitness and health. Believes in taking care of mind, body, and soul."
  },
  {
    "name": "Isaac Lee",
    "age": 22,
    "birthDate": new Date("2000-01-29T16:00:00.000Z"),
    "biography": "Aspiring musician and songwriter. Dreams of one day performing on stage for millions of fans."
  },
  {
    "name": "Sophia Anderson",
    "age": 45,
    "birthDate": new Date("1978-08-02T16:00:00.000Z"),
    "biography": "Passionate environmentalist and advocate for sustainability. Believes in leaving the world a better place for future generations."
  },
  {
    "name": "Ethan Baker",
    "age": 33,
    "birthDate": new Date("1989-05-12T16:00:00.000Z"),
    "biography": "Aspiring novelist and avid reader. Loves to get lost in a good book and create new worlds with words."
  },
  {
    "name": "Lily King",
    "age": 26,
    "birthDate": new Date("1996-03-09T16:00:00.000Z"),
    "biography": "Passionate about fashion and style. Loves to experiment with new trends and create unique looks."
  },
  {
    "name": "Oscar Carter",
    "age": 30,
    "birthDate": new Date("1992-12-08T16:00:00.000Z"),
    "biography": "Enthusiastic gamer and tech geek. Always on the cutting edge of the latest technology and gaming trends."
  },
  {
    "name": "Emily White",
    "age": 28,
    "birthDate": new Date("1995-09-18T16:00:00.000Z"),
    "biography": "Passionate about social justice and equality. Believes in fighting for a better world for all people."
  },
  {
    "name": "Lucas Hernandez",
    "age": 25,
    "birthDate": new Date("1997-06-04T16:00:00.000Z"),
    "biography": "Aspiring filmmaker and cinephile. Loves to tell stories through the magic of the silver screen."
  },
  {
    "name": "Grace Martinez",
    "age": 39,
    "birthDate": new Date("1984-02-15T16:00:00.000Z"),
    "biography": "Passionate about gardening and nature. Believes in the healing power of the earth and the beauty of its creations."
  }
];

export let users : User[] = [...usersWithoutID, ...usersWithoutID].map((user, index) => {return {...user, id: index}});
export let id = users[users.length - 1].id;


