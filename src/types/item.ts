export type ItemType = 'book' | 'flash';
export type Item = {
  id:number; title:string; type:ItemType; stage:string;
  college_id:number; meeting_point_id:number;
  description?:string; image_path?:string; is_active?:boolean;
  college?:{ id:number; name:string };
  meetingPoint?:{ id:number; name:string; location_id:number };
  meeting_point?:{ id:number; name:string; location_id:number };
  owner?:{ id:number; name:string; phone:string };
};

export type ItemCreateRequest = {
  title: string;
  type: ItemType;
  stage: string;
  college_id: number;
  meeting_point_id: number;
  description?: string;
  image: File;
  is_active?: boolean;
};


