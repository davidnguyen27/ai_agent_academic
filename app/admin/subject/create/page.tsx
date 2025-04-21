"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const subjectSchema = z.object({
  code: z.string().min(2, "Code is required"),
  name: z.string().min(2, "Name is required"),
  syllabusName: z.string().optional(),
  curriculumName: z.string().optional(),
  decisionNo: z.string().optional(),
});

type SubjectFormValues = z.infer<typeof subjectSchema>;

export default function CreateSubjectPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      code: "",
      name: "",
      syllabusName: "",
      curriculumName: "",
      decisionNo: "",
    },
  });

  const onSubmit = async (data: SubjectFormValues) => {
    try {
      // Giả lập gọi API (bạn có thể thay bằng POST thật)
      console.log("New Subject:", data);

      toast.success("Subject created successfully!");

      // Điều hướng về trang danh sách
      router.push("/admin/subject");
    } catch {
      toast.error("Failed to create subject.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Create New Subject</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="code">Code</Label>
          <Input id="code" {...register("code")} />
          {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
        </div>

        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="syllabusName">Syllabus Name</Label>
          <Input id="syllabusName" {...register("syllabusName")} />
        </div>

        <div>
          <Label htmlFor="curriculumName">Curriculum Name</Label>
          <Input id="curriculumName" {...register("curriculumName")} />
        </div>

        <div>
          <Label htmlFor="decisionNo">Decision Number</Label>
          <Input id="decisionNo" {...register("decisionNo")} />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Create Subject"}
        </Button>
      </form>
    </div>
  );
}
