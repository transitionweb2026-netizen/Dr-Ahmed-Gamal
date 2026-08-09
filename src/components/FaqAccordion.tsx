"use client";

import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import { Icon } from "@/components/Icon";
import type { FaqItem } from "@/types/content";
import { cn } from "@/utils/cn";

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const locale = useLocale() as "en" | "ar";
  const [openValue, setOpenValue] = useState<string>("");
  const reduceMotion = useReducedMotion();

  return (
    <Accordion.Root
      type="single"
      collapsible
      value={openValue}
      onValueChange={setOpenValue}
      className={cn("space-y-6", className)}
    >
      {items.map((item) => {
        const isOpen = openValue === item.id;
        return (
          <Accordion.Item
            key={item.id}
            value={item.id}
            className={cn(
              "gold-glass-card rounded-xl px-6 shadow-[0_10px_30px_rgba(0,0,0,0.3)]! transition-colors",
              isOpen && "bg-brand-darker/80!",
            )}
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-6 text-start font-serif text-lg text-brand-light transition-colors hover:text-brand-gold">
                <span>{item.question[locale]}</span>
                <span
                  aria-hidden
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-gold/50 text-brand-gold transition-colors group-hover:border-brand-gold"
                >
                  <Icon name={isOpen ? "remove" : "add"} className="h-5 w-5" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <AnimatePresence initial={false}>
              {isOpen && (
                <Accordion.Content forceMount asChild>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pt-2 leading-relaxed text-brand-light/70">{item.answer[locale]}</p>
                  </motion.div>
                </Accordion.Content>
              )}
            </AnimatePresence>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}
