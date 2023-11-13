var DARK_THEME = false, OPENED_TEXT_ELEMENT;

document.addEventListener('DOMContentLoaded', () => {
    setMaxHeight('nav, .expandable-text .text');
    setOffset();
})

window.addEventListener('resize', () => {
    setMaxHeight('.expandable-text .text');
})

/**
 * Hides the elements matching the selector, or unhides them if they were already hidden
 * @param {string} selector CSS selector for the elements to hide or show
 */
function hide(selector) {
    for (let elem of document.querySelectorAll(selector)) elem.classList.contains('hidden') ? elem.classList.remove('hidden') : elem.classList.add('hidden');
}

/**
 * Set the `max-height` value of elements matching the selector to the combined `height` of their children.
 * Function used for animations
 * @param {string} selector CSS selector for the elements to hide or show
 */
function setMaxHeight(selector) {
    let height;
    for (let elem of document.querySelectorAll(selector)) {
        height = 0;
        for (let child of elem.children) height += getAbsoluteHeight(child);
        elem.style.setProperty('--height', `${height}px`);
    }
}

/**
 * Changes the theme : dark / light
 * @param {boolean} val 
 */
function changeTheme(val) {
    DARK_THEME = val;
    document.body.classList = `${DARK_THEME ? 'dark-theme' : ''}`;
}

function setOffset() {
    document.querySelector('header + *').style.setProperty('--offset', document.querySelector('header').clientHeight + 'px');
}

/**
 * Shows the text of a project element, or any element with an expandable text
 * @param {HTMLDivElement} elem
 */
function showText(elem) {
    OPENED_TEXT_ELEMENT?.classList?.remove('textOpen');
    if (OPENED_TEXT_ELEMENT == elem) return OPENED_TEXT_ELEMENT = null;
    elem.classList.add('textOpen');
    elem.parentElement.style.setProperty('--height',elem.querySelector('.text').style.getPropertyValue('--height'));
    OPENED_TEXT_ELEMENT = elem;
}

// ------------------ USEFUL FUNCTIONS ------------------

function getAbsoluteHeight(el) {
    // Get the DOM Node if you pass in a string
    el = (typeof el === 'string') ? document.querySelector(el) : el;

    var styles = window.getComputedStyle(el);
    var margin = parseFloat(styles['marginTop']) +
        parseFloat(styles['marginBottom']);

    return Math.ceil(el.offsetHeight + margin);
}

/**
 * Gets the sibling index of an element, or child index relative to their parent
 * @param {HTMLElement} el 
 */
function getSiblingIndex(el){
    let i;
    for(i = 0; el.parentElement.children[i] != el; i++);
    return i;
}