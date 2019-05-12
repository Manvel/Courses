class ShowMore extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.innerHTML = `
      <style>
        [aria-hidden="true"] {
          display: none;
        }
      </style>
      <button>Show</button>
      <p><slot></slot></p>
    `;
  }

  connectedCallback() {
    if (!this.hasAttribute("aria-expanded") || this.getAttribute("aria-expanded") === "false")
      this._hideMore();

    const button = this.shadowRoot.querySelector("button");
    button.addEventListener("click", () =>
    {
      this._toggle();
    });
  }

  static get observedAttributes() {
    return ['aria-expanded'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === "aria-expanded")
      this.shadowRoot.querySelector("p").setAttribute("aria-hidden", newVal);
  }

  _toggle() {
    console.log(this.getAttribute("aria-expanded"));
    if (this.getAttribute("aria-expanded") === "true")
      this._hideMore();
    else
      this._showMore();
  }

  _showMore() {
    this.setAttribute("aria-expanded", "true");
  }

  _hideMore() {
    this.setAttribute("aria-expanded", "false");
  }
}

customElements.define("uc-show-more", ShowMore);
