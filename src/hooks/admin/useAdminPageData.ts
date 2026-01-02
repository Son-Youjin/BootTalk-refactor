import { useGetCertificationList } from "@/hooks/admin/useGetCertificationList";

export const useAdminPageData = () => {
  const { data, isLoading, isError } = useGetCertificationList();
  
  return { certifications: data, isLoading, isError };
};
