import { database } from "@/lib/database";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user?.emailAddresses?.[0].emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const purchase = await database.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    if (purchase) {
      return new NextResponse("Course already purchased", { status: 401 });
    }

    const course = await database.course.findUnique({
      where: {
        id: params.courseId
      }
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    const stripe_line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.name,
            description: course.description!
          },
          unit_amount: Math.round(course.price! * 100)
        }
      }
    ];

    let stripeCustomer = await database.stripeCustomer.findUnique({
      where: {
        userId: user.id
      },
      select: {
        stripeCustomerId: true
      }
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress
      });

      stripeCustomer = await database.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id
        }
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer?.stripeCustomerId,
      line_items: stripe_line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?canceled=1`,
      metadata: {
        courseId: course.id,
        userId: user.id
      }
    })

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
