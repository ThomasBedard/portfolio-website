import { useEffect, useState } from "react";
import { Comment, LocalizedContent, getAllComments, createComment, deleteComment } from "../../../db_connect";

export default function CommentAdmin() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<Comment>({
    user_id: "",
    user_name: "",
    comment_text: { en: "", fr: "" },
    created_at: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getAllComments();
        setComments(data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleCreateComment = async () => {
    try {
      const data = await createComment(newComment);
      setComments([...comments, data]);
      
      // Reset form
      setNewComment({
        user_id: "",
        user_name: "",
        comment_text: { en: "", fr: "" },
        created_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Error creating comment:", err);
    }
  };

  const handleDeleteComment = async (id?: string) => {
    if (!id) return;
    
    try {
      const success = await deleteComment(id);
      if (success) {
        setComments((prevComments) => prevComments.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleInputChange = (
    field: keyof Comment, 
    value: string | LocalizedContent,
    language?: "en" | "fr"
  ) => {
    if (field === "comment_text") {
      if (language) {
        setNewComment({
          ...newComment,
          comment_text: {
            ...newComment.comment_text,
            [language]: value
          }
        });
      }
    } else {
      setNewComment({ ...newComment, [field]: value });
    }
  };

  if (loading) {
    return <div className="p-4 text-white">Loading comments...</div>;
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white">Manage Comments</h2>

      <div className="mt-4 space-y-4">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-gray-700 p-4 rounded flex justify-between"
          >
            <div className="text-white">
              <div><strong>{comment.user_name}</strong></div>
              <div><strong>EN:</strong> {comment.comment_text.en}</div>
              <div><strong>FR:</strong> {comment.comment_text.fr}</div>
            </div>
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
        
        <div className="mt-4">
          <h4 className="text-white">User Info</h4>
          <input
            type="text"
            placeholder="User ID"
            className="w-full p-2 rounded mt-2"
            value={newComment.user_id}
            onChange={(e) => handleInputChange("user_id", e.target.value)}
          />
          <input
            type="text"
            placeholder="User Name"
            className="w-full p-2 rounded mt-2"
            value={newComment.user_name}
            onChange={(e) => handleInputChange("user_name", e.target.value)}
          />
        </div>

        <div className="mt-4">
          <h4 className="text-white">Comment</h4>
          <textarea
            placeholder="Comment (English)"
            className="w-full p-2 rounded mt-2"
            rows={3}
            value={newComment.comment_text.en}
            onChange={(e) => handleInputChange("comment_text", e.target.value, "en")}
          />
          <textarea
            placeholder="Comment (French)"
            className="w-full p-2 rounded mt-2"
            rows={3}
            value={newComment.comment_text.fr}
            onChange={(e) => handleInputChange("comment_text", e.target.value, "fr")}
          />
        </div>

        <button
          onClick={handleCreateComment}
          className="bg-green-500 text-white p-2 rounded mt-4"
        >
          Create Comment
        </button>
      </div>
    </div>
  );
}