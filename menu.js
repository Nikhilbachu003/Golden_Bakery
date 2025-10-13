function filterItems(category){
    let cards = document.querySelectorAll(".card")
    let buttons = document.querySelectorAll("#filter_btns>button")
    console.log(buttons)
    cards.forEach((card) => {
        if (category == "all") {
            card.style.display = 'flex'
        } else {
            if (card.classList.contains(category)) {
                card.style.display = 'flex'
            } else {
                card.style.display = 'none'
            }
        }
    })
    buttons.forEach((btn) => {
        btn.classList.remove("active")
    })
    event.target.classList.add("active")

    // Re-attach event listeners after filtering
    attachCardEventListeners()
}

//!Add to cart Functionality

// Removed duplicate declaration of close_sidebar

let cart = [];
let cards = document.querySelectorAll(".card");

cards.forEach((card) => {
    let name = card.querySelector('.card_one>.card_info>h1').innerText;
    let price = Number(card.querySelector('.card_one>.card_info>p').innerText.replace("₹", ''));
    let quantity = card.querySelector('.card_two>.card_quantity>.quantity');

    let plusbtn = card.querySelector(".plus");
    plusbtn.addEventListener("click", () => {
        quantity.innerText = Number(quantity.innerText) + 1;
    });

    let minusbtn = card.querySelector('.minus');
    minusbtn.addEventListener("click", () => {
        let current = Number(quantity.innerText);
        if (current > 0) quantity.innerText = current - 1;
    });

    //  Add to Cart button logic inside the loop
    let addBtn = card.querySelector(".addtocart>button");
    if (addBtn) {
        addBtn.addEventListener("click", () => {
            let qty = Number(quantity.innerText);
            if (qty > 0) {
                let existingItem = cart.find(item => item.name == name);
                if (existingItem) {
                    existingItem.qty += qty;
                } else {
                    cart.push({ name, qty, price });
                    addBtn.style.background = 'green';
                }
                updateCart();
                quantity.innerText = 0;  
            } else {
                alert("Please add at least 1 item");
            }
        });
    }
});

// Remove duplicate Add to Cart code below the loop

function updateCart() {
  let sidebar_items = document.getElementById("sidebar_items");
  sidebar_items.innerHTML = `
    <div class="sidebar-item-row" style="font-weight:600;">
      <span>QTY</span>
      <span>Description</span>
      <span>Unit Price</span>
      <span>Amount</span>
    </div>
  `;
  let subtotal = 0;
  cart.forEach(item => {
    let amount = item.price * item.qty;
    subtotal += amount;
    sidebar_items.innerHTML += `
      <div class="sidebar-item-row">
        <span>${item.qty}</span>
        <span>${item.name}</span>
        <span>₹${item.price.toFixed(2)}</span>
        <span>₹${amount.toFixed(2)}</span>
      </div>
    `;
  });
  let tax = subtotal * 0.05;
  let total = subtotal + tax;
  document.getElementById("sidebar_subtotal").innerText = `₹${subtotal.toFixed(2)}`;
  document.getElementById("sidebar_tax").innerText = `₹${tax.toFixed(2)}`;
  document.getElementById("sidebar_total").innerText = `₹${total.toFixed(2)}`;

  // Calculate total quantity and price
  let totalQty = 0;
  let totalPrice = 0;
  cart.forEach(item => {
    totalQty += item.qty;
    totalPrice += item.price * item.qty;
  });

  // Update navbar cart quantity and price
  document.getElementById("cart_quantity").innerText = totalQty;
  document.getElementById("cart_price").innerText = `₹${totalPrice.toFixed(2)}`;
}

// Sidebar open/close logic
let cart_icon = document.getElementById('sidebar_icon');
let sidebar = document.getElementById('sidebar');

cart_icon.addEventListener("click", () => {
    sidebar.style.right = "0px";
    updateCart(); // Ensure cart is updated when sidebar opens
});

let close_sidebar = document.querySelector("#close_sidebar");
close_sidebar.addEventListener("click", () => {
  const sidebar = document.getElementById('sidebar');
  if (window.innerWidth <= 600) {
    sidebar.style.right = "-100vw";
  } else if (window.innerWidth <= 900) {
    sidebar.style.right = "-80vw";
  } else {
    sidebar.style.right = "-350px";
  }
});