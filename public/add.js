const addForm = document.getElementById("addForm");

addForm.onsubmit = async (e) => {
  e.preventDefault();

  const body = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
  };
  try {
    const { status } = await (
      await fetch("/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
    ).json();
    if (status) {
      window.location.replace("/products");
    }
  } catch (error) {
    console.log(error);
  }
};
