import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { client, sClient } from "@/lib/sanityClient";
import { nanoid } from "nanoid";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const wishlistItems = await client.fetch(
      `*[_type == "wishlist" && userId == $userId][0] {
        products[]->{
          _id,
          title,
          price,
          slug {
            current,
            _type
          },
          image {
            _type,
            asset->{
              _id,
              url
            }
          },
          quantity,
          rowprice,
          brand->{
            title
          },
          isnew,
          productId,
          ratings,
          description,
          category[]->{
           title
          }
        }
      }`,
      { userId: session?.user?.email }
    );

    return NextResponse.json(wishlistItems?.products || []);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const wishlist = await client.fetch(
      `*[_type == "wishlist" && userId == $userId][0]`,
      { userId: session.user.email }
    );
    const key = nanoid();

    if (wishlist) {
      await sClient
        .patch(wishlist._id)
        .setIfMissing({ products: [] })
        .append("products", [
          { _type: "reference", _ref: productId, _key: key },
        ])
        .commit();
    } else {
      await sClient.create({
        _type: "wishlist",
        userId: session.user.email,
        products: [{ _type: "reference", _ref: productId, _key: key }],
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const wishlist = await sClient.fetch(
      `*[_type == "wishlist" && userId == $userId][0]`,
      { userId: session.user.email }
    );

    if (wishlist) {
      const updatedProducts = wishlist.products.filter(
        (product: any) => product._ref !== productId
      );
      await sClient
        .patch(wishlist._id)
        .set({ products: updatedProducts })
        .commit();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
