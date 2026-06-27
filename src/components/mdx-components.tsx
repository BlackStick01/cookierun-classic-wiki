import type { ComponentPropsWithoutRef } from "react";

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 border-l-4 border-orange-400 pl-4 text-2xl font-black text-[#4a2315]" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 text-xl font-bold text-orange-700" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-4 text-base leading-8 text-slate-700" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-700" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="pl-1" {...props} />,
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="font-semibold text-orange-700 underline decoration-orange-300 underline-offset-4 hover:text-orange-900" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-7 overflow-x-auto rounded-lg border border-orange-100 bg-white">
      <table className="min-w-full text-left text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="border-b border-orange-100 bg-orange-50 px-4 py-3 font-bold text-[#4a2315]" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-orange-50 px-4 py-3 text-slate-700" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-bold text-[#4a2315]" {...props} />
  ),
};
