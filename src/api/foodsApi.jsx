export default async function getByFilter(endpoint) {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (err) {
    return `ERROR: ${err}`;
  }
}
