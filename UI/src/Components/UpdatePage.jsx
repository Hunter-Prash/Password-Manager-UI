import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdatePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "",
    platform: "",
    email: "",
    password: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {};

      Object.entries(formData).forEach(([key, value]) => {
        if (value.trim() !== "") {
          payload[key] = value;
        }
      });

      console.log(payload);

      /*const response = await axios.patch(
        "https://p7g0npdh71.execute-api.ap-south-1.amazonaws.com/api/v1/update",
        payload
      );

      console.log("Update success:", response.data);*/
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-zinc-900 border border-cyan-500/30 rounded-xl p-6 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-200 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
          Update Profile
        </h2>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm text-cyan-300 mb-1">
            Category *
          </label>
          <input
            type="text"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-black border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            placeholder="e.g. Software"
          />
        </div>

        {/* Platform */}
        <div className="mb-4">
          <label className="block text-sm text-cyan-300 mb-1">
            Platform *
          </label>
          <input
            type="text"
            name="platform"
            required
            value={formData.platform}
            onChange={handleChange}
            className="w-full bg-black border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            placeholder="e.g. Web"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-cyan-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-black border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            placeholder="you@cyber.net"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm text-cyan-300 mb-1">
            Password (leave blank to keep unchanged)
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-black border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            placeholder="••••••••"
          />
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-sm text-cyan-300 mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full bg-black border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none"
            placeholder="Write something..."
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-2 rounded-lg bg-cyan-500 text-black font-semibold tracking-wide shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:bg-cyan-400 transition"
        >
          Save Changes
        </motion.button>
      </motion.form>
    </div>
  );
};

export default UpdatePage;
