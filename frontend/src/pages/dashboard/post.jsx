import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"; // For nice icons
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import DialogUpdateForm from "./updatePost";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { postId } = useParams();

  // Fetch a single post
  const getOnePostHandler = async () => {
    try {
      const res = await axios.get(`/api/post/${postId}`);
      setPost(res.data.post[0]); // API returns an array
    } catch (error) {
      console.error(error);
    }
  };

  // updateHandler

  // Delete post
  const deletePostHandler = async () => {
    try {
      await axios.delete(`/api/post/delete/${postId}`);
      toast.success("Post deleted successfully!");
      navigate("/dashboard", { state: { refresh: true } }); // Redirect to posts list
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Failed to delete post.");
    }
  };

  useEffect(() => {
    getOnePostHandler();
  }, []);

  if (!post)
    return (
      <div className="text-center text-gray-500 mt-10">Post not found</div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl overflow-hidden">
      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h1>
        <p className="text-gray-700 leading-relaxed mb-5">{post.content}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <span>@{post.author?.username || "Unknown"}</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <DialogUpdateForm postData={post} />

          <button
            onClick={() => setDeleteDialogOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <TrashIcon className="w-5 h-5" />
            Delete
          </button>
        </div>
      </div>

      <div className="">
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                post and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant={"destructive"}
                onClick={deletePostHandler}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default PostDetail;
