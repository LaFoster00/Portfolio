function setupArrow(container, spanText) 
{
    let arrow = document.createElement("a");
    arrow.classList.add("arrow");
    const arrowSpan = document.createElement("span");
    arrowSpan.innerHTML = spanText;
    arrow.appendChild(arrowSpan);
    container.appendChild(arrow);

    return arrow;
}

function setupLeftArrow(container){
    let leftArrow = setupArrow(container, "&#10094");
    leftArrow.classList.add("arrow-left");
    return leftArrow;
}

function setupRightArrow(container){
    let rightArrow = setupArrow(container, "&#10095;")
    rightArrow.classList.add("arrow-right");
    return rightArrow;
}

function setupIndicator(container){
    let indicator = document.createElement("li");
    indicator.classList.add("indicator");
    indicator.innerHTML = "&#8226;";
    container.appendChild(indicator);
    return indicator;
}

function setupIndicatorList(container, numIndicators){
    let indicatorList = document.createElement("ol");
    indicatorList.classList.add("indicator-list");
    container.appendChild(indicatorList);
    for (let indicator = 0; indicator < numIndicators; indicator++) {
        setupIndicator(indicatorList);
    }
    return indicatorList;
}

function setupSlideshow(container) {
    const slides = container.querySelectorAll(".slide");
    let curIndex = 0;

    const indicatorList = setupIndicatorList(container, slides.length);
    const indicators = indicatorList.querySelectorAll(".indicator");

    function changeSlide(numSlides) {
        let newIndex = (curIndex + numSlides);
        newIndex = (newIndex < 0 ? (newIndex + slides.length) : newIndex) % slides.length;
        jumpToEntry(newIndex);
    }

    function jumpToEntry(newIndex) {
        indicators[curIndex].classList.remove("slideshow-active");
        slides[curIndex].classList.remove("slideshow-active");

        indicators[newIndex].classList.add("slideshow-active");
        slides[newIndex].classList.add("slideshow-active");

        curIndex = newIndex;
    }

    // Add event listeners to the indicators
    indicators.forEach(function(indicator, index) {
        indicator.addEventListener("click", function() {
        jumpToEntry(index);
        });
    });

    let arrowLeft = setupLeftArrow(container);
    arrowLeft.addEventListener("click", function() {
        changeSlide(-1);
    });

    let arrowRight = setupRightArrow(container);
    arrowRight.addEventListener("click", function() {
        changeSlide(1);
    })
    
    // Initialize the first slide and indicator as active
    indicators[curIndex].classList.add("slideshow-active");
    slides[curIndex].classList.add("slideshow-active");
}

// Call the function for each slideshow container on the page
const slideshowContainers = document.querySelectorAll(".slideshow");
slideshowContainers.forEach(function(container) {
  setupSlideshow(container);
});