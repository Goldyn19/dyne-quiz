'use client'
import React from "react";
import { InvitationResponse } from "@/components/custom/invitation-response";


// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// interface  PageProps  {
//   params: {
//     token: string;
//   };
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function InvitationTokenPage({ params }: any) {
  return (
    <div className="max-w-lg mx-auto py-10">
      <InvitationResponse token={params.token} />
    </div>
  );
} 