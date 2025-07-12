import React from "react";

const PostForm = ({ formData, handleChange, handleSubmit, loading, buttonLabel = "Submit" }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Post Title"
        required
        className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Write your content here..."
        rows={6}
        required
        className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
      >
        {loading ? "Posting..." : buttonLabel}
      </button>
    </form>
  );
};

export default PostForm;

