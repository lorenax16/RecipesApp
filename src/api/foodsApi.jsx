export default async function getByFilter(endpoint) {
  try {
    console.log(endpoint);
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}
