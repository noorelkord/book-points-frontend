import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { me as meApi, login as loginApi, register as registerApi, logout as logoutApi } from '../services/auth.api';
import { useAuthStore } from '../app/store/auth';
import type { LoginRequest, RegisterRequest } from '../types/auth';

export function useMe() {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['me'],
    queryFn: meApi,
    enabled: !!token,
  });
}

export function useLogin() {
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoginRequest) => loginApi(payload),
    onSuccess: async ({ token }) => {
      setToken(token);
      const user = await meApi();
      setUser(user);
      await qc.invalidateQueries({ queryKey: ['me'] });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterRequest) => registerApi(payload),
  });
}

export function useLogout() {
  const qc = useQueryClient();
  const logoutStore = useAuthStore((s) => s.logout);
  return useMutation({
    mutationFn: logoutApi,
    onSettled: async () => {
      logoutStore();
      await qc.removeQueries();
    },
  });
}


