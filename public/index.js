async function onDelete(id) {
  if (!id) {
    return;
  }
  try {
    const { status } = await (
      await fetch("/delete", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    if (status) {
      window.location.replace("/products");
    } else {
      throw new Error("Error in front end");
    }
  } catch (error) {
    console.log(error);
  }
}
