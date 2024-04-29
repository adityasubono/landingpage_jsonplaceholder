import { fetchData } from "../fetchData";

const url = "https://jsonplaceholder.typicode.com/todos?userId=1";
const getTodos = fetchData(url);

export default getTodos;
