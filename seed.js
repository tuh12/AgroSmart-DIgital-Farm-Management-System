const { readData, writeData } = require("./store");
const { hashPassword } = require("./auth");

const data = readData();

if (!data.users.some((user) => user.email === "demo@smartagro.local")) {
  const user = {
    id: "usr_demo",
    name: "Demo Farmer",
    email: "demo@smartagro.local",
    phone: "+8801000000000",
    location: "Dhaka, Bangladesh",
    passwordHash: hashPassword("demo1234"),
    createdAt: new Date().toISOString()
  };

  data.users.push(user);
  data.farms.push(
    {
      id: "frm_demo_rice",
      userId: user.id,
      name: "Aman Rice Field",
      crop: "Rice",
      area: 4.5,
      soilType: "Clay loam",
      irrigationStatus: "Active",
      health: 91,
      createdAt: new Date().toISOString()
    },
    {
      id: "frm_demo_jute",
      userId: user.id,
      name: "Jute Strip",
      crop: "Jute",
      area: 2.1,
      soilType: "Silty loam",
      irrigationStatus: "Rain-fed",
      health: 84,
      createdAt: new Date().toISOString()
    }
  );
  data.tasks.push({
    id: "tsk_demo_1",
    userId: user.id,
    title: "Scout rice field for leaf blast",
    dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    priority: "high",
    status: "open",
    createdAt: new Date().toISOString()
  });
}

writeData(data);
console.log("Seed complete. Demo login: demo@smartagro.local / demo1234");
