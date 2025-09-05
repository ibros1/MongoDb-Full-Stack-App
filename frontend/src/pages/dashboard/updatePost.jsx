import React, { useEffect, useRef, useState } from "react";
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
import { PencilIcon, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const DialogUpdateForm = ({ postData }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // control dialog open state
  const inputRef = useRef(null);
  useEffect(() => {
    if (postData) {
      setTitle(postData.title || "");
      setContent(postData.content || "");
      setPreview(postData.image || ""); // ✅ set default image
    }
  }, [postData]);
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
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      if (image) formData.append("image", image);

      const { data } = await axios.put(
        `/api/post/update/${postData._id}`,
        formData
      );
      toast.success("Successfully updated");
      navigate("/dashboard", { state: { refresh: true } });
      resetForm();
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.response.data.message || "Failed Update");
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <PencilIcon className="w-5 h-5" />
          Update Post
        </DialogTrigger>

        <DialogContent className="max-h-[80vh] w-full sm:max-w-lg overflow-auto scrollbar-hide">
          <DialogHeader>
            <DialogTitle>Update this Post</DialogTitle>
            <DialogDescription>
              you can edit the details below to update the post.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="my-2">
                Title
              </Label>
              <Input
                id="title"
                defaultValue={postData.title}
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
                onChange={(e) => setContent(e.target.value)}
                defaultValue={postData.title}
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
              {loading ? "Updating..." : "Update Post"}
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

export default DialogUpdateForm;
