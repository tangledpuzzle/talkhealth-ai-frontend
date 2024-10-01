import BlogPicker from "@/components/blog/editor/BlogPicker";

const AdminBlog = () => {
  return (
    <div
    // className="bg-black/10 min-h-screen"
    >
      <h1>Admin Blog</h1>
      <div className="my-4">
        <BlogPicker />
      </div>
    </div>
  );
};

export default AdminBlog;
