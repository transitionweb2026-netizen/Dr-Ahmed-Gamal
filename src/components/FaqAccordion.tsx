"use client";

import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { AnimatePresence, motion } from "framer-motion";
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

  return (
    <Accordion.Root
      type="single"
      collapsible
      value={openValue}
      onValueChange={setOpenValue}
      className={cn("divide-y divide-brand-gold/10", className)}
    >
      {items.map((item) => {
        const isOpen = openValue === item.id;
        return (
          <Accordion.Item key={item.id} value={item.id}>
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-start font-serif text-lg text-brand-light transition-colors hover:text-brand-gold">
                <span>{item.question[locale]}</span>
                <Icon
                  name="add"
                  className={cn(
                    "h-5 w-5 shrink-0 text-brand-gold transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <AnimatePresence initial={false}>
              {isOpen && (
                <Accordion.Content forceMount asChild>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 leading-relaxed text-brand-light/70">{item.answer[locale]}</p>
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
