import { NextResponse } from "next/server";
import { sClient } from "../../../lib/sanityClient";

interface RequestBody {
  username: string;
  userEmail: string;
  amount: number;
  reference: string;
  status: string;
  state: string;
  lga: string;
  deliveryType: string;
}

export async function POST(request: Request) {
  const {
    username,
    userEmail,
    amount,
    reference,
    status,
    state,
    lga,
    deliveryType,
  } = (await request.json()) as RequestBody;

  if (
    !username ||
    !userEmail ||
    !amount ||
    !reference ||
    !status ||
    !state ||
    !lga ||
    !deliveryType
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // console.log("Creating order with data:", {
    //   username,
    //   userEmail,
    //   amount,
    //   reference,
    //   status,
    //   state,
    //   lga,
    //   deliveryType,
    // });
    const order = await sClient.create({
      _type: "order",
      username,
      userEmail,
      amount,
      state,
      lga,
      deliveryType,
      reference,
      status,
      createdAt: new Date().toISOString(),
    });
    console.log("Order created:", order);
    return NextResponse.json({ order }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to create order", details: err.message },
      { status: 500 }
    );
  }
}
