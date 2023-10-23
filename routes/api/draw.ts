import { /* HandlerContext, */ Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    const slices = (await req.json()) as {
      discountValue: number;
    }[];

    await checkCPF();

    const index = Math.floor(Math.random() * slices.length);

    const drawnDiscount = slices[index].discountValue;

    if (drawnDiscount === 20) {
      return new Response(JSON.stringify({ index, drawnSlice: slices[index] }));
    }

    const coupon = await createCoupon(drawnDiscount);

    try {
      await saveMasterdata(/* user,  */ drawnDiscount, coupon);
    } catch (error: any) {
      return new Response(JSON.stringify({ message: error.message }));
    }

    console.log({ index, drawnSlice: slices[index], coupon });
    return new Response(
      JSON.stringify({ index, drawnSlice: slices[index], coupon }),
    );
  },
};

function checkCPF() {
}
function createCoupon(discount: number) {
  // https://developers.vtex.com/docs/api-reference/promotions-and-taxes-api#post-/api/rnb/pvt/coupon
  return "";
}
function saveMasterdata(discount: number, coupon: string) {
}
