export default async function getByFilter(endpoint) {
  try {
    const response = await fetch(endpoint);
    console.log(response);
    const data = await response.json();
    return data;
  } catch (err) {
    return `Erro: ${err}`;
  }
}
