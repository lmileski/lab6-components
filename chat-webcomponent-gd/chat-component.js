// pulls in the eliza patterns one folder up
import { getBotResponse } from "../eliza.js";

/**
 * fully self-contained chat element using shadow dom
 */
class ChatInterface extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * returns the current time
   * @returns {string}
   */
  timeNow() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  /**
   * add a message row inside the shadow root
   * @param {string} text - message text
   * @param {"bot"|"user"} role - who said something
   */
  addMessage(text, role) {
    const li = document.createElement("li");
    li.className = role;

    const p = document.createElement("p");
    p.className = "bubble";
    p.textContent = text;

    const time = document.createElement("time");
    time.dateTime = new Date().toISOString();
    time.textContent = this.timeNow();

    li.appendChild(p);
    li.appendChild(time);
    this.$messages.appendChild(li);

    // auto-scroll to newest item
    this.$section.scrollTop = this.$section.scrollHeight;
  }

  // set up handlers (kept separate for clarity)
  setupEvents() {
    this.$form.addEventListener("submit", (e) => {
      e.preventDefault();

      const text = this.$input.value.trim();
      if (!text) return;

      this.addMessage(text, "user");

      this.$input.value = "";
      this.$input.focus();

      const reply = getBotResponse(text);
      this.addMessage(reply, "bot");
    });
  }

  connectedCallback() {
    // build the whole ui inside shadow dom
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        * { box-sizing: border-box; }
        .card {
          width: 26.25rem;
          height: 40rem;
          background: #ffffff;
          border-radius: 0.875rem;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 0;
          font-family: Helvetica;
        }
        header {
          background: #4f8ad6;
          color: #ffffff;
          padding: 0.875rem 1rem;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,.18);
        }
        header h1 { margin: 0; font-size: 1.25rem; font-weight: 700; }
        header p  { margin: 0.25rem 0 0; font-size: 0.75rem; opacity: .95; }

        section {
          flex: 1;
          min-height: 0;
          overflow: auto;
          background: #f8fafc;
          overscroll-behavior: contain;
        }
        ul {
          list-style: none;
          margin: 0;
          padding: 1.125rem;
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }
        li {
          display: flex;
          align-items: flex-end;
          gap: 0.625rem;
          max-width: 80%;
        }
        li.bot  { justify-content: flex-start; }
        li.user { margin-left: auto; justify-content: flex-end; }

        .bubble {
          margin: 0;
          padding: 0.75rem 0.875rem;
          border-radius: 1rem;
          background: #eef2f6;
          color: #111827;
          border: 1px solid #e5eaf0;
          box-shadow: 0 0.375rem 1.125rem rgba(17,24,39,0.08);
          max-width: 100%;
          line-height: 1.4;
        }
        li.bot  .bubble { border-bottom-left-radius: 3px; }
        li.user .bubble {
          background: #4f8ad6;
          color: #ffffff;
          border-color: #4f8ad6;
          border-bottom-right-radius: 3px;
        }
        time { font-size: 0.6875rem; color: #9aa0a6; }

        form {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.75rem 0.875rem;
          border-top: 1px solid #eef0f3;
          background: #ffffff;
        }
        input[type="text"] {
          flex: 1;
          padding: 0.875rem 1rem;
          border: 1px solid #e1e5ea;
          border-radius: 10000px;
          font-size: 0.875rem;
          background: #f7f9fc;
          outline: none;
          box-shadow: inset 0 0.0625rem 0.125rem rgba(17,24,39,0.04);
        }
        input::placeholder { color: #a3a9b3; }
        button {
          padding: 0.75rem 1.125rem;
          border: none;
          border-radius: 10000px;
          background: #4f8ad6;
          font-size: 0.875rem;
          font-weight: 600;
          color: #ffffff;
          cursor: pointer;
          transition: background .2s ease;
        }
        button:hover  { background: #3c6cab; }
        button:active { background: #345c93; }

        /* hide the label but keep it semantic */
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 1px, 1px);
          white-space: nowrap;
          border: 0;
        }

        /* tiny scrollbar (webkit browsers) */
        section::-webkit-scrollbar { width: 0.625rem; }
        section::-webkit-scrollbar-track { background: transparent; }
        section::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.12);
          border-radius: 10000px;
        }
      </style>

      <div class="card">
        <header>
          <h1>Chat Assistant</h1>
          <p>Approach 3</p>
        </header>

        <section>
          <ul class="messages"></ul>
        </section>

        <form class="input-area">
          <label for="gd-input" class="visually-hidden">type a message</label>
          <input id="gd-input" type="text" placeholder="Type a message...">
          <button type="submit">Send</button>
        </form>
      </div>
    `;

    // handlers
    this.$section  = this.shadowRoot.querySelector("section");
    this.$messages = this.shadowRoot.querySelector(".messages");
    this.$form     = this.shadowRoot.querySelector("form");
    this.$input    = this.shadowRoot.querySelector("#gd-input");

    // greetings
    this.addMessage("Hello! I'm here to chat with you. How can I help you today?", "bot");

    this.$input.focus();

    // wire events
    this.setupEvents();
  }
}

customElements.define("chat-interface", ChatInterface);