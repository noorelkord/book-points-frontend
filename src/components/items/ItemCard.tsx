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
    <div className="card p-6 card-hover">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
          <p className="text-sm text-gray-600 mb-1">{item.type} • {item.stage}</p>
          {item.college && <p className="text-sm text-gray-500 mb-1">{item.college.name}</p>}
          {item.meeting_point && (
            <p className="text-sm text-gray-500 mb-2">
              📍 {item.meeting_point.name}
            </p>
          )}
          {item.description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>
          )}
        </div>
        {item.image_path && (
          <img 
            src={item.image_path} 
            alt={item.title} 
            className="h-20 w-20 rounded-lg object-cover flex-shrink-0" 
          />
        )}
      </div>

      {/* Points and Author Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">
            8 Points
          </span>
        </div>
        {item.owner && (
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">by</span>
            <span className="text-sm font-medium text-gray-600">{item.owner.name}</span>
          </div>
        )}
      </div>

      {/* Owner Contact Info */}
      {item.owner && (
        <div className="bg-primary-50 rounded-lg p-3 mb-4 border border-primary-100">
          <p className="text-sm font-medium text-primary-800 mb-1">المانح: {item.owner.name}</p>
          <p className="text-sm text-primary-600">📞 {item.owner.phone}</p>
        </div>
      )}

      {/* Action Button */}
      <div className="flex items-center justify-center">
        {showReserveButton && user && !isOwner && (
          <button
            onClick={() => reserve.mutate()}
            disabled={reserve.isPending}
            className="btn-primary w-full py-2 disabled:opacity-60"
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


