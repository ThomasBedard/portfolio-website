import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CommentCard from "./CommentCard";

const API_URL = import.meta.env.VITE_API_URL + "/comments"; // API endpoint

type CommentType = {
  _id: string;
  user_id: string;
  comment_text: string;
  created_at: string;
};

export default function Testimonials() {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: CommentType[]) => setComments(data))
      .catch((err) => console.error("Error fetching comments:", err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
      className="relative flex flex-col gap-4 items-center justify-center px-4 h-screen"
      id="comments"
    >
      <div className="text-3xl md:text-7xl font-bold text-center bg-gradient-to-b from-white to-neutral-400 text-transparent bg-clip-text">
        Comment Section
      </div>
      <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4">
        Here you can tell me about your thoughts.
      </div>

      {/* Grid for Comments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))
        ) : (
          <p className="text-center text-white">Loading comments...</p>
        )}
      </div>
    </motion.div>
  );
}
