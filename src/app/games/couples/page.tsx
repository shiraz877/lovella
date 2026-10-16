import { redirect } from "next/navigation";

export default function CouplesGamesRedirect() {
  redirect("/quizzes?category=couples");
}
