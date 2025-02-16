import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CommentCard from "./CommentCard";
import { useAuth0 } from "@auth0/auth0-react";

const API_URL = import.meta.env.VITE_API_URL + "/comments"; // API endpoint

type CommentType = {
  _id: string;
  user_id: string;
  comment_text: string;
  created_at: string;
};

export default function Testimonials() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [showForm, setShowForm] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: CommentType[]) => setComments(data))
      .catch((err) => console.error("Error fetching comments:", err));
  }, []);

  const handleAddComment = async () => {
    if (!newComment.trim() || !username.trim()) return;

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: username,
          comment_text: newComment,
        }),
      });

      if (!response.ok) throw new Error("Failed to post comment");

      const newCommentData = await response.json();
      setComments([...comments, newCommentData]);
      setNewComment("");
      setUsername("");
      setShowForm(false);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

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

      {/* Show "Add Comment" Button if User is Logged In */}
      {isAuthenticated && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          {showForm ? "Cancel" : "Add Comment"}
        </button>
      )}

      {/* Comment Form (User manually enters their name) */}
      {showForm && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 mt-4 w-full max-w-lg">
          <label className="block text-white text-lg">Your Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded mt-2 bg-gray-700 text-white"
            placeholder="Enter your name..."
          />
          <label className="block text-white text-lg mt-4">Comment</label>
          <textarea
            className="w-full p-2 rounded mt-2 bg-gray-700 text-white"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
          ></textarea>
          <button
            onClick={handleAddComment}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Submit
          </button>
        </div>
      )}

      {/* Grid for Comments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))
        ) : (
          <p className="text-center text-white">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </motion.div>
  );
}
