import { ImageResponse } from "next/server";

export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "edge";

export default async function og() {
  const fira500 = fetch(
    new URL(
      `../node_modules/@fontsource/fira-code/files/fira-code-latin-500-normal.woff`,
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  const boundaries = [
    {
      grade: "1",
      from: 0,
      to: 12,
    },
    {
      grade: "2",
      from: 13,
      to: 18,
    },
    {
      grade: "3",
      from: 19,
      to: 28,
    },
    {
      grade: "4",
      from: 29,
      to: 40,
    },
    {
      grade: "5",
      from: 41,
      to: 58,
    },
    {
      grade: "6",
      from: 59,
      to: 74,
    },
    {
      grade: "7",
      from: 75,
      to: 100,
    },
  ];

  return new ImageResponse(
    (
      <div tw="flex flex-col p-8 bg-black text-white items-center justify-center w-full h-full relative">
        <h1 tw="text-7xl font-bold mb-8">IB Grade Boundaries </h1>
        <div tw="flex flex-col w-full">
          <div tw="flex flex-row w-full">
            <div
              tw="border border-white p-2 text-center mr-2"
              style={{ width: `13%` }}
            >
              1
            </div>
            <div
              tw="border border-white p-2 text-center mr-2"
              style={{ width: `6%` }}
            >
              2
            </div>
            <div
              tw="border border-white p-2 text-center mr-2"
              style={{ width: `10%` }} // difference between from and to
            >
              3
            </div>
            <div
              tw="border border-white p-2 text-center mr-2"
              style={{ width: `12%` }}
            >
              4
            </div>
            <div
              tw="border border-white p-2 text-center mr-2"
              style={{ width: `17%` }}
            >
              5
            </div>
            <div
              tw="border border-white p-2 text-center mr-2"
              style={{ width: `16%` }}
            >
              6
            </div>
            <div
              tw="border border-white p-2 text-center mr-2"
              style={{ width: `26%` }}
            >
              7
            </div>
          </div>
          <div tw="flex-row hidden sm:flex">
            <div
              tw="border-l border-l-neutral-600 pl-2 !-mt-1 text-neutral-600 text-sm mr-2"
              style={{ width: `13%` }}
            >
              0%
            </div>
            <div
              tw="border-l border-l-neutral-600 pl-2 !-mt-1 text-neutral-600 text-sm mr-2"
              style={{ width: `6%` }}
            >
              13%
            </div>
            <div
              tw="border-l border-l-neutral-600 pl-2 !-mt-1 text-neutral-600 text-sm mr-2"
              style={{ width: `10%` }}
            >
              19%
            </div>
            <div
              tw="border-l border-l-neutral-600 pl-2 !-mt-1 text-neutral-600 text-sm mr-2"
              style={{ width: `12%` }}
            >
              29%
            </div>
            <div
              tw="border-l border-l-neutral-600 pl-2 !-mt-1 text-neutral-600 text-sm mr-2"
              style={{ width: `17%` }}
            >
              41%
            </div>
            <div
              tw="border-l border-l-neutral-600 pl-2 !-mt-1 text-neutral-600 text-sm mr-2"
              style={{ width: `16%` }}
            >
              59%
            </div>
            <div
              tw="border-l border-l-neutral-600 pl-2 !-mt-1 text-neutral-600 text-sm mr-2"
              style={{ width: `26%` }}
            >
              75%
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Fira 500",
          data: await fira500,
        },
      ],
    }
  );
}
