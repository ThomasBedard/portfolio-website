import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL + "/comments";

// Define TypeScript types
type CommentType = {
  _id: string;
  user_id: string;
  comment_text: string;
  created_at: string;
};

export default function CommentAdmin() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState<CommentType>({
    _id: "",
    user_id: "",
    comment_text: "",
    created_at: new Date().toISOString(),
  });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: CommentType[]) => setComments(data))
      .catch((err) => console.error("Error fetching comments:", err));
  }, []);

  const handleCreateComment = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((res) => res.json())
      .then((data: CommentType) => setComments([...comments, data]))
      .catch((err) => console.error("Error creating comment:", err));
  };

  const handleDeleteComment = (id: string) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() =>
        setComments((prevComments) => prevComments.filter((c) => c._id !== id))
      )
      .catch((err) => console.error("Error deleting comment:", err));
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white">Manage Comments</h2>

      <div className="mt-4 space-y-4">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-gray-700 p-4 rounded flex justify-between"
          >
            <span className="text-white">{comment.comment_text}</span>
            <button
              onClick={() => handleDeleteComment(comment._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-white">Add New Comment</h3>
        <input
          type="text"
          placeholder="User ID"
          className="w-full p-2 rounded mt-2"
          value={newComment.user_id}
          onChange={(e) =>
            setNewComment({ ...newComment, user_id: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Comment"
          className="w-full p-2 rounded mt-2"
          value={newComment.comment_text}
          onChange={(e) =>
            setNewComment({ ...newComment, comment_text: e.target.value })
          }
        />
        <button
          onClick={handleCreateComment}
          className="bg-green-500 text-white p-2 rounded mt-2"
        >
          Create
        </button>
      </div>
    </div>
  );
}
