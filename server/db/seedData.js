// Make some arrays of objects based on schema design

// Users

const users = [
  {
    username: "ilovetodance",
    password: "dancer4lyfe",
    name: "Hermione Granger",
    accountCreationDate: "2022-07-25",
    subscriptionStatus: true,
  },
  {
    username: "ballerinagirl93",
    password: "pointYourToes",
    name: "Lavender Brown",
    accountCreationDate: "2019-02-16",
    subscriptionStatus: true,
  },
  {
    username: "bboy85",
    password: "iLoveToBattle25",
    name: "Seamus Finnigan",
    accountCreationDate: "2020-03-31",
    subscriptionStatus: false,
  },
];

// Instructors
const instructors = [
  {
    name: "Aliya Janell",
    bio: "Aliya Janell is an L.A. based professional dancer, choreographer, and content creator. Aliya launched her own dance experience Queens N’ Lettos to create a space for women to feel empowered, confident, and most of all sexy in their own skin.",
    style: "heels",
    imageURL: "https://steezy.imgix.net/instructors/aliya-janell-col.jpg?w=300",
  },
  {
    name: "Karen Chuang",
    bio: "Specializing in Contemporary, Karen has performed and taught in workshops all over the world. She has worked with artists including Nicki Minaj, Kanye West, Lady Gaga, Billie Eilish, and Carly Rae Jepson.",
    style: "contemporary",
    imageURL: "https://steezy.imgix.net/instructors/karen-chuang-col.jpg?w=300",
  },
  {
    name: "Marie Poppins",
    bio: "Marie “Poppins” Bonnevay first discovered Street Dance in her home country of France. She started training in Locking, Breaking, House, Waacking, Voguing and Choreography, but found her natural strength in Popping.",
    style: "popping",
    imageURL:
      "https://steezy.imgix.net/instructors/marie-poppins-col.jpg?w=300",
  },
];

// Classes

const videoClasses = [
  {
    instructor_id: 2,
    instructor_name: "Karen Chuang",
    style: "contemporary",
    level: "beginner",
    videoURL: "https://www.youtube.com/embed/J_wT_eRYksY?si=hSlAdEM1iUKS_ECb",
    submitted_by: 2,
  },
  {
    instructor_id: 1,
    instructor_name: "Aliya Janell",
    style: "heels",
    level: "advanced",
    videoURL: "https://www.youtube.com/embed/UfP9ifDmZIM?si=nXzJUMV4ciHx0lVo",
    submitted_by: 2,
  },
  {
    instructor_id: 3,
    instructor_name: "Marie Poppins",
    style: "popping",
    level: "intermediate",
    videoURL: "https://www.youtube.com/embed/QInF2xm3qz4?si=kGie_5nbRvU6amsY",
    submitted_by: 2,
  },
];

// Subscription

const subscriptions = [
  { user_id: 1, annual: true, monthly: false, studentDiscount: false },
  { user_id: 2, annual: false, monthly: true, studentDiscount: true },
  { user_id: 3, annual: false, monthly: false, studentDiscount: false },
];

const favorites = [
  { favoriteId: 1, userId: 1, videoId: 1 },
  { favoriteId: 2, userId: 1, videoId: 2 },
];

module.exports = { users, instructors, videoClasses, subscriptions, favorites };
