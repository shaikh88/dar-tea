"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type SelectOption = { value: string; label: string };

type SelectProps = {
  id: string;
  label: string;
  name?: string;
  options: SelectOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

export function Select({
  id, label, name, options, defaultValue = "", value, onValueChange, className = "",
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [placement, setPlacement] = useState({ above: false, maxHeight: 280 });
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ text: "", time: 0 });
  const selectedValue = value ?? internalValue;
  const selectedIndex = options.findIndex((option) => option.value === selectedValue);
  const selected = options[selectedIndex];
  const listId = `${id}-options`;

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    const position = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const below = window.innerHeight - rect.bottom - 16;
      const above = rect.top - 16;
      const placeAbove = below < 240 && above > below;
      setPlacement({ above: placeAbove, maxHeight: Math.min(280, Math.max(48, placeAbove ? above : below)) });
    };
    position();
    document.addEventListener("pointerdown", dismiss);
    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("resize", position);
      window.removeEventListener("scroll", position, true);
    };
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.children[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  function show(index = Math.max(0, selectedIndex)) {
    typeahead.current = { text: "", time: 0 };
    setActiveIndex(index);
    setOpen(true);
  }

  function choose(index: number) {
    const option = options[index];
    if (!option) throw new Error(`Missing option ${index} in select ${id}`);
    if (value === undefined) setInternalValue(option.value);
    onValueChange?.(option.value);
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Tab" || event.key === "Escape") {
      if (open && event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
      }
      setOpen(false);
      return;
    }
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      if (event.key === "Home") { show(0); return; }
      if (event.key === "End") { show(options.length - 1); return; }
      if (!open) { show(); return; }
      setActiveIndex((index) => (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
      return;
    }
    const typingSpace = event.key === " " && typeahead.current.text !== "" && Date.now() - typeahead.current.time <= 700;
    if (event.key === "Enter" || (event.key === " " && !typingSpace)) {
      event.preventDefault();
      if (open) choose(activeIndex);
      else show();
      return;
    }
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      const now = Date.now();
      const text = (now - typeahead.current.time > 700 ? "" : typeahead.current.text) + event.key.toLowerCase();
      typeahead.current = { text, time: now };
      const search = [...text].every((letter) => letter === text[0]) ? text[0] : text;
      const start = open ? activeIndex : selectedIndex;
      for (let step = 1; step <= options.length; step++) {
        const index = (start + step + options.length) % options.length;
        if (options[index].label.toLowerCase().startsWith(search)) {
          setActiveIndex(index);
          setOpen(true);
          break;
        }
      }
    }
  }

  if (!selected) throw new Error(`Unknown value "${selectedValue}" in select ${id}`);

  return (
    <div
      ref={rootRef}
      className={`relative min-w-0 ${open ? "z-20" : ""} ${className}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <label id={`${id}-label`} htmlFor={id} className="text-sm font-medium">{label}</label>
      {name && <input type="hidden" name={name} value={selectedValue} />}
      <div className="relative mt-2">
        <button
          ref={triggerRef}
          id={id}
          type="button"
          role="combobox"
          aria-labelledby={`${id}-label`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined}
          data-selected={selectedValue !== ""}
          className="field-control flex min-h-12 w-full items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left font-normal transition-colors duration-200"
          onClick={() => open ? setOpen(false) : show()}
          onKeyDown={handleKeyDown}
        >
          <span className="truncate">{selected.label}</span>
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`size-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
            <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open && (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={`${id}-label`}
            style={{ maxHeight: placement.maxHeight }}
            className={`absolute left-0 right-0 overflow-y-auto overscroll-contain rounded-xl border border-line bg-surface p-1 shadow-float ${placement.above ? "bottom-full mb-2" : "top-full mt-2"}`}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={option.value === selectedValue}
                className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-3 text-sm leading-6 ${activeIndex === index ? "bg-estate text-surface" : option.value === selectedValue ? "bg-mist text-estate" : "text-ink"}`}
                onPointerMove={() => setActiveIndex(index)}
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => choose(index)}
              >
                <span>{option.label}</span>
                {option.value === selectedValue && (
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4 shrink-0">
                    <path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
