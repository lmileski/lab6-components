// uses eliza module one folder up
import { getBotResponse } from "../eliza.js";

class SimpleChat extends HTMLElement {
	// run when the element appears on the page
	connectedCallback() {
		this.scrollArea = this.querySelector("section");
		this.messagesList = this.querySelector(".messages");
		this.form = this.querySelector(".input-area");
		this.input = this.querySelector("#pe-chat-input");
		this.button = this.form ? this.form.querySelector("button") : null;

		// graceful degradation if something is missing
		if (!this.scrollArea || !this.messagesList || !this.form || !this.input || !this.button) return;

		this.addMessage("Hello! I'm here to chat with you. How can I help you today?", "bot");

		// focus input area
		this.input.focus();

		this.form.addEventListener("submit", (e) => {
			// prevent the page from reloading as seen in class
			e.preventDefault();

			const text = this.input.value.trim();
			if (!text) return; // ignore empty messages

			// add the user's message to the list
			this.addMessage(text, "user");

			// clear box and focus again
			this.input.value = "";
			this.input.focus();

			// ask eliza for a reply
			const reply = getBotResponse(text);
			this.addMessage(reply, "bot");
		});
	}

	timeNow() {
		return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	}

	addMessage(text, role) {
		const li = document.createElement("li");
		li.className = role; // bot or user

		// make the bubble
		const p = document.createElement("p");
		p.className = "bubble";
		p.textContent = text;

		// make the time
		const time = document.createElement("time");
		time.dateTime = new Date().toISOString();
		time.textContent = this.timeNow();

		// put everything together
		li.appendChild(p);
		li.appendChild(time);

		// add to the list
		this.messagesList.appendChild(li);

		// keep the newest message in view
		this.scrollArea.scrollTop = this.scrollArea.scrollHeight;
	}
}

// register the element
customElements.define("simple-chat", SimpleChat);