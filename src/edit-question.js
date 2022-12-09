import questionTemplateFunc from "./questionTemplate.js";

const previewNode = document.querySelector("#question-preview");

function renderPreviewFromForm(form) {
  const formData = new FormData(form);
  const body = formData.get("body");
  const choices = formData.getAll("choices");
  previewNode.innerHTML = questionTemplateFunc(
    { body, choices },
    { disabled: true }
  );
  renderMathInElement(previewNode, {
    delimiters: [
      {
        left: "$$",
        right: "$$",
        display: true,
      },
      {
        left: "$",
        right: "$",
        display: false,
      },
    ],
  });
}

renderPreviewFromForm(document.querySelector("form"));

document
  .querySelector("form")
  .addEventListener("input", (e) => renderPreviewFromForm(e.target.form));
