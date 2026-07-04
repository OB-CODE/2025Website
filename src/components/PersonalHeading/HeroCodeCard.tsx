import { personalDetails } from "./personal-info";

const Str = ({ value }: { value: string }) => (
  <span className="text-emerald-300">"{value}"</span>
);

const StrList = ({ values }: { values: string[] }) => (
  <>
    <span className="text-zinc-500">[</span>
    {values.map((value, index) => (
      <span key={value}>
        <Str value={value} />
        {index < values.length - 1 && (
          <span className="text-zinc-500">, </span>
        )}
      </span>
    ))}
    <span className="text-zinc-500">]</span>
  </>
);

const Key = ({ name }: { name: string }) => (
  <>
    <span className="text-rose-300">{name}</span>
    <span className="text-zinc-500">: </span>
  </>
);

/**
 * Terminal-style card rendering the personal details as a TypeScript
 * object — decorative, so it's hidden from assistive tech.
 */
const HeroCodeCard = () => {
  return (
    <div
      aria-hidden="true"
      className="w-full min-w-0 rounded-xl border border-zinc-800 bg-zinc-950/80 shadow-2xl shadow-black/40"
    >
      {/* Title bar */}
      <div className="flex items-center gap-1.5 border-b border-zinc-800/80 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/90" />
        <span className="ml-auto font-mono text-[11px] text-zinc-600">
          {personalDetails.nickname.toLowerCase()}.ts
        </span>
      </div>

      <pre className="px-5 py-5 font-mono text-xs leading-relaxed sm:text-sm">
        <code>
          <div>
            <span className="text-purple-400">const</span>{" "}
            <span className="text-sky-300">
              {personalDetails.nickname.toLowerCase()}
            </span>
            <span className="text-zinc-500">: </span>
            <span className="text-yellow-200">Engineer</span>
            <span className="text-zinc-500"> = {"{"}</span>
          </div>
          <div className="whitespace-pre-wrap break-words pl-4">
            <Key name="role" />
            <Str value={personalDetails.roleShort} />
            <span className="text-zinc-500">,</span>
          </div>
          <div className="whitespace-pre-wrap break-words pl-4">
            <Key name="company" />
            <Str value={personalDetails.company} />
            <span className="text-zinc-500">,</span>
          </div>
          <div className="whitespace-pre-wrap break-words pl-4">
            <Key name="companyDescription" />
            <Str value={personalDetails.companyDescription} />
            <span className="text-zinc-500">,</span>
          </div>
          <div className="whitespace-pre-wrap break-words pl-4">
            <Key name="stack" />
            <StrList values={personalDetails.stack} />
            <span className="text-zinc-500">,</span>
          </div>
          <div className="whitespace-pre-wrap break-words pl-4">
            <Key name="offClock" />
            <StrList values={personalDetails.offClock} />
            <span className="text-zinc-500">,</span>
          </div>
          <div className="whitespace-pre-wrap break-words pl-4">
            <Key name="shipping" />
            <span className="text-orange-300">true</span>
            <span className="text-zinc-500">,</span>
          </div>
          <div>
            <span className="text-zinc-500">{"}"}</span>
          </div>
        </code>
      </pre>
    </div>
  );
};

export default HeroCodeCard;
