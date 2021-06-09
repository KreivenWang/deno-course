async function sendRequest() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1",
    );
    console.log(response.status);
    const exractedData = await response.json();
    console.log(exractedData);
  } catch (err) {
    console.error(err);
  }
}

sendRequest();
