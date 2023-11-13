//x-ray
(() => {
  (function () {
    "use strict";


    var imageCon = document.querySelector('#imageCon'),
      drag = document.querySelector('.image-drag'),
      left = document.querySelector('.image-left'),
      dragging = false,
      min = 0,
      max = imageCon.offsetWidth;
    //The HTMLElement.offsetWidth read-only property returns the layout width of an element. 

    function onDown() {
      dragging = true;
    }

    function onUp() {
      dragging = false;
    }

    function onMove(event) {
      if (dragging === true) {
        var x = event.clientX - imageCon.getBoundingClientRect().left;
        //The MouseEvent.clientX read-only property provides the horizontal coordinate within the application's client area at which the event occurred
        //The Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
        //X-coordinate, relative to the viewport origin, of the left of the rectangle box. Read only
        console.log(event.clientX);
        console.log(imageCon.getBoundingClientRect().left);
        //need logic to keep slider in box
        if (x < min) { //if x less than 0
          x = min;    //set x = 0
        }
        else if (x > max) { //otherwise if x is greater than 900
          x = max - 4; //set x to equal the max width minus 2 (width of slider)
        }
        drag.style.left = x + 'px';
        left.style.width = x + 'px';
      }
    }

    drag.addEventListener('mousedown', onDown, false);
    //add listener to actual drag div, if user clicks on it
    //drag.addEventListener('touchstart', onDown);
    document.body.addEventListener('mouseup', onUp, false);
    //document.body.addEventListener('mo', onUp);
    document.body.addEventListener('mousemove', onMove, false);
    //document.body.addEventListener('touchmove', onMove);

  })();


  /*231-187.5 = 43.5.  43.5 is how much of the car is left showing*/

  /*
  The MouseEvent.clientX read-only property provides the horizontal coordinate within the application's client area at which the event occurred (as opposed to the coordinates within the page). For example, clicking in the top-left corner of the client area will always result in a mouse event with a clientX value of 0, regardless of whether the page is scrolled horizontally.
  */


})();


//model viewer

(() => {
  console.log("IIFE Fired");
  //variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const infoBoxes = [
    {
      title: "Holder",
      text: "This is the holder for the earbuds. It provides a secure and convenient fitting solution.",
      image: "images/holder.jpeg",
    },
    {
      title: "Volume Control",
      text: "Adjust the volume with this control. Enjoy a customized audio experience with ease.",
      image: "images/volume.jpg",
    },
    {
      title: "Earpiece",
      text: "The earpiece delivers high-quality sound. Experience crystal clear soft audio like never before.",
      image: "images/earpiece.jpg",
    },
    {
      title: "Blinker",
      text: "The blinker adds a stylish touch. It also serves as a notification indicator.",
      image: "images/blinker.jpg",
    },
    {
      title: "Charging Point",
      text: "Charge your earbuds with this port. Stay connected throughout the day with ease.",
      image: "images/charging_port.png",
    },
    {
      title: "Brand",
      text: "SonicZen - Experience the future of audio. Immerse yourself in a world of premium sound quality.",
      image: "images/brand.png",
    },
    {
      title: "Head Piece",
      text: "The head piece ensures a comfortable fit. Enjoy extended listening sessions without discomfort.",
      image: "images/head_piece.jpg",
    },
  ];

  //functions
  function modelLoaded() {
    //console.log(hotspots);
    hotspots.forEach((hotspot) => {
      hotspot.style.display = "block";
    });
  }

  function loadInfo() {
    infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);
      let title = document.createElement("h2");
      title.textContent = infoBox.title;
      let text = document.createElement("p");
      text.textContent = infoBox.text;
      let image = document.createElement("img");
      image.src = infoBox.image;

      image.style.width = "300px";
      image.style.height = "300px";

      selected.appendChild(title);
      selected.appendChild(text);
      selected.appendChild(image);
    });
  }
  loadInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 0, { autoAlpha: 0 });
  }

  //Event Listener
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("click", showInfo);
    hotspot.addEventListener("mousemove", hideInfo);
  });
})();



//exploded view
(() => {

  const canvas = document.querySelector("#explode-view");

  const ctx = canvas.getContext("2d");

  canvas.width = 1920;

  canvas.height = 1080;

  const frameCount = 900; //total frames of exported video

  const images = []; // array to hold the images

  //created an object literal with a property frame to hold the current frame
  const buds = {
    frame: 0
  };


  console.log(images);
  for (let i = 0; i < frameCount; i++) {
    // console.log(i);

    //const img = new Image();

    const img = document.createElement("img");

    //need to recreate the string: imges/explode_0001.webp

    img.src = `images/animation/Downloads${(i + 1).toString().padStart(4, '0')}.jpg`;
    images.push(img);

  }

  // console.table(images)

  //Not actually animating a DOM element, but rahter an object which contains a frame count

  gsap.to(buds, {
    frame: 899,
    snap: "frame",
    scrollTrigger: {
      trigger: "#explode-view",
      pin: true,
      scrub: 1,
      start: "top top",
      markers: false

    },
    onUpdate: render

  })

  images[0].addEventListener("load", render);

  function render() {
    // console.log(buds.frame);
    // console.log(images[buds.frame]);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images[buds.frame], 0, 0, canvas.width, canvas.height);

  }




})();



//hammenu
(() => {
  const mobileNavToggle = document.querySelector('.menu-open');
  const mobileNavClose = document.querySelector('.menu-close');
  const mobileNav = document.querySelector('.hammenu');
  const dropImage = document.querySelector('.menu-open img');
  const closeImage = document.querySelector('.menu-close img');

  mobileNavToggle.addEventListener('click', () => {
    mobileNav.style.opacity = '1';
    mobileNav.style.pointerEvents = 'auto';
    dropImage.style.display = 'none';
    closeImage.style.display = 'block';
  });

  mobileNavClose.addEventListener('click', () => {
    mobileNav.style.opacity = '0';
    mobileNav.style.pointerEvents = 'none';
    dropImage.style.display = 'block';
    closeImage.style.display = 'none';
  });
})();


