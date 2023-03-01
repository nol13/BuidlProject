const CreatePost = () => {
  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-4xl">Create Your Article Here</p>
      <input
        type="text"
        placeholder="Title"
        className="input input-primary w-full max-w-xs input-lg"
      />
      <textarea
        className="textarea w-2/4 textarea-primary textarea-lg h-[400px]"
        placeholder="Main Text"
      ></textarea>
      <button className="btn btn-primary">Post</button>
    </div>
  );
};

export default CreatePost;
