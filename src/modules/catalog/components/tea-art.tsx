export function TeaArt({ type, className = "" }: { type: string; className?: string }) {
  const fill = type === "White Tea" ? "var(--color-amber)" : type === "Oolong Tea" ? "var(--color-leaf)" : "var(--color-estate)";
  return (
    <div className={`flex items-center justify-center overflow-hidden bg-mist-gradient ${className}`}>
      <svg viewBox="0 0 360 320" className="h-full w-full" aria-hidden="true">
        <circle cx="180" cy="155" r="118" fill="var(--color-surface)" opacity=".45" />
        <path d="M22 238Q95 117 172 205Q245 107 350 229V320H0Z" fill="var(--color-mist-ridge)" />
        <path d="M0 278Q98 178 198 263Q268 177 360 253V320H0Z" fill="var(--color-control)" opacity=".35" />
        <ellipse cx="181" cy="282" rx="68" ry="11" fill="var(--color-estate)" opacity=".16" />
        <rect x="123" y="82" width="114" height="192" rx="14" fill={fill} />
        <ellipse cx="180" cy="83" rx="57" ry="9" fill="var(--color-amber)" />
        <rect x="123" y="79" width="114" height="12" rx="5" fill="var(--color-amber)" />
        <rect x="136" y="124" width="88" height="104" rx="2" fill="var(--color-surface)" />
        <path d="M180 169C153 167 158 143 158 143C182 141 185 157 180 169ZM180 170C181 146 202 145 202 145C206 165 190 173 180 170ZM180 168V183" fill={fill} stroke={fill} strokeWidth="2" />
        <text x="180" y="199" textAnchor="middle" fill="var(--color-estate)" fontSize="9" letterSpacing="2">DARJEELING</text>
        <text x="180" y="213" textAnchor="middle" fill="var(--color-muted)" fontSize="6" letterSpacing="1.5">SINGLE ESTATE TEA</text>
      </svg>
    </div>
  );
}
