import { redirect } from "next/navigation";

export default function HowWellGameRedirect() {
  redirect("/quizzes/how-well-do-you-know-me");
}
