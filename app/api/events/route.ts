import { v2 as cloudinary } from "cloudinary";
import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// @desc : Create a new event
// @route : POST /api/events
// @access : Private
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData(); // in next is req.formData not req.body

    let event;
    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      return NextResponse.json(
        {
          message: "Invalid JSON data format ",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 400 }
      );
    }

    // image
    const file = formData.get("image") as File;

    if (!file)
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 }
      );

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvent" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createEvent = await Event.create(event);

    return NextResponse.json(
      { message: "Event Created Successfully", event: createEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      {
        message: "Event Creation Failed ",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
