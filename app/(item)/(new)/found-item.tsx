import { useSession } from "@/context/SessionContext";
import UploadItemForm from "@/components/UploadItemForm";

export default function FoundItem() {
  const { session } = useSession();

  return (
    <>
      <UploadItemForm mode="found" userId={session?.user.id} />
    </>
  );
}
