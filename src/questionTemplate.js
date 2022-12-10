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
    <div class="question">
      ${bodyHTML}
      <form>
        ${choicesHTML
          .map(
            (choice, i) => html`
              <label class="form-check-label" for="choice-${i}">
                <input
                  name="answer"
                  type="radio"
                  name="answer"
                  id="choice-${i}"
                />
                ${choice}
              </label>
            `
          )
          .join("")}
      </form>
    </div>
  `;
}
