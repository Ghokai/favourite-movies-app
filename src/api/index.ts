export async function fetchMovies(): Promise<any> {
  const response = await fetch("./movies.json");
  const data = await response.json();
  return data;
}

export const imagesFolderPath = "images/";
