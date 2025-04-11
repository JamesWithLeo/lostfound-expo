import UploadItemForm from "@/components/UploadItemForm";
import { useSession } from "@/context/SessionContext";

export default function MyItem() {
  const { session } = useSession();
  return (
    <>
      <UploadItemForm mode="lost" userId={session?.user.id} />
    </>
  );
}
