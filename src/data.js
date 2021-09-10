import faker from "faker";
faker.locale = "en_IND";

faker.seed(123);

export const data = [...Array(50)].map((item) => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  brand: faker.lorem.word(),
  inStock: faker.datatype.boolean(),
  fastDelivery: faker.datatype.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  level: faker.random.arrayElement([
    "beginner",
    "amateur",
    "intermediate",
    "advanced",
    "professional",
  ]),
}));
