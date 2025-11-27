"use client";
import { createBooking } from "@/lib/actions/booking.actions";
import React, { useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    const { success } = await createBooking({ eventId, slug, email });

    e.preventDefault();
    if (!success) {
      setSubmitted(true);
    } else {
      console.error("Booking creation failed", error);
    }
  };
  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signing up!</p>
      ) : (
        <form>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              id="email"
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="button-submit"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
