import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const API_URL = import.meta.env.VITE_API_URL + "/comments";

type CommentType = {
  _id: string;
  user_id: string;
  comment_text: string;
  created_at: string;
};

export default function CommentAdmin() {
  const [pendingComments, setPendingComments] = useState<CommentType[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchPendingComments = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch(`${API_URL}/pending`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data: CommentType[] = await res.json();
        setPendingComments(data);
      } catch (err) {
        console.error("Error fetching pending comments:", err);
      }
    };

    fetchPendingComments();
  }, [getAccessTokenSilently]);

  const handleApprove = async (id: string) => {
    try {
      const token = await getAccessTokenSilently();
      await fetch(`${API_URL}/${id}/approve`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingComments((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error approving comment:", err);
    }
  };

  const handleDeny = async (id: string) => {
    try {
      const token = await getAccessTokenSilently();
      await fetch(`${API_URL}/${id}/deny`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingComments((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error denying comment:", err);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">
        Pending Comments for Approval
      </h2>

      {pendingComments.length === 0 ? (
        <p className="text-gray-400">No pending comments</p>
      ) : (
        <div className="space-y-4">
          {pendingComments.map((comment) => (
            <div
              key={comment._id}
              className="bg-gray-700 p-4 rounded flex justify-between items-start"
            >
              <div className="text-white">
                <p className="font-semibold">{comment.user_id}</p>
                <p>{comment.comment_text}</p>
                <p className="text-sm text-gray-400">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(comment._id)}
                  className="text-green-500 hover:underline"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDeny(comment._id)}
                  className="text-red-500 hover:underline"
                >
                  Deny
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
