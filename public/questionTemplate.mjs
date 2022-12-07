import { html, render } from "https://cdn.skypack.dev/lit-html";
import marked from "https://cdn.skypack.dev/marked";

const questionTemplate = (q, options, disable = true) => html`
  ${marked.parse(q.body)}
  ${q.options.map(
    (option) => html`
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          ?disabled=${options.enableOptions}
        />
        <label class="form-check-label" for="flexRadioDefault1">
          ${marked.parse(option)}
        </label>
      </div>
    `
  )}
`;

export default questionTemplate;
