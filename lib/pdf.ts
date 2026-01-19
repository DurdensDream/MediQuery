import { getDocument } from "pdfjs-dist";

export async function extractPdfText(buffer: Buffer) {
  const loadingTask = getDocument({ data: buffer });
  const pdf = await loadingTask.promise;
  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i += 1) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item: any) => item.str).join(" ");
    fullText += `\n${pageText}`;
  }
  return fullText;
}

export async function extractPdfImages() {
  return [] as string[];
}
