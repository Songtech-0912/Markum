// Starting template text
// All backslashes have to be escaped to work here
var markdownTemplate = `# Markdown and Math with KaTeX!

You can now write *inline math*, **bold** text, ***formatted*** text, and even $\\LaTeX$ math equations with this editor!

## Examples

* Inline math such as $E = mc^2$ or $x^2 + y^2 = r^2$

* Block math such as 

$$
x={\\frac {-b\\pm {\\sqrt {b^{2}-4ac}}}{2a}}
$$

* Chemical formulae such as

$$
\\mathrm{6 CO_2}(g) + \\mathrm{6 H_2O} (g) \\rightarrow \\mathrm{C_6 H_{12} O_6}(s) + \\mathrm{6 O_2}(g)
$$

* And even the Schrödinger equation!

$$
i\\hbar {\\frac {\\partial }{\\partial t}}|\\psi (t)\\rangle ={\\hat {H}}|\\psi (t)\\rangle
$$


Note: This does not have built-in sanitization so don't type weird things here!

Enjoy!
`;

// Setup window
function setSizeToSections(){
    var containerWidth = document.body.offsetWidth;
    var leftPanel = document.getElementById("markdown");
    var rightPanel = document.getElementById("content");
    leftPanel.width = containerWidth / 2;
    rightPanel.width = containerWidth / 2;
    console.log(leftPanel.width);
    console.log(rightPanel.width);
}

// Equalize the editor panels
// setSizeToSections()
// Setup Ace editor
var editor = ace.edit("markdown");
editor.setShowPrintMargin(false);
// Uses light theme by default
// editor.setTheme("ace/mode/github");
editor.session.setMode("ace/mode/markdown");
editor.setHighlightActiveLine(true);
// If a past session was not auto-loaded into localstorage
// we load the welcome file
// Else we load the autosaved session
if (localStorage.hasOwnProperty("editorValue")){
    editor.getSession().setValue(localStorage.getItem("editorValue"));
} else {
    editor.getSession().setValue(markdownTemplate);
    localStorage.setItem("editorValue", editor.getValue());
}
editor.setOption("wrap", true);
// Vim mode
editor.setKeyboardHandler("ace/keyboard/vim");
// to revert to "default" mode use editor.setKeyboardHandler("");

// On init generate HTML preview and render KaTeX expressions
inputMD = editor.getValue();
generatedHTML = marked(inputMD);
document.getElementById("content").innerHTML = generatedHTML;
document.addEventListener("DOMContentLoaded", function () {
  renderMathInElement(document.getElementById("content"), {
    // customised options
    // • auto-render specific keys, e.g.:
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
    ],
    // • rendering keys, e.g.:
    throwOnError: false,
  });
});

// Update preview as editor changes
editor.getSession().on("change", function () {
  inputMD = editor.getValue();
  // Autosave to localstorage
  localStorage.setItem("editorValue", inputMD);
  // Use regex to replace backslashes ("\") in LaTeX math equations
  // to escaped backslashes ("\\") for markdown rendering
  inputMD = inputMD.replace("\\", "\\\\")
  generatedHTML = marked(inputMD);
  document.getElementById("content").innerHTML = generatedHTML;
  renderMathInElement(document.getElementById("content"), {
    // customised options
    // • auto-render specific keys, e.g.:
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
    ],
    // • rendering keys, e.g.:
    throwOnError: false,
  });
});

// Make the editor responsive as screen is resized
// window.addEventListener("resize", function() {
//     setSizeToSections();
// })

// DONE - implement autosaving via localstorage
// TODO - auto-escape backslashes used for block-level equations
