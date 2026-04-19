import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

/**
 * @api {post} /api/jobs/:id/apply Apply for a job via Fast Apply
 * @apiDescription Handles the backend logic for rapid applications, storing profile snapshots and screening answers.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: jobId } = await params;
    const user = await getAuthUser();
    
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { profileSnapshot, screeningAnswers, resumeUrl } = body;

    // 1. Verify job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { postedBy: true }
    });

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    // 2. Check for existing application
    const existingApplication = await prisma.jobApplication.findUnique({
      where: {
        jobId_applicantId: {
          jobId: jobId,
          applicantId: user.id
        }
      }
    });

    if (existingApplication) {
      return NextResponse.json({ message: "You have already applied for this position" }, { status: 400 });
    }

    // 3. Create high-fidelity application record
    const application = await prisma.jobApplication.create({
      data: {
        jobId: jobId,
        applicantId: user.id,
        status: "SUBMITTED",
        profileSnapshotJson: profileSnapshot,
        // We utilize the snapshot or specific fields for metadata
      }
    });

    // 4. System Architecture: Handle Post-Submission Events (ATS Simulation)
    // - In a real system, we'd trigger a background task for ATS routing here.
    // - We create a notification for the job poster instantly.
    await prisma.notification.create({
      data: {
        userId: job.postedById,
        type: "JOB_ALERT",
        content: `${user.firstName} ${user.lastName} applied for your "${job.title}" position via Fast Apply.`,
        sourceId: application.id,
        sourceType: "JOB_APPLICATION"
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Application submitted successfully",
      applicationId: application.id
    }, { status: 201 });

  } catch (error) {
    console.error("[JobApply] Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
