import axiosInstance from "@/lib/axios";

export const subjectService = {
  getSubjectList: async () => {
    const response = await axiosInstance.get("/api/subject/subjects", {});
    return response.data;
  },
};
