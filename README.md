# lab6-components
Lab 6 - COMP 305 - Fall 2025

Author:
Luke Mileski
lmileski@sandiego.edu

Site:
https://lmileski.github.io/lab6-components/

A tiny chat ui built four ways to practice component-based thinking. Same visuals, different trade-offs.

## goals
- understand how structure (html), presentation (css), and interactivity (js) travel together as a “component”
- mock up the ui with plain html/css first
- rebuild the same thing with:
  - approach 1: dom manipulation (vanilla js)
  - approach 2: progressive enhancement (custom element, no shadow dom)
  - approach 3: web component with shadow dom (fully encapsulated)
- plug in an eliza-style bot via the provided module

## notes on approaches
- **prototype (html+css only)**  
  fastest way to get the structure and look setup but obviously have no interactivity since no JS :(

- **approach 1 – dom manipulation**  
  this approach is the most straightforward and makes most sense to me. It directly sets up event handlers and seems most intuitive.

- **approach 2 – progressive enhancement**  
  `<simple-chat>` starts as plain semantic html so the page still makes sense if js fails. When js loads, we event listeners are added and everything boots up.

- **approach 3 – web component with shadow dom**  
  requires js to render but avoids CSS bleed since it's fully self-contained. This was the trickiest method for me to understand but I can see why it's used.

## behavior
- send on click or enter (handled by form submit)
- timestamp shows current hh:mm
- autoscroll keeps newest message in view
- bot replies come from the provided `eliza.js` module

## trade-offs (my opinion)
- **complexity:** prototype < dom < pe < shadow
- **reusability:** shadow > pe > dom > prototype
- **encapsulation:** shadow > pe > dom > prototype
- **graceful degradation:** prototype / pe > dom > shadow

## build / run
no build. open each `index.html` with a local server (or just file urls). if you use the dom or web component versions, make sure the browser can import the `../eliza.js` module.

## reflections
- shadow dom feels nicest for reuse, but debugging styles is slightly slower.
- progressive enhancement is a great middle ground when you want semantic html to exist without js.
- it was cool to see how little needed to change style wise when shifting from one architecture to another.
- as said in class, if doing it right, it should feel like less work than necessary moving from one approach to another. Looking back at the code, all the shared code among approaches demonstrates this idea.