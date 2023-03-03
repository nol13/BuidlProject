import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Account } from "../../../components/Account";

const Post = () => {
  const { isConnected } = useAccount();

    const router = useRouter();
    const { uid, pid } = router.query;
    const [posts, setPosts] = useState([])
    const [bundleID, setBundleId] = useState([])
    
    const savePost = async () => {
            
        const posts = await fetch('/api/savePost', { method: "POST", body: JSON.stringify({preview: 5, encryptedContent: 'lol'})});
        const pj = await posts.json();
        console.log(pj)
        setPosts(pj);
    };

    useEffect(() => {
        const getPosts = async () => {
            
            const posts = await fetch('/api/post', { method: "POST"});
            const pj = await posts.json();
            console.log(pj)
            setPosts(pj);
        };
        getPosts();
    }, [uid])


    return (
        <div>
            <div>{isConnected && <Account />}</div>
            <div>uid: {uid} pid: {pid}</div>

            <div onClick={savePost}>uid: {uid} pid: {pid}</div>
    </div>
  );
};

export default Post;