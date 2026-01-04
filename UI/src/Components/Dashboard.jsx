import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CategoryModal from "./CategoryModal";
import InsertModal from "./InsertModal";
import PlatformModal from "./PlatformModal";

const Dashboard = () => {
  const navigate = useNavigate();

  const [modal, setModal] = useState({
    categoryModal: false,
    platformModal: false,
    insertModal: false,
  });

  const [selectedOption, setSelectedOption] = useState(""); 
  const [results, setResults] = useState([]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const handleSelect = (val) => {
    setSelectedOption(val); 
    setModal((prev) => ({
      categoryModal: val === "category" ? !prev.categoryModal : false,
      platformModal: val === "platform" ? !prev.platformModal : false,
      insertModal: val === "insert" ? !prev.insertModal : false,
    }));
  };

  const handleClose = () => {
    setModal({
      categoryModal: false,
      platformModal: false,
      insertModal: false,
    });
  };

  const handleUpdate = () => {
    navigate("/update");
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black 
                 px-4 py-6 text-white sm:px-8 sm:py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* HEADER */}
      <motion.div
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="font-mono text-2xl tracking-widest text-cyan-400 sm:text-3xl">
          DASHBOARD
        </h1>

        <button
          onClick={handleLogout}
          className="w-full rounded-md border border-red-500 px-4 py-2 
                     font-mono text-red-400 transition-all
                     hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_#ff0000]
                     sm:w-auto"
        >
          LOGOUT
        </button>
      </motion.div>

      {/* SUBTITLE */}
      <motion.p
        className="mt-6 max-w-md text-sm text-gray-400 sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Fetch details based on platform or category
        <br />
        -- Make sure category is in ALL CAPS --
        <br />
        <br />
        Available Categories- CAREER, BANKING, AWS, ENTERTAINMENT,
        PERSONAL_SYSTEM, COLLEGE, SHOPPING_AND_LIFESTYLE
      </motion.p>

      {/* CONTROLS */}
      <motion.div
        className="mt-10 flex max-w-sm flex-col gap-4"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        {[
          { key: "category", label: "Fetch By Category" },
          { key: "platform", label: "Fetch By Platform" },
          { key: "insert", label: "Insert Data" },
        ].map((opt) => (
          <label
            key={opt.key}
            className="flex cursor-pointer items-center gap-4 rounded-lg border
                       border-zinc-700 px-4 py-3 transition-all
                       hover:border-fuchsia-500 hover:bg-zinc-900"
          >
            <input
              type="radio"
              name="action"
              className="hidden"
              checked={selectedOption === opt.key}
              onChange={() => handleSelect(opt.key)}
            />

            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-zinc-500">
              <span
                className={`h-2 w-2 rounded-full bg-cyan-400 transition-opacity ${
                  selectedOption === opt.key ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>

            <span className="font-mono tracking-wide text-gray-300">
              {opt.label}
            </span>
          </label>
        ))}
      </motion.div>

      {/* RESULTS */}
      {results.length > 0 && (
        <motion.div className="mt-14">
          <h2 className="mb-6 font-mono text-lg tracking-widest text-cyan-400">
            ACCESS GRANTED
          </h2>
        </motion.div>
      )}

      {/* MODALS */}
      {modal.categoryModal && (
        <CategoryModal onClose={handleClose} onResult={setResults} />
      )}

      {modal.platformModal && (
        <PlatformModal onClose={handleClose} onResult={setResults} />
      )}

      {modal.insertModal && <InsertModal onClose={handleClose} />}

      <motion.button
        onClick={handleUpdate}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 rounded-xl border border-cyan-400/60 
                   bg-zinc-950 px-6 py-3 font-mono tracking-widest
                   text-cyan-400 shadow-[0_0_25px_#00ffe1]
                   transition-all hover:bg-cyan-400 hover:text-black"
      >
        UPDATE ITEM
      </motion.button>
    </motion.div>
  );
};

export default Dashboard;
