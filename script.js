// Toggle Picking Points
const toggleBtn = document.getElementById("toggle-points");
const pointsList = document.getElementById("points-list");

toggleBtn.addEventListener("click", () => {
  pointsList.style.display = pointsList.style.display === "none" ? "block" : "none";
  toggleBtn.textContent = pointsList.style.display === "none" ? "Show Picking Points" : "Hide Picking Points";
});

// Contact Button
const contactBtn = document.getElementById("contact-btn");
const phoneSpan = document.getElementById("phone");

contactBtn.addEventListener("click", () => {
  phoneSpan.style.display = phoneSpan.style.display === "none" ? "inline" : "none";
});

// Share Button
const shareBtn = document.getElementById("share-btn");
shareBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(window.location.href);
  alert("Link copied!");
});

// Cart Button
const cartBtn = document.getElementById("cart-btn");
const cartForm = document.getElementById("cart-form");

cartBtn.addEventListener("click", () => {
  cartForm.style.display = cartForm.style.display === "none" ? "block" : "none";
});

// Submit Order
const orderForm = document.getElementById("order-form");

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Collect selected products
  const products = document.querySelectorAll(".product");
  let orderItems = [];
  products.forEach(p => {
    const qty = parseInt(p.querySelector(".qty").value);
    if (qty > 0) {
      orderItems.push({
        name: p.querySelector("h3").textContent,
        price: parseInt(p.dataset.price),
        quantity: qty
      });
    }
  });

  const orderDetails = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone-input").value,
    payment: document.getElementById("payment").value,
    instructions: document.getElementById("instructions").value,
    items: orderItems
  };

  console.log("Order Submitted:", orderDetails);
  alert("Order submitted! Check console for details.");
});
