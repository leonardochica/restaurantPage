// Navbar burger Menu
var nav = document.querySelector('.navbar');

var navToggle = document.querySelector('.burger');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('navbar--visible');
});

//  Remove transparent background of navbar when scrolled down
const navbar = document.querySelector('.header__top');
var activelink = document.querySelector('.active');
var navlink = document.querySelectorAll('.navbar__link');
var contactlink = document.querySelectorAll('.contact__link');

let scrolled = false;

window.onscroll = function () {
  if (window.pageYOffset > 100) {
    // Change background of navbar and color of current page link
    navbar.classList.add('header__top--background');
    activelink.classList.add('navbar__link--active');

    // Add hover class when scrolled (NAVBAR LINKS)
    for (var i = 0; i < navlink.length; i++) {
      var link = navlink[i];
      link.classList.add('navbar__link--scrolled');
    }

    // Add hover class when scrolled (CONTACT ICONS)
    for (var i = 0; i < contactlink.length; i++) {
      var link = this.contactlink[i];
      link.classList.add('contact__link--hover');
    }
  } else {
    navbar.classList.remove('header__top--background');
    activelink.classList.remove('navbar__link--active');

    // Remove hover class when scrolled (NAVBAR LINKS)
    for (var i = 0; i < navlink.length; i++) {
      var link = navlink[i];
      link.classList.remove('navbar__link--scrolled');
    }

    // Remove hover class when scrolled (CONTACT ICONS)
    for (var i = 0; i < contactlink.length; i++) {
      var link = this.contactlink[i];
      link.classList.remove('contact__link--hover');
    }
  }
};

// GOOGLE MAPS
// ================================================
// ================================================
// Initialize and add the map
function initMap() {
  // Your location
  const loc = { lat: 29.72684, lng: -95.52789 };
  // Centered map on location
  const map = new google.maps.Map(document.querySelector('.locations__map'), {
    center: loc,
    zoom: 14,
  });
  // The marker, positioned at location
  const marker = new google.maps.Marker({ position: loc, map: map });
}

// Maps with Multiple markers for Locations Page
// --------------------------------------------
const houstonLoc = { lat: 29.7151, lng: -95.39814 };
const sugarlandLoc = { lat: 29.59348, lng: -95.644 };
const centerLoc = { lat: 29.661803, lng: -95.499017 };

var locations = [houstonLoc, sugarlandLoc];

function initGoogleMaps() {
  var map = new google.maps.Map(document.getElementById('locations-map'), {
    zoom: 10,
    center: centerLoc,
  });

  // Create an array of alphabetical characters used to label the markers.
  var labels = 'HS';

  // Add some markers to the map.
  var markers = locations.map(function (location, i) {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length],
    });
  });

  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers, {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
  });
}
// ============================================
// Reservations Page: Image Gallery for Rooms
const current_image = document.querySelector('#active-image');
const images = document.querySelectorAll('.reservations__image img');

// Set first image border
images[0].style.border = '4px solid var(--complementary-color)';

images.forEach((img) => img.addEventListener('click', imageClick));

// Function when clicked Image
function imageClick(e) {
  // Reset the border
  images.forEach((img) => (img.style.border = 'none'));

  // Change current image to src of clicked image
  current_image.src = e.target.src;

  // Add border to selected image
  e.target.style.border = '4px solid var(--complementary-color)';
}

// Tabs for Event Form
// ===============================================
const tabs = document.querySelectorAll('[data-tab-target]');
const tabs_contents = document.querySelectorAll('.section-events__tab-content');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget);

    // Reset active class in tabs
    tabs.forEach((tab) => {
      tab.classList.remove('active');
    });

    // Add active class to clicked tab
    tab.classList.add('active');

    // Reset active class in tab-content
    tabs_contents.forEach((tab_content) => {
      tab_content.classList.remove('tab-active');
    });

    // Add active class to tab-content
    target.classList.add('tab-active');
  });
});

// ============================================
// Check if Event Info is valid
const event_btn = document.getElementById('event-form__button');

const detailsTab = document.getElementById('details-tab');

// Inputs
const eventType = document.getElementById('EventType');
const eventCount = document.getElementById('guestCount');
const eventDate = document.getElementById('EventDate');
const mealType = document.getElementById('MealTime');
const eventDuration = document.getElementById('Duration');

event_btn.addEventListener('click', function () {
  validateRoomForm();
});

var errorMessage = document.getElementById('error-message');

function validateRoomForm() {
  if (
    eventType.value == '' ||
    eventCount.value == '' ||
    mealType.value == '' ||
    eventDuration.value == '' ||
    eventDate.value == ''
  ) {
    errorMessage.innerHTML = 'Note: Please select all fields to continue';
    detailsTab.disabled = true;
  } else {
    detailsTab.removeAttribute('disabled');
    tabs[0].classList.remove('active');
    tabs[1].classList.add('active');
    tabs_contents[0].classList.remove('tab-active');
    tabs_contents[1].classList.add('tab-active');
    errorMessage.innerHTML = '';
  }
}

function validateDateRoomForm() {
  if (eventDate.value == '') {
    detailsTab.disabled = true;
    errorMessage.innerHTML = 'Note: Please select all fields to continue';
  } else {
    detailsTab.removeAttribute('disabled');
    errorMessage.innerHTML = '';
  }
}

// ============================================
// Validation of Details Form
const formRoom = document.getElementsByTagName('form')[1];

const nameEvent = document.getElementById('name-event');

const emailEvent = document.getElementById('email-event');

const errorName = document.querySelector('.details__name-error');

