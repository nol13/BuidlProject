import Link from "next/link";

type Props = {
  id: string;
};

export default function ViewButton({ id }: Props) {
  return (
    <Link href={"/posts/" + id}>
      <button className="btn btn-accent btn-xs">View</button>
    </Link>
  );
}
