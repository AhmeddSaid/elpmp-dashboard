import { createLazyFileRoute } from "@tanstack/react-router";
import Tasks from "@/features/questions";

export const Route = createLazyFileRoute("/_authenticated/tasks/")({
  component: Tasks,
});
