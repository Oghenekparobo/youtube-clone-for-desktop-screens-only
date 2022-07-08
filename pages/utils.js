export default function Utils() {
  return (
    <div className="bg-red-500 h-screen flex justify-center items-center space-x-10 ">
      <button
        className="cursor-pointer text-red-500 py-2 px-8 bg-white border border-red-500 rounded"
        onClick={async () => {
          await fetch("/api/utils", {
            body: JSON.stringify({
              task: "generate_content",
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          });
        }}
      >
        Generate Content
      </button>
      <button
        className="cursor-pointer text-red-500 py-2 px-8 bg-white border border-red-500 rounded"
        onClick={async () => {
          await fetch("/api/utils", {
            body: JSON.stringify({
              task: "clean_database",
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          });
        }}
      >
        Clean Database
      </button>
    </div>
  );
}
