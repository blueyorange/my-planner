import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { marked } from "marked";

export default function questionTemplateFunc(question, { disabled }) {
  const { body, choices } = question;
  return html`
    ${unsafeHTML(marked.parse(body))}
    ${choices.map(
      (choice) => html`
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          ?disabled=${disabled}
        />
        <label class="form-check-label" for="flexRadioDefault1">
          ${unsafeHTML(marked.parse(choice))}
        </label>
      `
    )}
  `;
}
