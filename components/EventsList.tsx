"use client";
import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { IEvent } from "@/database/event.model";

const EventsList = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);

  const [selectedFilter, setSelectedFilter] = useState(""); // type of filter user selects
  const [filters, setFilters] = useState({
    date: "",
    mode: "",
    audience: "",
    tag: "",
  });
  const [sort, setSort] = useState("newest");

  // Fetch events from API
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data.events))
      .catch((err) => console.error(err));
  }, []);

  // Apply filters & sorting
  useEffect(() => {
    let filtered = [...events];

    if (filters.date) {
      filtered = filtered.filter((e) => e.date === filters.date);
    }
    if (filters.mode) {
      filtered = filtered.filter((e) => e.mode === filters.mode);
    }
    if (filters.audience) {
      filtered = filtered.filter((e) =>
        e.audience.toLowerCase().includes(filters.audience.toLowerCase())
      );
    }
    if (filters.tag) {
      filtered = filtered.filter((e) =>
        e.tags.some((t) => t.toLowerCase() === filters.tag.toLowerCase())
      );
    }

    if (sort === "newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sort === "upcoming") {
      filtered.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (sort === "popular") {
      filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

    setFilteredEvents(filtered);
  }, [filters, sort, events]);

  return (
    <div>
      {/* Filter selector */}
      <div className="mb-4 text-gray-600 text-sm">
        Choose a filter to narrow down events:
      </div>

      <div className="flex flex-wrap gap-2 mb-6 items-center">
        {/* Filter type selector */}
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="border-dark-200 bg-dark-100 flex w-fit cursor-pointer rounded-full border px-4 py-2 text-white max-sm:w-full text-center focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="">Select Filter</option>
          <option value="date">Date</option>
          <option value="mode">Mode</option>
          <option value="audience">Audience</option>
          <option value="tag">Tag</option>
        </select>

        {/* Conditional Filter Inputs */}
        {selectedFilter === "date" && (
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="border-dark-200 bg-dark-100 flex w-fit cursor-pointer rounded-full border px-4 py-2 text-white max-sm:w-full text-center focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        )}

        {selectedFilter === "mode" && (
          <select
            value={filters.mode}
            onChange={(e) => setFilters({ ...filters, mode: e.target.value })}
            className="border-dark-200 bg-dark-100 flex w-fit cursor-pointer rounded-full border px-4 py-2 text-white max-sm:w-full text-center focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option value="">All Modes</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        )}

        {selectedFilter === "audience" && (
          <input
            type="text"
            placeholder="Audience"
            value={filters.audience}
            onChange={(e) =>
              setFilters({ ...filters, audience: e.target.value })
            }
            className="border-dark-200 bg-dark-100 flex w-fit cursor-pointer rounded-full border px-4 py-2 text-white max-sm:w-full text-center focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-300"
          />
        )}

        {selectedFilter === "tag" && (
          <input
            type="text"
            placeholder="Tag"
            value={filters.tag}
            onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
            className="border-dark-200 bg-dark-100 flex w-fit cursor-pointer rounded-full border px-4 py-2 text-white max-sm:w-full text-center focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-300"
          />
        )}

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border-dark-200 bg-dark-100 flex w-fit cursor-pointer rounded-full border px-4 py-2 text-white max-sm:w-full text-center focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="newest">Newest</option>
          <option value="upcoming">Upcoming</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Events List */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <li className="list-none" key={event._id}>
              <EventCard {...event} />
            </li>
          ))
        ) : (
          <p className="text-gray-500">No events found.</p>
        )}
      </ul>
    </div>
  );
};

export default EventsList;
