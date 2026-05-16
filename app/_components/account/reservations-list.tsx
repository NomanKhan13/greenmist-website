"use client";
import { startTransition, useOptimistic } from "react";
import ReservationCard from "./reservation-card";
import { ReservationProp } from "@/app/account/reservations/page";
import { deleteReservationAction } from "@/app/_lib/booking-actions";
import { toast } from "sonner";

export default function ReservationsList({
  reservations,
}: {
  reservations: ReservationProp[] | [];
}) {
  const [optimisticReservations, removeOptimisticReservation] = useOptimistic(
    reservations,
    (currentReservations, idToRemove) =>
      currentReservations.filter((res) => res.id !== idToRemove),
  );

  const handleCancel = (id: string) => {
    if (!id) return;
    startTransition(async () => {
      removeOptimisticReservation(id);
      const result = await deleteReservationAction(id);

      if (!result.success) {
        toast.error(
          result.error || "Failed to delete reservation. Please try again.",
        );
        console.log(result.error);
      } else {
        toast.success("Reservation deleted successfully");
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {optimisticReservations?.map((res) => (
        <ReservationCard
          reservation={res}
          key={res.id}
          onDelete={handleCancel}
        />
      ))}
    </div>
  );
}
