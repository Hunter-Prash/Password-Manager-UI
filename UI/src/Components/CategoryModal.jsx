import { useState } from "react";
import { motion } from "framer-motion";
import axios from 'axios'

const CategoryModal = ({ onClose,onResult }) => {


  const [category, setCategory] = useState("");


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!category.trim()) {
    alert("field cannot be empty");
    return;
  }

  try {
    const token = sessionStorage.getItem("token");

    const response = await axios.post(
      " https://p7g0npdh71.execute-api.ap-south-1.amazonaws.com/api/v1/categories",
      {
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    setCategory("");


    //CALL CLOSE FNC IN DASHBOARD
    onClose();//state lifiting
    //SEND DATA TO PARENT DASHBOARD
    onResult(response.data.data)//state lifting

    
  } catch (err) {
    console.error(err);
  }
};


  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="relative w-[340px] rounded-xl border border-cyan-400 bg-zinc-950 p-6 shadow-[0_0_30px_#00ffe1]"
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

        <h2 className="mb-6 text-center font-mono text-lg tracking-widest text-cyan-400">
          ENTER CATEGORY
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-fuchsia-500 bg-transparent px-4 py-2 text-white outline-none placeholder:text-gray-500 focus:shadow-[0_0_12px_#ff00ff]"
          />

          <button
            type="submit"
            className="w-full rounded-md border border-cyan-400 py-2 font-mono tracking-widest text-cyan-400 transition-all hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_#00ffe1]"
          >
            FETCH BY CATEGORY
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CategoryModal;
