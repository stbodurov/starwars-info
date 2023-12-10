export type StarWarsEntity = Person | Planet | Starship | Vehicle;

export interface StarWarsEntityBase {
  name: string;
  films: string[];
  episodeIds?: number[];
  url: string;
}

export interface Person extends StarWarsEntityBase {
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  species: string;
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
}

export interface Planet extends StarWarsEntityBase {
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
}

export interface Starship extends StarWarsEntityBase {
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  created: string;
  edited: string;
}

export interface Vehicle extends StarWarsEntityBase {
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  created: string;
  edited: string;
}

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string[];
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}
