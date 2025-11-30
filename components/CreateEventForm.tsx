"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateEventForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null as File | null,
    date: "",
    time: "",
    location: "",
    tags: "",
    audience: "",
    mode: "",
    venue: "",
    organizer: "",
    overview: "",
    agenda: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(form);
    const slug =
      form.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "") + `-${Math.floor(Math.random() * 100000)}`;

    const formData = new FormData();

    // Append regular fields
    formData.append("title", form.title);
    formData.append("slug", slug);
    formData.append("description", form.description);
    formData.append("organizer", form.organizer);
    formData.append("overview", form.overview);
    formData.append("agenda", JSON.stringify(form.agenda.split(",")));
    formData.append("date", form.date);
    formData.append("time", form.time);
    formData.append("location", form.location);
    formData.append("audience", form.audience);
    formData.append("mode", form.mode.toLowerCase());
    formData.append("venue", form.venue);

    // Tags: convert to array then stringify
    formData.append("tags", JSON.stringify(form.tags.split(",")));

    // image file
    if (form.image) formData.append("image", form.image);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        // 1️⃣ Reset form
        setForm({
          title: "",
          description: "",
          image: null,
          date: "",
          time: "",
          location: "",
          tags: "",
          audience: "",
          mode: "",
          venue: "",
          organizer: "",
          overview: "",
          agenda: "",
        });

        // 2️⃣ Navigate to the newly created event details page
        router.push(`/events/${data.event.slug}`);
      } else {
        // alert(data.error || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error creating event:", err);
      // alert("Failed to create event!");
    }
  };

  return (
    <div id="create-event" className="w-full max-w-lg mx-auto mt-10 p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* TITLE */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm font-medium">
            Event Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Event Description"
            value={form.description}
            onChange={handleChange}
            className="input-field h-28 resize-none"
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div className="flex flex-col gap-1">
          <label htmlFor="image" className="text-sm font-medium">
            Upload Image
          </label>

          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files?.[0] })}
            // onChange={handleImageChange}
            className="input-field cursor-pointer file:mr-4 file:py-2 file:px-3 
                       file:rounded-md file:border-0 file:bg-teal-400/20 
                       file:text-teal-300 file:cursor-pointer"
          />

          {form.image && (
            <p className="text-xs text-teal-300 mt-1">
              Selected: {form.image.name}
            </p>
          )}
        </div>

        {/* Organizer */}
        <input
          type="text"
          name="organizer"
          onChange={handleChange}
          placeholder="Organizer name"
          className="input-field"
        />

        {/* Overview */}
        <textarea
          name="overview"
          onChange={handleChange}
          placeholder="Event overview"
          className="input-field"
        />

        {/* Agenda (JSON array) */}
        <textarea
          name="agenda"
          onChange={handleChange}
          placeholder='e.g. ["Intro","Workshop","Q&A"]'
          className="input-field"
        />

        {/* AUDIENCE */}
        <div className="flex flex-col gap-1">
          <label htmlFor="audience" className="text-sm font-medium">
            Audience
          </label>
          <input
            id="audience"
            type="text"
            name="audience"
            placeholder="Event Audience"
            value={form.audience}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* MODE */}
        <div className="flex flex-col gap-1">
          <label htmlFor="mode" className="text-sm font-medium">
            Mode
          </label>
          <select
            id="mode"
            name="mode"
            value={form.mode}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select mode</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        {/* VENUE */}
        <div className="flex flex-col gap-1">
          <label htmlFor="venue" className="text-sm font-medium">
            Venue
          </label>
          <input
            id="venue"
            type="text"
            name="venue"
            placeholder="Event Venue"
            value={form.venue}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* DATE */}
        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="text-sm font-medium">
            Event Date
          </label>
          <input
            id="date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* TIME */}
        <div className="flex flex-col gap-1">
          <label htmlFor="time" className="text-sm font-medium">
            Event Time
          </label>
          <input
            id="time"
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* LOCATION */}
        <div className="flex flex-col gap-1">
          <label htmlFor="location" className="text-sm font-medium">
            Location
          </label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Event Location"
            value={form.location}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* TAGS */}
        <div className="flex flex-col gap-1">
          <label htmlFor="tags" className="text-sm font-medium">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            type="text"
            name="tags"
            placeholder="React, JavaScript, DevOps..."
            value={form.tags}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button type="submit" className="button-submit">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
