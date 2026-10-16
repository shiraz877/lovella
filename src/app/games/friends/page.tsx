import { redirect } from "next/navigation";

export default function FriendsGamesRedirect() {
  redirect("/quizzes?category=friends");
}
