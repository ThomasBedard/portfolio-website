import { motion } from "framer-motion";

type CommentProps = {
  comment: {
    user_id: string;
    comment_text: string;
    created_at: string;
  };
};

export default function CommentCard({ comment }: CommentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700"
    >
      <p className="text-gray-400 text-sm">
        <strong>User:</strong> {comment.user_id}
      </p>
      <p className="text-gray-300 text-lg mt-2">{comment.comment_text}</p>
      <p className="text-gray-500 text-xs mt-2">
        {new Date(comment.created_at).toLocaleString()}
      </p>
    </motion.div>
  );
}
