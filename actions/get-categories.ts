import { database } from "@/lib/database";

export async function getGenres() {
  try {
    const genres = await database.genre.findMany();
    return genres;
  } catch (error) {
    console.log("[GET_GENRES]", error);
    return [];
  }
}
