import { faker } from '@faker-js/faker';
export const authors = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: faker.person.fullName(),
      country: faker.location.country(),
    });
  }
  console.log(JSON.stringify(data));
  return data;
};

export const authorsStatic = [
  { id: 1, name: 'Jay Block', country: 'Costa Rica' },
  { id: 2, name: 'Edna Wisozk', country: 'Dominican Republic' },
  { id: 3, name: 'Anna Langosh', country: 'Spain' },
  { id: 4, name: 'Percy Schimmel-Hamill', country: 'Mexico' },
  { id: 5, name: 'Leroy Koelpin', country: 'Sudan' },
  { id: 6, name: 'Eduardo Dietrich', country: 'Solomon Islands' },
  { id: 7, name: "Gloria D'Amore", country: 'Equatorial Guinea' },
  { id: 8, name: 'Jorge Kreiger', country: 'Norway' },
  { id: 9, name: 'Leslie Hickle', country: 'Guernsey' },
  {
    id: 10,
    name: 'Orlando Shanahan',
    country: 'Saint Vincent and the Grenadines',
  },
  { id: 11, name: 'Benjamin Hilpert', country: 'Northern Mariana Islands' },
  { id: 12, name: 'Lois Hickle', country: 'Timor-Leste' },
  { id: 13, name: 'Jo Dicki', country: 'Slovenia' },
  { id: 14, name: 'Bryan Larson III', country: 'Thailand' },
  { id: 15, name: 'Holly Jast', country: 'Saint Martin' },
  { id: 16, name: 'Norman Dietrich PhD', country: 'Paraguay' },
  { id: 17, name: 'Debra Bernier', country: 'United States of America' },
  { id: 18, name: 'Ryan Heaney', country: "Lao People's Democratic Republic" },
  { id: 19, name: 'Terrance Baumbach', country: 'Namibia' },
  { id: 20, name: 'Aaron Miller', country: 'Ukraine' },
  { id: 21, name: 'Ramesh Rambabu', country: 'India' },
];
