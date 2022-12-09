import { marked } from "marked";

function html(strings, ...values) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + values[i];
  });
  return str;
}

export default function questionTemplateFunc(question, { disabled }) {
  const { body, choices } = question;
  const bodyHTML = marked.parse(body);
  const choicesHTML = choices.map((c) => marked.parse(c));
  return html`
    <style>
      .question {
        max-width: 100%;
      }
      .question img {
        width: 100%;
        height: auto;
      }
      .question input[type="radio"] {
        min-width: 5em;
        appearance: none;
        margin: 0;
      }
      .question label {
      }
      .question label:hover {
      }
    </style>
    ${bodyHTML}
    ${choicesHTML
      .map(
        (choice, i) => html`
          <div class="question">
            <label class="form-check-label" for="choice-${i}">
              <input
                name="answer"
                type="radio"
                name="answer"
                id="choice-${i}"
              />
              ${choice}
            </label>
          </div>
        `
      )
      .join("")}
  `;
}
