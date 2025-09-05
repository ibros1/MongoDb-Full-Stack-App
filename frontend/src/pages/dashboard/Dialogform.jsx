import React, { useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import axios from "axios";
import { X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DialogForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // control dialog open state
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview("");
    if (inputRef.current) inputRef.current.value = null;
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImage(null);
    setPreview("");
    if (inputRef.current) inputRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      const { data } = await axios.post("/api/post/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(data.message || "Post created successfully!");

      resetForm();
      setIsOpen(false); // auto close the modal
      if (onPostCreated) onPostCreated();
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="bg-slate-900 hover:bg-slate-800 rounded-md text-white px-6 py-2 m-2 cursor-pointer">
          Create Post
        </DialogTrigger>

        <DialogContent className="max-h-[80vh] w-full sm:max-w-lg overflow-auto scrollbar-hide">
          <DialogHeader>
            <DialogTitle>Create a New Post</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new post.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="my-2">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="content" className="my-2">
                Content
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={inputRef}
              />
              {preview && (
                <div className="relative mt-4 w-full">
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-0 bg-white text-gray-700 rounded-full p-1 shadow hover:bg-red-600 hover:text-white transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="w-[200px] ">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full  rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={loading}
            >
              {loading ? "Creating..." : "Submit Post"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        pauseOnHover
        draggable
      />
    </>
  );
};

export default DialogForm;
