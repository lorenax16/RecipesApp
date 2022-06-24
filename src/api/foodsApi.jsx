export default async function getByFilter(endpoint) {
  try {
    const response = await fetch(endpoint);
    // console.log(response);
    const data = await response.json();
    // const { meals } = await response.json();
    // console.log(meals);
    return data;
    // return meals;
  } catch (err) {
    return `Erro: ${err}`;
  }
}
