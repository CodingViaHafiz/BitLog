import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/tinymce'; // Core
import 'tinymce/icons/default'; // Icons
import 'tinymce/themes/silver'; // Theme

// Required plugins
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/plugins/table';
import 'tinymce/plugins/preview';

import { useDispatch } from 'react-redux';
import { createPost, fetchAllPosts } from '../features/post/postSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('file', file);
    formData.append('content', content);

    try {
      await dispatch(createPost(formData)).unwrap();
      await dispatch(fetchAllPosts());
      navigate('/app/feed');
    } catch (error) {
      console.error('Post creation failed:', error);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >

      <motion.h1
        className="text-3xl font-bold text-emerald-500 mb-6 text-center"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 60 }}
      >
        Create a New Post
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full  focus:outline-none focus:ring-1 focus:ring-emerald-500 px-4 py-2 rounded-xl"
            required
          />
        </motion.div>


        <motion.div
          className="flex flex-col md:flex-row md:items-center gap-4"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >

          <div className="w-full md:basis-[80%] md:flex-shrink-0">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-4 py-2 rounded-xl"
              required
            />
          </div>

          <div className="w-full md:basis-[20%] md:flex-shrink-0">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-[150px] focus:outline-none focus:ring-1 focus:ring-emerald-500 text-emerald-500 border-1 border-emerald-500  px-4 py-2 rounded-xl"
              required
            >
              <option value="" disabled>Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="News">News</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
            </select>
          </div>
        </motion.div>


        {file && (
          <motion.div
            className="flex justify-start"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="h-20 w-20 rounded-lg shadow object-cover"
            />
          </motion.div>
        )}


        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },

          }}
        >
          <Editor
            value={content}
            onEditorChange={(newValue) => setContent(newValue)}
            tinymceScriptSrc="/tinymce/tinymce.min.js" // tells it where to load TinyMCE core
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'link', 'lists', 'code', 'image', 'table', 'preview'
              ],
              toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image preview code',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              base_url: '/tinymce', // tells it where to load models/plugins/themes
              suffix: '.min',
              license_key: 'gpl' // license (tellls tinyMCE to use free gpl version) general public license
            }}
          />

        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 },
          }}
        >
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-500 text-white px-6 py-2 rounded-xl hover:bg-emerald-600 transition"
          >
            Publish Post
          </motion.button>
        </motion.div>
      </motion.form>

    </motion.div>
  );
};

export default CreatePostPage;
