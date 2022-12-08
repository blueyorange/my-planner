import { html } from "https://cdn.skypack.dev/lit-html";

export default function questionTemplateFunc(question, { disabled }) {
  console.log(question);
  const { body, choices } = question;
  return html`
    ${marked.parse(body)}'
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
          ${marked.parse(choice)}
        </label>
      `
    )}
}
