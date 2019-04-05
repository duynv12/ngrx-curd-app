export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  address = new Address();
  phone: string;
  website: string;
  company = new Company();
}


export class Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo = new Geo();
}

export class Geo {
  lat: string;
  lng: string;
}

export class Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
