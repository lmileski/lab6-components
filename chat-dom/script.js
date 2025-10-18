import { getBotResponse } from "../eliza.js";

// main chat ui elements
const messagesList = document.getElementById("messages");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const scrollArea = document.querySelector("section");

function timeNow() {
	return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// create a message row to add to list
function addMessage(text, role) {
	const li = document.createElement("li");
	li.className = role;

	// make the message bubble
	const p = document.createElement("p");
	p.className = "bubble";
	p.textContent = text;

	// make a tiny timestamp
	const t = document.createElement("time");
	t.dateTime = new Date().toISOString();
	t.textContent = timeNow();

	// attach the bubble and time to the row
	li.appendChild(p);
	li.appendChild(t);

	// drop the row at the bottom of the list
	messagesList.appendChild(li);

	// keep the newest message visible
	scrollArea.scrollTop = scrollArea.scrollHeight;
}

// show a small greeting so the chat doesn't start empty
addMessage("Hello! I'm here to chat with you. How can I help you today?", "bot");

// when the user presses send or hits enter
form.addEventListener("submit", function (e) {
	// stop the page from reloading as seen in class
	e.preventDefault();

	// read the box and trim spaces
	const text = input.value.trim();

	// do nothing if it's empty
	if (!text) return;

	// add the user's line
	addMessage(text, "user");

	// clear and focus for the next line
	input.value = "";
	input.focus();

	// ask eliza for a reply using the provided module
	const reply = getBotResponse(text);

	// add the bot's line
	addMessage(reply, "bot");
});