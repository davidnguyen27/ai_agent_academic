"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { SubjectFormValues, subjectSchema } from "@/utils/validate/subject.schema";

export default function CreateSubjectPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      isActive: true,
      isApproved: false,
      toolIds: [],
    },
  });

  const onSubmit = async (data: SubjectFormValues) => {
    try {
      console.log("New Subject:", data);
      toast.success("Subject created successfully!");
      router.push("/admin/subject");
    } catch {
      toast.error("Failed to create subject.");
    }
  };

  return (
    <div className="w-full p-5 border-white bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-blue-900">Create New Subject</h1>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/admin/subject">Subjects</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Create</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div>
          <Label htmlFor="subjectCode">Subject Code</Label>
          <Input id="subjectCode" className="w-full mt-2" {...register("subjectCode")} />
          {errors.subjectCode && <p className="text-red-500 text-sm">{errors.subjectCode.message}</p>}
        </div>

        <div>
          <Label htmlFor="subjectName">Subject Name</Label>
          <Input id="subjectName" className="w-full mt-2" {...register("subjectName")} />
          {errors.subjectName && <p className="text-red-500 text-sm">{errors.subjectName.message}</p>}
        </div>

        <div>
          <Label htmlFor="decisionNo">Decision No</Label>
          <Input id="decisionNo" className="w-full mt-2" {...register("decisionNo")} />
        </div>

        <div>
          <Label htmlFor="noCredit">No. of Credits</Label>
          <Input id="noCredit" type="number" className="w-full mt-2" {...register("noCredit")} />
        </div>

        <div>
          <Label htmlFor="approvedDate">Approved Date</Label>
          <Input id="approvedDate" type="date" className="w-full mt-2" {...register("approvedDate")} />
        </div>

        <div>
          <Label htmlFor="curriculumId">Curriculum ID</Label>
          <Input id="curriculumId" className="w-full mt-2" {...register("curriculumId")} />
        </div>

        <div>
          <Label htmlFor="sessionNo">Session No</Label>
          <Input id="sessionNo" type="number" className="w-full mt-2" {...register("sessionNo")} />
        </div>

        <div>
          <Label htmlFor="syllabusName">Syllabus Name</Label>
          <Input id="syllabusName" className="w-full mt-2" {...register("syllabusName")} />
        </div>

        <div>
          <Label htmlFor="degreeLevel">Degree Level</Label>
          <Input id="degreeLevel" className="w-full mt-2" {...register("degreeLevel")} />
        </div>

        <div>
          <Label htmlFor="timeAllocation">Time Allocation</Label>
          <Input id="timeAllocation" className="w-full mt-2" {...register("timeAllocation")} />
        </div>

        <div>
          <Label htmlFor="scoringScale">Scoring Scale</Label>
          <Input id="scoringScale" type="number" className="w-full mt-2" {...register("scoringScale")} />
        </div>

        <div>
          <Label htmlFor="minAvgMarkToPass">Min Average Mark to Pass</Label>
          <Input id="minAvgMarkToPass" type="number" className="w-full mt-2" {...register("minAvgMarkToPass")} />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" className="w-full mt-2" {...register("description")} />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="studentTasks">Student Tasks</Label>
          <Textarea id="studentTasks" className="w-full mt-2" {...register("studentTasks")} />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="note">Note</Label>
          <Textarea id="note" className="w-full mt-2" {...register("note")} />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="toolIds">Tool IDs (comma separated)</Label>
          <Input
            id="toolIds"
            placeholder="e.g., tool1,tool2"
            className="w-full mt-2"
            {...register("toolIds", {
              setValueAs: (val: unknown) => {
                if (typeof val === "string") {
                  return val
                    .split(",")
                    .map((v) => v.trim())
                    .filter(Boolean);
                }
                return [];
              },
            })}
          />
        </div>

        <div className="md:col-span-2 flex justify-end mt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Create Subject"}
          </Button>
        </div>
      </form>
    </div>
  );
}
