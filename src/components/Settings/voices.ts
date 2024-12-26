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
    id: "Charon",
    name: "Charon",
    description: "Warm and friendly professional voice",
    gender: "Female",
    age: "Young Adult",
    accent: "American",
  },
  {
    id: "Puck",
    name: "Puck",
    description: "Deep and authoritative business voice",
    gender: "Male",
    age: "Adult",
    accent: "British",
  },
  {
    id: "Kore",
    name: "Kore",
    description: "Clear and articulate presenter voice",
    gender: "Female",
    age: "Adult",
    accent: "Australian",
  },
  {
    id: "Fenrir",
    name: "Fenrir",
    description: "Engaging and dynamic narrator voice",
    gender: "Male",
    age: "Young Adult",
    accent: "American",
  },
  {
    id: "Aoede",
    name: "Aoede",
    description: "Engaging and dynamic narrator voice",
    gender: "Male",
    age: "Young Adult",
    accent: "American",
  },
];
