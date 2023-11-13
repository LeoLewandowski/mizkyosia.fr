var SLIDESHOW_INTERVAL_IDS = [];

document.addEventListener('DOMContentLoaded', () => {
    let slideshows = document.getElementsByClassName('slideshow');
    for(let i = 0; i < slideshows.length; i++) setupSlideshow(slideshows[i], i);
})

/**
 * Setups the slideshow elements : 
 * - Adds event listeners to the arrows
 * - Adds dots for navigation
 * @param {HTMLDivElement} el The slideshow element
 * @param {number} id The slideshow's number
 */
function setupSlideshow(el,id){
    console.log(el.querySelector('.to-left'),id)
    el.id = `slideshow-${id}`;
    el.innerHTML += '<div class="dot-container center container-horizontal"></div>';
    let dots = el.querySelector('.dot-container');
    for(let i = 0; i < el.querySelector('.img-container').childElementCount; i++) dots.innerHTML += `<button class="dot" onclick="slideTo(this.parentElement.parentElement,${i})"></button>`;
    el.setAttribute('slideshow-nb',id);
    el.querySelector('.to-left').addEventListener('click', previousSlide);
    el.querySelector('.to-right').addEventListener('click', nextSlide);
    el.querySelector('.fullscreen').addEventListener('click', fullscreenSlideshow);
    el.querySelector('.img-container img:first-child').classList.add('current');
    el.querySelector('.img-container img:last-child').classList.add('slided');
    el.querySelector('.img-container img:first-child + img').classList.add('behind');
    el.addEventListener('mousemove', () => showControls(el));
    el.addEventListener('mouseleave', () => hideControls(el));
}

var next, previous, current;

/**
 * Shows the previous slide of a slideshow. Fires on click
 * @param {Event} e The click event
 */
function previousSlide(e) {
    console.log('previous', e.target.parentElement);
    next = document.querySelector('.current');
    current = document.querySelector('.slided');
    previous = getSiblingIndex(document.querySelector('.slided')) - 1;
    next.classList.remove('current'); next.classList.add('behind');
    current.classList.remove('slided'); current.classList.add('current');
    if(previous < 0) previous = current.parentElement.childElementCount - 1;
    current.parentElement.children[previous].classList.add('slided');
}

/**
 * Shows the next slide of a slideshow. Fires on click
 * @param {Event} e The click event
 */
function nextSlide(e) {
    console.log('next');
    next = document.querySelector('.current');
    current = document.querySelector('.slided');
    previous = getSiblingIndex(document.querySelector('.slided')) - 1;
    next.classList.remove('current'); next.classList.add('behind');
    current.classList.remove('slided'); current.classList.add('current');
    if(previous < 0) previous = current.parentElement.childElementCount - 1;
    current.parentElement.children[previous].classList.add('slided');
}

function fullscreenSlideshow(e) {
    console.log('fullscreen')
}

/**
 * Show the slideshow controls
 * @param {HTMLDivElement} el
 */
function showControls(el) {
    clearTimeout(SLIDESHOW_INTERVAL_IDS[parseInt(el.getAttribute('slideshow-nb'))]);
    el.classList.add('show-controls');
    if(!el.querySelector('.slideshow > button:hover')) SLIDESHOW_INTERVAL_IDS[parseInt(el.getAttribute('slideshow-nb'))] = setTimeout(() => hideControls(el),4000)
}

/**
 * Hides the slideshow controls
 * @param {HTMLDivElement} el
 */
function hideControls(el) {
    clearTimeout(SLIDESHOW_INTERVAL_IDS[parseInt(el.getAttribute('slideshow-nb'))]);
    el.classList.remove('show-controls');
}