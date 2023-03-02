const updateForm = document.getElementById("updateForm");

updateForm.onsubmit = async (e) => {
  e.preventDefault();
  const body = {
    id: document.getElementById("id").value,
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
  };

  try {
    const { status } = await (
      await fetch("/edit", {
        method: "PUT",
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
