const { MongoClient } = require("mongodb");

const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);

// You will understand this boilerplate in session 6.
// For now, your job is to fill in the seven TODOs below.

async function main() {
  await client.connect();
  const users = client.db("blog_db").collection("users");

  await users.deleteMany({});

  // TODO 1: insert a user with an embedded address object.
  // The address must have at least a city and a country field.
  await users.insertOne({
    name: "Alice",
    email: "alice@example.com",
    address: { city: "Paris", country: "France" },
    avatar: "https://images.pexels.com/photos/17191688/pexels-photo-17191688.jpeg",
  });

  // TODO 2: insert a user with a skills array containing at least 3 items.
  await users.insertOne({
    name: "Bob",
    email: "bob@example.com",
    skills: ["JavaScript", "MongoDB", "Node.js"],
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  });

  // TODO 3: use insertMany to insert at least 5 users in a single call.
  // Requirements:
  //   - At least 2 users must have address.country set to "France"
  //   - At least 2 users must have a skills array with at least 1 item
  await users.insertMany([
    {
      name: "Carol",
      email: "carol@example.com",
      address: { city: "Lyon", country: "France" },
      skills: ["Python", "Docker"],
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    {
      name: "Dave",
      email: "dave@example.com",
      address: { city: "Marseille", country: "France" },
      skills: ["React", "CSS"],
      avatar: "https://images.pexels.com/photos/29563572/pexels-photo-29563572.jpeg",
    },
    {
      name: "Eve",
      email: "eve@example.com",
      address: { city: "Luxembourg City", country: "Luxembourg" },
      skills: ["Go", "Kubernetes"],
      avatar: "https://images.pexels.com/photos/8278980/pexels-photo-8278980.jpeg",
    },
    {
      name: "Frank",
      email: "frank@example.com",
      skills: ["TypeScript", "Next.js"],
      avatar: "https://images.pexels.com/photos/5439136/pexels-photo-5439136.jpeg",
    },
    {
      name: "Grace",
      email: "grace@example.com",
      address: { city: "Madrid", country: "Spain" },
      skills: ["Musician", "Composer"],
      avatar: "https://images.pexels.com/photos/12333568/pexels-photo-12333568.jpeg",
    },
  ]);

  // TODO 4: retrieve all documents and log each user's name.
  const allUsers = await users.find().toArray();
  console.log("--- All Users ---");
  allUsers.forEach((u) => console.log(u.name));

  // TODO 5: use dot notation to find the user whose address.city is "Paris" and log the result.
  const parisUser = await users.findOne({ "address.city": "Paris" });
  console.log("\n--- User in Paris ---");
  console.log(parisUser);

  // TODO 6: find all users whose address.country is "France" and log their names.
  const frenchUsers = await users.find({ "address.country": "France" }).toArray();
  console.log("\n--- Users in France ---");
  frenchUsers.forEach((u) => console.log(u.name));

  // TODO 7: find all users who have a skills field and log their names.
  const skilledUsers = await users.find({ skills: { $exists: true } }).toArray();
  console.log("\n--- Users with Skills ---");
  skilledUsers.forEach((u) => console.log(u.name));

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
