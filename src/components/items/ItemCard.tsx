import type { Item } from '../../types/item';
import { useMutation } from '@tanstack/react-query';
import { reserve as reserveApi } from '../../services/items.api';
import { useAuthStore } from '../../app/store/auth';

export default function ItemCard({ item, onReserved, showReserveButton = true }: { item: Item; onReserved?: () => void; showReserveButton?: boolean }) {
  const user = useAuthStore((s) => s.user);
  const reserve = useMutation({
    mutationFn: () => reserveApi(item.id),
    onSuccess: (data) => {
      // Show success alert with donor and meeting point info
      const donorName = item.owner?.name || data?.requester?.name || 'Unknown';
      const donorPhone = item.owner?.phone || data?.requester?.phone || 'غير متوفر';
      const meetingPoint = item.meeting_point?.name || 'Unknown location';
      alert(`تم الحجز بنجاح!\n\nالمانح: ${donorName}\nرقم الهاتف: ${donorPhone}\nنقطة اللقاء: ${meetingPoint}`);
      
      console.log("data", data);
      console.log("item", item);

      onReserved?.();
    },
  });

  const isOwner = false; // backend relationship not provided; assume false

  return (
    <div className="rounded border p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{item.type} • {item.stage}</p>
          {item.college && <p className="text-sm">{item.college.name}</p>}
          {item.meeting_point && <p className="text-sm">Meet at: {item.meeting_point.name}</p>}
          {item.owner && (
            <div className="mt-2 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
              <p className="text-sm font-medium text-blue-800">المانح: {item.owner.name}</p>
              <p className="text-sm text-blue-600">📞 {item.owner.phone}</p>
            </div>
          )}
          {item.description && <p className="mt-2 text-sm">{item.description}</p>}

        </div>
        {item.image_path && (
          <img src={item.image_path} alt={item.title} className="h-24 w-24 rounded object-cover" />
        )}
      </div>
      <div className="mt-3 flex items-center gap-3">
        {showReserveButton && user && !isOwner && (
          <button
            onClick={() => reserve.mutate()}
            disabled={reserve.isPending}
            className="rounded bg-emerald-600 px-3 py-1 text-white disabled:opacity-60"
          >
            {reserve.isPending ? 'Reserving...' : 'Reserve'}
          </button>
        )}
        {!showReserveButton && (
          <span className="text-sm text-emerald-700 font-medium">Reserved</span>
        )}
        {showReserveButton && reserve.isError && (
          <span className="text-sm text-red-600">Failed to reserve</span>
        )}
        {showReserveButton && reserve.isSuccess && (
          <span className="text-sm text-emerald-700">Reserved!</span>
        )}
      </div>
    </div>
  );
}


