import * as Mime from "react-native-mime-types";

export const getMimeType = (uri: string): string => {
  const ext = uri.split(".").pop()?.toLowerCase();
  return Mime.lookup(ext || "") || "image/jpeg"; // fallback
};
