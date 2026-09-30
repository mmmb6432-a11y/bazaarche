/* =========================
   بازارچه
   JavaScript
========================= */


/* آگهی‌های اولیه */

let products = [

  {
    id: 1,
    title: "Poco X3 NFC",
    price: 4500,
    category: "موبایل",
    location: "زرنج",
    phone: "0700000000",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    description:
      "گوشی سالم و آماده استفاده."
  },

  {
    id: 2,
    title: "لپتاپ",
    price: 18000,
    category: "الکترونیک",
    location: "هرات",
    phone: "0700000000",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    description:
      "لپتاپ مناسب کار، درس و استفاده روزمره."
  },

  {
    id: 3,
    title: "موتر شخصی",
    price: 350000,
    category: "موتر",
    location: "کابل",
    phone: "0700000000",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a",
    description:
      "موتر شخصی در وضعیت خوب."
  },

  {
    id: 4,
    title: "لباس نو",
    price: 1200,
    category: "لباس",
    location: "زرنج",
    phone: "0700000000",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
    description:
      "لباس نو و مناسب استفاده روزمره."
  },

  {
    id: 5,
    title: "خانه",
    price: 800000,
    category: "خانه",
    location: "زرنج",
    phone: "0700000000",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    description:
      "خانه مناسب خانواده."
  }

];


/* نمایش آگهی‌ها */

function displayProducts(list) {

  const container =
    document.getElementById("products");

  const count =
    document.getElementById("resultCount");

  container.innerHTML = "";

  count.textContent =
    list.length + " آگهی";


  if (list.length === 0) {

    container.innerHTML = `
      <div class="empty">
        <h3>😔</h3>
        <p>آگهی مورد نظر پیدا نشد.</p>
      </div>
    `;

    return;
  }


  list.forEach(product => {

    const card =
      document.createElement("div");

    card.className = "card";


    const safePhone =
      product.phone.replace(
        /[^0-9+]/g,
        ""
      );


    card.innerHTML = `

      <img
        class="card-image"
        src="${product.image}"
        alt="${product.title}"
        onerror="this.src='https://via.placeholder.com/600x400?text=Bazaarche'"
      >

      <div class="card-body">

        <span class="category">
          ${product.category}
        </span>

        <h3>
          ${product.title}
        </h3>

        <div class="price">
          ${formatPrice(product.price)} افغانی
        </div>

        <div class="location">
          📍 ${product.location}
        </div>

        <div class="description">
          ${product.description}
        </div>

        <a
          class="contact"
          href="tel:${safePhone}"
        >
          📞 تماس با فروشنده
        </a>

      </div>
    `;


    container.appendChild(card);

  });

}


/* تبدیل قیمت */

function formatPrice(price) {

  return Number(price).toLocaleString("fa-AF");

}


/* جستجو */

function searchProducts() {

  const search =
    document
      .getElementById("searchInput")
      .value
      .trim()
      .toLowerCase();


  const result =
    products.filter(product => {

      return (

        product.title
          .toLowerCase()
          .includes(search)

        ||

        product.category
          .toLowerCase()
          .includes(search)

        ||

        product.location
          .toLowerCase()
          .includes(search)

      );

    });


  displayProducts(result);

}


/* فیلتر دسته‌بندی */

function filterCategory(category) {

  if (category === "همه") {

    displayProducts(products);

    return;

  }


  const result =
    products.filter(product =>
      product.category === category
    );


  displayProducts(result);

}


/* باز کردن فرم */

function openForm() {

  document
    .getElementById("formModal")
    .style.display = "block";

}


/* بستن فرم */

function closeForm() {

  document
    .getElementById("formModal")
    .style.display = "none";

}


/* ثبت آگهی */

function addProduct() {

  const title =
    document.getElementById("title").value.trim();

  const price =
    document.getElementById("price").value.trim();

  const category =
    document.getElementById("category").value;

  const location =
    document.getElementById("location").value.trim();

  const phone =
    document.getElementById("phone").value.trim();

  const image =
    document.getElementById("image").value.trim();

  const description =
    document
      .getElementById("description")
      .value
      .trim();


  /* بررسی اطلاعات */

  if (
    !title ||
    !price ||
    !location ||
    !phone
  ) {

    alert(
      "لطفاً نام کالا، قیمت، منطقه و شماره تماس را وارد کنید."
    );

    return;

  }


  /* عکس پیش‌فرض */

  const finalImage =
    image ||
    "https://via.placeholder.com/600x400?text=Bazaarche";


  /* ساخت آگهی */

  const newProduct = {

    id: Date.now(),

    title: title,

    price: Number(price),

    category: category,

    location: location,

    phone: phone,

    image: finalImage,

    description:
      description ||
      "توضیحی برای این آگهی ثبت نشده است."

  };


  /* اضافه کردن به لیست */

  products.unshift(newProduct);


  /* نمایش */

  displayProducts(products);


  /* پاک کردن فرم */

  document.getElementById("title").value = "";

  document.getElementById("price").value = "";

  document.getElementById("location").value = "";

  document.getElementById("phone").value = "";

  document.getElementById("image").value = "";

  document.getElementById("description").value = "";


  /* بستن فرم */

  closeForm();


  alert(
    "✅ آگهی با موفقیت ثبت شد."
  );

}


/* بستن پنجره با کلیک بیرون */

window.addEventListener(
  "click",
  function(event) {

    const modal =
      document.getElementById("formModal");

    if (event.target === modal) {

      closeForm();

    }

  }
);


/* اجرای اولیه */

displayProducts(products);