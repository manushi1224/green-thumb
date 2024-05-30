import { marked } from "marked";

function markdownToHTML(markdown: string) {
  const preprocessedText = preprocessMarkdown(markdown);
  const getMarkdownText = () => {
    const rawMarkup = marked(preprocessedText);
    return rawMarkup;
  };
  const mrkupedText = getMarkdownText();
  return mrkupedText;
}

function preprocessMarkdown(text: string) {
  let preprocessedText = text.replace(/(\s*\*\s+)/g, "\n$1");
  // Ensure there are two new lines between paragraphs
  preprocessedText = preprocessedText.replace(
    /([^\n])(\s*\n\s*)([^\n])/g,
    "$1\n\n$3"
  );
  return preprocessedText;
}

export default markdownToHTML;
