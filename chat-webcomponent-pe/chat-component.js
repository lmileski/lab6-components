// uses the provided eliza module one folder up
import { getBotResponse } from "../eliza.js";

/**
 * simple custom element that enhances existing html.
 */
class SimpleChat extends HTMLElement {
  /**
   * returns the current time
   * @returns {string}
   */
  timeNow() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  /**
   * create and append a single chat row
   * @param {string} text - message contents
   * @param {"bot"|"user"} role - who said something
   */
  addMessage(text, role) {
    const li = document.createElement("li");
    li.className = role;

    const p = document.createElement("p");
    p.className = "bubble";
    p.textContent = text;

    const tm = document.createElement("time");
    tm.dateTime = new Date().toISOString();
    tm.textContent = this.timeNow();

    li.appendChild(p);
    li.appendChild(tm);
    this.messagesList.appendChild(li);

    // keep the bottom in view
    this.scrollArea.scrollTop = this.scrollArea.scrollHeight;
  }

  // run once the element is on the page
  connectedCallback() {
    // wire up to simple-chat
    this.scrollArea   = this.querySelector("section");
    this.messagesList = this.querySelector(".messages");
    this.form         = this.querySelector(".input-area");
    this.input        = this.querySelector("#pe-chat-input");
    this.button       = this.form ? this.form.querySelector("button") : null;

    // anything missing?
    if (!this.scrollArea || !this.messagesList || !this.form || !this.input || !this.button) return;

    // greetings
    this.addMessage("Hello! I'm here to chat with you. How can I help you today?", "bot");

    // focus the box
    this.input.focus();

    // submit sends a message
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const text = this.input.value.trim();
      if (!text) return;

      this.addMessage(text, "user");

      this.input.value = "";
      this.input.focus();

      const reply = getBotResponse(text);
      this.addMessage(reply, "bot");
    });
  }
}

// register
customElements.define("simple-chat", SimpleChat);