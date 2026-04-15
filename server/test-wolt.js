async function test() {
  const url = "https://restaurant-api.wolt.com/v4/venues/slug/doner-one-one-narimanov/menu";
  console.log("Fetching", url);
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept": "application/json"
    }
  });
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Response text length:", text.length, "Preview:", text.substring(0, 50));
}
test();
