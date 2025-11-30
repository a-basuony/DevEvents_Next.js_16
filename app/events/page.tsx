import EventsList from "@/components/EventsList";
import { cacheLife } from "next/cache";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function EventsPage() {
  "use cache";
  cacheLife("hours");
  //   const response = await fetch(`${BASE_URL}/api/events`);
  //   const { events } = await response.json();
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">All Events</h1>
      <EventsList />
    </div>
  );
}
