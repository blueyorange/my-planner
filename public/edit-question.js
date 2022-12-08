import questionTemplateFunc from "./questionTemplate.mjs";
import { render } from "https://cdn.skypack.dev/lit-html";

document.querySelector("form").addEventListener("input", (e) => {
  const formData = new FormData(e.target.form);
  const body = formData.get("body");
  const correct = [formData.get("correct")];
  const choices = formData.getAll("choices");
  const previewNode = document.querySelector("#question-preview");
  render(questionTemplateFunc({ body, choices }, { disabled: false }));
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
});
