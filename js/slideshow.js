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
    el.querySelector('.img-container img:last-child').classList.add('slided','left');
    el.querySelector('.img-container img:first-child + img').classList.add('slided','right');
    el.addEventListener('mousemove', () => showControls(el));
    el.addEventListener('mouseleave', () => hideControls(el));
    let m = 0;
    el.querySelectorAll('.img-container img').forEach(i => m = min(i.clientHeight, m));
    el.querySelector('.img-container').style.setProperty('min-height',m + 'px');
}

var next, previous, current, SlideshowImages;

/**
 * Shows the previous slide of a slideshow. Fires on click
 * @param {Event} e The click event
 */
function previousSlide(e) {
    SlideshowImages = e.target.parentElement.querySelector('.img-container');
    SlideshowImages.querySelector('.slided.right').classList.remove('slided','right','anim');
    
    next = SlideshowImages.querySelector('.current');
    next.classList.add('slided','right','anim');
    next.classList.remove('current','left');
    
    current = SlideshowImages.querySelector('.slided.left');
    current.classList.add('current','right','anim');
    current.classList.remove('slided','left');

    previous = getSiblingIndex(current) - 1;

    if(previous < 0) previous = SlideshowImages.childElementCount - 1;
    SlideshowImages.children[previous].classList.add('slided','left');
}

/**
 * Shows the next slide of a slideshow. Fires on click
 * @param {Event} e The click event
 */
function nextSlide(e) {
    SlideshowImages = e.target.parentElement.querySelector('.img-container');
    SlideshowImages.querySelector('.slided.left').classList.remove('slided','left','anim');

    previous = SlideshowImages.querySelector('.current');
    previous.classList.add('slided','left','anim');
    previous.classList.remove('current','right'); 
    
    current = SlideshowImages.querySelector('.slided.right');
    current.classList.add('current','left','anim');
    current.classList.remove('slided','right'); 

    next = getSiblingIndex(current) + 1;

    if(next >= SlideshowImages.childElementCount) next = 0;
    SlideshowImages.children[next].classList.add('slided','right');
}

function fullscreenSlideshow(e) {
    console.log('fullscreen')
    e.target.parentElement.requestFullscreen();
}

/**
 * Show the slideshow controls
 * @param {HTMLDivElement} el
 */
function showControls(el) {
    clearTimeout(SLIDESHOW_INTERVAL_IDS[parseInt(el.getAttribute('slideshow-nb'))]);
    el.classList.add('show-controls');
    if(!el.querySelector('.slideshow > input:hover')) SLIDESHOW_INTERVAL_IDS[parseInt(el.getAttribute('slideshow-nb'))] = setTimeout(() => hideControls(el),4000)
}

/**
 * Hides the slideshow controls
 * @param {HTMLDivElement} el
 */
function hideControls(el) {
    clearTimeout(SLIDESHOW_INTERVAL_IDS[parseInt(el.getAttribute('slideshow-nb'))]);
    el.classList.remove('show-controls');
}