import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const InsertModal = ({ onClose }) => {
  const [form, setForm] = useState({
    category: "",
    platform: "",
    email: "",
    password: "",
    notes: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation - notes field is optional
    if (
      !form.category.trim() ||
      !form.platform.trim() ||
      !form.email.trim() ||
      !form.password.trim()
    ) {
      alert("All fields are required");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.post(
        "https://p7g0npdh71.execute-api.ap-south-1.amazonaws.com/api/v1/insert",
        {
          category: form.category,
          platform: form.platform,
          email: form.email,
          password: form.password,
          notes: form.notes  // Include notes
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Insert success:", response.data);
      
      alert(response.data.message || "Insert Successful");
      
      // reset + close
      setForm({
        category: "",
        platform: "",
        email: "",
        password: "",
        notes: ""
      });

      onClose();
    } catch (err) {
      console.error("Insert failed:", err);
      alert("Failed to insert password");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="relative w-[360px] rounded-xl border border-cyan-400 
                   bg-zinc-950 p-6 shadow-[0_0_30px_#00ffe1]"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-cyan-400 hover:text-red-400"
        >
          ✕
        </button>

        <h2 className="mb-6 text-center font-mono text-lg 
                       tracking-widest text-cyan-400">
          INSERT PASSWORD
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-md border border-fuchsia-500 
                       bg-transparent px-4 py-2 text-white outline-none
                       placeholder:text-gray-500
                       focus:shadow-[0_0_12px_#ff00ff]"
          />

          <input
            type="text"
            name="platform"
            placeholder="Platform"
            value={form.platform}
            onChange={handleChange}
            className="w-full rounded-md border border-fuchsia-500 
                       bg-transparent px-4 py-2 text-white outline-none
                       placeholder:text-gray-500
                       focus:shadow-[0_0_12px_#ff00ff]"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border border-fuchsia-500 
                       bg-transparent px-4 py-2 text-white outline-none
                       placeholder:text-gray-500
                       focus:shadow-[0_0_12px_#ff00ff]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-md border border-fuchsia-500 
                       bg-transparent px-4 py-2 text-white outline-none
                       placeholder:text-gray-500
                       focus:shadow-[0_0_12px_#ff00ff]"
          />

          {/* ✅ NOTES FIELD - NEW! */}
          <textarea
            name="notes"
            placeholder="Notes (optional) - e.g., pin: 1234, username: john"
            value={form.notes}
            onChange={handleChange}
            rows="3"
            className="w-full rounded-md border border-fuchsia-500 
                       bg-transparent px-4 py-2 text-white outline-none
                       placeholder:text-gray-500
                       focus:shadow-[0_0_12px_#ff00ff]
                       resize-none"
          />

          <button
            type="submit"
            className="mt-4 w-full rounded-md border border-cyan-400 py-2 
                       font-mono tracking-widest text-cyan-400 transition-all
                       hover:bg-cyan-400 hover:text-black
                       hover:shadow-[0_0_20px_#00ffe1]"
          >
            INSERT
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default InsertModal;