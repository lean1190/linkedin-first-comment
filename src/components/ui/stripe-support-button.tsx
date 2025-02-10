import Script from 'next/script';

export default function StripeSupportButton() {
  return (
    <>
      <Script src="https://js.stripe.com/v3/buy-button.js" strategy="lazyOnload" async />
      {/* @ts-ignore */}
      <stripe-buy-button
        buy-button-id="buy_btn_1QqczT2LfrmtpsIEXY9TFi9D"
        publishable-key="pk_live_51POihY2LfrmtpsIEqMfAPZ08aSZdHz2NuUxzOw9eldu0fybYH8OaLdeHfD1HR56RKYdi8vjRj4G2vjSG5geGwWDy00f31L3D4d"
      />
    </>
  );
}
