import Post from "./post";

export default function PostCollection() {
  return (
    <div className="container flex flex-col m-auto gap-4 max-w-prose">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}
