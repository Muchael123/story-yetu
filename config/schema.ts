import { user } from "@nextui-org/theme";
import { serial, varchar, json, text, integer } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const storyData = pgTable("storyData", {
  id: serial("id").primaryKey(),
  storySubject: text("storySubject"),
  storyType: varchar("storyType"),
  ageGroup: varchar("ageGroup"),
  imageStyle: varchar("imageStyle"),
  output: json("output"),
  coverimage: varchar("coverimage"),
  storyId: varchar("storyId"),
  userEmail: varchar("userEmail"),
  userName: varchar("userName"),
  userImage: varchar("userImage"),
});
export const Users = pgTable("Users", {
  id: serial("id").primaryKey(),
  email: varchar("email"),
  password: varchar("password"),
  name: varchar("name"),
  image: varchar("image"),
  role: varchar("role"),
  credits: integer("credits").default(3),
});