const errorEmail = document.querySelector('.details__email-error');

// Validate Name input
nameEvent.addEventListener('input', function (e) {
  if (nameEvent.validity.valid) {
    errorName.innerHTML = '';
  } else {
    showErrorName();
  }
});

// Validate Email input
emailEvent.addEventListener('input', function (e) {
  if (emailEvent.validity.valid) {
    errorEmail.innerHTML = '';
  } else {
    showErrorEmail();
  }
});

// Form Submission
function SubmitDetailsForm(e) {
  if (!emailEvent.validity.valid || !nameEvent.validity.valid) {
    showErrorName();
    showErrorEmail();
    e.preventDefault;
    return false;
  }
}

// Error Message
function showErrorName() {
  // Name
  if (nameEvent.validity.valueMissing) {
    errorName.textContent = 'Please enter your full name';
  }
}

function showErrorEmail() {
  // Email
  if (emailEvent.validity.valueMissing) {
    errorEmail.textContent = 'Please enter an email address';
  } else if (emailEvent.validity.typeMismatch) {
    errorEmail.textContent = 'Please enter a valid email address';
  }
}
// =======================================
// Tabs for Courses Form
// ===============================================
const tabsCourses = document.querySelectorAll('[data-tab-target-courses]');
const tabs_coursesContents = document.querySelectorAll('.courses__tab-content');

tabsCourses.forEach((tabCourse) => {
  tabCourse.addEventListener('click', () => {
    const targetCourses = document.querySelector(
      tabCourse.dataset.tabTargetCourses
    );

    // Reset active class in tabs
    tabsCourses.forEach((tab) => {
      tab.classList.remove('active');
    });

    // Add active class to clicked tab
    tabCourse.classList.add('active');

    // Reset active class in tab-content
    tabs_coursesContents.forEach((tab_content) => {
      tab_content.classList.remove('tab-active');
    });

    // Add active class to tab-content
    targetCourses.classList.add('tab-active');
  });
});

// Check Validation of Personal Fields in Course Form

// Inputs
const formEvent = document.getElementsByTagName('form')[2];

const courses_FName = document.getElementById('courses-firstName');
const courses_LName = document.getElementById('courses-lastName');
const courses_Email = document.getElementById('courses-email');

const courses_Date = document.getElementById('courses-date');

const courses_Guests = document.getElementById('courses-guests');

const errorMessage_FirstName = document.querySelector(
  '.courses__firstname-error'
);

const errorMessage_LastName = document.querySelector(
  '.courses__lastname-error'
);

const errorMessage_Email = document.querySelector('.courses__email-error');

const courseContinue_btn = document.getElementById('courses__continue-btn');

const courseInfoTab = document.getElementById('course-info-tab');

// Validate First Name input
function ValidateFirstName() {
  if (courses_FName.validity.valid) {
    errorMessage_FirstName.innerHTML = '';
  } else {
    showErrorMessageFirstName();
    courseInfoTab.disabled = true;
  }
}

courses_FName.addEventListener('input', function (e) {
  ValidateFirstName();
});

// Validate Last Name input
function ValidateLastName() {
  if (courses_LName.validity.valid) {
    errorMessage_LastName.innerHTML = '';
  } else {
    showErrorMessageLastName();
    courseInfoTab.disabled = true;
  }
}

courses_LName.addEventListener('input', function (e) {
  ValidateLastName();
});

// Validate Email input

function ValidateEmail() {
  if (courses_Email.validity.valid) {
    errorMessage_Email.innerHTML = '';
  } else {
    showErrorMessageEmail();
    courseInfoTab.disabled = true;
  }
}
courses_Email.addEventListener('input', function (e) {
  ValidateEmail();
});

// Error Message
function showErrorMessageFirstName() {
  // First Name
  if (courses_FName.validity.valueMissing) {
    errorMessage_FirstName.textContent = 'Please enter your First Name';
  }
}

function showErrorMessageLastName() {
  // Last Name
  if (courses_LName.validity.valueMissing) {
    errorMessage_LastName.textContent = 'Please enter your Last Name';
  }
}

function showErrorMessageEmail() {
  // Email
  if (courses_Email.validity.valueMissing) {
    errorMessage_Email.textContent = 'Please enter an email address';
  } else if (courses_Email.validity.typeMismatch) {
    errorMessage_Email.textContent = 'Please enter a valid email address';
  }
}

// Continue Button to go to next tab if it is valid

function ValidateForm() {
  if (
    !courses_FName.validity.valid ||
    !courses_LName.validity.valid ||
    !courses_Email.validity.valid
  ) {
    ValidateFirstName();
    ValidateLastName();
    ValidateEmail();
    courseInfoTab.disabled = true;
  } else {
    courseInfoTab.removeAttribute('disabled');
    tabsCourses[0].classList.remove('active');
    tabsCourses[1].classList.add('active');
    tabs_coursesContents[0].classList.remove('tab-active');
    tabs_coursesContents[1].classList.add('tab-active');
  }
}

courseContinue_btn.addEventListener('click', function () {
  ValidateForm();
});

var errorMessage_Courses = document.getElementById('courses-error-message');

function SubmitCourseForm(e) {
  if (courses_Guests.value == '' || courses_Date.value == '') {
    e.preventDefault;
    errorMessage_Courses.innerHTML = 'Note: Please select all fields';
    return false;
  }
}

function ValidateDate() {
  if (courses_Date.value == '') {
    errorMessage_Courses.innerHTML = 'Note: Please select all fields';
  } else {
    errorMessage_Courses.innerHTML = '';
  }
}
