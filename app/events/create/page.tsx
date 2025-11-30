import CreateEventForm from "@/components/CreateEventForm";

const CreateEventPage = () => {
  return (
    <section>
      <h1 className="text-center">Create a New Event</h1>
      <p className="text-center mt-5">Fill the form below to add a new event</p>

      <div className="mt-10 max-w-2xl mx-auto">
        <CreateEventForm />
      </div>
    </section>
  );
};

export default CreateEventPage;
