const questionFromForm = (form) => {
  const formData = new FormData(form);
  console.log(formData.get("body"));
  return {
    body: formData.get("body"),
    correct: formData["correct"],
    options: Array.from(formData.keys())
      .filter((key) => /option-\d/.test(key))
      .map((key) => formData.get(key)),
  };
};

const renderQuestion = (q, options) => {
  const optionsHtml = q.options.map(
    (option) => `
  <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" ${
    options.enableOptions ? "" : "disabled"
  }>
  <label class="form-check-label" for="flexRadioDefault1">
    ${marked.parse(option)}
  </label>
</div>
    `
  );
  const html =
    marked.parse(q.body) +
    optionsHtml.reduce((prev, curr) => (prev = prev + curr), "");
  const previewNode = document.querySelector("#question-preview");
  document.querySelector("#question-preview").innerHTML = html;
  const tables = document.querySelectorAll("#question-preview table");
  if (tables) {
    tables.forEach((table) => table.classList.add("table"));
  }
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
};

function onInput(e) {
  const q = questionFromForm(e.target.form);
  renderQuestion(q, { enableOptions: false });
}

const questionForm = document.querySelector("form");

questionForm.addEventListener("input", onInput);

renderQuestion(questionFromForm(questionForm), { enableOptions: false });
