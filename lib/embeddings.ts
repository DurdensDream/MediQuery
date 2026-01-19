import { logInfo, logError } from "@/lib/logger";
import { config } from "@/lib/config";

let textPipeline: any;
let imagePipeline: any;

async function getTextPipeline() {
  if (textPipeline) return textPipeline;
  const { pipeline } = await import("@xenova/transformers");
  textPipeline = await pipeline("feature-extraction", config.textModel, {
    quantized: true
  });
  logInfo("Text embedding pipeline loaded");
  return textPipeline;
}

async function getImagePipeline() {
  if (imagePipeline) return imagePipeline;
  const { pipeline } = await import("@xenova/transformers");
  imagePipeline = await pipeline("feature-extraction", config.imageModel, {
    quantized: true
  });
  logInfo("Image embedding pipeline loaded");
  return imagePipeline;
}

export async function embedText(text: string) {
  try {
    const extractor = await getTextPipeline();
    const output = await extractor(text, { pooling: "mean", normalize: true });
    return Array.from(output.data as Float32Array);
  } catch (error) {
    logError("Text embedding failed", error);
    return new Array(384).fill(0);
  }
}

export async function embedImage(image: string) {
  try {
    const extractor = await getImagePipeline();
    const output = await extractor(image, { pooling: "mean", normalize: true });
    return Array.from(output.data as Float32Array);
  } catch (error) {
    logError("Image embedding failed", error);
    return new Array(512).fill(0);
  }
}
