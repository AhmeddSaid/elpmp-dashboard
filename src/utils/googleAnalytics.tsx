"use client";
import Script from "next/script";
import React from "react";

const GoogleAnalytics = ({ id }: { id: string }) => (
	<>
		<Script
			id="google-analytics"
			async
			src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
			strategy="afterInteractive"
		/>
		<Script id="google-script" strategy="afterInteractive">
			{`
					window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', ${id});
					`}
		</Script>
	</>
);
export default GoogleAnalytics;
