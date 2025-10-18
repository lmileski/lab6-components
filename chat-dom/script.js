import { getBotResponse } from "../eliza.js";

/**
 * returns the current time
 * @returns {string}
 */
function timeNow() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// main chat ui elements
const messagesList = document.getElementById("messages");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const scrollArea = document.querySelector("section");

/**
 * create and append a single chat row
 * @param {string} text - message contents as plain text
 * @param {"bot"|"user"} role - who said it so we can style the bubble
 */
function addMessage(text, role) {
  const li = document.createElement("li");
  li.className = role;

  const p = document.createElement("p");
  p.className = "bubble";
  p.textContent = text;

  const t = document.createElement("time");
  t.dateTime = new Date().toISOString();
  t.textContent = timeNow();

  li.appendChild(p);
  li.appendChild(t);
  messagesList.appendChild(li);

  // keep newest thing in view
  scrollArea.scrollTop = scrollArea.scrollHeight;
}

// greetings
addMessage("Hello! I'm here to chat with you. How can I help you today?", "bot");
input.focus();

// send on click or enter (submit covers both)
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");

  input.value = "";
  input.focus();

  // ask eliza for a reply
  const reply = getBotResponse(text);
  addMessage(reply, "bot");
});
