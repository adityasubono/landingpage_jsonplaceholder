import { fetchData } from "../fetchData";

const url = "https://jsonplaceholder.typicode.com/photos";
const getPhotos = fetchData(url);

export default getPhotos;
