import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios'

const Home = () => {

  const navigate=useNavigate()

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    masterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick=async(e)=>{
    e.preventDefault()
    //send password for authentication
    try{
          let response=await axios.post(' https://p7g0npdh71.execute-api.ap-south-1.amazonaws.com/api/v1/login',{
      email:formData.email,
      password:formData.masterPassword
    })

    if(response.status===200){
      sessionStorage.setItem('token',JSON.stringify(response.data.token))
      navigate('/dashboard')
    }
    console.log(response.data)
    }
    catch(e){
      console.error(e)
    }
    
  }


  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-slate-900 to-black text-cyan-400 flex items-center justify-center">

      {/* 🔮 ANIMATED BACKGROUND ORBS */}
<div className="absolute inset-0 z-0">
  <motion.div
    className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-cyan-400/30 rounded-full blur-3xl"
    animate={{ x: [0, 120, 0], y: [0, 70, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
  />

  <motion.div
    className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
    animate={{ x: [0, -160, 0], y: [0, -90, 0] }}
    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
  />

  <motion.div
    className="absolute top-[30%] right-[20%] w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"
    animate={{ y: [0, -120, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  />
</div>


      {/* MAIN CONTENT */}
      <div className="relative z-10">
        {/* LOGIN BUTTON */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="px-10 py-4 border-2 border-cyan-400 text-lg tracking-widest shadow-[0_0_20px_#22d3ee] hover:bg-cyan-400 hover:text-black transition cursor-pointer"
        >
          LOGIN
        </motion.button>

        {/* MODAL */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative w-[90%] max-w-md bg-black border border-cyan-400 shadow-[0_0_30px_#22d3ee] p-6"
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-3 right-3 text-pink-500 hover:scale-110 transition"
                >
                  ✕
                </button>

                <h2 className="text-center text-xl tracking-widest mb-6">
                  ACCESS TERMINAL
                </h2>

                <form className="flex flex-col gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-transparent border border-cyan-400 px-4 py-3 outline-none placeholder:text-cyan-400/60 focus:shadow-[0_0_15px_#22d3ee]"
                  />

                  <input
                    type="password"
                    name="masterPassword"
                    placeholder="Master Password"
                    value={formData.masterPassword}
                    onChange={handleChange}
                    className="bg-transparent border border-cyan-400 px-4 py-3 outline-none placeholder:text-cyan-400/60 focus:shadow-[0_0_15px_#22d3ee]"
                  />

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 py-3 bg-cyan-400 text-black font-bold tracking-widest shadow-[0_0_20px_#22d3ee] cursor-pointer"
                    onClick={handleClick}
                  >
                    ENTER
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
