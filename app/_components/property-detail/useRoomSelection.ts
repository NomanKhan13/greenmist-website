import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useRoomSelection(
  roomSlug: string,
  isRoomAvailable: boolean,
) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isRoomSelected =
    searchParams.get("room") === roomSlug && isRoomAvailable ? true : false;

  function toggleRoomSelect() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("room", roomSlug);
    if (!isRoomSelected) params.set("showBooking", "true");
    console.log(
      "TRY TO DESELECT",
      searchParams.get("room")?.toString() === roomSlug,
    );
    if (searchParams.get("room")?.toString() === roomSlug) {
      params.delete("room");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return { isRoomSelected, toggleRoomSelect };
}
