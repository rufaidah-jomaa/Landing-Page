/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
//Rufaidah Jomaa
//define global variable 
const sections = document.querySelectorAll('section');
const navbar = document.getElementById('navbar__list');
const header = document.querySelector('.page__header');
const scrollTopButton = document.getElementById('scroll-to-top');
const addSection = document.getElementById('addSection');

// build the nav
const createNavItems = () => {
  const sections = document.querySelectorAll("section");
  const navbar = document.getElementById("navbar__list");
  navbar.innerHTML = "";
  for (const section of sections) {
    const item = `<li>                                                                         
    <a href="#${section.id}" data-nav="${section.id}" class="menu__link">${section.dataset.nav}</a> 
    </li>`;// قراءة قيمة data-nav =>(section.dataset.nav)
    navbar.insertAdjacentHTML("beforeend", item);
  }
};

for (let i = 0; i < 6; i++) {
  createNavItems();
}


// Add class 'active' to section when near top of viewport 

window.addEventListener("scroll", () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const activeLink = navbar.querySelector(`[data-nav="${section.id}"]`);

    if (rect.top >= -200 && rect.top <= 150) {
      section.classList.add("active");
      if (activeLink) {
        activeLink.classList.add("active-link");
      }
    } else {
      section.classList.remove("active");
      if (activeLink) {
        activeLink.classList.remove("active-link");
      }
    }
  });
});


// Scroll to anchor ID using scrollIntoView() event

/*navbar.addEventListener("click", (event) => {
  const target = event.target;
  event.preventDefault();
  if (target.dataset.nav) {
    document
      .getElementById(`${target.dataset.nav}`)
      .scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      location.hash = `${target.dataset.nav}`;
    }, 300);
  }
});*/
// Scroll to anchor ID using scrollIntoView() event
navbar.addEventListener("click", (event) => {
  const target = event.target;
  if (target.dataset.nav) {
    event.preventDefault();
    const sectionId = target.dataset.nav;
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  
  }
});


//Add a scroll to top button on the page that’s only visible when the user scrolls below the fold of the page.

// when scrolling 
window.onscroll = () => {

  if (window.scrollY > 800) { // If the scroll exceeds 800 pixels
    scrollTopButton.style.display = "block";
  } else {
    scrollTopButton.style.display = "none";
  }
};
// when click top button
scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});




//disappear the header after 5 seconds and appear again when scrolling.

document.addEventListener("scroll", () => {
  //Show header while scrolling
  if (header) {
    header.style.visibility = "visible";
    header.style.opacity = "1";

    // Hide header after 5 seconds of scrolling

    clearTimeout(header.hideTimeout);// Cancel any previous timer
    header.hideTimeout = setTimeout(() => {
      header.style.visibility = "hidden";
      header.style.opacity = "0";
    }, 5000);
  }

});

//add new section with new picture and new paragraph

let counter = 6; //because we already have 6 sections
const createSection = () => {
  counter++;
  const content = `
    <section id="section${counter}" class="section" data-nav="Section ${counter}">
      <div class="landing__container">
        <h2>Perfume ${counter}</h2>
        
        <!-- default image -->
        <div class="image-container">
          <img src="images/default-image.jpg" alt="Default Image" width=300px class="image-section" id="image${counter}">
        </div>
        
        <!-- upload new picture -->
        <div class="upload-container">
          <label for="file-input${counter}">Add Your Picture</label>
          <input type="file" accept="image/*" id="file-input${counter}" onchange="changeImage(event, ${counter})">
        </div>
        
        <!-- add new paragraph for this section -->
    <div id="section${counter}" class="section-container">
    <div class="textarea-container" id="textarea-container-${counter}">
    <textarea id="text${counter}" placeholder=" Write your opnion here" rows="5"></textarea>
    <button onclick="addParagraph(${counter})">Add Paragraph</button>
  </div>
  <div class="paragraph-container" id="paragraph-container-${counter}"></div>
</div>

    </section>
  `;

  document.querySelector("main").insertAdjacentHTML("beforeend", content);

};

//function to change default image to selected image
const changeImage = (event, sectionId) => {
  const file = event.target.files[0];
  const imageElement = document.getElementById(`image${sectionId}`);
  //a built-in object in JavaScript to read the contents of files (such as images) selected by the user.
  const reader = new FileReader();
  reader.onload = function (e) {
    imageElement.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

function addParagraph(counter) {
  const textarea = document.getElementById(`text${counter}`);
  const paragraphContent = textarea.value.trim();
  const textareaContainer = document.getElementById(`textarea-container-${counter}`);

  if (paragraphContent) {
    const paragraphContainer = document.getElementById(`paragraph-container-${counter}`);
    const newParagraph = document.createElement('p');
    newParagraph.textContent = paragraphContent;

    // Clear any previous paragraph and append the new one
    paragraphContainer.innerHTML = '';
    paragraphContainer.appendChild(newParagraph);

    // Clear the textarea after adding the paragraph
    textarea.value = '';

    // Hide the textarea container after adding the paragraph
    textareaContainer.style.display = 'none';
  } else {
    alert('add your paragraph please!');
  }
}

addSection.addEventListener('click', () => {
  createSection();
  createNavItems();
});