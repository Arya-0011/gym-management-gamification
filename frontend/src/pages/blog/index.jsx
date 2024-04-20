import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./blog.css";

// SampleProvider
import { BlogProvider } from "../../contexts/BlogContext";

export default function Blog() {
	return (
		<>
			<Header />
			<div>
				<br />
				<br />
			</div>

			<div className="home">
				{/* <BlogProvider/> */}
				<Posts />
				<Sidebar />
			</div>
		</>
	);
}
