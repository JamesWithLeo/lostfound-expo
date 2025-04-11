import { Category } from "./Categories";

export type ItemType = {
  id: string;
  itemName: string;
  location: string;
  caption: string;
  timeDate: Date;
  category: Category;
  userId: string;
  type: "lost" | "found" | "stolen";
  itemStatus: "pending" | "expired" | "returned";
  itemProof: string[];
  desc: string | null | undefined;
  color: string | null | undefined;
  brandModel: string | null | undefined;
};
