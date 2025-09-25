import http from './http';
import type { Location, MeetingPoint } from '../types/location';

export async function list(): Promise<Location[]> {
  const { data } = await http.get<Location[]>('/locations');
  return data;
}

export async function get(id: number): Promise<Location> {
  const { data } = await http.get<Location>(`/locations/${id}`);
  return data;
}

export async function meetingPoints(locationId: number): Promise<MeetingPoint[]> {
  const { data } = await http.get<MeetingPoint[]>(`/locations/${locationId}/meeting-points`);
  return data;
}


