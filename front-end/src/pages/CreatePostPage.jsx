import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
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
      {/* Page Heading */}
      <motion.h1
        className="text-3xl font-bold text-fontColor mb-6 text-center"
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

        {/* 🔹 TITLE INPUT */}
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
            className="w-full border border-fontColor focus:outline-none focus:ring-1 focus:ring-fontColor px-4 py-2 rounded-xl"
            required
          />
        </motion.div>

        {/* 🔹 IMAGE + CATEGORY side-by-side */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center gap-4"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {/* Image Input (80%) */}
          <div className="w-full md:basis-[80%] md:flex-shrink-0">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border px-4 py-2 rounded-xl"
              required
            />
          </div>

          {/* Category Select (20%) */}
          <div className="w-full md:basis-[20%] md:flex-shrink-0">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-[150px] focus:outline-none focus:ring-1 focus:ring-fontColor text-fontColor border-1 border-fontColor  px-4 py-2 rounded-xl"
              required
            >
              <option value="" disabled>Select Category</option>
              <option value="technology">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="education">Education</option>
              <option value="travel">Travel</option>
              <option value="news">News</option>
            </select>
          </div>
        </motion.div>


        {/* 🔹 Preview if image is selected */}
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

        {/* 🔹 TINYMCE CONTENT */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Editor
            apiKey="z43igi6uxlih9byfjt5szosrk89qu9prnylbztf9umdn4ckc"
            value={content}
            onEditorChange={(newValue) => setContent(newValue)}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            }}
          />
        </motion.div>

        {/* 🔹 SUBMIT BUTTON */}
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
            className="bg-fontColor text-white px-6 py-2 rounded-xl hover:bg-headingText/90 transition"
          >
            Publish Post
          </motion.button>
        </motion.div>
      </motion.form>

    </motion.div>
  );
};

export default CreatePostPage;
