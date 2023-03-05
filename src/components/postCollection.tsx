import Post from "./post";

export default function PostCollection() {
  const post = {
    creator: `0xA0Cf798816D4b9b9866b5330EEa46a18382f251e`,
    preview: "456",
    price: 10,
    title: "cool post"
  };

  return (
    <div className="container flex flex-col m-auto gap-4 max-w-prose">
      <Post post={post} />
      <Post post={post} />
      <Post post={post} />
      <Post post={post} />
      <Post post={post} />
      <Post post={post} />
    </div>
  );
}
