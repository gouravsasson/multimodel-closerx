interface Voice {
  id: string;
  name: string;
  description: string;
  gender: string;
  age: string;
  accent: string;
}

export const voices: Voice[] = [
  {
    id: "Emma",
    name: "Emma",
    description: "Warm and friendly professional voice",
    gender: "Female",
    age: "Young Adult",
    accent: "American",
  },
  {
    id: "James",
    name: "James",
    description: "Deep and authoritative business voice",
    gender: "Male",
    age: "Adult",
    accent: "British",
  },
  {
    id: "Sophia",
    name: "Sophia",
    description: "Clear and articulate presenter voice",
    gender: "Female",
    age: "Adult",
    accent: "Australian",
  },
  {
    id: "Michael",
    name: "Michael",
    description: "Engaging and dynamic narrator voice",
    gender: "Male",
    age: "Young Adult",
    accent: "American",
  },
];
