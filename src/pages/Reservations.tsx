import { useUserReservations } from '../hooks/queries/useItems';
import ItemCard from '../components/items/ItemCard';

export default function Reservations() {
  const { data: reservations, isLoading, error } = useUserReservations();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading your reservations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-red-600">Error loading reservations. Please try again.</div>
      </div>
    );
  }

  if (!reservations || reservations.data.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">My Reservations</h1>
        <p className="text-gray-600">You haven't made any reservations yet.</p>
        <p className="text-sm text-gray-500 mt-2">Start browsing items to make your first reservation!</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Reservations</h1>
      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800">
          <strong>💡 نصيحة:</strong> يمكنك التواصل مع المانح مباشرة عبر رقم الهاتف المرفق مع كل عنصر محجوز.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.data.map((item) => (
          <ItemCard key={item.id} item={item} showReserveButton={false} />
        ))}
      </div>
    </div>
  );
}
