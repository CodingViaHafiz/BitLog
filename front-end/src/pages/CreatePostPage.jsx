import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch } from 'react-redux';
import { createPost, fetchAllPosts } from '../features/post/postSlice';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createPost({ title, content })).unwrap();
      await dispatch(fetchAllPosts());
      navigate('/feed');
    } catch (error) {
      console.error('Post creation failed:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-headingText mb-6">Create a New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded-xl"
        />

        {/* TinyMCE Editor */}
        <Editor
          apiKey="z43igi6uxlih9byfjt5szosrk89qu9prnylbztf9umdn4ckc" //   API key
          value={content}
          onEditorChange={(newValue) => setContent(newValue)}
          init={{
            height: 400,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic underline | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help',
          }}
        />

        <button
          type="submit"
          className="bg-headingText text-white px-6 py-2 rounded-xl hover:bg-headingText/90 transition"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
