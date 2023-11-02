import { getPostsDto } from '@/lib/posts/get-posts-dto';

export function ListPosts() {
  const posts = getPostsDto();

  return (
    <div>
      <h2>List of posts</h2>
      <ul className="flex flex-col gap-2 p-4 border container">
        {posts.map((post) => (
          <li key={post.id}>
            <p className="border p-2">{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
