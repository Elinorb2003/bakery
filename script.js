// Initialize EmailJS
emailjs.init("WCBjljBV1cfSHqYpz"); // replace with your EmailJS public key

// Elements
const contactBtn = document.getElementById("contact-btn");
const phoneSpan = document.getElementById("phone");
const shareBtn = document.getElementById("share-btn");
const cartBtn = document.getElementById("cart-btn");
const cartForm = document.getElementById("cart-form");
const orderForm = document.getElementById("order-form");
const cartItemsUl = document.getElementById("cart-items");
const totalPriceP = document.getElementById("total-price");

// Toggle Contact
contactBtn.addEventListener("click", () => {
  phoneSpan.style.display = phoneSpan.style.display === "none" ? "inline" : "none";
});

// Share site link
shareBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(window.location.href);
  alert("Link copied!");
});

// Toggle Cart Form
cartBtn.addEventListener("click", () => {
  cartForm.style.display = cartForm.style.display === "none" ? "block" : "none";
});

// Update cart
function updateCart() {
  let total = 0;
  cartItemsUl.innerHTML = "";
  const products = document.querySelectorAll(".product");
  products.forEach(p => {
    const qty = parseInt(p.querySelector(".qty").value);
    if (qty > 0) {
      const name = p.querySelector("h3").textContent;
      const price = parseInt(p.dataset.price);
      const itemTotal = qty * price;
      total += itemTotal;
      const li = document.createElement("li");
      li.textContent = `${name} x ${qty} = $${itemTotal}`;
      cartItemsUl.appendChild(li);
    }
  });
  totalPriceP.textContent = `Total: $${total}`;
}

// Listen to quantity changes
document.querySelectorAll(".qty").forEach(input => {
  input.addEventListener("input", updateCart);
});

// Submit order
orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const pickingPoint = document.querySelector('input[name="point"]:checked');
  if (!pickingPoint) {
    alert("Please select a picking point!");
    return;
  }

  const customerEmail = document.getElementById("email-input").value.trim();
  if (!customerEmail) {
    alert("Please enter your email to receive the confirmation!");
    return;
  }

  const products = document.querySelectorAll(".product");
  let orderItems = [];
  let total = 0;
  products.forEach(p => {
    const qty = parseInt(p.querySelector(".qty").value);
    if (qty > 0) {
      const name = p.querySelector("h3").textContent;
      const price = parseInt(p.dataset.price);
      const itemTotal = qty * price;
      total += itemTotal;
      orderItems.push(`${name} x ${qty} = $${itemTotal}`);
    }
  });

  if(orderItems.length === 0){
    alert("Please add at least one product to the cart!");
    return;
  }

  const templateParams = {
    customerName: document.getElementById("name").value,
    customerPhone: document.getElementById("phone-input").value,
    email: customerEmail,
    pickingPoint: pickingPoint.value,
    payment: document.getElementById("payment").value,
    instructions: document.getElementById("instructions").value,
    items: orderItems.join("\n"),
    total: total
  };

  // Send email to bakery
  emailjs.send('service_kakw49i', 'template_uogrvrh', templateParams)
    .then(() => {
      // Send confirmation to customer
      emailjs.send('service_kakw49i', 'template_uogrvrh', {
        ...templateParams,
        to_email: customerEmail
      });

      alert("Order sent! Confirmation email has been sent to you as well.");
      orderForm.reset();
      updateCart();
    })
    .catch((error) => {
      alert("Failed to send order. Please try again.");
      console.error(error);
    });
});
