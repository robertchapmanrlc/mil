
import { getCourse } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function CoursePage({ params }: { params: { courseId: string } }) {

    const { userId } = auth();

    if (!userId) {
        return redirect('/');
    }
    
    const course = await getCourse(userId, params.courseId);

    return (
        <div>
            {params.courseId}
            <p>{course?.name}</p>
        </div>
    );
}