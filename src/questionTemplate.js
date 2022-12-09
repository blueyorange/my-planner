import { marked } from "marked";

export default function questionTemplateFunc(question, { disabled }) {
  const { body, choices } = question;
  const bodyHTML = marked.parse(body);
  const choicesHTML = choices.map((c) => marked.parse(c));
  return `
    ${bodyHTML}
    ${choicesHTML
      .map(
        (choice, i) => `
        <div class="question">
          <input
            name="answer"
            type="radio"
            name="answer"
            id="choice-${i}"
            ${disabled ? "disabled" : ""}
          />
          <label class="form-check-label" for="choice-${i}">
            ${choice}
          </label>
        </div>
      `
      )
      .join("")}
  `;
}
