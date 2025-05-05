
import { Profile } from "../components/Profile";
import { PostList } from "../components/PostList";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0">
      <Profile />
      <PostList />
    </div>
  );
}
